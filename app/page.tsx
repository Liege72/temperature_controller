"use client";

import AutomationCard, { AutomationControl } from "./components/AutomationCard";
import CurrentTemperature from "./components/CurrentTemperature";
import LightController from "./components/LightController";
import TemperatureController from "./components/TemperatureController";

export default function Home() {
    return (
        <>
            <div style={{ height: "40px" }}></div>
            <main>
                <span className="section-title">MANUAL CONTROLS</span>
                <CurrentTemperature />
                <TemperatureController />
                <LightController />
                <div style={{ height: "10px" }}></div>
                <span className="section-title">AUTOMATIONS</span>
                <AutomationCard control={AutomationControl.HEATER} />
            </main>
        </>
    );
}
