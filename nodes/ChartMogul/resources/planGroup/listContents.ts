import type { INodeProperties } from 'n8n-workflow';

export const listContentsDescription: INodeProperties[] = [
	{
		displayName: 'Plan Group UUID',
		name: 'planGroupUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the plan group',
		required: true,
		displayOptions: { show: { resource: ['planGroup'], operation: ['listContents'] } },
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['planGroup'], operation: ['listContents'] } },
		routing: { 
			send: { paginate: '={{ $value }}' }, 
			output: { postReceive: [{ type: 'rootProperty', properties: { property: 'plans' } }] } 
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['planGroup'], operation: ['listContents'] }, hide: { returnAll: [true] } },
		routing: { request: { qs: { per_page: '={{$value}}' } } },
	},
];
