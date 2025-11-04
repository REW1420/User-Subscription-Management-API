import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-semibold" to="/">
          Panel Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/plans" className="nav-link">
                Planes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/subscriptions" className="nav-link">
                Suscripciones
              </Link>
            </li>
          </ul>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
