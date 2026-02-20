import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { listDescription } from './list';
import { updateDescription } from './update';

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['contact'] } },
		options: [
			{
				name: 'Create a Contact',
				value: 'create',
				action: 'Create a contact',
				routing: { request: { method: 'POST', url: '/contacts' } },
			},
			{
				name: 'Delete a Contact',
				value: 'delete',
				action: 'Delete a contact',
				routing: {
					request: { method: 'DELETE', url: '=/contacts/{{$parameter.contact_uuid}}' },
					output: {
						postReceive: [{ type: 'set', properties: { value: '={{ { deleted: true } }}' } }],
					},
				},
			},
			{
				name: 'List Contacts',
				value: 'list',
				action: 'List contacts',
				routing: { request: { method: 'GET', url: '/contacts' } },
			},
			{
				name: 'Retrieve a Contact',
				value: 'get',
				action: 'Retrieve a contact',
				routing: { request: { method: 'GET', url: '=/contacts/{{$parameter.contact_uuid}}' } },
			},
			{
				name: 'Update a Contact',
				value: 'update',
				action: 'Update a contact',
				routing: { request: { method: 'PATCH', url: '=/contacts/{{$parameter.contact_uuid}}' } },
			},
		],
		default: 'get',
	},
	...createDescription,
	...deleteDescription,
	...getDescription,
	...listDescription,
	...updateDescription,
];
