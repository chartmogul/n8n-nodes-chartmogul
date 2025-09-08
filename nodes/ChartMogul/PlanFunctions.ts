import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './shared-options';

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
		displayOptions: {
			show: {
				resource: ['plan'],
			},
		},
		options: [
			{
				name: 'Create a Plan',
				value: 'create',
				action: 'Create a plan',
				routing: {
					request: {
						method: 'POST',
						url: '/plans',
					},
				},
			},
			{
				name: 'Delete a Plan',
				value: 'delete',
				action: 'Delete a plan',
				routing: {
					request: {
						method: 'DELETE',
					},
				},
			},
			{
				name: 'List Plans',
				value: 'list',
				action: 'List all plans',
				routing: {
					request: {
						method: 'GET',
						url: '/plans',
					},
				},
			},
			{
				name: 'Retrieve a Plan',
				value: 'get',
				action: 'Retrieve a plan',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Update a Plan',
				value: 'update',
				action: 'Update a plan',
				routing: {
					request: {
						method: 'PATCH',
					},
				},
			},
		],
		default: 'list',
	},
];

export const planFields: INodeProperties[] = [
	/* -- Required Fields -- */
	{
		displayName: 'Data Source UUID',
		name: 'source_uuid',
		type: 'string',
		required: true,
		default: '',
		description: 'The UUID of the source',
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['create'],
			},
		},
		routing: {
			request: {
				body: {
					data_source_uuid: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Plan UUID',
		name: 'plan_uuid',
		type: 'string',
		required: true,
		default: '',
		description: 'The UUID of the plan',
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['get', 'delete', 'update'],
			},
		},
		routing: {
			request: {
				url: '=/plans/{{$value}}',
			},
		},
	},
	{
		...SharedOptionItems.NameField({
			location: 'body',
			displayName: 'Plan Name',
			description: 'The name of the plan',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['create'],
			},
		},
	},
	{
		...PlanIntervalCountField,
		required: true,
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['create'],
			},
		},
	},
	{
		...PlanIntervalUnitField,
		required: true,
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['create'],
			},
		},
	},
	/* -- Optional Fields -- */
	{
		displayName: 'Update Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['update'],
			},
		},
		options: [
			SharedOptionItems.NameField({
				location: 'body',
				displayName: 'Plan Name',
				description: 'The name of the plan',
			}),
			PlanIntervalCountField,
			PlanIntervalUnitField,
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Define External ID',
		default: {},
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['create'],
			},
		},
		options: [SharedOptionItems.ExternalIDField],
	},
	{
		displayName: 'Filter Options',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['list'],
			},
		},
		options: [
			SharedOptionItems.BillingSystemField,
			SharedOptionItems.CursorField,
			SharedOptionItems.DataSourceUUIDField,
			SharedOptionItems.ExternalIDField,
			SharedOptionItems.PerPageField,
		],
	},
];
