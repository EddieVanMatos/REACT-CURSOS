// src/components/Video.js

import React, { useEffect, useState } from 'react';
import api from './services/api';

function Video() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Busca todos os vídeos
    api.get('/videos')
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar vídeos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Vídeos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <h2>{video.titulo}</h2>
            <iframe
              src={video.url}
              title={video.titulo}
              width="560"
              height="315"
              allowFullScreen
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Video;
