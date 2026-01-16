export async function GET(request: Request) {
    try {
        const response = await fetch("https://openapi.api.govee.com/router/api/v1/device/state", {
            method: "POST",
            headers: {
                "Govee-Api-Key": process.env.GOVEE_API_KEY || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requestId: "5511c153-1bb7-47f7-bb63-3c6b5c4e1eac",
                payload: {
                    sku: "H5103",
                    device: "0E:3E:DB:C4:02:C6:3A:8C",
                },
            }),
        }).then((res) => res.json());

        if (response.code !== 200) {
            return new Response("Failed to fetch device state", { status: 502 });
        }

        const temperatureValue = response.payload.capabilities[1].state.value;
        console.log("Fetched Temperature:", temperatureValue);

        return new Response(JSON.stringify({ temperature: temperatureValue }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
