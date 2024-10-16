// src/components/Course.js

import React, { useEffect, useState } from 'react';
import api from './services/api';

function Course() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Busca todos os cursos
    api.get('/cursos')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Cursos</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h2>{course.nome}</h2>
            <p>{course.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Course;
