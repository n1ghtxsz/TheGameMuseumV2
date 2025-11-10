import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import { getGames, getGameDetails } from "../services/rawgApi";
import "../styles/HomePage.css";

function HomePage() {
    const [games, setGames] = useState([]);
    const [highlightGames, setHighlightGames] = useState([]);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0); // ✅ Novo estado para progresso

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setLoadingProgress(10); // ✅ Início do carregamento

                async function loadHighlights() {
                    try {
                        const list = await getGames(1, 50, "rating");
                        const withImage = list.filter(g => g.background_image);
                        setHighlightGames(withImage);
                        setLoadingProgress(40); // ✅ Progresso após carregar destaques

                        const fetchedPrices = {};
                        withImage.forEach(g => {
                            const price =
                                g.metacritic
                                    ? (100 - g.metacritic) / 2
                                    : Math.floor(Math.random() * 200) / 10 + 10;
                            fetchedPrices[g.id] = `R$ ${price.toFixed(2)}`;
                        });
                        if (mounted) setPrices(fetchedPrices);
                    } catch (err) {
                        console.error("Erro ao carregar destaques:", err);
                    }
                }
                await loadHighlights();

                setLoadingProgress(60); // ✅ Progresso após destaques

                const list = await getGames(1, 40);
                const withImage = list.filter(g => g.background_image);
                const selected = withImage.sort(() => 0.5 - Math.random()).slice(0, 5);

                setLoadingProgress(80); // ✅ Progresso após carregar jogos básicos

                const detailed = await Promise.all(
                    selected.map(async (g) => {
                        try {
                            const details = await getGameDetails(g.id);
                            const description =
                                details?.description_raw?.trim() ||
                                details?.description?.trim() ||
                                g.short_description ||
                                "";
                            return {
                                id: g.id,
                                name: g.name,
                                background_image: g.background_image,
                                description: description || null,
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
                setLoadingProgress(100); // ✅ Carregamento completo

            } catch (err) {
                console.error("Erro no load de jogos:", err);
            } finally {
                // Aguarda um pouco para mostrar 100% antes de esconder
                setTimeout(() => {
                    if (mounted) setLoading(false);
                }, 500);
            }
        }

        load();
        return () => { mounted = false; };
    }, []);

    function scrollCarousel(offset) {
        const container = document.getElementById("games-scroll");
        if (container) {
            container.scrollBy({ left: offset, behavior: "smooth" });
        }
    }

    return (
        <div>
            {/* ✅ LoadingScreen sincronizado com o progresso real */}
            <LoadingScreen progress={loadingProgress} isLoading={loading} />

            {/* ✅ Conteúdo principal - só aparece quando loading for false */}
            {!loading && (
                <>
                    <Navbar />
                    <div className="container" style={{ marginTop: 150 }}>
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

                        <div className="d-flex flex-column mt-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1>Destaques da Galera</h1>
                                <div className="d-flex">
                                    <button className="btn btn-pagination" onClick={() => scrollCarousel(-300)}>
                                        <i className="bi bi-arrow-left-circle"></i>
                                    </button>
                                    <button className="btn btn-pagination" onClick={() => scrollCarousel(300)}>
                                        <i className="bi bi-arrow-right-circle"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="games-scroll d-flex justify-content-center mt-1 gap-3" id="games-scroll">
                                {highlightGames.length === 0 ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    highlightGames.map((game) => (
                                        <div key={game.id} className="game-card">
                                            <img
                                                src={game.background_image || "/fallback.jpg"}
                                                alt={game.name}
                                                className="game-cover"
                                                loading="lazy"
                                                width={160}
                                                height={200}
                                                onError={(e) => { e.target.onerror = null; e.target.src = "/fallback.jpg"; }}
                                            />
                                            <p className="mt-2 mb-0 fw-bold">{game.name}</p>
                                            <p className="text-light">
                                                {prices[game.id] ? prices[game.id] : "Preço indisponível"}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;