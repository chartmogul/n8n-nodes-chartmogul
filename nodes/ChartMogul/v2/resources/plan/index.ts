import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { getDescription } from './get';
import { listDescription } from './list';
import { updateDescription } from './update';
import { deleteDescription } from './delete';

const showOnlyForPlan = {
	resource: ['plan'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create a Plan',
				value: 'create',
				action: 'Create a plan',
				routing: {
					request: {
						method: 'POST',
						url: '/plans',
					},
				},
			},
			{
				name: 'Delete a Plan',
				value: 'delete',
				action: 'Delete a plan',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/plans/{{$parameter.planUUID}}',
					},
				},
			},
			{
				name: 'List Plans',
				value: 'list',
				action: 'List all plans',
				routing: {
					request: {
						method: 'GET',
						url: '/plans',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'plans',
								},
							},
						],
					},
					send: {
						paginate: '={{ $parameter.returnAll ? true : false }}',
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !!$response.body.cursor }}',
								request: {
									qs: {
										per_page: '={{ $parameter.returnAll ? 200 : ($parameter.limit ?? 50) }}',
										data_source_uuid: '={{ $parameter.filterOptions?.dataSourceUUID || undefined }}',
										external_id: '={{ $parameter.filterOptions?.externalID || undefined }}',
										system: '={{ $parameter.filterOptions?.system || undefined }}',
										cursor: '={{ $response.body.cursor }}',
									},
								},
							},
						},
					},
				},
			},
			{
				name: 'Retrieve a Plan',
				value: 'get',
				action: 'Retrieve a plan',
				routing: {
					request: {
						method: 'GET',
						url: '=/plans/{{$parameter.planUUID}}',
					},
				},
			},
			{
				name: 'Update a Plan',
				value: 'update',
				action: 'Update a plan',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/plans/{{$parameter.planUUID}}',
					},
				},
			},
		],
		default: 'list',
		displayOptions: { show: showOnlyForPlan },
	},

	...createDescription,
	...getDescription,
	...listDescription,
	...updateDescription,
	...deleteDescription,
];
