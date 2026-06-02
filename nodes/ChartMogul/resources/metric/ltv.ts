import { INodeProperties } from 'n8n-workflow';

export const ltvDescription: INodeProperties[] = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		displayOptions: { show: { resource: ['metric'], operation: ['ltv'] } },
		options: [
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
