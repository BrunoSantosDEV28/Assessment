import React, { useEffect, useState } from 'react';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hoteisFavoritos = hoteisSalvos.filter(hotel => hotel.favorito);
    setFavoritos(hoteisFavoritos);
  }, []);

  return (
    <div>
      <h1>Hotéis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>Nenhum hotel favorito encontrado.</p>
      ) : (
        <ul>
          {favoritos.map((hotel) => (
            <li key={hotel.id}>
              <span>{hotel.nome}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favoritos;
