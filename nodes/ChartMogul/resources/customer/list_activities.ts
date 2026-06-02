import type { INodeProperties } from 'n8n-workflow';

export const listActivitiesDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['customer'], operation: ['list_activities'] } },
		required: true,
	}, 
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['customer'], operation: ['list_activities'] } },
		routing: { 
			send: { paginate: '={{ $value }}' }, 
			output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] } 
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: { minValue: 1, maxValue: 200, },
		displayOptions: { show: { resource: ['customer'], operation: ['list_activities'] }, hide: { returnAll: [true] } },
		routing: { request: { qs: { per_page: '={{$value}}' } } },
	},
];
