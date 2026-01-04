import { TestimonialsColumn } from "./../../../../components/testimonials-columns-1";
import { motion } from "framer-motion"; // Ensure you use the same package as your other components

const testimonials = [
  {
    text: "Switching to solar was the best investment we made. Our energy bills dropped by 80% in the first month alone.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Homeowner",
  },
  {
    text: "The installation crew was professional and fast. The entire system was up and running in just two days.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Small Business Owner",
  },
  {
    text: "I love the monitoring app. Seeing my production in real-time gives me complete peace of mind.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Eco-Conscious User",
  },
  {
    text: "Enovex handled all the permits and paperwork. It was a completely hands-off experience for me.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Property Manager",
  },
  {
    text: "The commercial PPA model allowed our factory to go green with zero upfront capital. Incredible ROI.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Operations Director",
  },
  {
    text: "Their support team actually picks up the phone. Had a small inverter issue and they fixed it remotely in minutes.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Facility Manager",
  },
  {
    text: "The battery backup saved us during the last storm. While the neighborhood went dark, we had power.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Residential Client",
  },
  {
    text: "Transparent pricing and no hidden fees. The savings projection they gave was 100% accurate.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Architect",
  },
  {
    text: "Highly recommend for anyone looking to reduce their carbon footprint without sacrificing reliability.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Sustainability Lead",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <div className="relative w-full bg-white h-[]70rem]"> 
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center"
        >
           <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest mb-4 uppercase">
              Customer Stories
           </span>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Trust</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Join thousands of homeowners and businesses who have taken control of their energy future.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;