import { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

const CustomerExternalIDField: INodeProperties = {
	displayName: 'Customer External ID',
	name: 'customer_external_id',
	type: 'string',
	default: '',
	description: 'The external ID of the customer associated with the subscription event',
};

const DataSourceUUIDField: INodeProperties = {
	displayName: 'Data Source UUID',
	name: 'data_source_uuid',
	type: 'string',
	default: '',
	description: 'The UUID of the Data Source',
};

const EventTypeField: INodeProperties = {
	displayName: 'Event Type',
	name: 'event_type',
	type: 'options',
	options: [
		{
			name: 'Subscription Cancellation (Retracted)',
			value: 'scheduled_subscription_cancellation_retracted',
		},
		{ name: 'Subscription Cancellation (Scheduled)', value: 'subscription_cancellation_scheduled' },
		{ name: 'Subscription Cancelled', value: 'subscription_cancelled' },
		{ name: 'Subscription Event Retracted', value: 'subscription_event_retracted' },
		{ name: 'Subscription Start', value: 'subscription_start' },
		{ name: 'Subscription Start (Retracted)', value: 'scheduled_subscription_start_retracted' },
		{ name: 'Subscription Start (Scheduled)', value: 'subscription_start_scheduled' },
		{ name: 'Subscription Update', value: 'subscription_updated' },
		{ name: 'Subscription Update (Retracted)', value: 'scheduled_subscription_update_retracted' },
		{ name: 'Subscription Update (Scheduled)', value: 'subscription_update_scheduled' },
	],
	default: 'subscription_cancelled',
	description: 'The type of subscription event',
};

const EventDateField: INodeProperties = {
	displayName: 'Event Date',
	name: 'event_date',
	type: 'dateTime',
	default: '',
	description: 'The date of the subscription event',
};

const EffectiveDateField: INodeProperties = {
	displayName: 'Effective Date',
	name: 'effective_date',
	type: 'dateTime',
	default: '',
	description: 'The effective date of the subscription event',
};

const ExternalIDField: INodeProperties = {
	displayName: 'External ID',
	name: 'external_id',
	type: 'string',
	default: '',
	description: 'The external ID of the subscription event',
};

const EventIDField: INodeProperties = {
	displayName: 'Event ID',
	name: 'eventId',
	type: 'string',
	default: '',
	description: 'The ID of the subscription event',
};

const HandleAsUserEditField: INodeProperties = {
	displayName: 'Handle As User Edit',
	name: 'handle_as_user_edit',
	type: 'boolean',
	default: false,
	description:
		'Whether to handle as a user edit to an existing entry from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
};

const PlanExtnernalIDField: INodeProperties = {
	displayName: 'Plan External ID',
	name: 'plan_external_id',
	type: 'string',
	default: '',
	description: 'The external ID of the plan associated with the subscription event',
};

const SubscriptionExternalIDField: INodeProperties = {
	displayName: 'Subscription External ID',
	name: 'subscription_external_id',
	type: 'string',
	default: '',
	description: 'The external ID of the subscription associated with the event',
};

const CurrencyField: INodeProperties = {
	displayName: 'Currency',
	name: 'currency',
	type: 'string',
	default: '',
	placeholder: 'USD',
};

const AmountInCentsField: INodeProperties = {
	displayName: 'Amount In Cents',
	name: 'amount_in_cents',
	type: 'number',
	default: 0,
};

const QuantityField: INodeProperties = {
	displayName: 'Quantity',
	name: 'quantity',
	type: 'number',
	default: 1,
};

const SubscriptionSetExternalIDField: INodeProperties = {
	displayName: 'Subscription Set External ID',
	name: 'subscription_set_external_id',
	type: 'string',
	default: '',
	description: 'The external ID of the subscription set associated with the event',
};

const TaxAmountInCentsField: INodeProperties = {
	displayName: 'Tax Amount In Cents',
	name: 'tax_amount_in_cents',
	type: 'number',
	default: 0,
	description: 'The tax amount in cents associated with the subscription event',
};

const EventOrderField: INodeProperties = {
	displayName: 'Event Order',
	name: 'event_order',
	type: 'number',
	default: 0,
	description:
		'A numeric value that determines the sequence in which events are processed when multiple events occur at the same timestamp',
};

export const eventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['event'] } },
		options: [
			{
				name: 'Create a Subscription Event',
				value: 'create',
				action: 'Create a subscription event',
				routing: { request: { method: 'POST', url: '/subscription_events' } },
			},
			{
				name: 'Delete a Subscription Event',
				value: 'delete',
				action: 'Delete a subscription event',
				routing: { request: { method: 'DELETE', url: '/subscription_events' } },
			},
			{
				name: 'Disable a Subscription Event',
				value: 'disable',
				action: 'Disable a subscription event',
				routing: {
					request: { method: 'PATCH', url: '=/subscription_events/{{$parameter.eventId}}/disable' },
				},
			},
			{
				name: 'List Subscription Events',
				value: 'list',
				action: 'List subscription events',
				routing: { request: { method: 'GET', url: '/subscription_events' } },
			},
			{
				name: 'Update a Subscription Event',
				value: 'update',
				action: 'Update a subscription event',
				routing: { request: { method: 'PATCH', url: '/subscription_events' } },
			},
		],
		default: 'create',
	},
];

export const eventFields: INodeProperties[] = [
	{
		displayName: 'Target Subscription Event Using',
		name: 'updateUsing',
		type: 'options',
		options: [
			{ name: 'Event ID', value: 'eventId' },
			{ name: 'External ID and Data Source UUID', value: 'externalIdandDataSourceUUID' },
		],
		default: 'externalIdandDataSourceUUID',
		displayOptions: { show: { resource: ['event'], operation: ['delete', 'update'] } },
	},
	{
		...HandleAsUserEditField,
		displayOptions: { show: { resource: ['event'], operation: ['create', 'update'] } },
		routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
	},
	{
		...DataSourceUUIDField,
		displayOptions: {
			show: { resource: ['event'], operation: ['create', 'delete', 'update'] },
			hide: { updateUsing: ['eventId'] },
		},
		required: true,
		routing: { request: { body: { subscription_event: { data_source_uuid: '={{$value}}' } } } },
	},
	{
		...CustomerExternalIDField,
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
		required: true,
		routing: { request: { body: { subscription_event: { customer_external_id: '={{$value}}' } } } },
	},
	{
		...EventTypeField,
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
		required: true,
		routing: { request: { body: { subscription_event: { event_type: '={{$value}}' } } } },
	},
	{
		...EventDateField,
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
		required: true,
		routing: { request: { body: { subscription_event: { event_date: '={{$value}}' } } } },
	},
	{
		...EffectiveDateField,
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
		required: true,
		routing: { request: { body: { subscription_event: { effective_date: '={{$value}}' } } } },
	},
	{
		...SubscriptionExternalIDField,
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
		required: true,
		routing: {
			request: { body: { subscription_event: { subscription_external_id: '={{$value}}' } } },
		},
	},
	{
		...EventIDField,
		displayOptions: {
			show: { resource: ['event'], operation: ['delete', 'update'], updateUsing: ['eventId'] },
		},
		required: true,
		routing: { request: { body: { subscription_event: { id: '={{$value}}' } } } },
	},
	{
		...EventIDField,
		displayOptions: { show: { resource: ['event'], operation: ['disable'] } },
		required: true,
	},
	{
		...ExternalIDField,
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['delete', 'update'],
				updateUsing: ['externalIdandDataSourceUUID'],
			},
		},
		required: true,
		routing: { request: { body: { subscription_event: { external_id: '={{$value}}' } } } },
	},
	{
		displayName: 'Required Subscription Event Fields',
		name: 'requiredSubscriptionEventFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
				event_type: [
					'subscription_start',
					'subscription_start_scheduled',
					'subscription_updated',
					'subscription_update_scheduled',
				],
			},
		},
		options: [
			{
				...PlanExtnernalIDField,
				routing: { request: { body: { subscription_event: { plan_external_id: '={{$value}}' } } } },
			},
			{
				...CurrencyField,
				routing: { request: { body: { subscription_event: { currency: '={{$value}}' } } } },
			},
			{
				...AmountInCentsField,
				routing: { request: { body: { subscription_event: { amount_in_cents: '={{$value}}' } } } },
			},
			{
				...QuantityField,
				routing: { request: { body: { subscription_event: { quantity: '={{$value}}' } } } },
			},
		],
	},
	{
		displayName: 'Retracted Event ID',
		name: 'retracted_event_id',
		type: 'string',
		default: '',
		description: 'The ID of the event being retracted',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
				event_type: ['subscription_event_retracted'],
			},
		},
		required: true,
		routing: { request: { body: { retracted_event_id: '={{$value}}' } } },
	},
	{
		displayName: 'Disable',
		name: 'disabled',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['event'], operation: ['disable'] } },
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
	{
		displayName: 'Additional Event Fields',
		name: 'additionalEventFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
		options: [
			{
				...SubscriptionSetExternalIDField,
				routing: {
					request: {
						body: { subscription_event: { subscription_set_external_id: '={{$value}}' } },
					},
				},
			},
			{
				...ExternalIDField,
				routing: { request: { body: { subscription_event: { external_id: '={{$value}}' } } } },
			},
			{
				...EventOrderField,
				routing: { request: { body: { subscription_event: { event_order: '={{$value}}' } } } },
			},
			{
				...TaxAmountInCentsField,
				routing: {
					request: { body: { subscription_event: { tax_amount_in_cents: '={{$value}}' } } },
				},
			},
		],
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['event'], operation: ['list'] } },
		options: [
			{ ...ExternalIDField, routing: { request: { qs: { external_id: '={{$value}}' } } } },
			{
				...CustomerExternalIDField,
				routing: { request: { qs: { customer_external_id: '={{$value}}' } } },
			},
			{ ...DataSourceUUIDField, routing: { request: { qs: { data_source_uuid: '={{$value}}' } } } },
			{
				...SubscriptionExternalIDField,
				routing: { request: { qs: { subscription_external_id: '={{$value}}' } } },
			},
			{ ...EventTypeField, routing: { request: { qs: { event_type: '={{$value}}' } } } },
			{ ...EventDateField, routing: { request: { qs: { event_date: '={{$value}}' } } } },
			{ ...EffectiveDateField, routing: { request: { qs: { effective_date: '={{$value}}' } } } },
			{
				...PlanExtnernalIDField,
				routing: { request: { qs: { plan_external_id: '={{$value}}' } } },
			},
			{
				displayName: 'Include Edit History',
				name: 'include_edit_histories',
				type: 'boolean',
				default: false,
				description: 'Whether to include edit histories in the response',
				routing: { request: { qs: { include_edit_histories: '={{$value}}' } } },
			},
			{
				displayName: 'Include Disabled Events',
				name: 'with_disabled',
				type: 'boolean',
				default: false,
				description: 'Whether to include disabled events in the response',
				routing: { request: { qs: { with_disabled: '={{$value}}' } } },
			},
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['event'], operation: ['update'] } },
		options: [
			{
				...CustomerExternalIDField,
				routing: { request: { body: { subscription_event: { id: '={{$value}}' } } } },
			},
			{
				...EventTypeField,
				routing: { request: { body: { subscription_event: { event_type: '={{$value}}' } } } },
			},
			{
				...EventDateField,
				routing: { request: { body: { subscription_event: { event_date: '={{$value}}' } } } },
			},
			{
				...EffectiveDateField,
				routing: { request: { body: { subscription_event: { effective_date: '={{$value}}' } } } },
			},
			{
				...SubscriptionExternalIDField,
				routing: {
					request: { body: { subscription_event: { subscription_external_id: '={{$value}}' } } },
				},
			},
			{
				...PlanExtnernalIDField,
				routing: { request: { body: { subscription_event: { plan_external_id: '={{$value}}' } } } },
			},
			{
				...CurrencyField,
				routing: { request: { body: { subscription_event: { currency: '={{$value}}' } } } },
			},
			{
				...AmountInCentsField,
				routing: { request: { body: { subscription_event: { amount_in_cents: '={{$value}}' } } } },
			},
			{
				...QuantityField,
				routing: { request: { body: { subscription_event: { quantity: '={{$value}}' } } } },
			},
			{
				...SubscriptionSetExternalIDField,
				routing: {
					request: {
						body: { subscription_event: { subscription_set_external_id: '={{$value}}' } },
					},
				},
			},
			{
				...TaxAmountInCentsField,
				routing: {
					request: { body: { subscription_event: { tax_amount_in_cents: '={{$value}}' } } },
				},
			},
			{
				...EventOrderField,
				routing: { request: { body: { subscription_event: { event_order: '={{$value}}' } } } },
			},
		],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['event'], operation: ['list'] } },
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
];
