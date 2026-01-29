import { jsonToObject } from "@/app/models/Automation";
import { temperatureCollection } from "@/app/services/mongo";

// data expected

export async function POST(request: Request) {
    try {
        console.log("Received automation data POST request");

        const body = await request.json();
        const memory = jsonToObject(body.memory);

        temperatureCollection.insertOne({ memory });

        return new Response(JSON.stringify({ memory }), { status: 200 });
    } catch {
        return new Response("Failed to process automation data", { status: 500 });
    }
}
