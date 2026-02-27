import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { listDescription } from './list';
import { listContentsDescription } from './listContents';
import { updateDescription } from './update';

export const planGroupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['planGroup'] } },
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
				},
			},
			{
				name: 'List Plan Groups',
				value: 'list',
				action: 'List plan groups',
				routing: {
					request: { method: 'GET', url: '/plan_groups' },
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !!$response.body.cursor }}',
								request: { qs: { per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}', cursor: '={{$response.body.cursor}}', } },
							}
						}
					}
				},
			},
			{
				name: 'List Plans in a Plan Group',
				value: 'listContents',
				action: 'List plans in a plan group',
				routing: {
					request: { method: 'GET', url: '=/plan_groups/{{$parameter.planGroupUUID}}/plans' },
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !!$response.body.cursor }}',
								request: { qs: { per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}', cursor: '={{$response.body.cursor}}', } },
							}
						}
					}
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
