import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/" style={{
        textDecoration: "none",
        color: "black",
      
      }}>
        <h1>
          Todo by <span style={{ color: "#FF8911" }}>Kashif</span>
        </h1>
      </Link>

      <Link to="/login">
        <button>Register</button>
      </Link>
    </header>
  );
}

export default Header;
