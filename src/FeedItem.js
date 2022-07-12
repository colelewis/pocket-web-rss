import React, { useState } from 'react';
import { Container, CardHeader, Card, CardContent, Typography, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function FeedItem(props) {
    const [expand, setExpand] = useState(false);

    const FeedItemMenu = () => {
        return (
            <Menu menuButton={<MoreVertIcon />} transition direction='right' menuStyle={{padding: 0}}>
                <MenuItem>Share...</MenuItem>
                <MenuItem>Save</MenuItem>
            </Menu>
        );
    }

    function sanitize(description) {
        return (
            <Typography style={{whiteSpace: 'pre-line'}}>
                <p dangerouslySetInnerHTML={{__html: description}} />
            </Typography>
        );
    }

    return (
        <Card sx={{margin: '3%'}} variant='outlined'>
            <CardHeader
                title={props.title}
                action={
                    <>
                        <ExpandMoreIcon onClick={() => setExpand(!expand)} />
                        <FeedItemMenu onClick={() => setExpand(true)} />
                    </>
                }
            />
            <div>
                <Collapse in={expand} timeout='auto' unmountOnExit>
                    <CardContent>
                        <Container sx={{}}>
                            {sanitize(props.description)}
                            <Typography style={{marginTop: '5%'}}>
                                <a href={props.link}>{props.link}</a>
                            </Typography>
                        </Container>
                    </CardContent>
                </Collapse>
            </div>
        </Card>
    );
}