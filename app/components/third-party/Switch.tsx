"use client";

import { useState } from "react";

interface SwitchProps {
    isLightOn: boolean;
    onToggle?: (checked: boolean) => void;
}

export default function Switch({ isLightOn, onToggle }: SwitchProps) {
    const [isChecked, setIsChecked] = useState(isLightOn);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (onToggle) {
            onToggle(!isChecked);
        }
    };

    return (
        <label
            style={{
                display: "flex",
                cursor: "pointer",
                userSelect: "none",
                alignItems: "center",
            }}
        >
            <div style={{ position: "relative" }}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    style={{
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        padding: 0,
                        margin: "-1px",
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                    }}
                />

                <div
                    style={{
                        width: "56px",
                        height: "32px",
                        borderRadius: "9999px",
                        backgroundColor: isChecked ? "#3b82f6" : "#151515",
                        transition: "background-color 0.2s ease",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        left: "4px",
                        top: "4px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "9999px",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.2s ease",
                        transform: isChecked ? "translateX(100%)" : "translateX(0)",
                    }}
                />
            </div>
        </label>
    );
}
