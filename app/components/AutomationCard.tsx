"use client";

import "../assets/styles/AutomationCard.css";

export enum AutomationControl {
    HEATER = "Heater",
    FAN = "Fan",
}

export interface AutomationCardProps {
    control: AutomationControl;
}

export default function AutomationCard({ control }: AutomationCardProps) {
    return (
        <div className="automation-card">
            <span>Keep {control} on Until</span>
            <div className="set-time">
                {/* <input type="number" min="1" max="12" defaultValue={1} />
                <span style={{ margin: "0 5px" }}>:</span>
                <input type="number" min="0" max="59" defaultValue={0} /> */}
                <input type="time" defaultValue="01:00" />
                {/* <div
                    className="am-pm-toggle"
                    onClick={(e) => {
                        const target = e.currentTarget;
                        target.textContent = target.textContent === "AM" ? "PM" : "AM";
                    }}
                >
                    AM
                </div> */}
            </div>
        </div>
    );
}
