import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useEffect,useState } from 'react';
import SelectBox from './components/SelectBox';
import Entries from './components/Entries';
import { Container } from 'react-bootstrap';
import Home from './components/Home';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
