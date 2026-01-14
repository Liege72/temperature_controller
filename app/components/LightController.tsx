import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Switch from "./third-party/Switch";
import "../assets/styles/LightController.css";

export default function LightController() {
    return (
        <>
            <div className="light-controller">
                <div className="light-toggle">
                    <div className="icon-text">
                        <LightbulbIcon style={{ fontSize: 40, color: "white" }} />
                        <span style={{ fontSize: "24px", fontWeight: "600" }}>Lights</span>
                    </div>
                    <Switch />
                </div>
            </div>
        </>
    );
}
