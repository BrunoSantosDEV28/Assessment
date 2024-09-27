
import React, { useState } from 'react';

const DetalhesHotel = () => {
  
  const [hotel, setHotel] = useState({
    nome: 'Hotel Paraíso',
    localizacao: 'Av. Beira-Mar, 123 - Rio de Janeiro, RJ',
    descricao:
      'O Hotel Paraíso oferece uma vista incrível para o mar, com quartos confortáveis e um serviço de alta qualidade.',
    comodidades: ['Wi-Fi grátis', 'Piscina', 'Estacionamento', 'Café da manhã'],
    avaliacao: 4.5,
  });

  const atualizarAvaliacao = () => {
    setHotel((prevState) => ({
      ...prevState,
      avaliacao: prevState.avaliacao + 0.1, 
    }));
  };

  return (
    <div>
      <h1>Detalhes do Hotel</h1>

      <h2>{hotel.nome}</h2>

      <p><strong>Localização:</strong> {hotel.localizacao}</p>

      <p><strong>Descrição:</strong> {hotel.descricao}</p>

      <p><strong>Comodidades:</strong></p>
      <ul>
        {hotel.comodidades.map((comodidade, index) => (
          <li key={index}>{comodidade}</li>
        ))}
      </ul>

      <p><strong>Avaliação:</strong> {hotel.avaliacao.toFixed(1)} estrelas</p>

      <button onClick={atualizarAvaliacao}>
        Aumentar Avaliação
      </button>
      <p>Confira as avaliações dos hóspedes e tenha a melhor experiência de hospedagem!</p>
    </div>
  );
};


export default DetalhesHotel;
