import React, { useEffect } from 'react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
// import {Resume} from './costestimate.pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import type { PDFDocumentProxy } from 'pdfjs-dist';
import './Sample.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
    ).toString();

    const options = {
        cMapUrl: 'cmaps/',
        standardFontDataUrl: 'standard_fonts/',
      };
type PDFFile = string | File | null;


// export default function PdfPreview() {
//     const [file, setFile] = useState<PDFFile>('');
//     const [numPages, setNumPages] = useState<number>();
//     const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
//     console.log("This is being uploaded")
//     setNumPages(nextNumPages);
//   }


//   return (
    
//     <div className="Example">
//         <div className="Example__container">
//         <div className="Example__container__document">

//       <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//             ))}
//        </Document>
//         </div>
//         </div>
//     </div>
//   );
// }


export default function PDFShow() {
  const [pdfUrl, setPdfUrl] = useState('');


  const fetchPDF = async () => {
    try {
      const fileId = '99181333-c0a5-4be2-adbc-aef9437898a9'; // Replace with the actual file ID
      const response = await axios.get(`http://localhost:5001/api/upload/pdf/${fileId}`);
      console.log("Response is...", response.data)
      const decodedData =atob(response.data);
      const uint8Array = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
      uint8Array[i] = decodedData.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const test = URL.createObjectURL(blob);
      setPdfUrl(response.data);
      
      // Create a URL object from the blob response
      // const file = new Blob([response.data], { type: 'application/pdf' });
      // const pdfUrl = URL.createObjectURL(file);
      // setPdfUrl(response.data);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };
  return (
    <div>
      <button onClick={fetchPDF}>Fetch PDF</button>
      {pdfUrl && <div style={{display:'flex'}}>
        <iframe src={pdfUrl} width="80%" height="1000" />
        <div style={{width:"20%", background:'#FFF'}}>Testing</div>
      </div> 
      }
    </div>
  );
}

