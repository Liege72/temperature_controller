import { jsonToObject } from "@/app/models/Automation";

// data expected

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const memory = jsonToObject(body.memory);
    } catch {}
}
