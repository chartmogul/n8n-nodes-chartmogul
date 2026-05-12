import { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['note'], operation: ['list'] } },
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
		displayOptions: { show: { resource: ['note'], operation: ['list'] }, hide: { returnAll: [true] } },
		routing: { request: { qs: { per_page: '={{$value}}' } } },
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Customer UUID',
				name: 'customerUUID',
				type: 'string',
				default: '',
				description: 'The UUID of the customer to filter notes and call logs by',
				routing: { request: { qs: { customer_uuid: '={{$value}}' } } },
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Call Log', value: 'call' },
					{ name: 'Note', value: 'note' },
				],
				default: 'note',
				description: 'The type of customer note',
				routing: { request: { qs: { type: '={{$value}}' } } },
			},
			{
				displayName: 'Author Email',
				name: 'author_email',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				description: 'The email of the author of the note or call log',
				routing: { request: { qs: { author_email: '={{$value}}' } } },
			},
		],
		displayOptions: { show: { resource: ['note'], operation: ['list'] } },
	},
];
