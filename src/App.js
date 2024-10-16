// src/components/App.js
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Activity from './components/Activity';
import Video from './components/Video';
import Login from './components/Login';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/cursos'; // Atualize o URL da API conforme necessário

function App() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ nome: '', descricao: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Carrega todos os cursos na inicialização
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true); // Começa o carregamento
    axios.get(`${API_BASE_URL}/cursos`)
      .then(response => {
        setCourses(response.data);
        setLoading(false); // Finaliza o carregamento
      })
      .catch(error => {
        console.error("Erro ao buscar cursos:", error);
        setError("Erro ao buscar cursos. Tente novamente mais tarde."); // Define mensagem de erro
        setLoading(false); // Finaliza o carregamento mesmo em erro
      });
  };

  // Adiciona um novo curso
  const addCourse = () => {
    axios.post(`${API_BASE_URL}/cursos`, newCourse)
      .then(response => {
        setCourses([...courses, response.data]);
        setNewCourse({ nome: '', descricao: '' }); // Reseta os campos após adicionar
      })
      .catch(error => console.error("Erro ao adicionar curso:", error));
  };

  // Pesquisa cursos pelo nome
  const searchCourses = () => {
    axios.get(`${API_BASE_URL}/cursos/pesquisa?nome=${searchTerm}`)
      .then(response => setSearchResults(response.data))
      .catch(error => console.error("Erro na pesquisa:", error));
  };

  return (
    <Router>
      <div>
        <h1>Bem-vindo ao Sistema de Cursos</h1>

        {/* Mensagem de carregamento */}
        {loading && <p>Carregando cursos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Formulário para adicionar cursos */}
        <h3>Adicionar Curso</h3>
        <input
          type="text"
          placeholder="Nome do Curso"
          value={newCourse.nome}
          onChange={(e) => setNewCourse({ ...newCourse, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição do Curso"
          value={newCourse.descricao}
          onChange={(e) => setNewCourse({ ...newCourse, descricao: e.target.value })}
        />
        <button onClick={addCourse}>Adicionar Curso</button>

        {/* Seção de pesquisa de cursos */}
        <h3>Pesquisar Cursos</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar cursos"
        />
        <button onClick={searchCourses}>Pesquisar</button>
        <ul>
          {searchResults.map(course => (
            <li key={course.id}>{course.nome}</li>
          ))}
        </ul>

        {/* Lista de cursos existentes */}
        <h3>Lista de Cursos</h3>
        <ul>
          {courses.map(course => (
            <li key={course.id}>{course.nome}</li>
          ))}
        </ul>

        <Routes>
          <Route path="/activities" element={<Activity />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
