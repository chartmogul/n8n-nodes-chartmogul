import type { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Plan UUID',
		name: 'planUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the plan',
		required: true,
		displayOptions: { show: { resource: ['plan'], operation: ['update'] } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Plan Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the plan to update to',
				routing: { request: { body: { name: '={{$value}}' } } },
			},
			{
				displayName: 'Plan Interval Count',
				name: 'interval_count',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 1,
				description: 'The number of intervals between each billing cycle',
				routing: { request: { body: { interval_count: '={{$value}}' } } },
			},
			{
				displayName: 'Plan Interval Unit',
				name: 'interval_unit',
				type: 'options',
				default: 'month',
				description: 'The unit of time for the plan interval',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Month', value: 'month' },
					{ name: 'Year', value: 'year' },
				],
				routing: { request: { body: { interval_unit: '={{$value}}' } } },
			},
		],
		displayOptions: { show: { resource: ['plan'], operation: ['update'] } },
	},
];