import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'; 

const ListagemHoteis = () => {
  const [hoteis, setHoteis] = useState([]);
  const [termoBusca, setTermoBusca] = useState(''); 
  const [criterioOrdenacao, setCriterioOrdenacao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
    setHoteis(hoteisSalvos);
  }, []);

  const toggleFavorito = (id) => {
    const hoteisAtualizados = hoteis.map((hotel) =>
      hotel.id === id ? { ...hotel, favorito: !hotel.favorito } : hotel
    );

    localStorage.setItem('hoteis', JSON.stringify(hoteisAtualizados));
    setHoteis(hoteisAtualizados);

    const acao = hoteisAtualizados.find(h => h.id === id).favorito ? 'adicionado' : 'removido';
    setTipoMensagem('sucesso');
    setMensagem(`Hotel ${acao} aos favoritos!`);

    setTimeout(() => {
      setMensagem('');
    }, 2000);
  };

  const excluirHotel = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este hotel?")) {
      const hoteisAtualizados = hoteis.filter((hotel) => hotel.id !== id);
      setHoteis(hoteisAtualizados);
      localStorage.setItem('hoteis', JSON.stringify(hoteisAtualizados));
      setMensagem('Hotel excluído com sucesso!');
      setTipoMensagem('sucesso');
    }
  };

  const hoteisFiltrados = hoteis.filter((hotel) =>
    hotel.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const hoteisOrdenados = hoteisFiltrados.sort((a, b) => {
    if (criterioOrdenacao === 'preco') {
      return a.precoDiaria - b.precoDiaria;
    } else if (criterioOrdenacao === 'classificacao') {
      return b.classificacao - a.classificacao; 
    }
    return 0;
  });

  return (
    <div>
      <h1>Lista de Hotéis</h1>

      {mensagem && (
        <div style={{ backgroundColor: tipoMensagem === 'sucesso' ? '#28a745' : '#dc3545' }}>
          {mensagem}
        </div>
      )}

      <input
        type="text"
        placeholder="Buscar por nome do hotel"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        style={styles.inputBusca}
      />

      <select
        value={criterioOrdenacao}
        onChange={(e) => setCriterioOrdenacao(e.target.value)}
        style={styles.seletorOrdenacao}
      >
        <option value="">Ordenar por</option>
        <option value="preco">Preço da Diária</option>
        <option value="classificacao">Classificação</option>
      </select>

      {hoteisOrdenados.length === 0 ? (
        <p>Nenhum hotel encontrado.</p>
      ) : (
        <div className="listagem-container">
          {hoteisOrdenados.map((hotel) => (
            <div className="card-hotel" key={hotel.id}>
              <img src={hotel.imagem} alt={hotel.nome} />
              <h2>{hotel.nome}</h2>
              <p>Classificação: {hotel.classificacao} estrelas</p>
              <p>Cidade: {hotel.cidade}</p>
              <p>Estado: {hotel.estado}</p>
              <p>Preço da Diária: R$ {hotel.precoDiaria}</p>
              <p>{hotel.descricao}</p>
              <button onClick={() => toggleFavorito(hotel.id)}>
                {hotel.favorito ? 'Remover Favorito' : 'Adicionar aos Favoritos'}
              </button>
              <Link to={`/detalhes/${hotel.id}`}>Ver Detalhes</Link>
              <Link to={`/editar-hotel/${hotel.id}`}>Editar Hotel</Link>
              <button onClick={() => excluirHotel(hotel.id)} style={styles.botaoExcluir}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  inputBusca: {
    padding: '10px',
    margin: '20px 0',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  seletorOrdenacao: {
    padding: '10px',
    margin: '20px 0',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  botaoExcluir: {
    padding: '5px 10px',
    marginLeft: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ListagemHoteis;
