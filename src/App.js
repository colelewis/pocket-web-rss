import './App.css';
import React, { useEffect, useState } from 'react';
import './bootstrap.min.css';
import Feed from './Feed';
import { fetchSources } from './Storage';

// export default class App extends Component {
export default function App() {

  const [feeds, setFeeds] = useState([]);
  const [lsflag, setLSFlag] = useState(0);

  useEffect(() => {
    window.addEventListener('localStorage', () => {
      updateLS();
      console.log("change to local storage!");
    })
    fetchSources().forEach(source => {
      parseSource(source);
    })
  }, []);

  const updateLS = () => {
    setLSFlag(lsflag + 1);
    console.log('re-render count: ' + lsflag);
    setFeeds([]);
    fetchSources().forEach(source => {
      parseSource(source);
    })
  }

  const parseSource = (source) => {
    fetch(source)
        .then(res => res.text()) // get response text from fetching RSS URL
        .then(contents => new window.DOMParser().parseFromString(contents, "text/xml")) // parse XML from RSS URL into visible format
        .then(data => { // process fetched RSS data
          setFeeds(feeds => [...feeds, data]);
      })
      .catch(e => {
        console.error(e);
      });
  }

  return (
    <>
      <Feed clearData={() => setFeeds([])} data={feeds} />
    </>
  );

}
