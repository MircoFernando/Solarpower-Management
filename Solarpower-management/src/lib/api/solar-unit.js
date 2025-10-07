
const baseUrl = "http://localhost:3000/api";

const getsolarUnitbyid = async (id) => {
    try{

        const res = await fetch(`${baseUrl}/solar-units/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(res);
        if (!res.ok) {
            throw new Error("Failed to fetch solar unit");
        }
        const data = await res.json();
        console.log("Fetched solar unit data:", data);
        return data;

    }
    catch (error) {
        console.error("Error fetching solar unit:", error);
        throw error;
    }
    

};

export default getsolarUnitbyid;