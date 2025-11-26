import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container mt-5">
      <div className="container py-5">
        <div className="row">

          {/* Coluna 1 */}
          <div className="col-6 col-md-2 mb-4">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="footer-link">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">Features</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">About</a></li>
            </ul>
          </div>

          {/* Coluna 2 */}
          <div className="col-6 col-md-2 mb-4">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="footer-link">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">Features</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">About</a></li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div className="col-6 col-md-2 mb-4">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="footer-link">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">Features</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="footer-link">About</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-5 offset-md-1 mb-4">
            <h5>Subscribe to our newsletter</h5>
            <p className="footer-text">Monthly digest of what's new and exciting from us.</p>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <input
                type="email"
                className="form-control footer-input"
                placeholder="Email address"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 mt-4 border-top">
          <p className="m-0 footer-copy">© 2025 Company, Inc. All rights reserved.</p>

          <div className="footer-icons d-flex gap-3 mt-3 mt-sm-0">
            <a href="#" aria-label="Instagram" className="footer-icon-link">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="Facebook" className="footer-icon-link">
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
