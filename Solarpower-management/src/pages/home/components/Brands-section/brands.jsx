import { cn } from "@/lib/utils";
import { LogoCloud } from "./../../../../components/logo-cloud-3";

const Brands = () => {

  // Replaced with Industrial / Energy Sector Leaders
  const logos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg",
      alt: "Siemens",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/36/General_Electric_logo.svg", // Updated for better stability
      alt: "General Electric",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", // Switched to stable SVG
      alt: "Tesla Energy",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/00/Honeywell_logo.svg", // Re-verified
      alt: "Honeywell",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/00/ABB_logo.svg",
      alt: "ABB",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Caterpillar_Inc._logo.svg", // Updated to official filename
      alt: "Caterpillar",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Rockwell_Automation_Logo.svg", // Updated filename
      alt: "Rockwell Automation",
    },
  ];

  return (
    <div className="w-full relative py-24 bg-white overflow-hidden">
      
      {/* Background Blob - Now contained within this section due to overflow-hidden */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 -top-1/2 -z-10 h-[80vmin] w-[80vmin] -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]",
          "blur-[60px]"
        )}
      />

      <section className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            <span className="text-gray-400 font-medium">Trusted by experts.</span>
            <br />
            <span className="text-primary-dark">Powering the industry leaders.</span>
          </h2>
        </div>

        <div className="mx-auto my-8 h-px max-w-4xl bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Logo Cloud Component */}
        <div className="py-4">
           <LogoCloud logos={logos} />
        </div>

        <div className="mx-auto mt-8 h-px max-w-4xl bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </section>
    </div>
  );
}

export default Brands;