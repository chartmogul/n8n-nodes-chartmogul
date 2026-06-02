import type { INodeProperties } from 'n8n-workflow';

export const updateStatusDescription: INodeProperties[] = [
	{
		displayName: 'Handle As User Edit',
		name: 'handle_as_user_edit',
		type: 'boolean',
		default: false,
		description:
			'Whether to handle the invoice as a user edit to an existing invoice from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
		displayOptions: { show: { resource: ['invoice'], operation: ['updateStatus'] } },
		routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
	},
	{
		displayName: 'Data Source UUID',
		name: 'dataSourceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Data Source',
		displayOptions: { show: { resource: ['invoice'], operation: ['updateStatus'] } },
		required: true,
	},
	{
		displayName: 'Invoice External ID',
		name: 'externalId',
		type: 'string',
		default: '',
		description: 'The external ID of the invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['updateStatus'] } },
		required: true,
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{ name: 'Written Off', value: 'written_off' },
			{ name: 'Voided', value: 'voided' },
		],
		default: 'written_off',
		description: 'The new status of the invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['updateStatus'] } },
		required: true,
		routing: { request: { body: { status: '={{$value}}' } } },
	},
];
