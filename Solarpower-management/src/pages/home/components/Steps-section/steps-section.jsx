import { FeatureCarousel } from "./../../../../components/animated-feature-carousel";

// Updated images to match the 4-step Solar Process
const images = {
  alt: "Solar Installation Process",
  
  // Step 1: Apply & Register (Laptop + Form/Hands)
  step1img1: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop", // Digital Dashboard/Laptop
  step1img2: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1740&auto=format&fit=crop", // Person typing/Registering

  // Step 2: Review (Blueprints + Meeting)
  step2img1: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1631&auto=format&fit=crop", // Architecture/Planning
  step2img2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop", // Consultation/Meeting

  // Step 3: Installation (Roof work)
  step3img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop", // Solar Install

  // Step 4: Dashboard (Analytics)
  step4img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Data Visualization
};

const Steps = () => {
  return (
    <section className="relative py-20 bg-gray-50 mt-5 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-50/60 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest mb-4 uppercase">
            Simple Process
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Application to <span className="text-blue-600">Activation</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We've streamlined the journey to solar energy. Follow these four simple steps to transform your property into a renewable energy powerhouse.
          </p>
        </div>

        {/* Carousel Component */}
        <div className="w-full">
            <FeatureCarousel image={images} />
        </div>

      </div>
    </section>
  );
};

export default Steps;