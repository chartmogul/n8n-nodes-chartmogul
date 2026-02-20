import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { listDescription } from './list';
import { listContentsDescription } from './list_contents';
import { updateDescription } from './update';

export const planGroupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['plan_group'] } },
		options: [
			{
				name: 'Create a Plan Group',
				value: 'create',
				action: 'Create a plan group',
				routing: { request: { method: 'POST', url: '/plan_groups' } },
			},
			{
				name: 'Delete a Plan Group',
				value: 'delete',
				action: 'Delete a plan group',
				routing: {
					request: { method: 'DELETE', url: '=/plan_groups/{{$parameter.planGroupUUID}}' },
					output: {
						postReceive: [{ type: 'set', properties: { value: '={{ { deleted: true } }}' } }],
					},
				},
			},
			{
				name: 'List Plan Groups',
				value: 'list',
				action: 'List all plan groups',
				routing: { request: { method: 'GET', url: '/plan_groups' } },
			},
			{
				name: 'List Plans in a Plan Group',
				value: 'list_contents',
				action: 'List all plans in a plan group',
				routing: {
					request: { method: 'GET', url: '=/plan_groups/{{$parameter.planGroupUUID}}/plans' },
				},
			},
			{
				name: 'Retrieve a Plan Group',
				value: 'get',
				action: 'Retrieve a plan group',
				routing: { request: { method: 'GET', url: '=/plan_groups/{{$parameter.planGroupUUID}}' } },
			},
			{
				name: 'Update a Plan Group',
				value: 'update',
				action: 'Update a plan group',
				routing: {
					request: { method: 'PATCH', url: '=/plan_groups/{{$parameter.planGroupUUID}}' },
				},
			},
		],
		default: 'list',
	},
	...createDescription,
	...deleteDescription,
	...getDescription,
	...listDescription,
	...listContentsDescription,
	...updateDescription,
];
