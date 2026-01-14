"use client";

import NumberSpinner from "./third-party/NumberSpinner";
import "../assets/styles/TemperatureController.css";

export default function TemperatureController() {
    return (
        <NumberSpinner
            id="temperature-selector"
            size="medium"
            min={40}
            max={90}
            defaultValue={70}
        />
    );
}
