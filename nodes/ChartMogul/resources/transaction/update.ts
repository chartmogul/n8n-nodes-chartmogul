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
	// TODO: API also supports updating `transaction_fees_in_cents` (int) and
	// `transaction_fees_currency` (three-letter currency code). Not yet exposed — add to options
	// below in a future update. See https://dev.chartmogul.com/reference/transactions/update/
	{
		displayName: 'Update Fields',
		name: 'updateFields',
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
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'The date of the transaction',
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
				routing: { request: { body: { result: '={{$value}}' } } },
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
				routing: { request: { body: { type: '={{$value}}' } } },
			},
		],
	},
];
