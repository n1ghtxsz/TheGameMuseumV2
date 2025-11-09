import '../styles/GameCard.css'

function GameCard({ image, title }) {
  return (
    <div className="game-card">
      <div className="game-card-image">
        <img src={image} alt={title} />
      </div>

      <div className="game-card-title">
        <h3>{title}</h3>
      </div>

      {/* Efeito de brilho (carregamento estiloso) */}
      <div className="game-card-effect"></div>
    </div>
  )
}

export default GameCard