import Testimonials from "./testamonials"; // Keeping your original filename import

const TestamonialsSection = () => {
    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center">

            <div className="container mx-auto px-4 relative z-10">
                <Testimonials />
            </div>
        </section>
    );
}

export default TestamonialsSection;