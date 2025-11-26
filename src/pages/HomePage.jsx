import { useEffect, useState, useRef } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import { getGames, getGameDetails } from "../services/rawgApi";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import "../styles/GameCard.css"

function HomePage() {
    const [games, setGames] = useState([]);
    const [highlightGames, setHighlightGames] = useState([]);
    const [discoverGames, setDiscoverGames] = useState([]);
    const [prices, setPrices] = useState({});

    const [loading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0); // ✅ Novo estado para progresso

    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);

    const highlightRef = useRef(null);
    const discoverRef = useRef(null);
    const carouselRef = useRef(null);

    // 🔥 Pega jogos realmente aleatórios da RAWG
    async function getRandomGames(qtd = 15) {
        // pega só o "count"
        const firstPage = await getGames(1, 1);
        const total = firstPage.count;
        const totalPages = Math.ceil(total / 50);

        const collected = [];

        while (collected.length < qtd) {
            const randomPage = Math.floor(Math.random() * totalPages) + 1;

            const list = await getGames(randomPage, 50);
            const withImage = list.filter(g => g.background_image);

            collected.push(...withImage);
        }

        return collected.slice(0, qtd);
    }


    useEffect(() => {
        let mounted = true;

        async function loadDiscover() {
            try {
                const list = await getGames(2, 50, "added"); // outra página para ficar mais variado
                const withImage = list.filter(g => g.background_image);

                // embaralhar
                const shuffled = [...withImage].sort(() => Math.random() - 0.5);

                // pegar 15 aleatórios
                const randomSelection = shuffled.slice(0, 15);

                setDiscoverGames(randomSelection);

                const fetched = {};

                // preços do DISCOVER
                randomSelection.forEach(g => {
                    const priceUSD =
                        g.metacritic
                            ? (100 - g.metacritic) / 2
                            : Math.floor(Math.random() * 200) / 10 + 10;

                    const priceBRL = priceUSD * 5.30;
                    fetched[g.id] = `R$ ${priceBRL.toFixed(2)}`;
                });

                setPrices(prev => ({ ...prev, ...fetched }));
            } catch (err) {
                console.error("Erro no Discover:", err);
            }
        }



        async function load() {
            try {
                setLoadingProgress(10); // ✅ Início do carregamento
                async function loadHighlights() {
                    try {
                        const list = await getGames(1, 50, "rating");
                        const withImage = list.filter(g => g.background_image);

                        setHighlightGames(withImage);
                        setLoadingProgress(40);

                        const fetched = {};

                        // preços dos DESTAQUES
                        withImage.forEach(g => {
                            const priceUSD =
                                g.metacritic
                                    ? (100 - g.metacritic) / 2
                                    : Math.floor(Math.random() * 200) / 10 + 10;

                            const priceBRL = priceUSD * 5.30;
                            fetched[g.id] = `R$ ${priceBRL.toFixed(2)}`;
                        });

                        setPrices(prev => ({ ...prev, ...fetched }));

                    } catch (err) {
                        console.error("Erro ao carregar destaques:", err);
                    }
                }

                await loadHighlights();
                setLoadingProgress(60); // ✅ Progresso após destaques

                await loadDiscover();
                setLoadingProgress(70)

                const TOTAL_CAROUSEL = 200;   // quantidade real de jogos a sortear
                const PAGE_SIZE = 40;
                const TOTAL_PAGES = Math.ceil(TOTAL_CAROUSEL / PAGE_SIZE);

                const carouselPromises = [];

                for (let page = 1; page <= TOTAL_PAGES; page++) {
                    carouselPromises.push(getGames(page, PAGE_SIZE, "added"));
                }

                let carouselData = (await Promise.all(carouselPromises))
                    .flat()
                    .filter(g => g.background_image);

                // embaralha tudo
                carouselData = carouselData.sort(() => Math.random() - 0.5);

                // escolhe 5
                const selected = carouselData.slice(0, 5);


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

    useEffect(() => {
        if (games.length === 0) return;
        const intervalTime = 8000;
        const interval = setInterval(() => {
            setActiveIndex((current) => {
                setPrevIndex(current); // guarda o anterior para animação
                return (current + 1) % games.length;
            });
        }, intervalTime);
        return () => clearInterval(interval);
    }, [games]);


    useEffect(() => {
        const carousel = document.getElementById("carouselExampleAutoplaying");
        if (!carousel) return;

        carouselRef.current = carousel;

        const handleSlide = (event) => {
            const nextIndex = [...carousel.querySelectorAll(".carousel-item")].indexOf(event.relatedTarget);
            setActiveIndex(nextIndex);
        };

        carousel.addEventListener("slide.bs.carousel", handleSlide);

        return () => {
            carousel.removeEventListener("slide.bs.carousel", handleSlide);
        };
    }, []);

    useEffect(() => {
        // força reflow e garante que a transição seja aplicada
        const container = document.querySelector('.custom-carousel-inner');
        if (!container) return;

        // tocar nas children para forçar recalculo de estilo
        const items = Array.from(container.querySelectorAll('.carousel-item'));
        items.forEach(el => {
            // remove/transfere style inline temporariamente para "resetar" e forçar repaint
            el.style.transition = 'none';
            // leitura forçada para reflow
            // eslint-disable-next-line no-unused-expressions
            el.offsetHeight;
        });

        // reaplica transição com um pequeno delay (próximo frame)
        requestAnimationFrame(() => {
            items.forEach(el => {
                el.style.transition = ''; // volta ao CSS
            });
        });
    }, [activeIndex]);


    function scrollCarousel(ref, offset) {
        if (ref.current) {
            ref.current.scrollBy({ left: offset, behavior: "smooth" });
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
                        <div>
                            <div class="search-box">
                                <i class="bi bi-search"></i>
                                <input type="text" placeholder="Pesquisar loja" />
                            </div>  
                        </div>
                        <div className="d-flex">
                            <div className="carousel slide w-75 my-auto">
                                <div className="carousel-inner rounded-4 shadow-lg custom-carousel-inner my-auto">
                                    {games.map((game, i) => {
                                        const isActive = i === activeIndex;
                                        const prevIndex = (activeIndex - 1 + games.length) % games.length;
                                        const isPrev = i === prevIndex;

                                        // monta a classe corretamente
                                        const itemClass = [
                                            "carousel-item",
                                            isActive ? "active" : "",
                                            isPrev ? "prev" : "",
                                        ].join(" ").trim();

                                        return (
                                            <div key={game.id} className={itemClass}>
                                                <img
                                                    src={game.background_image || "/fallback.jpg"}
                                                    className="d-block w-100 carousel-cover-img"
                                                    alt={game.name}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "/fallback.jpg";
                                                    }}
                                                />

                                                <div className="carousel-caption d-none d-md-block caption-bg rounded-3 p-3">
                                                    <h5>{game.name}</h5>
                                                    <p className="description-text">
                                                        {game.description
                                                            ? game.description.length > 220
                                                                ? game.description.slice(0, 220) + "..."
                                                                : game.description
                                                            : "Descrição indisponível no momento."}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="d-flex flex-column mt-4 ms-3" style={{ maxHeight: "600px" }}>
                                {games.map((game, i) => (
                                    <div key={game.id} className="game-card mb-3 position-relative overflow-hidden">
                                        <div className="game-card-image">
                                            <img
                                                src={game.background_image || "/fallback.jpg"}
                                                alt={game.name}
                                                width={180}
                                                height={220}
                                                style={{ objectFit: "cover", borderRadius: "10px" }}
                                                onError={(e) => { e.target.onerror = null; e.target.src = "/fallback.jpg"; }}
                                            />
                                        </div>

                                        <div className="game-card-title mx-1">
                                            <h3 className="text-light">{game.name}</h3>
                                        </div>

                                        {/* Barra de carregamento sincronizada */}
                                        <div
                                            className={`card-progress-bar ${i === activeIndex ? "active" : ""}`}
                                            key={`progress-${game.id}-${activeIndex}`}
                                        ></div>

                                        <div className="game-card-effect"></div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="d-flex flex-column mt-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1 className="fs-2">Destaques da Galera</h1>
                                <div className="d-flex">
                                    <button className="btn btn-pagination" onClick={() => scrollCarousel(highlightRef, -300)}>
                                        <i className="bi bi-arrow-left-circle"></i>
                                    </button>
                                    <button className="btn btn-pagination" onClick={() => scrollCarousel(highlightRef, 300)}>
                                        <i className="bi bi-arrow-right-circle"></i>
                                    </button>

                                </div>
                            </div>

                            <div className="games-scroll d-flex justify-content-center mt-1 gap-3" ref={highlightRef}>
                                {highlightGames.length === 0 ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    highlightGames.map((game) => (
                                        <div key={game.id} className="game-card-highlights">
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
                        <div className="d-flex flex-column mt-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1 className="fs-2">Descubra algo novo</h1>
                                <div className="d-flex">
                                    <button className="btn btn-pagination" onClick={() => scrollCarousel(discoverRef, -300)}>
                                        <i className="bi bi-arrow-left-circle"></i>
                                    </button>
                                    <button className="btn btn-pagination" onClick={() => scrollCarousel(discoverRef, 300)}>
                                        <i className="bi bi-arrow-right-circle"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="games-scroll d-flex justify-content-center mt-1 gap-3" ref={discoverRef}>
                                {discoverGames.length === 0 ? (
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    discoverGames.map((game) => (
                                        <div key={game.id} className="game-card-highlights">
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
                    <Footer />
                </>
            )}
        </div>
    );
}

export default HomePage;