import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-container mt-5">
      <div className="container py-5">
        <div className="row">

          {/* Coluna 1 */}
          <div className="col-6 col-md-2 mb-4">
            <h5>Development & Coding</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <div className="footer-icons d-flex flex-column gap-3 mt-3 mt-sm-0">
                  <a href="#" aria-label="Instagram" className="footer-icon-link d-flex gap-2">
                    <i className="bi bi-instagram"></i>
                    <p className="fs-5 my-auto">siqueira.luisf</p>
                  </a>
                  <a href="#" aria-label="Twitter" className="footer-icon-link d-flex gap-2">
                    <i className="bi bi-twitter"></i>
                    <p className="fs-5 my-auto">nightxsz</p>
                  </a>
                  <a href="#" aria-label="Linkedin" className="footer-icon-link d-flex gap-2">
                    <i className="bi bi-linkedin"></i>
                    <p className="fs-5 my-auto">Luis Siqueira</p>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna 2 */}
          <div className="col-6 col-md-2 mb-4">
            <h5>Design & Code Support</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <div className="footer-icons d-flex flex-column gap-3 mt-3 mt-sm-0">
                  <a href="#" aria-label="Tiktok" className="footer-icon-link d-flex gap-2">
                    <i className="bi bi-tiktok"></i>
                    <p className="fs-5 my-auto">um_gato_samurai</p>
                  </a>
                  <a href="#" aria-label="Linkedin" className="footer-icon-link d-flex gap-2">
                    <i className="bi bi-linkedin"></i>
                    <p className="fs-5 my-auto">Noah Dourado</p>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-5 offset-md-1 mb-4">
            <h5>Fique por dentro!</h5>
            <p className="footer-text">Fique por dentro dos novos lançamentos pela nossa comunidade!.</p>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <input
                type="email"
                className="form-control footer-input"
                placeholder="Email"
              />
              <button className="btn btn-primary">Inscrever</button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top">
          <p className="m-0 footer-copy">© 2025 Newtral Studios, Corp. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
