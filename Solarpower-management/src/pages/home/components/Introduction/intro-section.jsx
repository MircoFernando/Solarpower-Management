import React, { useState, useEffect } from "react";
import TiltedCard from "./../../../../components/TiltedCard";
import Photo1 from "./../../../../assets/siwawut-phoophinyo-JlhvFEVMwng-unsplash.jpg";
import Photo2 from "./../../../../assets/siwawut-phoophinyo-S2Jxs3DXpyA-unsplash.jpg";
import Photo3 from "./../../../../assets/markus-spiske-rNn_TU8dvoY-unsplash.jpg";
import Photo4 from "./../../../../assets/istockphoto-1373265000-612x612.jpg";
import { motion } from "framer-motion";
import SpotLightCard from "../../../../components/SpotlightCard";

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
      setIsMobile(window.innerWidth < 1024); // Changed break point to 1024 for tablet safety
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

  return (
    <section className="relative w-full min-h-screen bg-gray-50 py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* --- LEFT SIDE: IMAGES --- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full flex items-center justify-center min-h-[400px] lg:min-h-[600px]"
          >
            {isMobile ? (
              // Mobile/Tablet Carousel
              <div className="relative w-full max-w-[350px] aspect-square">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      zIndex: currentSlide === index ? 10 : 0,
                    }}
                  >
                     <div className="drop-shadow-2xl">
                      <TiltedCard
                        imageSrc={photo.src}
                        containerHeight="300px"
                        containerWidth="300px"
                        imageHeight="300px"
                        imageWidth="300px"
                        rotateAmplitude={8}
                        scaleOnHover={1.02}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={false}
                      />
                    </div>
                  </div>
                ))}
                
                {/* Dots Indicator */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop Triangle Layout
              <div className="relative w-full h-[600px]">
                {/* Photo 1: Top Left (Main) */}
                <div className="absolute top-0 left-0 z-10 drop-shadow-2xl hover:z-50 transition-all">
                  <TiltedCard
                    imageSrc={Photo1}
                    containerHeight="360px"
                    containerWidth="360px"
                    imageHeight="360px"
                    imageWidth="360px"
                    rotateAmplitude={12}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={false}
                  />
                </div>

                {/* Photo 2: Top Right (Offset) */}
                <div className="absolute top-[120px] right-10 z-20 drop-shadow-2xl hover:z-50 transition-all">
                  <TiltedCard
                    imageSrc={Photo2}
                    containerHeight="300px"
                    containerWidth="300px"
                    imageHeight="300px"
                    imageWidth="300px"
                    rotateAmplitude={12}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={false}
                  />
                </div>

                {/* Photo 3: Bottom Left */}
                <div className="absolute bottom-10 left-12 z-30 drop-shadow-xl hover:z-50 transition-all">
                  <TiltedCard
                    imageSrc={Photo3}
                    containerHeight="180px"
                    containerWidth="280px"
                    imageHeight="220px"
                    imageWidth="280px"
                    rotateAmplitude={10}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={false}
                  />
                </div>

                {/* Photo 4: Bottom Right */}
                <div className="absolute bottom-0 right-20 z-40 drop-shadow-xl hover:z-50 transition-all">
                   <TiltedCard
                    imageSrc={Photo4}
                    containerHeight="150px"
                    containerWidth="240px"
                    imageHeight="240px"
                    imageWidth="240px"
                    rotateAmplitude={10}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={false}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-10 text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide mb-4">
                ABOUT US
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Transform Your Vision <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Into Reality
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We bring together innovative solutions and creative excellence to
                help your business thrive in the digital age. Our team is
                dedicated to delivering results that exceed expectations.
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 mb-10"></div>
            
            {/* Features Staggered List - No Absolute Positioning */}
            <div className="flex flex-col gap-8">
              
              {/* Feature 1 - Left Aligned */}
              <div className="flex items-center gap-6 group">
                <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <SpotLightCard
                    className="rounded-full shadow-lg h-20 w-20 flex items-center justify-center bg-white border border-gray-100"
                    spotlightColor="rgba(59, 130, 246, 0.2)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 16v5" /><path d="M16 14v7" /><path d="M20 10v11" /><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" /><path d="M4 18v3" /><path d="M8 14v7" />
                    </svg>
                  </SpotLightCard>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg group-hover:text-blue-600 transition-colors">
                    Real-Time Performance
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-xs">
                    Monitor your solar panel efficiency live with instant data updates.
                  </p>
                </div>
              </div>

              {/* Feature 2 - Indented for Staircase Effect */}
              <div className="flex items-center gap-6 group lg:ml-16">
                 <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <SpotLightCard
                    className="rounded-full shadow-lg h-20 w-20 flex items-center justify-center bg-white border border-gray-100"
                    spotlightColor="rgba(59, 130, 246, 0.2)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" />
                    </svg>
                  </SpotLightCard>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg group-hover:text-blue-600 transition-colors">
                    Anomaly Detection
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-xs">
                    AI-powered alerts to instantly identify and resolve system issues.
                  </p>
                </div>
              </div>

              {/* Feature 3 - Further Indented */}
              <div className="flex items-center gap-6 group lg:ml-32">
                 <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <SpotLightCard
                    className="rounded-full shadow-lg h-20 w-20 flex items-center justify-center bg-white border border-gray-100"
                    spotlightColor="rgba(59, 130, 246, 0.2)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M20 12h2" /><path d="m19.07 4.93-1.41 1.41" /><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" /><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
                    </svg>
                  </SpotLightCard>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg group-hover:text-blue-600 transition-colors">
                    Weather Impact Analysis
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-xs">
                    Predictive analytics based on local weather patterns and forecasts.
                  </p>
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