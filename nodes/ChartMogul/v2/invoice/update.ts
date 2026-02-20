import type { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Invoice UUID',
		name: 'invoiceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['update'] } },
		required: true,
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['update'] } },
		options: [
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'dateTime',
				default: '',
				description: 'The due date of the invoice',
				routing: { request: { body: { due_date: '={{$value}}' } } },
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'The date of the invoice',
				routing: { request: { body: { date: '={{$value}}' } } },
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'The currency of the invoice',
				placeholder: 'USD',
				routing: { request: { body: { currency: '={{$value}}' } } },
			},
			{
				displayName: 'Collection Method',
				name: 'collection_method',
				type: 'options',
				options: [
					{ name: 'Automatic', value: 'automatic' },
					{ name: 'Manual', value: 'manual' },
				],
				default: 'automatic',
				description: 'The collection method of the invoice',
				routing: { request: { body: { collection_method: '={{$value}}' } } },
			},
		],
	},
];
