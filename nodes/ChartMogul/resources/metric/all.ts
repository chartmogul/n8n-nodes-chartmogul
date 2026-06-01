import { INodeProperties } from 'n8n-workflow';

export const allDescription: INodeProperties[] = [
	{
		displayName: 'Start Date',
		name: 'start-date',
		type: 'dateTime',
		default: '',
		description: 'The start date of the required period of data',
		required: true,
		displayOptions: { show: { resource: ['metric'] } },
		routing: { request: { qs: { 'start-date': '={{$value}}' } } },
	},
	{
		displayName: 'End Date',
		name: 'end-date',
		type: 'dateTime',
		default: '',
		description: 'The end date of the required period of data',
		required: true,
		displayOptions: { show: { resource: ['metric'] } },
		routing: { request: { qs: { 'end-date': '={{$value}}' } } },
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		displayOptions: { show: { resource: ['metric'] }, hide: { operation: ['ltv'] } },
		options: [
			{
				displayName: 'Reporting Interval',
				name: 'interval',
				type: 'options',
				default: 'month',
				description: 'The reporting interval for the metric',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Month', value: 'month' },
					{ name: 'Quarter', value: 'quarter' },
					{ name: 'Week', value: 'week' },
					{ name: 'Year', value: 'year' },
				],
				routing: { request: { qs: { interval: '={{$value}}' } } },
			},
			{
				displayName: 'Region',
				name: 'geo',
				type: 'string',
				default: '',
				description:
					'A comma-separated list of 2-letter country codes to filter the results to, e.g. US,GB,DE',
				routing: { request: { qs: { geo: '={{$value}}' } } },
			},
			{
				displayName: 'Plans',
				name: 'plans',
				type: 'string',
				default: '',
				description:
					'A comma-separated list of plan UUIDs, external IDs or names to filter the results',
				routing: { request: { qs: { plans: '={{$value}}' } } },
			},
			{
				displayName: 'ChartMogul Filter Language (CFL)',
				name: 'cfl',
				type: 'string',
				default: '',
				description: 'A filter expression in ChartMogul Filter Language to filter the results (see more here: https://dev.chartmogul.com/docs/cfl/)',
				routing: { request: { qs: { filters: '={{$value}}' } } },
			}
		],
	}
];
