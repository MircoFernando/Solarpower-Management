import { Gallery6 } from "../../../../components/gallery6";

const ServiceGallery = {
  heading: "Solar Solutions for Every Scale",
  demoUrl: "#",
  items: [
    {
      id: "item-1",
      title: "Residential Power Systems",
      summary:
        "Turn your roof into a personal power plant. We design bespoke solar arrays that integrate seamlessly with your home's architecture while maximizing energy offset.",
      url: "#",
      // Image: Clear shot of a modern house with solar panels
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: "item-2",
      title: "Commercial Infrastructure",
      summary:
        "Scalable energy solutions that slash operational overhead. Empower your business with reliable, commercial-grade renewable energy that drives long-term ROI.",
      url: "#",
      // Image: Large scale commercial solar array
      image: "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: "item-3",
      title: "Next-Gen Battery Storage",
      summary:
        "Achieve true energy independence. Our advanced battery backup systems protect you from grid outages and optimize usage during peak-rate hours.",
      url: "#",
      // Image: Modern battery/server rack technology
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "item-4",
      title: "Intelligent Monitoring",
      summary:
        "Visibility is power. Track production, consumption, and savings in real-time through our proprietary dashboard, ensuring your system operates at peak efficiency.",
      url: "#",
      // Image: Data visualization dashboard
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "item-5",
      title: "Proactive Maintenance",
      summary:
        "Protect your investment with our comprehensive care packages. From automated diagnostics to rapid field repair, we ensure your panels perform for decades.",
      url: "#",
      // Image: Technician working on panels
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    },
  ],
};

function Gallery() {
  return <Gallery6 {...ServiceGallery} />;
}

export default Gallery;