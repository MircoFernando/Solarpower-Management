import { FeatureCarousel } from "./../../../../components/animated-feature-carousel";


const images ={
    alt: "Feature screenshot",
    step1img1: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1740&auto=format&fit=crop",
    step1img2: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=1740&auto=format&fit=crop",
    step2img1: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1661&auto=format&fit=crop",
    step2img2: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1674&auto=format&fit=crop",
    step3img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1740&auto=format&fit=crop",
    step4img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1742&auto=format&fit=crop",
};

const Steps = () => {
    return (
      <section className="py-5 bg-gray-100 mt-5 md:h-[90vh] h-[90vh]">

            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-semibold text-primary-dark text-center mb-3">How it works</h1>
                <FeatureCarousel
                                image={images}
                            />
            </div>
        </section>
    );
}
export default Steps;