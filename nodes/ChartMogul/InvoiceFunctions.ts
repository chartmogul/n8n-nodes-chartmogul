import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

const CollectionMethodField: INodeProperties = {
	displayName: 'Collection Method',
	name: 'collection_method',
	type: 'options',
	options: [
		{ name: 'Automatic', value: 'automatic' },
		{ name: 'Manual', value: 'manual' },
	],
	default: 'automatic',
	description: 'The collection method of the invoice',
};

const CurrencyField: INodeProperties = {
	displayName: 'Currency',
	name: 'currency',
	type: 'string',
	default: '',
	description: 'The currency of the invoice',
	placeholder: 'USD',
};

const CustomerUUIDField: INodeProperties = {
	displayName: 'Customer UUID',
	name: 'customerUUID',
	type: 'string',
	description: 'ChartMogul UUID of the Customer',
	default: '',
};

const DataSourceUUIDField: INodeProperties = {
	displayName: 'Data Source UUID',
	name: 'dataSourceUUID',
	type: 'string',
	default: '',
	description: 'ChartMogul UUID of the Data Source',
};

const DateField: INodeProperties = {
	displayName: 'Date',
	name: 'date',
	type: 'dateTime',
	default: '',
	description: 'The date of the invoice',
};

const DueDateField: INodeProperties = {
	displayName: 'Due Date',
	name: 'due_date',
	type: 'dateTime',
	default: '',
	description: 'The due date of the invoice',
};

const HandleAsUserEditField: INodeProperties = {
	displayName: 'Handle As User Edit',
	name: 'handle_as_user_edit',
	type: 'boolean',
	default: false,
	description:
		'Whether to handle the invoice as a user edit to an existing invoice from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
	routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
};

const InvoiceExternalIdField: INodeProperties = {
	displayName: 'Invoice External ID',
	name: 'externalId',
	type: 'string',
	default: '',
	description: 'The external ID of the invoice',
};

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['invoice'] } },
		options: [
			{
				name: 'Create an Invoice',
				value: 'create',
				action: 'Create an invoice',
				routing: {
					request: {
						method: 'POST',
						url: '=/import/customers/{{$parameter.customerUUID}}/invoices',
						body: `={{ (() => {
							const inv = { ...( $parameter.invoice || {} ) };
							inv.external_id = $parameter.externalId;
							inv.date = new Date($parameter.date).toISOString().split('T')[0];
							inv.currency = $parameter.currency;

							const item = inv.line_items || {};
							const items = [];
							if (item.one_time.length > 0) {
								items.push(...item.one_time);
							}
							if (item.subscription.length > 0) {
								items.push(...item.subscription);
							}
							inv.line_items = items;		
							

							return { invoices: [ inv ] };
						})() }}`,
					},
				},
			},
			{
				name: 'Delete All Invoices of a Customer',
				value: 'deleteAll',
				action: 'Delete all invoices of a customer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/data_sources/{{$parameter.dataSourceUUID}}/customers/{{$parameter.customerUUID}}/invoices',
					},
				},
			},
			{
				name: 'Delete an Invoice',
				value: 'delete',
				action: 'Delete an invoice',
				routing: { request: { method: 'DELETE', url: '=/invoices/{{$parameter.invoiceUUID}}' } },
			},
			{
				name: 'Disable an Invoice',
				value: 'disable',
				action: 'Disable an invoice',
				routing: {
					request: { method: 'PATCH', url: '=/invoices/{{$parameter.invoiceUUID}}/disabled_state' },
				},
			},
			{
				name: 'List Invoices',
				value: 'list',
				action: 'List invoices',
				routing: { request: { method: 'GET', url: '/invoices' } },
			},
			{
				name: 'Retrieve an Invoice',
				value: 'get',
				action: 'Retrieve an invoice',
				routing: { request: { method: 'GET', url: '=/invoices/{{$parameter.invoiceUUID}}' } },
			},
			{
				name: 'Update an Invoice',
				value: 'update',
				action: 'Update an invoice',
				routing: { request: { method: 'PATCH', url: '=/invoices/{{$parameter.invoiceUUID}}' } },
			},
			{
				name: 'Update Invoice Status',
				value: 'updateStatus',
				action: 'Update invoice status',
				routing: {
					request: {
						method: 'PUT',
						url: '=/data_sources/{{$parameter.dataSourceUUID}}/invoices/{{$parameter.externalId}}/status',
					},
				},
			},
		],
		default: 'create',
	},
];

export const invoiceFields: INodeProperties[] = [
	{
		...HandleAsUserEditField,
		displayOptions: { show: { resource: ['invoice'], operation: ['create', 'updateStatus'] } },
	},
	{
		displayName: 'Invoice UUID',
		name: 'invoiceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['delete', 'disable', 'get', 'update'] } },
		required: true,
	},
	{
		...DataSourceUUIDField,
		displayOptions: { show: { resource: ['invoice'], operation: ['deleteAll', 'updateStatus'] } },
		required: true,
	},
	{
		...CustomerUUIDField,
		displayOptions: { show: { resource: ['invoice'], operation: ['create', 'deleteAll'] } },
		required: true,
	},
	{
		...InvoiceExternalIdField,
		displayOptions: { show: { resource: ['invoice'], operation: ['create', 'updateStatus'] } },
		required: true,
	},
	{
		...DateField,
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		required: true,
	},
	{
		...CurrencyField,
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		required: true,
	},
	{
		displayName: 'Additional Invoice Fields',
		name: 'invoice',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		options: [
			{ ...CollectionMethodField },
			{
				displayName: 'Customer External ID',
				name: 'customer_external_id',
				type: 'string',
				default: '',
			},
			{ ...DataSourceUUIDField },
			{ ...DueDateField },
		],
	},
	{
		displayName: 'Line Items',
		name: 'line_items',
		type: 'fixedCollection',
		placeholder: 'Add Line Item',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['create'] } },
		options: [
			{
				displayName: 'One Time',
				name: 'one_time',
				values: [
					{
						displayName: 'Amount in Cents',
						name: 'amount_in_cents',
						type: 'number',
						default: 0,
						required: true,
					},
					{ displayName: 'Description', name: 'description', type: 'string', default: '' },
					{ displayName: 'Quantity', name: 'quantity', type: 'number', default: 1 },
					{ displayName: 'Type', name: 'type', type: 'hidden', default: 'one_time' },
				],
			},
			{
				displayName: 'Subscription',
				name: 'subscription',
				values: [
					{
						displayName: 'Amount in Cents',
						name: 'amount_in_cents',
						type: 'number',
						default: 0,
					},
					//	{ displayName: 'Description', name: 'description', type: 'string', default: '' },
					//	{ displayName: 'Quantity', name: 'quantity', type: 'number', default: 1 },
					{ displayName: 'Type', name: 'type', type: 'hidden', default: 'subscription' },
				],
			},
		],
	},
	// ----------------------------------------------------------
	//         invoice: disable
	// ----------------------------------------------------------
	{
		displayName: 'Disable',
		name: 'disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to disable (true) or enable (false) the invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['disable'] } },
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
	// ----------------------------------------------------------
	//         invoice: list
	// ----------------------------------------------------------
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{ ...DataSourceUUIDField, routing: { request: { qs: { data_source_uuid: '={{$value}}' } } } },
			{ ...CustomerUUIDField, routing: { request: { qs: { customer_uuid: '={{$value}}' } } } },
			{ ...InvoiceExternalIdField, routing: { request: { qs: { external_id: '={{$value}}' } } } },
			{
				displayName: 'Validation Type',
				name: 'validationType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Valid', value: 'valid' },
					{ name: 'Invalid', value: 'invalid' },
				],
				default: 'valid',
				routing: { request: { qs: { validation_type: '={{$value}}' } } },
			},
			{
				displayName: 'Include Edit History',
				name: 'include_edit_histories',
				type: 'boolean',
				default: false,
				description: 'Whether to include the edit_history_summary objects in the response',
				routing: { request: { qs: { include_edit_histories: '={{$value}}' } } },
			},
			{
				displayName: 'Include Disabled Line Items',
				name: 'with_disabled',
				type: 'boolean',
				default: false,
				description: 'Whether to include disabled line items in the response',
				routing: { request: { qs: { with_disabled: '={{$value}}' } } },
			},
		],
		displayOptions: { show: { resource: ['invoice'], operation: ['list'] } },
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
		displayOptions: { show: { resource: ['invoice'], operation: ['list'] } },
	},
	// ----------------------------------------------------------
	//         invoice: updateStatus
	// ----------------------------------------------------------
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{ name: 'Wrtitten Off', value: 'written_off' },
			{ name: 'Voided', value: 'voided' },
		],
		default: 'written_off',
		description: 'The new status of the invoice',
		displayOptions: { show: { resource: ['invoice'], operation: ['updateStatus'] } },
		required: true,
		routing: { request: { body: { status: '={{$value}}' } } },
	},
	// ----------------------------------------------------------
	//         invoice: update
	// ----------------------------------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['update'] } },
		options: [
			{ ...DueDateField, routing: { request: { body: { due_date: '={{$value}}' } } } },
			{ ...DateField, routing: { request: { body: { date: '={{$value}}' } } } },
			{ ...CurrencyField, routing: { request: { body: { currency: '={{$value}}' } } } },
			{ ...CollectionMethodField, routing: { request: { body: { collection_method: '={{$value}}' } } } },
		],
	},
];