import React from "react";
import { Link } from "react-router"; // Assuming react-router for navigation
import { ArrowLeft, CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react";
// Import the previously created Gallery component
import ServicesGallery from "./components/Services-section/services-gallery"; // Adjust path as needed
import FooterSection from "./components/Footer-Section/footer";

const ServicesPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gray-50 overflow-hidden font-sans">
      
      {/* --- Shared Background Ambient Glows (Theme Consistency) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[700px] h-[700px] bg-indigo-50/40 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
      </div>

      <div className="relative z-10">
        
        {/* --- Top Navigation Bar --- */}
        <nav className="container mx-auto px-6 h-20 flex items-center">
            <Link 
              to="/" 
              className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
                <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100 group-hover:border-blue-100 transition-colors">
                   <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Home
            </Link>
        </nav>

        {/* --- Hero Section --- */}
        <section className="container mx-auto px-6 pt-10 pb-20 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold tracking-widest mb-6 uppercase border border-blue-200">
                What We Offer
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Powering Tomorrow with <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">Intelligent Energy Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From residential rooftops to massive industrial complexes, ENOVEX provides end-to-end solar infrastructure combining cutting-edge hardware with smart software.
            </p>
        </section>

        {/* --- Main Services Gallery (Using your existing component) --- */}
        <section className="container mx-auto px-4 relative z-20 mb-24">
            {/* Using the modernized Gallery component here */}
            <ServicesGallery />
        </section>

        {/* --- "Why Choose Us" Feature Grid (Glassmorphism style) --- */}
        <section className="container mx-auto px-6 py-24 relative">
             {/* Section Header */}
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    The ENOVEX Advantage
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We don't just install panels; we engineer complete energy ecosystems designed for reliability and maximum ROI.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-blue-900/5 transition-transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                        <Zap className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Technology</h3>
                    <p className="text-gray-600 leading-relaxed">
                        We utilize only Tier-1 solar panels and high-efficiency inverters, coupled with our proprietary AI-driven monitoring platform.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-blue-900/5 transition-transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                        <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Data-Driven Insights</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Real-time analytics and predictive modeling help you understand your usage patterns and optimize savings effortlessly.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-blue-900/5 transition-transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                        <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">End-to-End Reliability</h3>
                    <p className="text-gray-600 leading-relaxed">
                        From initial consultation and permitting to installation and 25-year warranty support, we handle everything.
                    </p>
                </div>
            </div>
        </section>

        {/* --- Bottom CTA Section --- */}
        <section className="container mx-auto px-6 pb-24">
            <div className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                 {/* Abstract background pattern for CTA */}
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150 pointer-events-none"></div>
                 
                 <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                        Ready to transform your energy future?
                    </h2>
                    <p className="text-blue-100 text-lg mb-10">
                        Get a customized proposal for your home or business today. 
                        Start saving and join the renewable revolution with Enovex.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                            Get a Free Quote <ArrowLeft className="w-5 h-5 rotate-180" />
                        </button>
                        <Link to="/" className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl border border-blue-500 hover:bg-blue-800 transition-all">
                            Contact Sales
                        </Link>
                    </div>
                 </div>
            </div>
        </section>
            
            {/* <FooterSection /> */}
        <FooterSection />

      </div>
    </div>
  );
};

export default ServicesPage;