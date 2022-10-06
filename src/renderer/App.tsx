import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useEffect,useState } from 'react';
import SelectBox from './components/SelectBox';
import Entries from './components/Entries';

const Hello = () => {
  const [channels, setchannels] = useState([])
  const [titles, settitles] = useState([])

  function changeChannel(e){
    window.electron.ipcRenderer.sendMessage("getTitles",e.target.value);


  }
  useEffect(() => {
    window.electron.ipcRenderer.on("channels",(channels)=>{
      setchannels(channels);
    })
    window.electron.ipcRenderer.on("titles",(titles)=>{
      settitles(titles)
      console.log(titles);

    })
    return () => {

    }
  }, [])

  return (
    <>
    <SelectBox channels={channels} changeChannel={changeChannel}  />
      <Entries titles={titles} />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
