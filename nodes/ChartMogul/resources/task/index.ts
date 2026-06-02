import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { listDescription } from './list';
import { updateDescription } from './update';

export const taskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['task'] } },
		options: [
			{
				name: 'Create a Task',
				value: 'create',
				action: 'Create a task',
				routing: { request: { method: 'POST', url: '/tasks' } },
			},
			{
				name: 'Delete a Task',
				value: 'delete',
				action: 'Delete a task',
				routing: {
					request: { method: 'DELETE', url: '=/tasks/{{$parameter.taskUUID}}' },
				},
			},
			{
				name: 'List Tasks',
				value: 'list',
				action: 'List tasks',
				routing: { 
					request: { 
						method: 'GET', 
						url: '/tasks',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							assignee: '={{$parameter.filterOptions?.assignee || undefined}}',
							completed: '={{$parameter.filterOptions?.completed || undefined}}',
							customer_uuid: '={{$parameter.filterOptions?.customerUUID || undefined}}',
							due_date_on_or_after: '={{$parameter.filterOptions?.due_date_on_or_after || undefined}}',
							due_date_on_or_before: '={{$parameter.filterOptions?.due_date_on_or_before || undefined}}',
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
										assignee: '={{$parameter.filterOptions?.assignee || undefined}}',
										completed: '={{$parameter.filterOptions?.completed || undefined}}',
										customer_uuid: '={{$parameter.filterOptions?.customerUUID || undefined}}',
										due_date_on_or_after: '={{$parameter.filterOptions?.due_date_on_or_after || undefined}}',
										due_date_on_or_before: '={{$parameter.filterOptions?.due_date_on_or_before || undefined}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						}
					}
				 },
			},
			{
				name: 'Retrieve a Task',
				value: 'get',
				action: 'Retrieve a task',
				routing: { request: { method: 'GET', url: '=/tasks/{{$parameter.taskUUID}}' } },
			},
			{
				name: 'Update a Task',
				value: 'update',
				action: 'Update a task',
				routing: { request: { method: 'PATCH', url: '=/tasks/{{$parameter.taskUUID}}' } },
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
