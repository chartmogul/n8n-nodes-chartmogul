import type { INodeProperties } from 'n8n-workflow';

export const listByEmailDescription: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		description: 'Email address of the customer to search for',
		displayOptions: { show: { resource: ['customer'], operation: ['list_by_email'] } },
		required: true,
	},
	{ 
		displayName: 'Include Associated Emails',
		name: 'includeAssociatedEmails',
		type: 'boolean',
		default: false,
		description: 'Whether to include lookup of contacts associated with the email address. If set to true, customer profiles with the email address in their associated contacts will be included.',
		displayOptions: { show: { resource: ['customer'], operation: ['list_by_email'] } },
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['customer'], operation: ['list_by_email'] } },
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
		displayOptions: { show: { resource: ['customer'], operation: ['list_by_email'] }, hide: { returnAll: [true] } },
		routing: { request: { qs: { per_page: '={{$value}}' } } },
	},
];
