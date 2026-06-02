import type { INodeProperties } from 'n8n-workflow';

export const disableDescription: INodeProperties[] = [
	{
		displayName: 'Invoice UUID',
		name: 'invoiceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['disable'] } },
		required: true,
	},
	{
		displayName: 'Disable',
		name: 'disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to disable (true) or enable (false) the invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['disable'] } },
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
];
