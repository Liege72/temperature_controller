/**
 * Thank you Claude
 */

import React, { useState, useRef, useCallback, useEffect } from "react";

interface ThickSliderProps {
    defaultValue?: number;
    onChange?: (value: number) => void;
}

export default function ThickSlider({ defaultValue = 70, onChange }: ThickSliderProps) {
    const [value, setValue] = useState<number>(defaultValue);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const updateValue = (clientX: number, fireCallback: boolean = false) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        const newValue = Math.round(percentage);
        setValue(newValue);
        if (fireCallback) {
            onChange?.(newValue);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        updateValue(e.clientX, false);
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        updateValue(e.clientX, false);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        const slider = sliderRef.current;
        if (slider) {
            onChange?.(value);
        }
    }, [value, onChange]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div className="slider" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
                ref={sliderRef}
                style={{
                    position: "relative",
                    height: "20px",
                    cursor: "pointer",
                    userSelect: "none",
                    flex: 1,
                }}
                onMouseDown={handleMouseDown}
            >
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#4a4a4a",
                        borderRadius: "10px",
                    }}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        width: `${value}%`,
                        height: "100%",
                        backgroundColor: "#3a8ef6",
                        borderRadius: "10px",
                        transition: isDragging ? "none" : "width 0.1s ease",
                    }}
                ></div>
            </div>
            <span
                style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: 500,
                    minWidth: "60px",
                    textAlign: "right",
                }}
            >
                {value}%
            </span>
        </div>
    );
}
