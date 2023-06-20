const express = require('express');
const router = express.Router();
const path = require('path');
const PDF = require('../model/PDF');
const { v4: uuidv4 } = require('uuid')
const AWS = require('../aws-config')
// Route to create a new PDF document
const s3 = new AWS.S3();

router.post('/sent', async (req, res) => {
  try {
    const { filename, description, owner } = req.body;
    const fileId = uuidv4();
    const newPDF = new PDF({
      filename,
      description,
      owner,
      fileId
    });

    await newPDF.save();

    const file = req.files.file;

    const uploadParams = {
      Bucket: 'pdffilestorage-1',
      Key: `${fileId}.pdf`,
      Body: file.data
    };
    

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error('Error uploading file to S3:', err);
        return res.status(500).json({ error: 'Error uploading file to S3' });
      }

      console.log('File uploaded to S3:', data.Location);
      res.status(201).send(newPDF);
    });
  } catch (error) {
    console.error('Error creating PDF document:', error);
    res.status(500).json({ error: 'Error creating PDF document' });
  }
});


router.get('/pdfs/:username', async (req, res) => {
  try {
    const user = req.params.username;
    const pdfs = await PDF.find({owner:user});
    res.send(pdfs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/pdf/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Find the PDF document in MongoDB by fileId
    const pdf = await PDF.findOne({ fileId });

    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const s3Params = {
      Bucket: 'pdffilestorage-1',
      Key: `${pdf.fileId}.pdf`
    };
    s3.getObject(s3Params, (err, data) => {
      if (err) {
        console.error('Error retrieving PDF from S3:', err);
        return res.status(500).json({ error: 'Error retrieving PDF from S3' });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.send(data.Body);
    });
  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).json({ error: 'Error retrieving PDF' });
  }
});



router.put('/update/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const comments = req.body.comments;

    // Find the PDF document in MongoDB by fileId
    const pdf = await PDF.findOne({ fileId: fileId });
    
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }
    
    // Concatenate the existing comments with the new comments
    const updatedComments = pdf.comments.concat(comments);

    // Update the comments property with the concatenated array
    pdf.comments = updatedComments;

    // Save the updated PDF document
    await pdf.save();

    res.status(200).json({ message: 'Comments updated successfully', pdf });
  } catch (error) {
    console.error('Error updating comments:', error);
    res.status(500).json({ error: 'Error updating comments' });
  }
});



router.get('/getpdf/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Find the PDF document in MongoDB by fileId
    const pdf = await PDF.findOne({ fileId:fileId });

    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const botData = [
      {
          "userId": "00000",
          "comId": "c5f7a1da-87d2-42aa-882b-d59b44b6f42d",
          "avatarUrl": "bot.png",
          "userProfile": "https://www.linkedin.com/in/riya-negi-8879631a9/",
          "fullName": "Bot",
          "text": "Comment Below",
          "replies": []
        }
  ];

    if( Object.keys(pdf.comments[0]).length === 0){
      pdf.comments = botData;
    }

    res.send(pdf);
  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).json({ error: 'Error retrieving PDF' });
  }
});

module.exports = router;
