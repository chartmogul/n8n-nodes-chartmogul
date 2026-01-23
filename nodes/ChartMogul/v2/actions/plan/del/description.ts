import type { PlanProperties } from "../../Interfaces";

export const planDeleteDescription: PlanProperties = [
    {
        displayName: 'Plan UUID',
        name: 'planUUID',
        type: 'string',
        default: '',
        description: 'The UUID of the plan to be deleted',
        displayOptions: { show: { operation: ['delete'], resource: ['plan'] } },
        required: true,
    }
];