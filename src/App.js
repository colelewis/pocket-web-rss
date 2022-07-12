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
      sources: ['https://www.state.gov/rss-feed/africa/feed/', 'https://www.state.gov/rss-feed/democracy-human-rights-and-labor/feed/']
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
        this.setState(prevState => ({
          feeds: prevState.feeds.concat(data)
        }));
      })
      .catch(e => {
        alert('The source ' + feedURL + ' could not be loaded due to CORS settings.');
        this.setState({
          sources: this.state.sources.splice(feedURL)
        })
        // window.location.reload(); // save for production
      });
  }

  render() {
    return (
      <>
        <Feed data={this.state.feeds} sources={this.state.sources} />
        {console.log(this.state.feeds)}
      </>
    )
  }
}
