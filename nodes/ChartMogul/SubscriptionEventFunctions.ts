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

const HandleAsUserEditField: INodeProperties = {
	displayName: 'Handle As User Edit',
	name: 'handle_as_user_edit',
	type: 'boolean',
	default: false,
	description:
		'Whether to handle as a user edit to an existing entry from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
};

const SubscriptionExternalIDField: INodeProperties = {
	displayName: 'Subscription External ID',
	name: 'subscription_external_id',
	type: 'string',
	default: '',
	description: 'The external ID of the subscription associated with the event',
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
				routing: { request: { method: 'DELETE' } },
			},
			{
				name: 'List Subscription Events',
				value: 'list',
				action: 'List subscription events',
				routing: { request: { method: 'GET', url: '/subscription_events' } },
			},
			{
				name: 'Retrieve a Subscription Event',
				value: 'get',
				action: 'Retrieve a subscription event',
				routing: { request: { method: 'GET' } },
			},
			{
				name: 'Update a Subscription Event',
				value: 'update',
				action: 'Update a subscription event',
				routing: { request: { method: 'PATCH' } },
			},
		],
		default: 'get',
	},
];

export const eventFields: INodeProperties[] = [
	{
		...HandleAsUserEditField,
		displayOptions: { show: { resource: ['event'], operation: ['create', 'update'] } },
		routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
	},
	{
		...DataSourceUUIDField,
		displayOptions: { show: { resource: ['event'], operation: ['create'] } },
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
				displayName: 'Plan External ID',
				name: 'plan_external_id',
				type: 'string',
				default: '',
				routing: { request: { body: { subscription_event: { plan_external_id: '={{$value}}' } } } },
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				placeholder: 'USD',
				routing: { request: { body: { subscription_event: { currency: '={{$value}}' } } } },
			},
			{
				displayName: 'Amount In Cents',
				name: 'amount_in_cents',
				type: 'number',
				default: 0,
				routing: { request: { body: { subscription_event: { amount_in_cents: '={{$value}}' } } } },
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 1,
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
		displayOptions: { show: { resource: ['event'], operation: ['create'], event_type: ['subscription_event_retracted'] } },
		required: true,
		routing: { request: { body: { retracted_event_id: '={{$value}}' } } },
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
				displayName: 'Subscription Set External ID',
				name: 'subscription_set_external_id',
				type: 'string',
				default: '',
				routing: { request: { body: { subscription_event: { subscription_set_external_id: '={{$value}}' } } } },
			},
			{
				displayName: 'External ID',
				name: 'external_id',
				type: 'string',
				default: '',
				description: 'The external ID of the subscription event',
				routing: { request: { body: { subscription_event: { external_id: '={{$value}}' } } } },	
			},
			{
				displayName: 'Event Order',
				name: 'event_order',
				type: 'number',
				default: 0,
				description:
					'A numeric value that determines the sequence in which events are processed when multiple events occur at the same timestamp',
				routing: { request: { body: { subscription_event: { event_order: '={{$value}}' } } } },
			}
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
