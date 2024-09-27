
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reserva from './pages/Reserva';
import DetalhesHotel from './pages/DetalhesHotel';
import ListagemHoteis from './components/ListagemHoteis';
import Favoritos from './components/Favoritos';
import CadastroHotel from './components/CadastroHotel';
import './styles.css'; 

const App = () => {
  const [tema, setTema] = useState('claro');

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) {
      setTema(temaSalvo);
    }
  }, []);

  const alternarTema = () => {
    const novoTema = tema === 'claro' ? 'escuro' : 'claro';
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
  };

  return (
    <div className={`app ${tema}`}>
      <header>
        <h1>Meu Sistema de Reservas de Hotéis</h1>
        <button onClick={alternarTema}>
          {tema === 'claro' ? 'Alternar para Escuro' : 'Alternar para Claro'}
        </button>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/detalhes-hotel" element={<DetalhesHotel />} />
          <Route path="/listagem-hoteis" element={<ListagemHoteis />} />
          <Route path="/detalhes/:id" element={<DetalhesHotel />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/cadastro-hotel" element={<CadastroHotel />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
