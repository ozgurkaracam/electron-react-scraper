import React, { useEffect, useState } from 'react';
import { Container, Spinner, Spinner } from 'react-bootstrap';
import Entries from './Entries';
import SelectBox from './SelectBox';

function Home(props) {
  const [channels, setchannels] = useState([]);
  const [titles, settitles] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedchannel, setselectedchannel] = useState('');

  function changeChannel(e) {
    setselectedchannel(e.target.value);
    if (!e.target.value) {
      settitles([]);
      return;
    }
    setloading(true);
    window.electron.ipcRenderer.sendMessage('getTitles', e.target.value);
  }
  useEffect(() => {
    window.electron.ipcRenderer.on('channels', (channels) => {
      setchannels(channels);
      setloading(false);
    });
    window.electron.ipcRenderer.on('titles', (titles) => {
      settitles(titles);
      setloading(false);
      console.log(titles);
    });
    return () => {};
  }, []);

  if (loading)
    return (
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Spinner
          size="xl"
          style={{ width: '100px', height: '100px' }}
          animation="grow"
        />
      </div>
    );

  return (
    <Container className="wrapper">
      <SelectBox
        selectedchannel={selectedchannel}
        setloading={setloading}
        channels={channels}
        changeChannel={changeChannel}
      />
      <Entries setloading={setloading} titles={titles} />
    </Container>
  );
}

export default Home;
