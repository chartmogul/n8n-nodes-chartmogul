import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['customer'], operation: ['delete'] } },
		required: true,
	},
];
