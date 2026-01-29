import crypto from "crypto";

export async function GET(request: Request) {
    try {
        const response = await fetch("https://openapi.api.govee.com/router/api/v1/device/state", {
            method: "POST",
            headers: {
                "Govee-Api-Key": process.env.GOVEE_API_KEY || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requestId: crypto.randomUUID(),
                payload: {
                    sku: "H5103",
                    device: process.env.GOVEE_DEVICE_ID || "",
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
