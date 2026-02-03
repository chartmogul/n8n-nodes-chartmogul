import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPlanGet = {
    resource: ['plan'],
    operation: ['get'],
};

export const getDescription: INodeProperties[] = [
    {
        displayName: 'Plan UUID',
        name: 'planUUID',
        description: 'The UUID of the plan to retrieve',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: showOnlyForPlanGet,
        },
    },
];
