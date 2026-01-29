import crypto from "crypto";
import { AutomationControl } from "../components/AutomationCard";

export class MachineMemory {
    key: string;
    type: "until" | "for";
    machine: AutomationControl;
    endTime: string;

    constructor(type: "until" | "for", machine: AutomationControl, endTime: string) {
        this.key = crypto.randomBytes(16).toString("hex");
        this.type = type;
        this.machine = machine;
        this.endTime = endTime;
    }
}

export function jsonToObject(json: string): MachineMemory | null {
    try {
        const obj = JSON.parse(json);
        return new MachineMemory(obj.type, obj.machine, obj.endTime);
    } catch {
        return null;
    }
}

export function objectToJson(memory: MachineMemory): string {
    return JSON.stringify(memory);
}
