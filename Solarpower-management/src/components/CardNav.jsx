import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import NavBarDesk from "../components/ui/nav";
import Logo from "../assets/enovex-logo.png";
import { motion } from "framer-motion";
import "./CardNav.css";

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content");
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  const handleGetStartedClick = () => {
    setShowAuthAlert(true);
  };

  const closeAuthAlert = () => {
    setShowAuthAlert(false);
  };

  // Add blur effect to root when modal is open
  useEffect(() => {
    const appRoot = document.getElementById("root");
    if (showAuthAlert && appRoot) {
      appRoot.style.filter = "blur(8px)";
      appRoot.style.transition = "filter 0.3s ease";
      document.body.style.overflow = "hidden";
    } else if (appRoot) {
      appRoot.style.filter = "none";
      document.body.style.overflow = "unset";
    }

    return () => {
      if (appRoot) {
        appRoot.style.filter = "none";
        document.body.style.overflow = "unset";
      }
    };
  }, [showAuthAlert]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nav = navRef.current;
      if (!nav) return;

      if (currentScrollY < 10) {
        // On top → always show
        gsap.to(nav, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down → hide navbar
        gsap.to(nav, {
          y: -100,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        // Scrolling up → show navbar
        gsap.to(nav, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Add background after scrolling 50px
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`card-nav-container ${className}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: "100%",
          padding: "10px 16px",
        }}
      >
        <nav
          ref={navRef}
          className={`card-nav ${isExpanded ? "open" : ""} md:hidden`}
          style={{ backgroundColor: baseColor }}
        >
          <div className="card-nav-top">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              tabIndex={0}
              style={{ color: menuColor || "#000" }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>
            <UserButton />
            <div className="logo-container">
              <img src={logo} alt={logoAlt} className="logo" />
            </div>
          </div>

          <div className="card-nav-content" aria-hidden={!isExpanded}>
            {(items || []).slice(0, 3).map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="nav-card"
                ref={setCardRef(idx)}
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                <div className="nav-card-label">{item.label}</div>
                <div className="nav-card-links">
                  {item.links?.map((lnk, i) => (
                    <a
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      href={lnk.href}
                      aria-label={lnk.ariaLabel}
                    >
                      <GoArrowUpRight
                        className="nav-card-link-icon"
                        aria-hidden="true"
                      />
                      {lnk.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            {/* Dashboard Card in Expanded Menu (Signed In Only) */}
            <SignedIn>
              <div
                className="nav-card"
                style={{
                  backgroundColor: buttonBgColor,
                  color: buttonTextColor,
                }}
              >
                <div className="nav-card-label">Dashboard</div>
                <div className="nav-card-links">
                  <Link to="/dashboard" className="nav-card-link">
                    <GoArrowUpRight className="nav-card-link-icon" />
                    Open Dashboard
                  </Link>
                </div>
              </div>
            </SignedIn>
            {/* Signed Out: Show Get Started button */}
            <SignedOut>
              <button
                className="nav-card"
                style={{
                  backgroundColor: buttonBgColor,
                  color: buttonTextColor,
                }}
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </SignedOut>
          </div>
        </nav>
      </div>
      {/* Desktop nav */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 shadow-md backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="hidden lg:flex items-center justify-between w-full px-15 py-3">
          <div className="flex items-center">
            <img src={Logo} />
          </div>

          <NavBarDesk 
          scrolled = {scrolled}
          />

          <div className="flex items-center gap-5">
            
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <button
                className="card-nav-cta-button"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </SignedOut>
          </div>
        </div>
      </div>

      {showAuthAlert &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={closeAuthAlert}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "32px",
                maxWidth: "420px",
                width: "90%",
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transform: "scale(1)",
                animation: "modalSlideIn 0.3s ease-out",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111",
                }}
              >
                Sign in to continue
              </h3>
              <p
                style={{
                  margin: "0 0 24px 0",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                Do you already have an account?
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <Link to="/sign-in" style={{ flex: 1 }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      backgroundColor: "#111",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Sign In
                  </button>
                </Link>
                <Link to="/sign-up" style={{ flex: 1 }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      backgroundColor: "white",
                      color: "#111",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
              <button
                onClick={closeAuthAlert}
                style={{
                  width: "100%",
                  marginTop: "12px",
                  padding: "10px 16px",
                  backgroundColor: "transparent",
                  color: "#666",
                  border: "none",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default CardNav;
