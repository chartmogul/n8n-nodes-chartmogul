import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Create a Contact',
				value: 'create',
				action: 'Create a contact',
				routing: {
					request: { method: 'POST', url: '/contacts' },
				},
			},
			{
				name: 'Delete a Contact',
				value: 'delete',
				action: 'Delete a contact',
				routing: {
					request: { method: 'DELETE' },
				},
			},
			{
				name: 'List Contacts',
				value: 'list',
				action: 'List contacts',
				routing: {
					request: {
						method: 'GET',
						url: '/contacts',
					},
				},
			},
			{
				name: 'Retrieve a Contact',
				value: 'get',
				action: 'Retrieve a contact',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Update a Contact',
				value: 'update',
				action: 'Update a contact',
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

export const contactFields: INodeProperties[] = [
	{
		displayName: 'Contact UUID',
		name: 'contact_uuid',
		type: 'string',
		required: true,
		default: '',
		description: 'The UUID of the contact',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get', 'delete', 'update'],
			},
		},
		routing: {
			request: {
				url: '=/contacts/{{$value}}',
			},
		},
	},
];
