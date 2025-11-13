import { INodeProperties } from 'n8n-workflow';

const TypeField: INodeProperties = {
	displayName: 'Type',
	name: 'type',
	type: 'options',
	default: 'payment',
	description: 'The type of the transaction',
	options: [
		{ name: 'Payment', value: 'payment' },
		{ name: 'Refund', value: 'refund' },
	],
};

const DateField: INodeProperties = {
	displayName: 'Date',
	name: 'date',
	type: 'dateTime',
	default: '',
	description: 'The date of the transaction',
};

const ExternalIDField: INodeProperties = {
	displayName: 'External ID',
	name: 'external_id',
	type: 'string',
	default: '',
	description: 'The unique identifier of the transaction',
};

const HandleAsUserEditField: INodeProperties = {
	displayName: 'Handle As User Edit',
	name: 'handle_as_user_edit',
	type: 'boolean',
	default: false,
	description:
		'Whether to handle the transaction as a user edit to an existing transaction from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
};

const ResultField: INodeProperties = {
	displayName: 'Result',
	name: 'result',
	type: 'options',
	default: 'successful',
	description: 'The result of the attempted transaction',
	options: [
		{ name: 'Successful', value: 'successful' },
		{ name: 'Failed', value: 'failed' },
	],
};

const AmountInCentsField: INodeProperties = {
	displayName: 'Amount in Cents',
	name: 'amount_in_cents',
	type: 'number',
	default: 0,
	description:
		'The amount of the transaction in cents. Omitting this field will default to the invoice amount.',
};

/*const TransactionFeeInCentsField: INodeProperties = {
	displayName: 'Transaction Fee in Cents',
	name: 'transaction_fees_in_cents',
	type: 'number',
	default: 0,
	description: 'The transaction fee amount in cents. Defaults to 0 if not specified.',
};

const TransactionFeeCurrencyField: INodeProperties = {
	displayName: 'Transaction Fee Currency',
	name: 'transaction_fees_currency',
	type: 'string',
	default: '',
	description: 'The three-letter currency code of the transaction fee',
};*/

export const transactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['transaction'] } },
		options: [
			{
				name: 'Create a Transaction',
				value: 'create',
				action: 'Create a transaction',
				routing: {
					request: {
						method: 'POST',
						url: '=/import/invoices/{{$parameter.invoiceUUID}}/transactions',
					},
				},
			},
			{
				name: 'Delete a Transaction',
				value: 'delete',
				action: 'Delete a transaction',
				routing: {
					request: { method: 'DELETE', url: '=/transactions/{{$parameter.transactionUUID}}' },
				},
			},
			{
				name: 'Disable a Transaction',
				value: 'disable',
				action: 'Disable a transaction',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/transactions/{{$parameter.transactionUUID}}/disabeld_state',
					},
				},
			},
			{
				name: 'Retrieve a Transaction',
				value: 'get',
				action: 'Retrieve a transaction',
				routing: {
					request: { method: 'GET', url: '=/transactions/{{$parameter.transactionUUID}}' },
				},
			},
			{
				name: 'Update a Transaction',
				value: 'update',
				action: 'Update a transaction',
				routing: {
					request: { method: 'PATCH', url: '=/transactions/{{$parameter.transactionUUID}}' },
				},
			},
		],
		default: 'get',
	},
];

export const transactionFields: INodeProperties[] = [
	{
		...HandleAsUserEditField,
		displayOptions: { show: { resource: ['transaction'], operation: ['create', 'update'] } },
		routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
	},
	{
		displayName: 'Invoice UUID',
		name: 'invoiceUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Invoice to which the Transaction belongs',
		displayOptions: { show: { resource: ['transaction'], operation: ['create'] } },
		required: true,
	},
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
		displayOptions: {
			show: { resource: ['transaction'], operation: ['get', 'delete', 'disable', 'update'] },
		},
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
	{
		...TypeField,
		displayOptions: { show: { resource: ['transaction'], operation: ['create', 'update'] } },
		required: true,
		routing: { request: { body: { type: '={{$value}}' } } },
	},
	{
		...DateField,
		displayOptions: { show: { resource: ['transaction'], operation: ['create', 'update'] } },
		required: true,
		routing: { request: { body: { date: '={{$value}}' } } },
	},
	{
		...ResultField,
		displayOptions: { show: { resource: ['transaction'], operation: ['create', 'update'] } },
		required: true,
		routing: { request: { body: { result: '={{$value}}' } } },
	},
	{
		displayName: 'Additional Transaction Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['transaction'], operation: ['create'] } },
		options: [
			{ ...AmountInCentsField, routing: { request: { body: { amount_in_cents: '={{$value}}' } } } },
			{ ...ExternalIDField, routing: { request: { body: { external_id: '={{$value}}' } } } },
			/*{
				...TransactionFeeInCentsField,
				routing: { request: { body: { transaction_fees_in_cents: '={{$value}}' } } },
			},
			{
				...TransactionFeeCurrencyField,
				routing: { request: { body: { transaction_fees_currency: '={{$value}}' } } },
			},*/
		],
	},
	{
		displayName: 'Additional Transaction Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['transaction'], operation: ['update'] } },
		options: [
			{ ...AmountInCentsField, routing: { request: { body: { amount_in_cents: '={{$value}}' } } } },
			/*{
				...TransactionFeeInCentsField,
				routing: { request: { body: { transaction_fees_in_cents: '={{$value}}' } } },
			},
			{
				...TransactionFeeCurrencyField,
				routing: { request: { body: { transaction_fees_currency: '={{$value}}' } } },
			},*/
		],
	},
];
