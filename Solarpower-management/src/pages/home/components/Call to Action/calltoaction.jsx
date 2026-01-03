import Featured_05 from "./../../../../components/globe-feature-section";

const Globe = () => {
    return (
        <section className="relative w-full min-h-[90vh] py-5 bg-white overflow-hidden flex flex-col justify-center">
            
            {/* --- Background Ambient Glows --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top-Right: Deep Blue Glow */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]" />
                
                {/* Bottom-Left: Cyan/Teal Glow */}
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-100/60 rounded-full blur-[100px]" />
                
                {/* Center: Subtle Dot Pattern Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Optional Header to frame the component */}
                <div className="text-center">
                     <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest mb-4 uppercase">
                        Global Network
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Connected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Everywhere</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Monitor and manage solar assets across the globe with our unified infrastructure.
                    </p>
                </div>

                {/* Main Component Wrapper */}
                <div className="w-full max-w-7xl mx-auto">
                    <Featured_05 />
                </div>
            </div>
        </section>
    );
};

export default Globe;