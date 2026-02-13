import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPlanDelete = {
    resource: ['plan'],
    operation: ['delete'],
};

export const deleteDescription: INodeProperties[] = [
    {
        displayName: 'Plan UUID',
        name: 'planUUID',
        description: 'The UUID of the plan to delete',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: showOnlyForPlanDelete,
        },
    },
];
