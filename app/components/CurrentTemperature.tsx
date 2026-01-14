import ThermostatIcon from "@mui/icons-material/Thermostat";

export default function CurrentTemperature() {
    return (
        <>
            <div className="current-temperature">
                <div className="icon-text">
                    <ThermostatIcon style={{ color: "white", fontSize: 40 }} />
                    <div style={{ fontSize: 16, fontWeight: 400 }}>
                        Current
                        <br />
                        Temperature
                    </div>
                </div>
                <div style={{ fontSize: 32, fontWeight: 500 }}>72°F</div>
            </div>
        </>
    );
}
