import type { INodeProperties } from 'n8n-workflow';

export const listInvoicesDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['customer'], operation: ['list_invoices'] } },
		required: true,
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['customer'], operation: ['list_invoices'] } },
		routing: { 
			send: { paginate: '={{ $value }}' }, 
			output: { postReceive: [{ type: 'rootProperty', properties: { property: 'invoices' } }] }
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: { minValue: 1, maxValue: 200, },
		displayOptions: { show: { resource: ['customer'], operation: ['list_invoices'] }, hide: { returnAll: [true] } },
		routing: { request: { qs: { per_page: '={{$value}}' } } },
	},
	{
		displayName: 'Validation Type',
		name: 'validationType',
		type: 'options',
		options: [
			{ name: 'Valid', value: 'valid' },
			{ name: 'Invalid', value: 'invalid' },
			{ name: 'All', value: 'all' },
		],
		default: 'valid',
		displayOptions: { show: { resource: ['customer'], operation: ['list_invoices'] } },
	}
];
