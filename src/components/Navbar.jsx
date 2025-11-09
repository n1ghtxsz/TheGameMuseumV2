import '../styles/Navbar.css'
import { useEffect, useState } from 'react';

function Navbar() {
    const [showInput, setShowInput] = useState(false);
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src="./assets/logo.png" width={200} height={30} /></a>
                    <button
                        className="navbar-toggler bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a className="nav-link text-light active" aria-current="page" href="#">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">Suporte</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-light"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Descobrir
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item text-light" href="#">Action</a></li>
                                    <li><a className="dropdown-item text-light" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item text-light" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form
                            className="d-flex align-items-center search-form"
                            role="search"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <button
                                type="button"
                                className="btn btn-outline-warning"
                                onClick={() => setShowInput(!showInput)}
                            >
                                <i className="bi bi-search"></i>
                            </button>

                            <input
                                className={`form-control mx-2 search-input ${showInput ? "show" : ""}`}
                                type="search"
                                placeholder="Procurar"
                                aria-label="Search"
                            />
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar