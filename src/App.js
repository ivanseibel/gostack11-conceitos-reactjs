import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => setRepositories(res.data));
  },[]);

  function handleAddRepository() {
    api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: 'http://github/ivanseibel/repositorio',
      techs: ['React Native', 'JavaScript']  
    }).then(res => {
      setRepositories([...repositories, res.data]);
    });
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(res => {
        if (res.status === 204){
          setRepositories(repositories.filter(repo => repo.id !== id));
          return;
        }

        alert(res.statusText);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
