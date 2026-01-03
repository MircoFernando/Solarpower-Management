import DashBoardScrollDemo from "./dashboard-container";

const DashboardSection = () => {
  return (
    <section className="relative w-full min-h-screen py-5 bg-gray-50 overflow-hidden flex flex-col justify-center">
      
        <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-50/80 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <DashBoardScrollDemo />
        </div>
    </section>
  );
};

export default DashboardSection;