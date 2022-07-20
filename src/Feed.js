import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import FeedMenu from './FeedMenu'

export default function Feed(props) {
    
    const [feedItems, setFeedItems] = useState([]);

    useEffect(() => {
        setFeedItems(parseFeedItems(props));
    }, [props]);

    const parseFeedItems = (props) => {
        let f = [];
        let finalItems = [];
        for (let i = 0; i < props.data.length; i++) {
            f.push(props.data[i].querySelectorAll('item'));
        }
        for (let k = 0; k < f.length; k++) { // outer loop traverses through feeds passed through props
            for (let j = 0; j < f[k].length; j++) { // traverses through items in the feed selected above
                finalItems.push(<FeedItem title={f[k][j].querySelector('title').textContent} link={f[k][j].querySelector('link').textContent} description={f[k][j].querySelector('description').textContent} />);
            }
        }
        return finalItems;
    }
    
    if (feedItems.length === 0) {
        return (
            <>
                <div className='container-fluid m-1'>
                    <div className='row'>
                        <div className='col-10'>
                            <Typography variant='h3' className='d-flex justify-content-center mt-5'>Add a feed in the menu!</Typography>
                        </div>
                        <div className='col-1'>
                            <div className='position-fixed p-3'>
                                <FeedMenu clearFeed={() => setFeedItems([])} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className='container-fluid m-1'>
                    <div className='row'>
                        <div className='col-10'>
                            {feedItems}
                        </div>
                        <div className='col-1'>
                            <div className='position-fixed m-3'>
                                <FeedMenu clearFeed={() => setFeedItems([])} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}