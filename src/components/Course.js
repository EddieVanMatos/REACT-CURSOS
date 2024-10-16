// src/components/Course.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Course() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ nome: '', descricao: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Carrega todos os cursos na inicialização
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get('/cursos')
            .then(response => setCourses(response.data))
            .catch(error => console.error("Erro ao buscar cursos:", error));
    };

    // Adiciona um novo curso
    const addCourse = () => {
        axios.post('/cursos', newCourse)
            .then(response => {
                setCourses([...courses, response.data]);
                setNewCourse({ nome: '', descricao: '' }); // Reseta os campos após adicionar
            })
            .catch(error => console.error("Erro ao adicionar curso:", error));
    };

    // Pesquisa cursos pelo nome
    const searchCourses = () => {
        axios.get(`/cursos/pesquisa?nome=${searchTerm}`)
            .then(response => setSearchResults(response.data))
            .catch(error => console.error("Erro na pesquisa:", error));
    };

    return (
        <div>
            <h2>Gerenciar Cursos</h2>
            
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
        </div>
    );
}

export default Course;
