export async function GET(request: Request) {
    try {
        const response = await fetch(
            `https://api.smartthings.com/v1/devices/${process.env.LAMP_ID}/status`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + process.env.SMARTTHINGS_API_KEY,
                    "Content-Type": "application/json",
                },
            },
        ).then((res) => res.json());

        let switchLevelValue = response.components.main.switchLevel.level.value;
        if (response.components.main.switch.switch.value === "off") {
            switchLevelValue = 0;
        }

        return new Response(
            JSON.stringify({
                status: response.components.main.switch.switch.value,
                switchLevel: switchLevelValue,
            }),
            { status: 200 },
        );
    } catch {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        let switchLevel: number = -1;
        const body = await request.json();
        if (body.switchLevel !== undefined) {
            if (body.switchLevel < 0 || body.switchLevel > 100) {
                return new Response("Invalid switch level", { status: 400 });
            }
            switchLevel = body.switchLevel;
        } else {
            return new Response("Invalid switch level", { status: 400 });
        }

        const response = await fetch(
            `https://api.smartthings.com/v1/devices/${process.env.LAMP_ID}/commands`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + process.env.SMARTTHINGS_API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    commands: [
                        {
                            component: "main",
                            capability: "switch",
                            command: switchLevel > 0 ? "on" : "off",
                            arguments: [],
                        },
                        {
                            component: "main",
                            capability: "switchLevel",
                            command: "setLevel",
                            arguments: [switchLevel],
                        },
                    ],
                }),
            },
        ).then((res) => res.json());

        return new Response(JSON.stringify(response), { status: 200 });
    } catch {
        return new Response("Internal Server Error", { status: 500 });
    }
}
