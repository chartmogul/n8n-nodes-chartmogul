import type { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['list'],
			},
		},
		routing: {
			send: {
				paginate: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['list'],
			},
			hide: {
				returnAll: [true],
			},
		},
		routing: {
			request: {
				qs: {
					per_page: '={{$value}}'
				}
			}
		}
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Billing System',
				name: 'billingSystem',
				type: 'string',
				default: '',
				description: 'Filter plans by their billing system',
			},
			{
				displayName: 'Data Source UUID',
				name: 'data_source_uuid',
				type: 'string',
				default: '',
				description: 'Filter plans by their Data Source UUID',
			},
			{
				displayName: 'External ID',
				name: 'externalId',
				type: 'string',
				default: '',
				description: 'Filter plans by their external ID',
			}
		],
		displayOptions: {
			show: {
				resource: ['plan'],
				operation: ['list'],
			}
		},
	},
];