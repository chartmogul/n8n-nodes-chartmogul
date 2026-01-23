import type { PlanProperties } from '../../Interfaces';

export const planListDescription: PlanProperties = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{
				displayName: 'Data Source UUID',
				name: 'data_source_uuid',
				type: 'string',
				default: '',
				description: 'Filter plans by data source UUID',
			},
			{
				displayName: 'External ID',
				name: 'external_id',
				type: 'string',
				default: '',
				description: 'Filter plans by external ID',
			},
			{
				displayName: 'Billing System',
				name: 'system',
				type: 'string',
				default: '',
				description: 'Filter plans by billing system',
			},
		],
		displayOptions: { show: { operation: ['list'], resource: ['plan'] } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		description: 'Max number of results to return',
		displayOptions: { show: { operation: ['list'], resource: ['plan'], returnAll: [false] }},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { operation: ['list'], resource: ['plan'] } },
	}
];
