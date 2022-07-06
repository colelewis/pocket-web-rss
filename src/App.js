import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItems: []
    };
  }

  componentDidMount() {
    ;
  }

  parseRSS(feedURL) {
    fetch(feedURL)
        .then(res => res.text()) // get response text from fetching RSS URL
        .then(contents => new window.DOMParser().parseFromString(contents, "text/xml")) // parse XML from RSS URL into visible format
        .then(data => { // process fetched RSS data
            console.log(data);

            const feedTitle = data.querySelector('title');
            const feedDescription = data.querySelector('description');
            const feedImage = data.querySelector('image');
            const feedLink = data.querySelector('link');

            const feed = data.querySelectorAll('item');
            feed.forEach(entry => {
                // console.log(entry.querySelector('description'));
            });
            console.log(feed);
        });
}

  render() {
    return (
      <>
        <p>pocket-web-rss</p>
        {this.parseRSS('https://rss.art19.com/apology-line')}
      </>
    )
  }
}
