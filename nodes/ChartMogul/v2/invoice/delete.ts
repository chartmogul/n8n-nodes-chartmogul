import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Invoice UUID',
		name: 'invoiceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['delete'] } },
		required: true,
	},
];
