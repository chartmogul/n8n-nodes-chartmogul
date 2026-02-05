import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPlanUpdate = {
	resource: ['plan'],
	operation: ['update'],
};

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Plan UUID',
		name: 'planUUID',
		description: 'The UUID of the plan to update',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForPlanUpdate,
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Field to update',
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				description: 'The new name for the plan',
				type: 'string',
				default: '',
				routing: {
					request: {
						body: {
							name: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Interval Unit',
				name: 'intervalUnit',
				type: 'options',
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'Month',
						value: 'month',
					},
					{
						name: 'Year',
						value: 'year',
					},
				],
				default: 'month',
				routing: {
					request: {
						body: {
							interval_unit: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Interval Count',
				name: 'intervalCount',
				description: 'The new interval count for the plan',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				routing: {
					request: {
						body: {
							interval_count: '={{ $value }}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: showOnlyForPlanUpdate,
		},
	},
];
