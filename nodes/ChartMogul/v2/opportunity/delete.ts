import { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Opportunity UUID',
		name: 'opportunityUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Opportunity',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['delete']
			}
		},
	},
];
