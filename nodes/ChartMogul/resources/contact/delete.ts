import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Contact UUID',
		name: 'contact_uuid',
		type: 'string',
		default: '',
		description: 'The UUID of the contact',
		displayOptions: { show: { resource: ['contact'], operation: ['delete'] } },
		required: true,
	},
];
