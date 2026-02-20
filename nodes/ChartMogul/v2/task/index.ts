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
					output: {
						postReceive: [{ type: 'set', properties: { value: '={{ { deleted: true } }}' } }],
					},
				},
			},
			{
				name: 'List Tasks',
				value: 'list',
				action: 'List tasks',
				routing: { request: { method: 'GET', url: '/tasks' } },
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
