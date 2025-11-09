import { useEffect, useState } from "react";

function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Substitua pela sua chave obtida em https://rawg.io/apidocs
  const API_KEY = "634bf1a85c9a41efa8ff6869b439c342";

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`
        );
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) return <p>Carregando jogos...</p>;

  return (
    <div className="game-grid">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.background_image} alt={game.name} />
          <h3>{game.name}</h3>
          <p>⭐ {game.rating}</p>
          <p>Lançado em: {game.released}</p>
          {game.developers && (
            <p>Desenvolvedor: {game.developers[0]?.name || "Desconhecido"}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default GameList;
