async function fetchBOMData() {
    const url = "https://skyronerp.onrender.com/api/bom/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UzYTdmMGY0MjkyYjA4N2YwYTQ4YzgiLCJlbWFpbCI6InZhbXNpbWFuaWtvbmRhNjg4NUBnbWFpbC5jb20iLCJpYXQiOjE3NDQxMTUxMzksImV4cCI6MTc0NDExODczOX0.la4_PBe9zjFO4aQ5ZOrIQkBp2bpHLhYDr5CTP8UzG7c";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Fetched BOM Data:", jsonData);
        return jsonData;
    } catch (error) {
        console.error("Error fetching BOM data:", error);
        return null;
    }
}