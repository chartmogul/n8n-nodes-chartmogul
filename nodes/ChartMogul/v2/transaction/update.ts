import type { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Handle As User Edit',
		name: 'handle_as_user_edit',
		type: 'boolean',
		default: false,
		description:
			'Whether to handle as a user edit to an existing entry from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
		displayOptions: { show: { resource: ['transaction'], operation: ['update'] } },
		routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
	},
	{
		displayName: 'Transaction UUID',
		name: 'transactionUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Transaction',
		displayOptions: { show: { resource: ['transaction'], operation: ['update'] } },
		required: true,
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: 'payment',
		description: 'The type of the transaction',
		options: [
			{ name: 'Payment', value: 'payment' },
			{ name: 'Refund', value: 'refund' },
		],
		displayOptions: { show: { resource: ['transaction'], operation: ['update'] } },
		required: true,
		routing: { request: { body: { type: '={{$value}}' } } },
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		default: '',
		description: 'The date of the transaction',
		displayOptions: { show: { resource: ['transaction'], operation: ['update'] } },
		required: true,
		routing: { request: { body: { date: '={{$value}}' } } },
	},
	{
		displayName: 'Result',
		name: 'result',
		type: 'options',
		default: 'successful',
		description: 'The result of the attempted transaction',
		options: [
			{ name: 'Successful', value: 'successful' },
			{ name: 'Failed', value: 'failed' },
		],
		displayOptions: { show: { resource: ['transaction'], operation: ['update'] } },
		required: true,
		routing: { request: { body: { result: '={{$value}}' } } },
	},
	{
		displayName: 'Additional Transaction Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['transaction'], operation: ['update'] } },
		options: [
			{
				displayName: 'Amount in Cents',
				name: 'amount_in_cents',
				type: 'number',
				default: 0,
				description:
					'The amount of the transaction in cents. Omitting this field will default to the invoice amount.',
				routing: { request: { body: { amount_in_cents: '={{$value}}' } } },
			},
		],
	},
];
