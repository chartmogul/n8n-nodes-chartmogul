import type { INodeProperties } from 'n8n-workflow';

const showOnlyForMetricCusCount = {
	resource: ['metric'],
	operation: ['cusCount'],
};

export const cusCountDescription: INodeProperties[] = [
	{
		displayName: 'Start Date',
		name: 'startDate',
		description: 'The start date of the period to retrieve metrics for',
		type: 'dateTime',
		required: true,
		default: '',
		routing: {
			request: {
				qs: {
					'start-date': '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForMetricCusCount,
		},
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		description: 'The end date of the period to retrieve metrics for',
		type: 'dateTime',
		required: true,
		default: '',
		routing: {
			request: {
				qs: {
					'end-date': '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForMetricCusCount,
		},
	},
	{
		displayName: 'Interval',
		name: 'interval',
		description: 'The interval to group the metrics by',
		type: 'options',
		default: 'month',
		options: [
			{ name: 'Day', value: 'day', },
			{ name: 'Month', value: 'month', },
			{ name: 'Quarter', value: 'quarter', },
			{ name: 'Week', value: 'week', },
			{ name: 'Year', value: 'year', },
		],
		routing: {
			request: {
				qs: {
					interval: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForMetricCusCount,
		},
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		description: 'Additional options to filter the metrics retrieved',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{
				displayName: 'Geo',
				name: 'geo',
				description: 'A comma-separated list of 2-character country codes to filter the results',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							geo: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Plans',
				name: 'plans',
				description: 'A comma-separated list of Plan UUIDs to filter the results',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							plans: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'ChartMogul Filter Language',
				name: 'chartMogulFilterLanguage',
				description: 'A set of filters to limit the results, formatted as CFL. See the documentation for more details: https://dev.chartmogul.com/docs/cfl.',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							filters: '={{ $value }}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: showOnlyForMetricCusCount,
		},
	}
];
