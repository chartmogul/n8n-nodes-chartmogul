import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
    {
		displayName: 'Plan UUID',
		name: 'planUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the plan',
		required: true,
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['delete']
			}
		},
	},
];