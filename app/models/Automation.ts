import crypto from "crypto";

export class MachineMemory {
    key: string;
    type: "until" | "for";
    machine: "heater" | "fan";
    endTime: string;

    constructor(type: "until" | "for", machine: "heater" | "fan", endTime: string) {
        this.key = crypto.randomUUID();
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
