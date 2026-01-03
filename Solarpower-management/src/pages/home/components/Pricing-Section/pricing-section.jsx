import Pricing from './pricings';

const PricingSection = () => {
    return (
        <section className="relative w-full min-h-screen py-24 bg-white overflow-hidden flex flex-col justify-center">
            
            <div className="absolute inset-0 pointer-events-none">

                <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px]" />

                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest mb-4 uppercase">
                        Transparent Billing
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Energy Model</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Whether you need simple monitoring or a full-service power purchase agreement, we have a plan that fits your generation needs.
                    </p>
                </div>

                <Pricing />
            </div>
        </section>
    );
}

export default PricingSection;