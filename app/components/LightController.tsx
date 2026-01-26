"use client";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Switch from "./third-party/Switch";
import Slider from "./third-party/Slider";

import "../assets/styles/LightController.css";
import { useEffect, useState } from "react";

export default function LightController() {
    // const [isLightOn, setIsLightOn] = useState<undefined | boolean>(undefined);
    const [lightLevel, setLightLevel] = useState<number>(-1);

    console.log("Level?", lightLevel);

    const fetchLightStatus = async () => {
        const response = await fetch("/api/light", { method: "GET" });
        if (response.ok) {
            const data = await response.json();
            if (data.status == "on") {
                setLightLevel(data.switchLevel);
            } else {
                setLightLevel(0);
            }
        } else {
            console.error("Failed to fetch light status");
        }
    };

    useEffect(() => {
        fetchLightStatus();
    }, []);

    const handleSliderChange = async (value: number) => {
        const response = await fetch("/api/light", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ switchLevel: value }),
        });

        if (!response.ok) {
            console.error("Failed to set light level");
            return;
        } else {
            console.log("Light level set successfully");
            setLightLevel(value);
        }
        4;
    };

    return (
        <div className="light-controller">
            <div className="light-toggle">
                <div className="icon-text">
                    <LightbulbIcon style={{ fontSize: 40, color: "white" }} />
                    <span style={{ fontSize: "24px", fontWeight: "600" }}>Lights</span>
                </div>
                {lightLevel !== undefined ? (
                    <Switch
                        isLightOn={lightLevel !== 0}
                        onToggle={() => {
                            handleSliderChange(lightLevel > 0 ? 0 : 100);
                        }}
                    />
                ) : (
                    <span>...</span>
                )}
            </div>
            {lightLevel >= 0 ? (
                <Slider value={lightLevel} onChange={handleSliderChange} />
            ) : (
                <span>...</span>
            )}
        </div>
    );
}
