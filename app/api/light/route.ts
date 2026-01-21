export async function GET(request: Request) {
    try {
        const response = await fetch(
            "https://api.smartthings.com/v1/devices/44c853c2-c5b4-4d0f-b942-acc75ba96dcf/status",
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + process.env.SMARTTHINGS_API_KEY,
                    "Content-Type": "application/json",
                },
            }
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
            { status: 200 }
        );
    } catch {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        let command: string = "";
        let switchLevel: number = -1;
        const body = await request.json();
        if (body.command === undefined && body.switchLevel === undefined) {
            return new Response("Invalid command", { status: 400 });
        }
        if (body.command === "off" || body.command === "on") {
            command = body.command;
            switchLevel = command === "on" ? 100 : 0;
        }
        if (body.switchLevel !== undefined) {
            if (body.switchLevel < 0 || body.switchLevel > 100) {
                return new Response("Invalid switch level", { status: 400 });
            }
            if (body.switchLevel == 0) {
                command = "off";
            }
            switchLevel = body.switchLevel;
            command = "on";
        }

        const response = await fetch(
            "https://api.smartthings.com/v1/devices/44c853c2-c5b4-4d0f-b942-acc75ba96dcf/commands",
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
                            command: command,
                        },
                        {
                            component: "main",
                            capability: "switchLevel",
                            command: "setLevel",
                            arguments: [body.switchLevel],
                        },
                    ],
                }),
            }
        ).then((res) => res.json());

        console.log("Light control response:", response);

        return new Response(JSON.stringify(response), { status: 200 });
    } catch {
        return new Response("Internal Server Error", { status: 500 });
    }
}
