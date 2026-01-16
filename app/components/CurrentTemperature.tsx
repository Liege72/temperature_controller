"use client";

import ThermostatIcon from "@mui/icons-material/Thermostat";
import { useEffect, useState } from "react";

export default function CurrentTemperature() {
    const [temperature, setTemperature] = useState<number | null>(null);

    const getTemperature = async () => {
        const response = await fetch("/api/temperature", {
            method: "GET",
        });

        console.log("Response from /api/temperature:", response);

        if (response.ok) {
            const data = await response.json();
            console.log("Current Temperature:", data.temperature);
            setTemperature(data.temperature);
        } else {
            console.error("Failed to fetch temperature");
        }
    };

    useEffect(() => {
        getTemperature();
    }, []);

    return (
        <div className="current-temperature">
            <div className="icon-text">
                <ThermostatIcon style={{ color: "white", fontSize: 40 }} />
                <div style={{ fontSize: 16, fontWeight: 400 }}>
                    Current
                    <br />
                    Temperature
                </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 500 }}>
                {temperature !== null ? `${temperature}°F` : "..."}
            </div>
        </div>
    );
}
