import React from 'react';
import '../styles/LoadingScreen.css';

function LoadingScreen({ progress = 0, isLoading = true }) {
  // Se não estiver carregando, não renderiza nada (deixa a HomePage aparecer)
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="loading-container mx-auto my-auto">
        <div className="loading-spinner"></div>
        <h1 className="loading-title">Carregando</h1>
        <p className="loading-text">
          Aguarde um momento<span className="loading-dots"></span>
        </p>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;