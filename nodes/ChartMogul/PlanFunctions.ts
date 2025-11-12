import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

/* -- Reused fields -- */
const PlanIntervalCountField: INodeProperties = {
	displayName: 'Plan Interval Count',
	name: 'interval_count',
	type: 'number',
	default: 1,
	typeOptions: { minValue: 1 },
	description: 'The number of intervals between each billing cycle',
	routing: { request: { body: { interval_count: '={{$value}}' } } },
};

const PlanIntervalUnitField: INodeProperties = {
	displayName: 'Plan Interval Unit',
	name: 'interval_unit',
	type: 'options',
	options: [
		{ name: 'Day', value: 'day' },
		{ name: 'Month', value: 'month' },
		{ name: 'Year', value: 'year' },
	],
	default: 'month',
	description: 'The unit of time for the plan interval',
	routing: { request: { body: { interval_unit: '={{$value}}' } } },
};

export const planOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['plan'] } },
		options: [
			{
				name: 'Create a Plan',
				value: 'create',
				action: 'Create a plan',
				routing: { request: { method: 'POST', url: '/plans' } },
			},
			{
				name: 'Delete a Plan',
				value: 'delete',
				action: 'Delete a plan',
				routing: { request: { method: 'DELETE', url: '=/plans/{{$parameter.planUUID}}' } },
			},
			{
				name: 'List Plans',
				value: 'list',
				action: 'List all plans',
				routing: { request: { method: 'GET', url: '/plans' } },
			},
			{
				name: 'Retrieve a Plan',
				value: 'get',
				action: 'Retrieve a plan',
				routing: { request: { method: 'GET', url: '=/plans/{{$parameter.planUUID}}' } },
			},
			{
				name: 'Update a Plan',
				value: 'update',
				action: 'Update a plan',
				routing: { request: { method: 'PATCH', url: '=/plans/{{$parameter.planUUID}}' } },
			},
		],
		default: 'list',
	},
];

export const planFields: INodeProperties[] = [
	/* -- Required Fields -- */
	{
		...SharedOptionItems.DataSourceUUIDField({ location: 'body' }),
		displayOptions: { show: { resource: ['plan'], operation: ['create'] } },
		required: true,
	},
	{
		displayName: 'Plan UUID',
		name: 'planUUID',
		type: 'string',
		required: true,
		default: '',
		description: 'The UUID of the plan',
		displayOptions: { show: { resource: ['plan'], operation: ['get', 'delete', 'update'] } },
	},
	{
		...SharedOptionItems.NameField({
			location: 'body',
			displayName: 'Plan Name',
			description: 'The name of the plan',
		}),
		required: true,
		displayOptions: { show: { resource: ['plan'], operation: ['create'] } },
	},
	{
		...PlanIntervalCountField,
		displayOptions: { show: { resource: ['plan'], operation: ['create'] } },
		required: true,
	},
	{
		...PlanIntervalUnitField,
		displayOptions: { show: { resource: ['plan'], operation: ['create'] } },
		required: true,
	},
	/* -- Optional Fields -- */
	{
		displayName: 'Update Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			SharedOptionItems.NameField({
				location: 'body',
				displayName: 'Plan Name',
				description: 'The name of the plan',
			}),
			PlanIntervalCountField,
			PlanIntervalUnitField,
		],
		displayOptions: { show: { resource: ['plan'], operation: ['update'] } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Define External ID',
		default: {},
		options: [SharedOptionItems.ExternalIDField],
		displayOptions: { show: { resource: ['plan'], operation: ['create'] } },
	},
	{
		displayName: 'Filter Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			SharedOptionItems.BillingSystemField,
			SharedOptionItems.DataSourceUUIDField({ location: 'qs' }),
			SharedOptionItems.ExternalIDField,
		],
		displayOptions: { show: { resource: ['plan'], operation: ['list'] } },
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
		displayOptions: { show: { resource: ['plan'], operation: ['list'] } },
	},
];
