import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        {!isHome && (
          <>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link>
            <Link to="/account" className={styles.link}>Minha Conta</Link>
            <Link to="/login" className={styles.link} onClick={handleLogout} >Logout</Link>
          </>
        )}
      </nav>
    </header>
  );
}
