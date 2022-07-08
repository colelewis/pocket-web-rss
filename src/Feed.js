import React, { Component } from 'react';
import FeedItem from './FeedItem';
import FeedMenu from './FeedMenu'

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedItems: []
        }
    }

    componentDidMount() {
        ;
    }

    parseFromXML() {
        // this.props.data.forEach(feed => {
        //     // let p = [feed.querySelector('title'), feed.querySelector('description'), feed.querySelector('image'), feed.querySelector('link')];
        //     // console.log(p)

        //     const feedItems = feed.querySelectorAll('item');

        //     feedItems.forEach(item => { // make FeedItems here
        //         console.log(item.querySelector('description'));
        //         // return (
        //         //     <FeedItem description={item.querySelector('description')} />
        //         // );

        //     });
        // });
        let f = [];
        for (let i = 0; i < this.props.data.length; i++) {
            f.push(this.props.data[i].querySelectorAll('item'));
        }
        for (let k = 0; k < f.length; k++) {
            for (let j = 0; j < f[k].length; j++) {
                // f[k][j] is each item in the feeds
            }
        }
    }

    render() {
        return (
            <>
                <p>test</p>
                {this.parseFromXML()}
            </>
        );
    }

}