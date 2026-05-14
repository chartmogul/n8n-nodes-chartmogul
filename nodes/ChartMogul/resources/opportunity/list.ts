import { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['opportunity'], operation: ['list'], }, },
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
		displayOptions: { show: { resource: ['opportunity'], operation: ['list'] }, hide: { returnAll: [true] } },
		routing: { request: { qs: { per_page: '={{$value}}' } } },
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['opportunity'], operation: ['list'] } },
		options: [
			{
				displayName: 'Customer UUID',
				name: 'customerUUID',
				type: 'string',
				default: '',
				description: 'The UUID of the customer to filter opportunities by',
			},
			{
				displayName: 'Estimated Close Date (On or After)',
				name: 'estimatedCloseDateOnOrAfter',
				type: 'dateTime',
				default: '',
				description: 'Filter opportunities with an estimated close date on or after the given date',
			},
			{
				displayName: 'Estimated Close Date (On or Before)',
				name: 'estimatedCloseDateOnOrBefore',
				type: 'dateTime',
				default: '',
				description: 'Filter opportunities with an estimated close date on or before the given date',
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				description: 'Filter opportunities by the email of their owner',
			},
			{
				displayName: 'Pipeline',
				name: 'pipeline',
				type: 'string',
				default: '',
				description: 'Filter opportunities by the name of the pipeline they are in',
			},
			{
				displayName: 'Pipeline Stage',
				name: 'pipelineStage',
				type: 'string',
				default: '',
				description: 'Filter opportunities by the name of the pipeline stage they are in',
			}
		],
	},
];
