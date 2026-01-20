import type { SourceProperties } from "../../Interfaces";

export const sourceCreateDescription: SourceProperties = [
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the source to be created',
        displayOptions: { show: { operation: ['create'], resource: ['source'] } },
        required: true,
    }
];