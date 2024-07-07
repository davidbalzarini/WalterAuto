import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/Registro/RegisterForm';
import Home from './pages/home/Home';
import { DataProvider } from './components/DataContext.tsx/DataContext';
import Navbar from './components/navbar/Navbar';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
    
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Navbar openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen}/>
          <div style={{ minHeight: '100vh' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<RegisterForm openModal={openModal} />} />
            </Routes>
          </div>
          
        </Router>
      
      </div>
    </DataProvider>
    
  );
}

export default App;
