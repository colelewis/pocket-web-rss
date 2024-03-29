import './App.css';
import React, { useEffect, useState } from 'react';
import './bootstrap.min.css';
import Feed from './Feed';
import { fetchSources } from './Storage';

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
    fetch('http://localhost:8001/source/' + source)
    // fetch('https://menthol.cloud/' + source)
      .then(data => data.json())
      .then(contents => contents.rawHTML)
      .then(runner => new window.DOMParser().parseFromString(runner, "text/xml"))
      .then(result => {
        console.log(result)
        setFeeds(feeds => [...feeds, result])
      }
      );

  }

  return (
    <>
      <Feed clearData={() => setFeeds([])} data={feeds} />
    </>
  );

}
