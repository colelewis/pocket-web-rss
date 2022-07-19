import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { Modal, Box, Snackbar, Alert } from '@mui/material';

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Reddit } from '@mui/icons-material/';
import { saveItem } from './Storage';

export default function FeedItemMenu(props) { // only prop is url, the FeedItem link
    const [openShare, setOpenShare] = useState(false);
    const handleOpenShare = () => setOpenShare(true);
    const handleCloseShare = () => setOpenShare(false);

    const [openSave, setOpenSave] = useState(false);
    const handleOpenSave = () => { 
        setOpenSave(true);
        saveItem(props.title, props.description, props.url);
    };
    const handleCloseSave = (reason) =>  {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSave(false);
    };

    return (
        <>
            <Menu menuButton={<MoreVertIcon />} transition direction='right' menuStyle={{ padding: 0 }}>
                <MenuItem onClick={handleOpenShare}>Share...</MenuItem>
                <Modal open={openShare} onClose={handleCloseShare}>
                    <Box sx={boxStyle}>
                        <TwitterIcon onClick={() => window.open('https://twitter.com/share?url=' + props.url)} fontSize='inherit' style={{padding: '5%'}}/>
                        <FacebookIcon onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + props.url)} fontSize='inherit' style={{padding: '5%'}} />
                        <Reddit onClick={() => window.open('https://www.reddit.com/submit?url=' + props.url)} fontSize='inherit' style={{padding: '5%'}} />
                    </Box>
                </Modal>

                <MenuItem onClick={handleOpenSave}>Save</MenuItem>
            </Menu>
            <Snackbar
                sx={{width: '30%'}}
                open={openSave}
                autoHideDuration={5000}
                onClose={handleCloseSave}
                // message="Item saved!"
                // anchorOrigin={{vertical: 'bottom', horizontal:'top'}}
            >
                <Alert onClose={handleCloseSave} severity="success" sx={{ width: '100%' }}>
                    Item saved!
                </Alert>
            </Snackbar>
        </>
        
    );
}

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'whitesmoke',
    borderRadius: '15px',
    p: 2,
    fontSize: '500%'
};