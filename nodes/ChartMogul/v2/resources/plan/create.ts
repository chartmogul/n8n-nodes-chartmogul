import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPlanCreate = {
	resource: ['plan'],
	operation: ['create'],
};

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Data Source UUID',
		name: 'dataSourceUUID',
		description: 'The UUID of the Data Source to which the Plan will belong',
		type: 'string',
		required: true,
		default: '',
		routing: {
			request: {
				body: {
					data_source_uuid: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForPlanCreate,
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		description: 'The desired name for the new plan',
		type: 'string',
		required: true,
		default: '',
		routing: {
			request: {
				body: {
					name: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForPlanCreate,
		},
	},
	{
		displayName: 'Interval Unit',
		name: 'intervalUnit',
		type: 'options',
		required: true,
		default: 'month',
		options: [
			{ name: 'Day', value: 'day' },
			{ name: 'Month', value: 'month' },
			{ name: 'Year', value: 'year' },
		],
		routing: {
			request: {
				body: {
					interval_unit: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForPlanCreate,
		},
	},
	{
		displayName: 'Interval Count',
		name: 'intervalCount',
		description: 'The frequency of the billing interval for the Plan',
		type: 'number',
		required: true,
		default: 1,
		routing: {
			request: {
				body: {
					interval_count: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForPlanCreate,
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'External ID',
				name: 'externalID',
				description: 'A unique identifier for the Plan in your system',
				type: 'string',
				default: '',
				routing: {
					request: {
						body: {
							external_id: '={{ $value }}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: showOnlyForPlanCreate,
		},
	},
];
