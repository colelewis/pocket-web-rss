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

    componentDidMount() { // populates feedItems with FeedItem objects constructed from XML
        let f = [];
        let finalItems = [];
        for (let i = 0; i < this.props.data.length; i++) {
            f.push(this.props.data[i].querySelectorAll('item'));
        }
        for (let k = 0; k < f.length; k++) { // outer loop traverses through feeds passed through props
            for (let j = 0; j < f[k].length; j++) { // traverses through items in the feed selected above
                // f[k][j] is each item in the feeds
                finalItems.push(<FeedItem title={f[k][j].querySelector('title').textContent} link={f[k][j].querySelector('link').textContent} description={f[k][j].querySelector('description').textContent} key={j} />);
            }
        }
        this.setState({
            feedItems: this.state.feedItems.concat(finalItems)
        });
        console.log(this.state.feedItems);
    }

    render() {
        if (this.state.feedItems.length === 0) {
            return (
                <>
                    <div className='container-fluid m-1'>
                        <div className='row'>
                            <div className='col-9'>
                                <h5 className='m-4'>Add a feed in the menu!</h5>
                            </div>
                            <div className='col'>
                                <div className='position-fixed p-2 mt-3'>
                                    <FeedMenu sources={this.props.sources} />
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
                            <div className='col-9'>
                                {this.state.feedItems}
                            </div>
                            <div className='col'>
                                <div className='position-fixed p-2 mt-3'>
                                    <FeedMenu sources={this.props.sources} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}