import DashBoardScrollDemo from "./dashboard-container";

const DashboardSection = () => {
  return (
    <section className="py-5 md:h-[90vh] h-[90vh]">
        <div className="container mx-auto px-4">
            <DashBoardScrollDemo />
        </div>
    </section>
  );
};

export default DashboardSection;