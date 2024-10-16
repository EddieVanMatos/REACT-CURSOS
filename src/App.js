// src/components/App.js
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Activity from './components/Activity';
import Course from './components/Course';
import Video from './components/Video';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/activities" element={<Activity />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/videos" element={<Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Bem-vindo ao Sistema de Cursos</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
