import { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

/* -- Reused fields -- */
type Location = 'body' | 'qs' | 'path';
type FieldArgs =
	| { location: Location; displayName?: string; description?: string; pathURL?: string }
	| Location;

const toRequest = (location: Location, field_name: string, pathURL?: string) =>
	location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };

export const TypeField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Type' : (args.displayName ?? 'Type');
	const description =
		typeof args === 'string'
			? 'The type of customer note'
			: (args.description ?? 'The type of customer note');
	const name = 'type';
	return {
		displayName,
		name,
		type: 'options',
		options: [
			{ name: 'Call', value: 'call' },
			{ name: 'Note', value: 'note' },
		],
		default: 'note',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const AuthorField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string' ? 'Author Email' : (args.displayName ?? 'Author Email');
	const description =
		typeof args === 'string'
			? 'The email of the author of the note or call log'
			: (args.description ?? 'The email of the author of the note or call log');
	const name = 'author_email';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description,
		routing: { request: toRequest(location, name) },
	};
};

const TextField: INodeProperties = {
	displayName: 'Text',
	name: 'text',
	type: 'string',
	default: '',
	description: 'Contents of the note or call log',
	routing: { request: { body: { text: '={{$value}}' } } },
};

const CallDurationField: INodeProperties = {
	displayName: 'Call Duration',
	name: 'call_duration',
	type: 'number',
	default: 60,
	description: 'Relevant for type call. Duration of the call in seconds.',
	routing: { request: { body: { call_duration: '={{$value}}' } } },
};

const CreatedAtField: INodeProperties = {
	displayName: 'Created At',
	name: 'created_at',
	type: 'dateTime',
	default: '',
	description: 'The date and time when this note or call was made',
	routing: { request: { body: { created_at: '={{$value}}' } } },
};

export const noteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['note'],
			},
		},
		options: [
			{
				name: 'Create a Note or Call Log',
				value: 'create',
				action: 'Create a note or call log',
				routing: {
					request: { method: 'POST', url: '/customer_notes' },
				},
			},
			{
				name: 'Delete a Note or Call Log',
				value: 'delete',
				action: 'Delete a note or call log',
				routing: {
					request: { method: 'DELETE' },
				},
			},
			{
				name: 'List Notes and Call Logs',
				value: 'list',
				action: 'List notes and call logs',
				routing: {
					request: {
						method: 'GET',
						url: '/customer_notes',
					},
				},
			},
			{
				name: 'Retrieve a Note or Call Log',
				value: 'get',
				action: 'Retrieve a note or call log',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Update a Note or Call Log',
				value: 'update',
				action: 'Update a note or call log',
				routing: {
					request: {
						method: 'PATCH',
					},
				},
			},
		],
		default: 'get',
	},
];

export const noteFields: INodeProperties[] = [
	{
		...SharedOptionItems.CustomerUUIDField('body'),
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		required: true,
	},
	{
		...TypeField('body'),
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
	},
	{ 
		...CallDurationField,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
				type: ['call'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		options: [AuthorField('body'), TextField, CreatedAtField],
	},
	{
		displayName: 'Note UUID',
		name: 'note_uuid',
		type: 'string',
		default: '',
		description: 'The UUID of the Note or Call Log',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['get', 'delete', 'update'],
			},
		},
		required: true,
		routing: {
			request: {
				url: '=/customer_notes/{{$value}}',
			},
		},
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['list'],
			},
		},
		options: [SharedOptionItems.CustomerUUIDField('qs'), TypeField('qs'), AuthorField('qs')],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['list'],
			},
		},
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
	{
		displayName: 'Update Fields',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['update'],
			},
		},
		options: [
			AuthorField('body'),
			TextField,
			CallDurationField,
			CreatedAtField,
			{
				displayName: 'Updated At',
				name: 'updated_at',
				type: 'dateTime',
				default: '',
				description: 'The date and time when this note or call was updated',
				routing: { request: { body: { updated_at: '={{$value}}' } } },
			},
		],
	},
];
