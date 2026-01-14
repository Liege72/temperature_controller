import CurrentTemperature from "./components/CurrentTemperature";
import LightController from "./components/LightController";
import TemperatureController from "./components/TemperatureController";

export default function Home() {
    return (
        <>
            {/* spacer */}
            <div style={{ height: "40px" }}></div>

            <main>
                <span className="section-title">MANUAL CONTROLS</span>
                <CurrentTemperature />
                <TemperatureController />
                <LightController />
            </main>
        </>
    );
}
