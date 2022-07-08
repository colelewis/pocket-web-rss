import React, { Component } from 'react';

export default class FeedItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <p>{this.props.description}</p>
            </>
        );
    }
}