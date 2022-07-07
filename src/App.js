import './App.css';
import React, { Component } from 'react';
// import FeedMenu from './FeedMenu';
// import FeedItem from './FeedItem';
import './bootstrap.min.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      sources: ['https://rss.art19.com/apology-line']
    };
  }

  componentDidMount() {
    // eventually add from localstorage
    this.state.sources.forEach(source => this.parseRSS(source));
  }

  parseRSS(feedURL) {
    fetch(feedURL)
      .then(res => res.text()) // get response text from fetching RSS URL
      .then(contents => new window.DOMParser().parseFromString(contents, "text/xml")) // parse XML from RSS URL into visible format
      .then(data => { // process fetched RSS data
        this.setState({
          feeds: this.state.feeds.concat(data)
        });
      });
  }

  parseFromXML() {
    this.state.feeds.forEach(feed => {
      // let p = [feed.querySelector('title'), feed.querySelector('description'), feed.querySelector('image'), feed.querySelector('link')];
      // console.log(p)
      
      const feedItems = feed.querySelectorAll('item');
      feedItems.forEach(item => { // make FeedItems here
        // console.log(item.querySelector('description'));
      });
    });
  }


  render() {
    return (
      <>
        <p>pocket-web-rss</p>
        {this.parseFromXML()}
        {/* testing line above for console.log values */}
      </>
    )
  }
}
