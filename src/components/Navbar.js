import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

const links = [
  { to: "/",        label: "Home"    },
  { to: "/story",   label: "Story"   },
  { to: "/gallery", label: "Gallery" },
  { to: "/venue",   label: "Venue"   },
];

function Navbar() {
  const { pathname } = useLocation();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          N ❤ M
        </Link>

        {/* Desktop links */}
        <ul className="navbar-links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={pathname === to ? "active" : ""}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={pathname === to ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;