import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getGames, getGameDetails } from "../services/rawgApi";
import "../styles/HomePage.css";

function HomePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                // busca 40 e filtra apenas com image
                const list = await getGames(1, 40);
                const withImage = list.filter(g => g.background_image);

                // embaralha e pega 5
                const selected = withImage.sort(() => 0.5 - Math.random()).slice(0, 5);

                // para cada, buscar detalhes; se falhar, retornamos o objeto base com fallback
                const detailed = await Promise.all(
                    selected.map(async (g) => {
                        try {
                            const details = await getGameDetails(g.id);
                            // description_raw normalmente vem apenas no endpoint /games/{id}
                            const description = details?.description_raw?.trim() || details?.description?.trim() || g.short_description || "";
                            return {
                                id: g.id,
                                name: g.name,
                                background_image: g.background_image,
                                description: description || null, // null => tratamos depois
                                slug: g.slug,
                            };
                        } catch (err) {
                            console.warn("Erro buscando detalhes do jogo", g.id, err);
                            return {
                                id: g.id,
                                name: g.name,
                                background_image: g.background_image,
                                description: null,
                                slug: g.slug,
                            };
                        }
                    })
                );

                if (mounted) setGames(detailed);
            } catch (err) {
                console.error("Erro no load de jogos:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => { mounted = false; };
    }, []);

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <Navbar />
            <div className="container my-4">
                <div id="carouselExampleCaptions" className="carousel slide w-75" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {games.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to={i}
                                className={i === 0 ? "active" : ""}
                                aria-current={i === 0 ? "true" : "false"}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    <div className="carousel-inner rounded-4 shadow-lg custom-carousel-inner">
                        {games.map((game, i) => (
                            <div key={game.id} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                <img
                                    src={game.background_image || "/fallback.jpg"}
                                    alt={game.name}
                                    className="d-block w-100 carousel-cover-img"
                                    loading="lazy"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "/fallback.jpg"; }}
                                />

                                <div className="carousel-caption d-none d-md-block caption-bg rounded-3 p-3">
                                    <h5>{game.name}</h5>
                                    <p className="description-text">
                                        {game.description
                                            ? (game.description.length > 220 ? game.description.slice(0, 220) + "..." : game.description)
                                            : "Descrição indisponível no momento."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Anterior</span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Próximo</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default HomePage;
