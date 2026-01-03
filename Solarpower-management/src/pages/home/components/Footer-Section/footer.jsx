import { Footer } from './../../../../components/footer-section';

const FooterSection = () => {
    return (
        // Changed height to auto/min-h to accommodate content
        // Added a dark background to the section so the footer merges seamlessly
        <section className="relative w-full bg-slate-950 pt-20">
             {/* Background Glow for the "Vibrant" feel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-blue-500 rounded-full blur-[120px]" />
                <div className="absolute top-[30%] right-[10%] w-[250px] h-[250px] bg-cyan-400 rounded-full blur-[100px]" />
            </div>

            <div className="relative flex flex-col">
                <Footer />
            </div>
        </section>
    );
}
export default FooterSection;