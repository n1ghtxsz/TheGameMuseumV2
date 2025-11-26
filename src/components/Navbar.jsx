import '../styles/Navbar.css'
import { useEffect, useState } from 'react';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img  src="./assets/TheGameMuseum_logo.png" width={120} height={60} /></a>
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
                                    <li><a className="dropdown-item text-light" href="#">Fórum</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link text-light"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className='bi bi-globe'></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item text-light" href="#">English</a></li>
                                    <li><a className="dropdown-item text-light" href="#">Português BR</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar