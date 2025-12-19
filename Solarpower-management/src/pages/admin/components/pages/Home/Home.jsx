// AdminHomePage.jsx
import { useState } from "react";
import { useGetAllSolarUnitsQuery } from "../../../../../lib/redux/query";
import AllSolarUnits from "./Solarunits";
import {Button} from "./../../../../../components/ui/button"
import { AddSolarUnit } from "./Form";

const AdminHomePage = () => {
  const { data, isLoading, isError, error } = useGetAllSolarUnitsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
 
  console.log("loading")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  console.log("loading done")

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error fetching solar units: {error.toString()}
        </div>
      </div>
    );
  }

  const solarUnits = data?.map((el) => ({
    id: el._id,
    serialNumber: el.serial_number,
    capacity: el.capacity,
    installedAt: new Date(el.installation_date).toLocaleDateString(),
    Status: el.status,
    UserID: el.userID,
  })) || [];

  console.log("Fetched Solar Units:", solarUnits);

  function HandleAddButton() {
    <AddSolarUnit/>
  }

  return (
    <div className="flex flex-col justify-start p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-primary-dark mb-2">Admin Home</h1>
      <p className="text-gray-600 mb-8">Welcome to the admin dashboard.</p>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-primary">All Solar Units</h2>
        <span className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
          {solarUnits.length} Units
        </span>
      </div>
      
      <div className="flex md:flex-row flex-col gap-3 mb-3">
      <Button onClick={() => setIsModalOpen(true)}>Add New Solar Unit</Button>
      
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="max-w-2xl p-6 bg-white rounded-xl shadow-md border border-gray-200 mb-5">
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        <AddSolarUnit closeModal={() => setIsModalOpen(false)} />
          
        </div>
      )}

      <AllSolarUnits solarUnits={solarUnits} />
    </div>
  );
};

export default AdminHomePage;