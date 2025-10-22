import { INodeProperties } from 'n8n-workflow';

const TypeField: INodeProperties = {
	displayName: 'Type',
	name: 'type',
	type: 'options',
	default: 'subscription',
	description: 'The type of the line item',
	options: [
		{ name: 'Subscription', value: 'subscription' },
		{ name: 'One Time', value: 'one_time' },
	],
	routing: { request: { body: { type: '={{$value}}' } } },
};

const ExternalIDField: INodeProperties = {
	displayName: 'External ID',
	name: 'external_id',
	type: 'string',
	default: '',
	description: 'The unique identifier of the line item',
	routing: { request: { body: { external_id: '={{$value}}' } } },
};

const HandleAsUserEditField: INodeProperties = {
	displayName: 'Handle As User Edit',
	name: 'handle_as_user_edit',
	type: 'boolean',
	default: false,
	description:
		'Whether to handle the line item as a user edit to an existing line item from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
	routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
};

const AmountInCentsField: INodeProperties = {
	displayName: 'Amount in Cents',
	name: 'amount_in_cents',
	type: 'number',
	default: 0,
	routing: { request: { body: { amount_in_cents: '={{$value}}' } } },
};

const DiscountAmountInCentsField: INodeProperties = {
	displayName: 'Discount Amount in Cents',
	name: 'discount_amount_in_cents',
	type: 'number',
	default: 0,
	routing: { request: { body: { discount_amount_in_cents: '={{$value}}' } } },
};

const DiscountCodeField: INodeProperties = {
	displayName: 'Discount Code',
	name: 'discount_code',
	type: 'string',
	default: '',
	description: 'Optional reference code to identify the discount',
	routing: { request: { body: { discount_code: '={{$value}}' } } },
};

const DiscountDescriptionField: INodeProperties = {
	displayName: 'Discount Description',
	name: 'discount_description',
	type: 'string',
	default: '',
	routing: { request: { body: { discount_description: '={{$value}}' } } },
};

const TaxAmountInCentsField: INodeProperties = {
	displayName: 'Tax Amount in Cents',
	name: 'tax_amount_in_cents',
	type: 'number',
	default: 0,
	routing: { request: { body: { tax_amount_in_cents: '={{$value}}' } } },
};

const TransactionFeeInCentsField: INodeProperties = {
	displayName: 'Transaction Fee in Cents',
	name: 'transaction_fees_in_cents',
	type: 'number',
	default: 0,
	routing: { request: { body: { transaction_fees_in_cents: '={{$value}}' } } },
};

const TransactionFeeCurrencyField: INodeProperties = {
	displayName: 'Transaction Fee Currency',
	name: 'transaction_fees_currency',
	type: 'string',
	default: '',
	description: 'The three-letter currency code of the transaction fee',
	routing: { request: { body: { transaction_fees_currency: '={{$value}}' } } },
};

const EventOrderField: INodeProperties = {
	displayName: 'Event Order',
	name: 'event_order',
	type: 'number',
	default: 0,
	description: 'A numeric value that determines the sequence in which events are processed when multiple events occur at the same timestamp',
	routing: { request: { body: { event_order: '={{$value}}' } } },
};

export const lineitemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['line_item'],
			},
		},
		options: [
			{
				name: 'Create a Line Item',
				value: 'create',
				action: 'Create a line item',
				routing: {
					request: { method: 'POST' },
				},
			},
			{
				name: 'Delete a Line Item',
				value: 'delete',
				action: 'Delete a line item',
				routing: {
					request: { method: 'DELETE' },
				},
			},
			{
				name: 'Disable a Line Item',
				value: 'disable',
				action: 'Disable a line item',
				routing: {
					request: { method: 'DELETE' },
				},
			},
			{
				name: 'Retrieve a Line Item',
				value: 'get',
				action: 'Retrieve a line item',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Update a Line Item',
				value: 'update',
				action: 'Update a line item',
				routing: {
					request: {
						method: 'PATCH',
					},
				},
			},
		],
		default: 'get',
	},
];

export const lineitemFields: INodeProperties[] = [

];
