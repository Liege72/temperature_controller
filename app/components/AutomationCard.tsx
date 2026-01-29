"use client";

import { useState } from "react";
import "../assets/styles/AutomationCard.css";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import ArrowIcon from "../../public/arrow.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MachineMemory } from "../models/Automation";

export enum AutomationControl {
    HEATER = "Heater",
    FAN = "Fan",
}

export interface AutomationCardProps {
    control: AutomationControl;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ width: "100%" }}
            {...other}
        >
            {value === index && <Box width={"100%"}>{children}</Box>}
        </div>
    );
}

export default function AutomationCard({ control }: AutomationCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [value, setValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleIconClick = () => {
        const div = document.getElementById(`expand-icon-container-${control}`);
        if (div) {
            div.style.transition = "transform 0.3s ease";
            div.style.transform = isExpanded ? "rotate(0deg)" : "rotate(-90deg)";
        }
    };

    const onButtonClick = async () => {
        const type = value === 0 ? "until" : "for";
        let endTime = "";

        if (type === "until") {
            const timeInput = (document.querySelector(".set-time input") as HTMLInputElement).value;
            endTime = timeInput;
        } else {
            const durationInput = parseInt(
                (document.querySelector(".duration input") as HTMLInputElement).value,
            );
            const durationUnit = (document.querySelector(".duration select") as HTMLSelectElement)
                .value;
            const now = new Date();
            if (durationUnit === "minutes") {
                now.setMinutes(now.getMinutes() + durationInput);
            } else {
                now.setHours(now.getHours() + durationInput);
            }
            endTime = now.toTimeString();
        }

        console.log(`Submitting automation: type=${type}, control=${control}, endTime=${endTime}`);

        const object = new MachineMemory(type, control, endTime);
        const response = await fetch("/api/automation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                memory: object,
            }),
        });

        if (response.ok) {
            console.log("Automation saved successfully");
        } else {
            console.error("Failed to save automation");
        }
    };

    return (
        <div className="automation-card">
            <div className="automation-card-header">
                <span>Keep {control} on</span>
                <div id={`expand-icon-container-${control}`}>
                    <Image
                        className={`expand-icon ${isExpanded ? "expanded" : ""}`}
                        src={ArrowIcon}
                        alt="Expand Icon"
                        height={18}
                        onClick={() => {
                            setIsExpanded(!isExpanded);
                            handleIconClick();
                        }}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>
            <div className={`automation-card-child ${isExpanded ? "expanded" : "collapsed"}`}>
                <div className="tabs-container">
                    <Tabs value={value} onChange={handleTabChange} variant="fullWidth">
                        <Tab label="Until" {...a11yProps(0)} />
                        <Tab label="For" {...a11yProps(1)} />
                    </Tabs>
                </div>
                <CustomTabPanel value={value} index={0}>
                    <div className="set-time">
                        <input type="time" defaultValue="01:00" />
                        <button
                            className="save-button"
                            onClick={() => {
                                onButtonClick();
                            }}
                        >
                            Save
                        </button>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="duration">
                        <div className="duration-selection">
                            <input type="text" inputMode="numeric" pattern="[0-9]*" />
                            <select>
                                <option value="minutes">Mins</option>
                                <option value="hours">Hrs</option>
                            </select>
                        </div>
                        <button className="save-button" onClick={() => onButtonClick}>
                            Save
                        </button>
                    </div>
                </CustomTabPanel>
            </div>
        </div>
    );
}
