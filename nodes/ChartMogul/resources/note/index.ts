import { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { updateDescription } from './update';
import { listDescription } from './list';

export const noteDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['note'] } },
		options: [
			{
				name: 'Create a Note or Call Log',
				value: 'create',
				action: 'Create a note or call log',
				routing: { request: { method: 'POST', url: '/customer_notes' } },
			},
			{
				name: 'Delete a Note or Call Log',
				value: 'delete',
				action: 'Delete a note or call log',
				routing: { request: { method: 'DELETE', url: '=/customer_notes/{{$parameter.noteUUID}}' } },
			},
			{
				name: 'List Notes and Call Logs',
				value: 'list',
				action: 'List notes and call logs',
				routing: {
					request: {
						method: 'GET',
						url: '/customer_notes',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							customer_uuid: '={{$parameter.filterOptions?.customerUUID || undefined}}',
							type: '={{$parameter.filterOptions?.type || undefined}}',
							author_email: '={{$parameter.filterOptions?.author_email || undefined}}',
						}
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ $response.body.has_more === true }}',
								request: {
									qs: {
										per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
										customer_uuid: '={{$parameter.filterOptions?.customerUUID || undefined}}',
										type: '={{$parameter.filterOptions?.type || undefined}}',
										author_email: '={{$parameter.filterOptions?.author_email || undefined}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						}
					}
				},
			},
			{
				name: 'Retrieve a Note or Call Log',
				value: 'get',
				action: 'Retrieve a note or call log',
				routing: { request: { method: 'GET', url: '=/customer_notes/{{$parameter.noteUUID}}' } },
			},
			{
				name: 'Update a Note or Call Log',
				value: 'update',
				action: 'Update a note or call log',
				routing: { request: { method: 'PATCH', url: '=/customer_notes/{{$parameter.noteUUID}}' } },
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
