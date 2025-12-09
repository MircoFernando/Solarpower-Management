import React, { useState, useEffect } from "react";
import TiltedCard from "./../../../../components/TiltedCard";
import { AuroraBackground } from "../../../../components/ui/aurora-background";
import Photo1 from "./../../../../assets/siwawut-phoophinyo-JlhvFEVMwng-unsplash.jpg";
import Photo2 from "./../../../../assets/siwawut-phoophinyo-S2Jxs3DXpyA-unsplash.jpg";
import Photo3 from "./../../../../assets/markus-spiske-rNn_TU8dvoY-unsplash.jpg";
import Photo4 from "./../../../../assets/istockphoto-1373265000-612x612.jpg";
import ScrollReveal from "../../../../components/ScrollReveal";
import { motion } from "framer-motion";
import { ChartNoAxesCombined } from "lucide-react";
import SpotLightCard from "../../../../components/SpotlightCard";

// TODO: Use framer motion for scroll animations  erfeefseeteetee tht ,ththtftytuutyubboutt   tttgrrgcxcgrtryurgfddrt    >rfg

const Intro = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const photos = [
    { src: Photo1, height: "350px", width: "350px" },
    { src: Photo2, height: "350px", width: "350px" },
    { src: Photo3, height: "350px", width: "350px" },
    { src: Photo4, height: "350px", width: "350px" },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photos.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isMobile, photos.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };          
  return (
    
    <section className="intro-section py-12 bg-gray-100 mt-5 md:h-[100vh] h-[110vh]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-baseline h-auto lg:h-[80vh]">
          {/* Left Side - Photos in Triangle Layout */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-[300px] w-full flex items-center justify-center"
          >
            {isMobile ? (
              // Mobile Carousel
              <div className="relative w-full h-full flex items-center justify-center">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      opacity: currentSlide === index ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                      filter: "drop-shadow(0 15px 40px rgba(0, 0, 0, 0.4))",
                    }}
                  >
                    <TiltedCard
                      imageSrc={photo.src}
                      containerHeight={photo.height}
                      containerWidth={photo.width}
                      imageHeight={photo.height}
                      imageWidth={photo.width}
                      rotateAmplitude={12}
                      scaleOnHover={1.05}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={false}
                    />
                  </div>
                ))}
                
                {/* Carousel Indicators */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '10px',
                  zIndex: 10
                }}>
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: currentSlide === index ? '#1e40af' : 'rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop Triangle Layout
          <>
            {/* Photo 1 - Large, Top Left */}
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "0",
                zIndex: 1,
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))",
              }}
            >
              <TiltedCard
                imageSrc={Photo1}
                containerHeight="380px"
                containerWidth="380px"
                imageHeight="380px"
                imageWidth="380px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
            </div>

            {/* Photo 3 - Small, Bottom Left */}
            <div
              style={{
                position: "absolute",
                top: "450px",
                bottom: "30px",
                left: "100px",
                zIndex: 2,
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))",
              }}
            >
              <TiltedCard
                imageSrc={Photo3}
                containerHeight="200px"
                containerWidth="280px"
                imageHeight="200px"
                imageWidth="280px"
                rotateAmplitude={12}
                scaleOnHover={1.08}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
            </div>
            {/* Photo 4 - Small, Bottom Left */}
             <div
              style={{
                position: "absolute",
                top: "500px",
                right: "50px",
                zIndex: 3,
                filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))",
              }}
            >
              <TiltedCard
                imageSrc={Photo4}
                containerHeight="320px"
                containerWidth="320px"
                imageHeight="250px"
                imageWidth="250px"
                rotateAmplitude={12}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
            </div>
            {/* Photo 2 - Medium, Right, Overlapping */}
            <div
              style={{
                position: "absolute",
                top: "200px",
                right: "20px",
                zIndex: 3,
                filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))",
              }}
            >
              <TiltedCard
                imageSrc={Photo2}
                containerHeight="320px"
                containerWidth="320px"
                imageHeight="320px"
                imageWidth="320px"
                rotateAmplitude={12}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
            </div>
            </>
            )}
          </motion.div>

         {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center px-4 md:px-8 mt-10 lg:mt-10"
          >
            <h1 className="text-xl md:text-2xl text-blue-900 mb-5 md:mb-7">ABOUT US</h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
              Transform Your Vision Into Reality
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-5 leading-relaxed">
              We bring together innovative solutions and creative excellence to
              help your business thrive in the digital age. Our team is
              dedicated to delivering results that exceed expectations.
            </p>
            <div className="w-full h-px bg-gray-400 opacity-30 mb-5"></div>
            
            {/* Features - Stack on mobile, relative positioning on desktop */}
            <div className="flex flex-col md:flex-row md:relative gap-4 md:gap-8 text-white">
              {/* Feature 1 */}
              <div className="flex md:absolute md:left-0 gap-2 p-2 flex-row items-center">
                <SpotLightCard
                  className="p-2 md:p-2 rounded-full shadow-lg text-white h-[80px] w-[80px] md:h-[12vh] md:w-[15vh] flex flex-col justify-center items-center flex-shrink-0"
                  spotlightColor="rgba(170, 235, 255, 0.35)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:w-[100px] md:h-[80px]"
                  >
                    <path d="M12 16v5" />
                    <path d="M16 14v7" />
                    <path d="M20 10v11" />
                    <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
                    <path d="M4 18v3" />
                    <path d="M8 14v7" />
                  </svg>
                </SpotLightCard>
                <div className="justify-baseline items-baseline">
                  <h1 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg ml-3 md:ml-5">
                    Real-Time Performance Monitoring
                  </h1>
                  <p className="text-gray-600 text-sm mt-1 ml-3 md:ml-5">You can monitor your solar panel in real time</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex md:absolute md:top-30 md:left-40 gap-2 p-2 flex-row items-center">
                <SpotLightCard
                  className="p-4 md:p-6 rounded-full shadow-lg text-white h-[80px] w-[80px] md:h-[12vh] md:w-[15vh] flex flex-col justify-center items-center flex-shrink-0"
                  spotlightColor="rgba(170, 235, 255, 0.35)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:w-[80px] md:h-[80px]"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </SpotLightCard>
                <div className="justify-center items-baseline">
                  <h1 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg ml-3 md:ml-5">
                    Anomaly Detection
                  </h1>
                  <p className="text-gray-600 text-sm mt-1 ml-3 md:ml-5">You can monitor your solar panel in real time</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex md:absolute md:top-60 md:left-80 gap-2 p-2 flex-row items-center">
                <SpotLightCard
                  className="p-4 md:p-6 rounded-full shadow-lg text-white h-[80px] w-[80px] md:h-[12vh] md:w-[15vh] flex flex-col justify-center items-center flex-shrink-0"
                  spotlightColor="rgba(170, 235, 255, 0.35)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="md:w-[100px] md:h-[80px]"
                  >
                    <path d="M12 2v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="M20 12h2" />
                    <path d="m19.07 4.93-1.41 1.41" />
                    <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                    <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
                  </svg>
                </SpotLightCard>
                <div className="justify-center items-baseline">
                  <h1 className="text-gray-900 font-bold text-sm md:text-base lg:text-lg ml-3 md:ml-5">
                    Weather Impact Analysis
                  </h1>
                  <p className="text-gray-600 text-sm mt-1 ml-3 md:ml-5">You can monitor your solar panel in real time</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    
  );
};

export default Intro;
