import type { INodeProperties } from 'n8n-workflow';

export const disableDescription: INodeProperties[] = [
	{
		displayName:
			'This endpoint is meant for use with automatic sources (Stripe, Chargebee, Recurly, Braintree, Google Play, App Store Connect and SaaSync integrations). Trying to disable a transaction in any other source will return an error.',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: { show: { resource: ['transaction'], operation: ['disable'] } },
	},
	{
		displayName: 'Transaction UUID',
		name: 'transactionUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Transaction',
		displayOptions: { show: { resource: ['transaction'], operation: ['disable'] } },
		required: true,
	},
	{
		displayName: 'Disabled',
		name: 'disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to disable (true) or enable (false) the transaction',
		displayOptions: { show: { resource: ['transaction'], operation: ['disable'] } },
		required: true,
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
];
