import type { INodeProperties } from 'n8n-workflow';

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Contact UUID',
		name: 'contact_uuid',
		type: 'string',
		default: '',
		description: 'The UUID of the contact',
		displayOptions: { show: { resource: ['contact'], operation: ['get'] } },
		required: true,
	},
];
