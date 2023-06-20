import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import usePdfs from '../hooks/usePdfs';
import styled from '@emotion/styled';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import dayjs from 'dayjs';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { CustomizedInputBase } from './Search';
import { PdfUploader } from './PdfUploader';
import { useNavigate } from 'react-router-dom';
import TestingPdf from './TestingPdf';
import { Modal } from '@mui/material';
import { UserComments } from './UserComments';
import { Ipdf } from '../types';
const StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const PDF = () => {
    
    const [open, SetOpen] = useState(false);
    const handleClose = () => SetOpen(false);
    const [commentPdf, setCommentPdf] = useState<Ipdf>();
    
    const [displayPdf, setDisplayPdf] = useState<Ipdf>();
    const { pdfs } = usePdfs();
    const [copen, SetCOpen] = useState(false);
    const [filteredPdfs,setFilterredPdfs] = useState<Ipdf[]>();
    const navigate = useNavigate();
    
    useEffect(()=>{
        setFilterredPdfs(pdfs);
    },[pdfs])

    useEffect(()=>{
        setFilterredPdfs(filteredPdfs);
    },[filteredPdfs])
    

    const handleOpen = (pdf: any) => {
        setDisplayPdf(pdf);
        SetOpen(true);
    }
    //comment
    const handleComOpen = (commentPdf: any) => {
        setCommentPdf(commentPdf);
        SetCOpen(true);
    }
    const handleComClose = () => SetCOpen(false);
    
    const logoutHandler = () => {
        localStorage.clear();
        navigate('/login');
    }

    const searchHandler =(searchString:string)=>{
        let fPdfs = pdfs?.filter(pdf=>{
            return pdf.filename.toLowerCase().startsWith(searchString);
        })
        console.log(searchString,fPdfs);
        setFilterredPdfs(fPdfs);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '5px' }}>
                <Button onClick={logoutHandler}>Logout</Button>
            </div>
            <PdfUploader />
            <CustomizedInputBase dataHandler={searchHandler}/>
            <StyledDiv>
                {
                    filteredPdfs?.map((pdf, ind) => {
                        return <Box key={ind} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', m: 3, borderRadius: '10px', boxShadow: 'rgba(0,0,0,0.4) 0 0 4px' }}>
                            <Box sx={{ my: 3, mx: 2 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {pdf.filename || 'NA'}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography gutterBottom variant="caption" component="div">
                                            {dayjs(pdf.uploadedAt).format("DD-MMMM-YYYY") || 'NA'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography color="text.secondary" variant="body2">
                                    {pdf.description || 'NA'}
                                </Typography>
                            </Box>
                            <Divider variant="middle" />
                            <Box sx={{ mt: 3, ml: 2, mb: 1 }}>
                                <Typography color="text.secondary" variant="body2" style={{ width: "80%" }}>
                                    Preview Pdf
                                    <Button onClick={() => handleOpen(pdf)}>
                                        <RemoveRedEyeOutlinedIcon color='primary' />
                                    </Button>
                                </Typography>
                                <Typography color="text.secondary" variant="body2" style={{ width: "80%" }}>
                                    Add Comment
                                    <Button onClick={() => handleComOpen(pdf)}>
                                        <AddCommentIcon color='primary' />
                                    </Button>
                                </Typography>
                            <Typography color="text.secondary" variant="body2" style={{ width: "80%" }}>
                                Share
                                <Button >
                                    <img src='share.png' alt='share' width={'20px'} height={'20px'} />
                                </Button>
                            </Typography>
                            </Box>
                        </Box>
                    })
                }
            </StyledDiv >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TestingPdf fileId={displayPdf?.fileId as string} />
                </Box>
            </Modal>

            <Modal
                open={copen}
                onClose={handleComClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserComments
                        filename={commentPdf?.filename as string}
                        fileId={commentPdf?.fileId as string}
                        owner={commentPdf?.owner as string}
                        description={commentPdf?.description as string}
                        uploadedAt={dayjs(commentPdf?.uploadedAt).format("DD-MMMM-YYYY") as string}
                        comments={commentPdf?.comments as Array<{}>} />
                </Box>
            </Modal>
        </>
    );
}
