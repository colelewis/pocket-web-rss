import React, { useState } from 'react';
import { Container, CardHeader, Card, CardContent, Typography, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import FeedItemMenu from './FeedItemMenu';

export default function FeedItem(props) {
    const [expand, setExpand] = useState(false);

    function sanitize(description) {
        return (
            <Typography style={{whiteSpace: 'pre-line'}}>
                <div dangerouslySetInnerHTML={{__html: description}} />
            </Typography>
        );
    }

    return (
        <Card sx={{margin: '3%'}} variant='outlined' onClick={() => setExpand(!expand)}>
            <CardHeader
                title={props.title}
                action={
                    <>
                        <ExpandMoreIcon onClick={() => setExpand(!expand)} />
                        <FeedItemMenu title={props.title} url={props.link} description={props.description} onClick={() => setExpand(true)} />
                    </>
                }
            />
            <div>
                <Collapse in={expand} timeout='auto' unmountOnExit>
                    <CardContent >
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