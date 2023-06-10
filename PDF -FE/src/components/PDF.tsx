import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import usePdfs from '../hooks/usePdfs';
import styled from '@emotion/styled';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const PDF = () => {
    const { pdfs } = usePdfs();
    return (
        <StyledDiv>
            {
                pdfs.map(pdf => {
                    return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', m: 3, borderRadius: '10px', boxShadow: 'rgba(0,0,0,0.4) 0 0 4px' }}>
                        <Box sx={{ my: 3, mx: 2 }}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" component="div">
                                        PDF Name
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="caption" component="div">
                                        DOP
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography color="text.secondary" variant="body2">
                                Pinstriped cornflower blue cotton blouse takes you on a walk to the park or
                                just down the hall.
                                Description.....
                            </Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box sx={{ m: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <Chip label="Extra Soft" />
                                <Chip color="primary" label="Soft" />
                                <Chip label="Medium" />
                                <Chip label="Hard" />
                            </Stack>
                        </Box>
                        <Box sx={{ mt: 3, ml: 2, mb: 1 }}>
                            <Typography color="text.secondary" variant="body2">
                                Preview Pdf
                                <Button>
                                    <RemoveRedEyeOutlinedIcon color='primary' />
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                })
            }
        </StyledDiv >
    );
}
