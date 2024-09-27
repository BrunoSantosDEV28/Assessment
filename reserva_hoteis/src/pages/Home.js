
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>ReservaHotel</h1>

      <p>Bem-vindo ao sistema de reserva de hotéis!</p>

      <p>Utilize o menu de navegação para explorar e fazer suas reservas de hotéis.</p>

      <button onClick={() => alert('Você clicou no botão!')}>
        Clique aqui para mais informações
      </button>
    </div>
  );
};


export default Home;
