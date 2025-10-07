const baseUrl = "http://localhost:3000/api";

export const getenergyGenerationRecord = async (id) => {

        const res = await fetch(`${baseUrl}/energy-generation-records/solar-units/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(res);
        if (!res.ok) {
            throw new Error("Failed to fetch energy generation records");
        }
        const data = await res.json();
        console.log("Fetched energy generation records:", data);
        return data;

    

};