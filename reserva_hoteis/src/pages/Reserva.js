
import React, { useState } from 'react';

const Reserva = () => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const handleReserva = (event) => {
    event.preventDefault();
    alert(`Reserva feita para ${nomeCliente} na data ${dataReserva}`);
  };
  return (
    <div>
      <h1>Página de Reservas</h1>
      <p>Preencha o formulário abaixo para fazer sua reserva.</p>
      <form onSubmit={handleReserva}>
        <label htmlFor="nome">Nome do Cliente:</label>
        <input
          type="text"
          id="nome"
          value={nomeCliente}
          onChange={(event) => setNomeCliente(event.target.value)}
          placeholder="Digite seu nome"
        />
        <br /> 
        <label htmlFor="data">Data da Reserva:</label>
        <input
          type="date"
          id="data"
          value={dataReserva}
          onChange={(event) => setDataReserva(event.target.value)}
        />
        <br /> 
        <button type="submit">Fazer Reserva</button>
      </form>

     
      <p>Entre em contato conosco para mais informações.</p>
    </div>
  );
};


export default Reserva;
