import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './bootstrap.min.css';

import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UploadIcon from '@mui/icons-material/Upload'; import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download'
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import { Modal, Box, Snackbar, Alert, Typography, Button, TextField, Card, CardHeader, CardContent, Container, Collapse } from '@mui/material';
import { clearData, addPackage, exportPackages, setPackages, fetchPackages, removePackage, fetchSavedItems, removeItem } from './Storage';

const actions = [
  { icon: <AddIcon />, name: 'Add URL', impulse: 'addURL' },
  { icon: <ListAltIcon />, name: 'Sources', impulse: 'handleOpenSources' },
  { icon: <RestartAltIcon />, name: 'Clear Data', impulse: 'clearData' },
  { icon: <UploadIcon />, name: 'Export Packages...', impulse: 'exportPackages' },
  { icon: <DownloadIcon />, name: 'Import Packages...', impulse: 'importPackages' },
  { icon: <FolderSpecialIcon />, name: 'Saved Items', impulse: 'handleOpenSavedItems' },
  { icon: <InfoIcon />, name: 'About', impulse: 'handleOpenAbout' }
];

const boxStyle = {
  position: 'absolute',
  width: '50%',
  height: '30%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'whitesmoke',
  border: 'none',
  borderRadius: '15px',
  p: 4,
  textAlign: 'center',
  cursor: 'crosshair',
  overflowY: 'scroll'
};

export default function FeedMenu(props) {

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [modalAction, setModalAction] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [urlInput, setURLInput] = useState('');
  const [expand, setExpand] = useState(false);

  function handleClick(e, imp) {
    e.preventDefault();
    setModalAction(imp);
    if (imp === 'clearData') { clearData(); setSnackbarMessage('Local data cleared!'); props.clearFeed(); handleOpenSnackbar(); return; } // only snackbar component, no need to open modal
    if (imp === 'exportPackages') { exportPackages(); return; } // handle download
    handleOpenModal();
  }

  function pinwheel() {
    switch (modalAction) {
      case 'addURL':
        return addURLForm();
      case 'handleOpenSources':
        return listSources();
      case 'importPackages':
        return importPackages();
      case 'handleOpenSavedItems':
        return listSaved();
      case 'handleOpenAbout':
        return about();
      default:
        return;
    }
  }

  function addPackageWrapper(url) {
    fetch(url)
      .then(res => res.text()) // get response text from fetching RSS URL
      .then(contents => new window.DOMParser().parseFromString(contents, "text/xml")) // parse XML from RSS URL into visible format
      .then(data => { // process fetched RSS data
        addPackage(data.querySelector('channel').querySelector('title').textContent, data.querySelector('channel').querySelector('description').textContent, url);
        window.dispatchEvent(new Event('localStorage')); // alert <App> of local storage change
      });
  }

  const about = () => {
    return (
      <Box sx={boxStyle}>
        <Typography variant='h4'>
          Made by Cole Lewis
          <br />
          &copy;2022
        </Typography>
        <br />
        <Typography variant='h1'>
          <GitHubIcon onClick={() => window.open('https://github.com/colelewis/pocket-web-rss')} fontSize="90%" style={{ color: '#1ff0d0' }} />
        </Typography>
        <Typography variant='h5'>
          v1.0
        </Typography>
      </Box>
    );
  }

  const addURLForm = () => {
    return (
      <Box sx={boxStyle}>
        <TextField label='URL' variant='standard' autoFocus fullWidth onChange={(e) => setURLInput(e.target.value)} />
        <Button variant='contained' style={{ margin: '15%' }} onClick={() => urlInputValidator(urlInput)}>Add URL</Button>
      </Box>
    );
  }

  function urlInputValidator(input) {
    fetch(input)
      .then(res => res.text())
      .then(contents => new window.DOMParser().parseFromString(contents, "text/xml"))
      .then(data => {
        if (data.querySelector('channel') !== null) {
          addPackageWrapper(input);
          setURLInput('');
          handleCloseModal();
          setSnackbarMessage('Source added!');
          handleOpenSnackbar();
        } else {
          alert('Invalid source, please enter valid RSS feed URL.');
          setURLInput('');
        }
      }).catch(() => {
        alert('Invalid source, please enter valid RSS feed URL.');
        setURLInput('');
      });
    
  }

  function RSSValidator(input) {
    return fetch(input)
      .then(res => res.text())
      .then(contents => new window.DOMParser().parseFromString(contents, "text/xml"))
      .then(data => {
        if (data.querySelector('channel') === null || data.querySelector('channel') === undefined) {
          return false;
        } else {
          return true;
        }
      })
      .catch(() => {
        return false;
      });
  }

  async function importedJSONValidator(fileJSON) {
    function isValidURL(input) {
      try {
        const j = new URL(input);
        return true;
      } catch {
        return false;
      }
    }

    for (let i = 0; i < fileJSON.length; i++) {
      console.log(fileJSON[i].title);
      console.log(fileJSON[i].description);
      console.log(fileJSON[i].link);
      if (fileJSON[i].title === undefined || fileJSON[i].description === undefined || fileJSON[i].link === undefined) {
        console.log('bad attribute(s)');
        return false;
      }
      else {
        if (!isValidURL(fileJSON[i].link)) {
          console.log('invalid link');
        } else {
          let rssv = await RSSValidator(fileJSON[i].link);
          if (!rssv) {
            console.log('invalid RSS');
            return false;
          } else {
            if (i === fileJSON.length - 1) {
              console.log('all good, ' + (i === fileJSON.length - 1));
              return true;
            }
          }
        }
      }
    }
  }

  function fileInputValidator(input) {

    if (input === undefined) { // no file passed
      alert('No file selected, please enter valid packages.json file.');
      return;
    }

    let r = new FileReader();
    r.onload = () => {
      importedJSONValidator(JSON.parse(r.result)).then(result => {
        if (result === true) {
          console.log(r.result);
          setPackages(r.result);
          handleCloseModal();
          setSnackbarMessage('Packages imported!');
          window.dispatchEvent(new Event('localStorage')); // alert <App> of local storage change
          handleOpenSnackbar();
          //
        } else {
          alert('Invalid packages file, please enter valid packages.json file.');
        }
      });
    };
    r.readAsText(input);
  }

  const importPackages = () => {
    return (
      <Box sx={boxStyle}>
        <input className='form-control' type='file' id='packagesFileSelect' />
        <Button variant='contained' style={{ margin: '15%' }} onClick={() => fileInputValidator(document.getElementById('packagesFileSelect').files[0])}>Import Packages</Button>

      </Box>
    );
  }


  const listSources = () => {
    return (
      <Box sx={boxStyle}>
        {fetchPackages().map(
          x => {
            return (
              <Card sx={{ margin: '3%' }} variant='outlined'>
                <CardHeader title={x.title} />
                <div>
                  <CardContent>
                    <Container sx={{}}>
                      <Typography>
                        <a href={x.link}>{x.link}</a>
                      </Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        <div dangerouslySetInnerHTML={{ __html: x.description }} />
                      </Typography>
                      <PlaylistRemoveIcon onClick={() => {
                        removePackage(x.title, x.description, x.link);
                        setSnackbarMessage('Source removed!');
                        handleCloseModal();
                        window.dispatchEvent(new Event('localStorage')); // alert <App> of local storage change
                        handleOpenSnackbar();
                        }
                      } />
                    </Container>
                  </CardContent>
                </div>
              </Card>
            )
          }
        )}
      </Box>
    );
  }

  const listSaved = () => {
    return (
      <Box sx={boxStyle}>
        {fetchSavedItems().map(item => {
          return (
            <Card sx={{ margin: '3%' }} variant='outlined' onClick={() => setExpand(!expand)}>
              <CardHeader title={item.title} />
              <div>
              <PlaylistRemoveIcon onClick={() => {
                        removeItem(item.title, item.description, item.link);
                        setSnackbarMessage('Item removed!');
                        handleCloseModal();
                        handleOpenSnackbar();
                        }
                } />
                <Collapse in={expand} timeout='auto' unmountOnExit>
                  <CardContent >
                    <Container sx={{}}>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                      </Typography>
                      <Typography style={{ marginTop: '5%' }}>
                        <a href={item.link}>{item.link}</a>
                      </Typography>
                    </Container>
                  </CardContent>
                </Collapse>
              </div>
            </Card>
          )
        }
        )}
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ height: '10%', transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: '45%' }}>
        <SpeedDial
          ariaLabel="Menu"
          FabProps={{ style: { backgroundColor: '#1ff0d0' } }}
          icon={<MenuIcon />}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e) => { handleClick(e, action.impulse) }}
            />
          ))}
        </SpeedDial>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ boxStyle }}>
          {pinwheel()}
        </Box>
      </Modal>

      <Snackbar
        sx={{ width: '30%' }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
