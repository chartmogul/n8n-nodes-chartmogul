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
	description:
		'A numeric value that determines the sequence in which events are processed when multiple events occur at the same timestamp',
	routing: { request: { body: { event_order: '={{$value}}' } } },
};

const QuantityField: INodeProperties = {
	displayName: 'Quantity',
	name: 'quantity',
	type: 'number',
	default: 1,
	description: 'The quantity/seats of the product billed in the line item',
	routing: { request: { body: { quantity: '={{$value}}' } } },
};

// Subscription Line Item Fields
const SubscriptionExternalIdField: INodeProperties = {
	displayName: 'Subscription External ID',
	name: 'subscription_external_id',
	type: 'string',
	default: '',
	description: 'A reference identifier for the subscription in your system',
	routing: { request: { body: { subscription_external_id: '={{$value}}' } } },
};

const SubscriptionSetExternalIdField: INodeProperties = {
	displayName: 'Subscription Set External ID',
	name: 'subscription_set_external_id',
	type: 'string',
	default: '',
	description:
		'A reference identifier for a set of subscriptions in order to group several subscriptions into one set',
	routing: { request: { body: { subscription_set_external_id: '={{$value}}' } } },
};

const PlanUUIDField: INodeProperties = {
	displayName: 'Plan UUID',
	name: 'plan_uuid',
	type: 'string',
	default: '',
	description: 'The ChartMogul UUID of the plan associated with the subscription',
	routing: { request: { body: { plan_uuid: '={{$value}}' } } },
};

const ServicePeriodStartField: INodeProperties = {
	displayName: 'Service Period Start',
	name: 'service_period_start',
	type: 'dateTime',
	default: '',
	description: 'The start date of the service period for the subscription line item',
	routing: { request: { body: { service_period_start: '={{ new Date($value).toISOString() }}' } } },
};

const ServicePeriodEndField: INodeProperties = {
	displayName: 'Service Period End',
	name: 'service_period_end',
	type: 'dateTime',
	default: '',
	description: 'The end date of the service period for the subscription line item',
	routing: { request: { body: { service_period_end: '={{ new Date($value).toISOString() }}' } } },
};

const ProratedField: INodeProperties = {
	displayName: 'Prorated',
	name: 'prorated',
	type: 'boolean',
	default: false,
	description: 'Whether the subscription line item amount is prorated',
	routing: { request: { body: { prorated: '={{$value}}' } } },
};

const ProrationTypeField: INodeProperties = {
	displayName: 'Proration Type',
	name: 'proration_type',
	type: 'options',
	default: 'differential',
	options: [
		{ name: 'Differential', value: 'differential' },
		{ name: 'Full', value: 'full' },
		{ name: 'Differential MRR', value: 'differential_mrr' },
	],
	routing: { request: { body: { proration_type: '={{$value}}' } } },
};

// One-Time Line Item Fields
const DescriptionField: INodeProperties = {
	displayName: 'Description',
	name: 'description',
	type: 'string',
	default: '',
	description: 'The description of the line item',
	routing: { request: { body: { description: '={{$value}}' } } },
};

export const lineItemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['line_item'] } },
		options: [
			{
				name: 'Create a Line Item',
				value: 'create',
				action: 'Create a line item',
				routing: { request: { method: 'POST' } },
			},
			{
				name: 'Delete a Line Item',
				value: 'delete',
				action: 'Delete a line item',
				routing: { request: { method: 'DELETE', url: '=/line_items/{{$parameter["lineItemUUID"]}}' } },
			},
			{
				name: 'Disable a Line Item',
				value: 'disable',
				action: 'Disable a line item',
				routing: { request: { method: 'DELETE', url: '=/line_items/{{$parameter["lineItemUUID"]}}/disabled_state' } },
			},
			{
				name: 'Retrieve a Line Item',
				value: 'get',
				action: 'Retrieve a line item',
				routing: { request: { method: 'GET', url: '=/line_items/{{$parameter["lineItemUUID"]}}' } },
			},
			{
				name: 'Update a Line Item',
				value: 'update',
				action: 'Update a line item',
				routing: { request: { method: 'PATCH', url: '=/line_items/{{$parameter["lineItemUUID"]}}' } },
			},
		],
		default: 'get',
	},
];

export const lineItemFields: INodeProperties[] = [
	{
		...HandleAsUserEditField,
		displayOptions: { show: { resource: ['line_item'], operation: ['create', 'update'] } },
	},
	{
		displayName: 'Invoice UUID',
		name: 'invoiceUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Invoice to which the Line Item belongs',
		displayOptions: { show: { resource: ['line_item'], operation: ['create'] } },
		required: true,
		routing: { request: { url: '=/import/invoices/{{$value}}/line_items' } },
	},
	{
		displayName: 'Line Item UUID',
		name: 'lineItemUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Line Item',
		displayOptions: { show: { resource: ['line_item'], operation: ['delete', 'disable', 'get', 'update'] } },
		required: true,
	},
	{
		...TypeField,
		displayOptions: { show: { resource: ['line_item'], operation: ['create'] } },
	},
	{
		...AmountInCentsField,
		displayOptions: { show: { resource: ['line_item'], operation: ['create'] } },
	},
	{
		displayName: 'Subscription Line Item Fields',
		name: 'subscriptionLineItemFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['line_item'], operation: ['create'], type: ['subscription'] } },
		options: [
			SubscriptionExternalIdField,
			SubscriptionSetExternalIdField,
			PlanUUIDField,
			ServicePeriodStartField,
			ServicePeriodEndField,
			ProratedField,
			ProrationTypeField,
		],
	},
	{
		...DescriptionField,
		displayOptions: { show: { resource: ['line_item'], operation: ['create'], type: ['one_time'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['line_item'], operation: ['create'] } },
		options: [
			ExternalIDField,
			QuantityField,
			DiscountAmountInCentsField,
			DiscountCodeField,
			DiscountDescriptionField,
			TaxAmountInCentsField,
			TransactionFeeInCentsField,
			TransactionFeeCurrencyField,
			EventOrderField,
			// BalanceTransferField could be added here in the future
			// AccountCodeField could be added here in the future
		],
	},
	{
		displayName: 'Include Edit History',
		name: 'include_edit_histories',
		type: 'boolean',
		default: false,
		description: 'Whether to include the edit_history_summary objects in the response',
		displayOptions: { show: { resource: ['line_item'], operation: ['get'] } },
		routing: { request: { qs: { include_edit_histories: '={{$value}}' } } },
	},
	{
		displayName: 'Include Disabled Line Items',
		name: 'with_disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to include disabled line items in the response',
		displayOptions: { show: { resource: ['line_item'], operation: ['get'] } },
		routing: { request: { qs: { with_disabled: '={{$value}}' } } },
	},
	{
		displayName: 'Disable',
		name: 'disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to disable (true) or enable (false) the line item',
		displayOptions: { show: { resource: ['line_item'], operation: ['disable'] } },
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['line_item'], operation: ['update'] } },
		options: [
			TypeField,
			AmountInCentsField,
			QuantityField,
			DiscountCodeField,
			DiscountAmountInCentsField,
			TaxAmountInCentsField,
			TransactionFeeInCentsField,
			TransactionFeeCurrencyField,
			DiscountDescriptionField,
			EventOrderField,
			// BalanceTransferField could be added here in the future
			// AccountCodeField could be added here in the future
			SubscriptionExternalIdField,
			SubscriptionSetExternalIdField,
			PlanUUIDField,
			ServicePeriodStartField,
			ServicePeriodEndField,
			ProratedField,
			ProrationTypeField,
			DescriptionField,
		],
	},
];
