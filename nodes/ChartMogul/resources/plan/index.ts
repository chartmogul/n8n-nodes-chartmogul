import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { listDescription } from './list';
import { updateDescription } from './update';

export const planDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'list',
		options: [
			{
				name: 'Create a Plan',
				value: 'create',
				action: 'Create a plan',
				routing: { request: { method: 'POST', url: '/plans' } },
			},
			{
				name: 'Delete a Plan',
				value: 'delete',
				action: 'Delete a plan',
				routing: { request: { method: 'DELETE', url: '=/plans/{{$parameter.planUUID}}' } },
			},
			{
				name: 'List Plans',
				value: 'list',
				action: 'List plans',
				routing: {
					request: {
						method: 'GET',
						url: '/plans',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							system: '={{$parameter.filterOptions?.billingSystem || undefined}}',
							data_source_uuid: '={{$parameter.filterOptions?.data_source_uuid || undefined}}',
							external_id: '={{$parameter.filterOptions?.externalId || undefined}}',
						}
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !!$response.body.cursor }}',
								request: {
									qs: {
										per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
										system: '={{$parameter.filterOptions?.billingSystem || undefined}}',
										data_source_uuid: '={{$parameter.filterOptions?.data_source_uuid || undefined}}',
										external_id: '={{$parameter.filterOptions?.externalId || undefined}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						}
					}
				},
			},
			{
				name: 'Retrieve a Plan',
				value: 'get',
				action: 'Retrieve a plan',
				routing: { request: { method: 'GET', url: '=/plans/{{$parameter.planUUID}}' } },
			},
			{
				name: 'Update a Plan',
				value: 'update',
				action: 'Update a plan',
				routing: { request: { method: 'PATCH', url: '=/plans/{{$parameter.planUUID}}' } },
			},
		],
		displayOptions: { show: { resource: ['plan'] } },
	},
	...createDescription,
	...deleteDescription,
	...getDescription,
	...listDescription,
	...updateDescription,
];
