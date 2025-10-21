import { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

/* -- Reused fields -- */
type Location = 'body' | 'qs' | 'path';
type FieldArgs =
	| { location: Location; displayName?: string; description?: string; pathURL?: string }
	| Location;

const toRequest = (location: Location, field_name: string, pathURL?: string) =>
	location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };

/*const AmountInCentsField: INodeProperties = {
	displayName: 'Amount in Cents',
	name: 'amount_in_cents',
	type: 'number',
	typeOptions: {
		minValue: 0,
	},
	default: 0,
	description: 'The amount in cents (e.g., $10.00 = 1000)',
	routing: { request: { body: { amount_in_cents: '={{$value}}' } } },
};*/

export const AssigneeField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Assignee' : (args.displayName ?? 'Assignee');
	const description =
		typeof args === 'string'
			? 'The email address of the ChartMogul user assigned to the task'
			: (args.description ?? 'The email address of the ChartMogul user assigned to the task');
	const name = 'assignee';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const CustomerExternalIdField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string'
			? 'Customer External ID'
			: (args.displayName ?? 'Customer External ID');
	const description =
		typeof args === 'string'
			? 'A unique identifier of the customer associated with the subscription event'
			: (args.description ??
				'A unique identifier for the customer associated with the subscription event');
	const name = 'customer_external_id';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

const CurrencyField: INodeProperties = {
	displayName: 'Currency',
	name: 'currency',
	type: 'string',
	default: '',
	description: 'The three-letter currency code',
	routing: { request: { body: { currency: '={{$value}}' } } },
};

export const EventDateField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Event Date' : (args.displayName ?? 'Event Date');
	const description =
		typeof args === 'string'
			? 'The date and time when the event was created'
			: (args.description ?? 'The date and time when the event was created');
	const name = 'event_date';
	return {
		displayName,
		name,
		type: 'dateTime',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const EffectiveDateField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string' ? 'Effective Date' : (args.displayName ?? 'Effective Date');
	const description =
		typeof args === 'string'
			? 'The date and time when the event takes effect'
			: (args.description ?? 'The date and time when the event takes effect');
	const name = 'effective_date';
	return {
		displayName,
		name,
		type: 'dateTime',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const ExternalIdField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string' ? 'External ID' : (args.displayName ?? 'External ID');
	const description =
		typeof args === 'string'
			? 'The unique identifier for the subscription event'
			: (args.description ?? 'The unique identifier for the subscription event');
	const name = 'external_id';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const IdField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'ID' : (args.displayName ?? 'ID');
	const description =
		typeof args === 'string'
			? 'The ChartMogul UUID for the subscription event'
			: (args.description ?? 'The ChartMogul UUID for the subscription event');
	const name = 'id';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const SubscriptionExternalIdField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string'
			? 'Subscription External ID'
			: (args.displayName ?? 'Subscription External ID');
	const description =
		typeof args === 'string'
			? "A unique identifier for the subscription to which you're adding the subscription event"
			: (args.description ??
				"A unique identifier for the subscription to which you're adding the subscription event");
	const name = 'subscription_external_id';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const PlanExternalIdField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string' ? 'Plan External ID' : (args.displayName ?? 'Plan External ID');
	const description =
		typeof args === 'string'
			? 'A unique identifier for the plan associated with the subscription event'
			: (args.description ??
				'A unique identifier for the plan associated with the subscription event');
	const name = 'plan_external_id';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const EventTypeField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Event Type' : (args.displayName ?? 'Event Type');
	const description =
		typeof args === 'string'
			? 'The type of the subscription event'
			: (args.description ?? 'The type of the subscription event');
	const name = 'event_type';
	return {
		displayName,
		name,
		type: 'options',
		options: [
			{ name: 'Scheduled Cancellation', value: 'subscription_cancellation_scheduled' },
			{
				name: 'Scheduled Cancellation (Retracted)',
				value: 'scheduled_subscription_cancellation_retracted',
			},
			{ name: 'Scheduled Start', value: 'subscription_start_scheduled' },
			{ name: 'Scheduled Start (Retracted)', value: 'scheduled_subscription_start_retracted' },
			{ name: 'Scheduled Update', value: 'subscription_update_scheduled' },
			{ name: 'Scheduled Update (Retracted)', value: 'scheduled_subscription_update_retracted' },
			{ name: 'Subscription Cancelled', value: 'subscription_cancelled' },
			{ name: 'Subscription Event (Retracted)', value: 'subscription_event_retracted' },
			{ name: 'Subscription Start', value: 'subscription_start' },
			{ name: 'Subscription Updated', value: 'subscription_updated' },
		],
		default: 'subscription_cancelled',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const eventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Create a Subscription Event',
				value: 'create',
				action: 'Create a subscription event',
				routing: {
					request: { method: 'POST', url: '/subscription_events' },
				},
			},
			{
				name: 'Delete a Subscription Event',
				value: 'delete',
				action: 'Delete a subscription event',
				routing: {
					request: { method: 'DELETE' },
				},
			},
			{
				name: 'List Subscription Events',
				value: 'list',
				action: 'List subscription events',
				routing: {
					request: {
						method: 'GET',
						url: '/subscription_events',
					},
				},
			},
			{
				name: 'Retrieve a Subscription Event',
				value: 'get',
				action: 'Retrieve a subscription event',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Update a Subscription Event',
				value: 'update',
				action: 'Update a subscription event',
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

export const eventFields: INodeProperties[] = [
	{
		...SharedOptionItems.CustomerUUIDField('body'),
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		...SharedOptionItems.DataSourceUUIDField('body'),
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		...EventTypeField('body'),
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		...EventDateField('body'),
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		...EffectiveDateField('body'),
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		...SubscriptionExternalIdField('body'),
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['list'],
			},
		},
		options: [
			ExternalIdField('qs'),
			CustomerExternalIdField('qs'),
			SharedOptionItems.DataSourceUUIDField('qs'),
			SubscriptionExternalIdField('qs'),
			EventTypeField('qs'),
			EventDateField('qs'),
			EffectiveDateField('qs'),
			PlanExternalIdField('qs'),
			{
				displayName: 'Include Edit History',
				name: 'include_edit_histories',
				type: 'boolean',
				default: false,
				description:
					'Whether should contain the edit_history_summary object with a summary of user edits for automatic sources (Stripe, Chargebee, Recurly, Braintree, Google Play and App Store Connect)',
				routing: { request: { qs: { include_edit_histories: '={{$value}}' } } },
			},
			{
				displayName: 'With Disabled Events',
				name: 'with_disabled',
				type: 'boolean',
				default: false,
				description: 'Whether to include disabled events in the response',
				routing: { request: { qs: { with_disabled: '={{$value}}' } } },
			},
		],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['list'],
			},
		},
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
	{
		displayName: 'Target Subscription Event Using',
		name: 'targetSubscriptionEvent',
		type: 'options',
		options: [
			{
				name: 'External ID and Data Source UUID',
				value: 'externalIdDataSource',
			},
			{
				name: 'ID',
				value: 'id',
			},
		],
		default: 'externalIdDataSource',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['delete', 'update'],
			},
		},
		required: true,
	},
	{
		...ExternalIdField('body'),
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['delete', 'update'],
				targetSubscriptionEvent: ['externalIdDataSource'],
			},
		},
		required: true,
	},
	{
		...SharedOptionItems.DataSourceUUIDField('body'),
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['delete', 'update'],
				targetSubscriptionEvent: ['externalIdDataSource'],
			},
		},
		required: true,
	},
	{
		...IdField('body'),
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['delete', 'update'],
				targetSubscriptionEvent: ['id'],
			},
		},
		required: true,
	},
	{
		displayName: 'Update Fields',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['update'],
			},
		},
		options: [
			CustomerExternalIdField('body'),
			EventTypeField('body'),
			EventDateField('body'),
			EffectiveDateField('body'),
			SubscriptionExternalIdField('body'),
			PlanExternalIdField('body'),
			CurrencyField,
		],
	},
];
