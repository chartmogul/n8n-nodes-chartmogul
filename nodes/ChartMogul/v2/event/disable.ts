import type { INodeProperties } from 'n8n-workflow';

export const disableDescription: INodeProperties[] = [
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		default: '',
		description: 'The ID of the subscription event',
		displayOptions: { show: { resource: ['event'], operation: ['disable'] } },
		required: true,
	},
	{
		displayName: 'Disable',
		name: 'disabled',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['event'], operation: ['disable'] } },
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
];
