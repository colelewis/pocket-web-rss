import './App.css';
import React, { Component } from 'react';
// import FeedMenu from './FeedMenu';
import './bootstrap.min.css'
import Feed from './Feed';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      sources: ['https://www.state.gov/rss-feed/democracy-human-rights-and-labor/feed/'],
      feedItems: []
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

  render() {
    return (
      <>
        <p>pocket-web-rss</p>
        <Feed data={this.state.feeds} />        
      </>
    )
  }
}
