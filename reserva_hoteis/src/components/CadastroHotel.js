import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CadastroHotel = () => {
  const [hotel, setHotel] = useState({
    nome: '',
    imagem: '',
    classificacao: '',
    cidade: '',
    estado: '',
    precoDiaria: '',
    descricao: '',
    favorito: false, 
  });

  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState('');  
  const [tipoMensagem, setTipoMensagem] = useState(''); 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];
      const hotelExistente = hoteisSalvos.find((h) => h.id === parseInt(id));
      if (hotelExistente) {
        setHotel(hotelExistente);
      }
    }
  }, [id]);

  const validarFormulario = () => {
    let errosValidacao = {};

    if (!hotel.nome) errosValidacao.nome = 'O nome do hotel é obrigatório';
    if (!hotel.imagem) errosValidacao.imagem = 'A URL da imagem é obrigatória';
    if (!hotel.classificacao || hotel.classificacao < 0 || hotel.classificacao > 5) {
      errosValidacao.classificacao = 'A classificação deve ser entre 0 e 5';
    }
    if (!hotel.cidade) errosValidacao.cidade = 'A cidade é obrigatória';
    if (!hotel.estado) errosValidacao.estado = 'O estado é obrigatório';
    if (!hotel.precoDiaria || hotel.precoDiaria < 0) {
      errosValidacao.precoDiaria = 'O preço da diária deve ser um valor positivo';
    }
    if (!hotel.descricao) errosValidacao.descricao = 'A descrição é obrigatória';

    setErros(errosValidacao);
    return Object.keys(errosValidacao).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      setTipoMensagem('erro');
      setMensagem('Por favor, corrija os erros no formulário antes de prosseguir.');
      return;
    }

    try {
      const hoteisSalvos = JSON.parse(localStorage.getItem('hoteis')) || [];

      if (id) {
        const hoteisAtualizados = hoteisSalvos.map((h) =>
          h.id === parseInt(id) ? { ...hotel, id: parseInt(id) } : h
        );
        localStorage.setItem('hoteis', JSON.stringify(hoteisAtualizados));
        setTipoMensagem('sucesso');
        setMensagem('Hotel atualizado com sucesso!');
      } else {
        hoteisSalvos.push({ ...hotel, id: Date.now() }); 
        localStorage.setItem('hoteis', JSON.stringify(hoteisSalvos));
        setTipoMensagem('sucesso');
        setMensagem('Hotel cadastrado com sucesso!');
      }

      setTimeout(() => {
        setMensagem('');
        navigate('/listagem-hoteis');
      }, 2000); 
    } catch (error) {
      setTipoMensagem('erro');
      setMensagem('Erro ao salvar os dados no localStorage. Por favor, tente novamente.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({
      ...hotel,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>{id ? 'Editar Hotel' : 'Cadastrar Hotel'}</h1>

      {mensagem && (
        <div style={{ ...styles.mensagem, backgroundColor: tipoMensagem === 'sucesso' ? '#28a745' : '#dc3545' }}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Hotel"
          value={hotel.nome}
          onChange={handleChange}
          required
          style={{ ...styles.input, borderColor: erros.nome ? 'red' : '#ccc' }}
        />
        {erros.nome && <p style={styles.erro}>{erros.nome}</p>}

        <input
          type="text"
          name="imagem"
          placeholder="URL da Imagem"
          value={hotel.imagem}
          onChange={handleChange}
          required
          style={{ ...styles.input, borderColor: erros.imagem ? 'red' : '#ccc' }}
        />
        {erros.imagem && <p style={styles.erro}>{erros.imagem}</p>}

        <input
          type="number"
          name="classificacao"
          placeholder="Classificação (0 a 5)"
          value={hotel.classificacao}
          onChange={handleChange}
          min="0"
          max="5"
          required
          style={{ ...styles.input, borderColor: erros.classificacao ? 'red' : '#ccc' }}
        />
        {erros.classificacao && <p style={styles.erro}>{erros.classificacao}</p>}

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={hotel.cidade}
          onChange={handleChange}
          required
          style={{ ...styles.input, borderColor: erros.cidade ? 'red' : '#ccc' }}
        />
        {erros.cidade && <p style={styles.erro}>{erros.cidade}</p>}

        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={hotel.estado}
          onChange={handleChange}
          required
          style={{ ...styles.input, borderColor: erros.estado ? 'red' : '#ccc' }}
        />
        {erros.estado && <p style={styles.erro}>{erros.estado}</p>}

        <input
          type="number"
          name="precoDiaria"
          placeholder="Preço da Diária"
          value={hotel.precoDiaria}
          onChange={handleChange}
          required
          style={{ ...styles.input, borderColor: erros.precoDiaria ? 'red' : '#ccc' }}
        />
        {erros.precoDiaria && <p style={styles.erro}>{erros.precoDiaria}</p>}

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={hotel.descricao}
          onChange={handleChange}
          required
          style={{
            ...styles.input,
            height: '100px',
            borderColor: erros.descricao ? 'red' : '#ccc',
          }}
        />
        {erros.descricao && <p style={styles.erro}>{erros.descricao}</p>}

        <button type="submit" style={styles.button}>
          {id ? 'Salvar Alterações' : 'Cadastrar Hotel'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
  },
  erro: {
    color: 'red',
    fontSize: '12px',
  },
  mensagem: {
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
  },
};

export default CadastroHotel;
