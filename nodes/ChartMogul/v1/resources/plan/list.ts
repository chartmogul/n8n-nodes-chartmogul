import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPlanList = {
	resource: ['plan'],
	operation: ['list'],
};

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{$value}}',
			},
		},
		displayOptions: {
			show: showOnlyForPlanList,
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'per_page',
				value: '={{ $parameter.returnAll ? 200 : $value }}',
			},
		},
		displayOptions: {
			show: {
				...showOnlyForPlanList,
				returnAll: [false],
			},
		},
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{
				displayName: 'Data Source UUID',
				name: 'dataSourceUUID',
				description: 'The UUID of the Data Source to filter plans by',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'data_source_uuid',
					},
				},
			},
			{
				displayName: 'External ID',
				name: 'externalId',
				description: 'The external ID of the plan to filter by',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'external_id',
					},
				},
			},
			{
				displayName: 'Billing System',
				name: 'system',
				description: 'The billing system of the plan to filter by',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'system',
					},
				},
			},
		],
		displayOptions: {
			show: showOnlyForPlanList,
		},
	},
];
