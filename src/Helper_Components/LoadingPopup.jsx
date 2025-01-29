import React from 'react';
import {Backdrop, CircularProgress, Typography, Box} from "@mui/material";

const LoadingPopup = ({open, message = 'Processing...'}) => {

    return (
        <Backdrop open={open}
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <CircularProgress color="inherit" size={60} thickness={4} />
                <Typography variant="h6" sx={{mt: 2}}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
};

export default LoadingPopup;