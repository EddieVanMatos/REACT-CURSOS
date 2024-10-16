// src/components/Activity.js

import React, { useEffect, useState } from 'react';
import api from './services/api';


function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Busca todas as atividades
    api.get('/activities')
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar atividades:", error);
      });
  }, []);

  return (
    <div>
      <h1>Atividades</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <h2>{activity.titulo}</h2>
            <p>{activity.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activity;
