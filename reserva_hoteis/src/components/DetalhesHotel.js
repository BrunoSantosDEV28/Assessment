import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetalhesHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hotelSelecionado = hoteisSalvos.find((hotel) => hotel.id === parseInt(id));

    if (hotelSelecionado) {
      setHotel(hotelSelecionado);
    }
  }, [id]);

  if (!hotel) {
    return <p>Hotel não encontrado.</p>;
  }

  return (
    <div>
      <h1>{hotel.nome}</h1>
      <img src={hotel.imagem} alt={hotel.nome} style={{ maxWidth: '300px' }} />
      <p>Classificação: {hotel.classificacao} estrelas</p>
      <p>Localização: {hotel.cidade}, {hotel.estado}</p>
      <p>Preço da diária: R$ {hotel.precoDiaria}</p>
      <p>Descrição: {hotel.descricao}</p>
    </div>
  );
};

export default DetalhesHotel;
