import type { PlanProperties } from "../../Interfaces";

export const planGetDescription: PlanProperties = [
    {
        displayName: 'Plan UUID',
        name: 'planUUID',
        type: 'string',
        default: '',
        description: 'The UUID of the plan to be retrieved',
        displayOptions: { show: { operation: ['get'], resource: ['plan'] } },
        required: true,
    }
];