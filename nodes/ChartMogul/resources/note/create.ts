import { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the customer to which this note or call log belongs',
		required: true,
		displayOptions: { show: { resource: ['note'], operation: ['create'] } },
		routing: { request: { body: { customer_uuid: '={{$value}}' } } },
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
		required: true,
		displayOptions: { show: { resource: ['note'], operation: ['create'] } },
		routing: { request: { body: { type: '={{$value}}' } } },
	},
	{
		displayName: 'Call Duration',
		name: 'call_duration',
		type: 'number',
		default: 60,
		description: 'Duration of the call in seconds',
		displayOptions: { show: { resource: ['note'], operation: ['create'], type: ['call'] } },
		routing: { request: { body: { call_duration: '={{$value}}' } } },
	},
	{
		displayName: 'Content',
		name: 'text',
		type: 'string',
		default: '',
		description: 'Content of the note or call log',
		displayOptions: { show: { resource: ['note'], operation: ['create'] } },
		routing: { request: { body: { text: '={{$value}}' } } },
	},
	{
		displayName: 'Author Email',
		name: 'author_email',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		displayOptions: { show: { resource: ['note'], operation: ['create'] } },
		routing: { request: { body: { author_email: '={{$value}}' } } },
	},
	{
		displayName: 'Created At',
		name: 'created_at',
		type: 'dateTime',
		default: '={{$now}}',
		description: 'The date and time when this note or call was made',
		displayOptions: { show: { resource: ['note'], operation: ['create'] } },
		routing: { request: { body: { created_at: '={{$value}}' } } },
	}
];
