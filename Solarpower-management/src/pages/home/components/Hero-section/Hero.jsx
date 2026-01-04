import { SignedOut } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { createPortal } from "react-dom";
import { SignedIn} from "@clerk/clerk-react";
import { motion } from "framer-motion";
import Solar1 from "../../../../assets/soren-h-omfN1pW-n2Y-unsplash.jpg";
import Solar2 from "../../../../assets/joshua-bowers-0SyvPKyZc-M-unsplash.jpg";
import Solar3 from "../../../../assets/nuno-marques-0GbrjL3vZF4-unsplash.jpg";
import Solar4 from "../../../../assets/siwawut-phoophinyo-S2Jxs3DXpyA-unsplash.jpg";
import Solar5 from "../../../../assets/american-public-power-association-XGAZzyLzn18-unsplash.jpg";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [showAuthAlert, setShowAuthAlert] = useState(false);

  // Replace these with your actual image URLs
  const images = [
    Solar1,
    Solar2,
    Solar3,
    Solar4,
    Solar5,
  ];

  const handleGetStartedClick = () => {
    setShowAuthAlert(true);
  };
  const closeAuthAlert = () => {
    setShowAuthAlert(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

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

  return (
    
      <div className=" hero-container relative w-100% md:h-[80vh] h-[70vh] overflow-hidden flex flex-row items-center align-baseline justify-baseline">
      {/* Background Images with Fade Transition */}
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentImageIndex === index ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 1,
          }}
        />
      ))}

      {/* Vignette Overlay - darkens edges to highlight center content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content Container */}
      
      <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }} className="relative z-3 text-white px-5 max-w-5xl md:ml-3 flex flex-col md:items-baseline items-center text-center justify-center">
        <h1 className="text-7xl font-bold mb-6 text-shadow-lg justify-center md:justify-baseline sm:text-4xl md:ml-30">
 
        
          <span className="text-6xl text-blue-400 italic md:text-8xl">ENOVEX</span>
        </h1>
          <span className="text-2xl md:text-4xl mb-2 text-shadow-lg">Empowering Solar Solutions for a Sustainable Future</span>
        {/* Subheading */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            marginBottom: "40px",
            lineHeight: "1.6",
            textShadow: "0 2px 15px rgba(0,0,0,0.5)",
            opacity: 0.95,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Transform your business with innovative solutions and cutting-edge
          technology with ENOVEX
        </p>

        {/* Buttons Container */}
        <div className="flex md:gap-3 justify-center flex-wrap flex-col md:flex-row gap-5 ">
          <SignedOut>
            <button
              style={{
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "#fff",
                color: "#111",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
              }}
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
            </SignedOut>

            <SignedIn>
            <button
              
              style={{
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "#fff",
                color: "#111",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
              
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
              }}
            >
              <Link to="/dashboard">
              Go to DashBoard
              </Link>
            </button>
            
            </SignedIn>
          
          <Link to="/learn-more">
            <button
              style={{
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "transparent",
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
              }}
            >
              Learn More
            </button>
          </Link>
        </div>
      </motion.div>
        
      
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
    </div>
  );
}; 

export default Hero;
