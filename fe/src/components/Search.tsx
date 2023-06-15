import React from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface CustomizedInputBaseProps{
    dataHandler:(matchString:string)=>void
}

export const CustomizedInputBase = ({dataHandler}:CustomizedInputBaseProps) => {

    const searchHandler= (e:any)=>{
        dataHandler(e?.target?.value);
    }
    
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                minWidth: '400px',
                m: 'auto',
                mt: 2,
                ml: 3,
                mr: 4,
                mb: 2
            }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Pdfs..."
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={searchHandler}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}