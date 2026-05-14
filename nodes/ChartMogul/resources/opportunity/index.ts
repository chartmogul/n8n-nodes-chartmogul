import { INodeProperties } from 'n8n-workflow';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { createDescription } from './create';
import { updateDescription } from './update';
import { listDescription } from './list';

export const opportunityDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['opportunity']
			}
		},
		options: [
			{
				name: 'Create an Opportunity',
				value: 'create',
				action: 'Create an opportunity',
				routing: { request: { method: 'POST', url: '/opportunities' } },
			},
			{
				name: 'Delete an Opportunity',
				value: 'delete',
				action: 'Delete an opportunity',
				routing: { request: { method: 'DELETE', url: '=/opportunities/{{$parameter.opportunityUUID}}' } },
			},
			{
				name: 'List Opportunities',
				value: 'list',
				action: 'List opportunities',
				routing: {
					request: {
						method: 'GET',
						url: '/opportunities',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							customer_uuid: '={{$parameter.filterOptions?.customerUUID || undefined}}',
							estimated_close_date_on_or_after: '={{$parameter.filterOptions?.estimatedCloseDateOnOrAfter || undefined}}',
							estimated_close_date_on_or_before: '={{$parameter.filterOptions?.estimatedCloseDateOnOrBefore || undefined}}',
							owner: '={{$parameter.filterOptions?.owner || undefined}}',
							pipeline: '={{$parameter.filterOptions?.pipeline || undefined}}',
							pipeline_stage: '={{$parameter.filterOptions?.pipelineStage || undefined}}',
						},
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
										estimated_close_date_on_or_after: '={{$parameter.filterOptions?.estimatedCloseDateOnOrAfter || undefined}}',
										estimated_close_date_on_or_before: '={{$parameter.filterOptions?.estimatedCloseDateOnOrBefore || undefined}}',
										owner: '={{$parameter.filterOptions?.owner || undefined}}',
										pipeline: '={{$parameter.filterOptions?.pipeline || undefined}}',
										pipeline_stage: '={{$parameter.filterOptions?.pipelineStage || undefined}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						}
					}
				},
			},
			{
				name: 'Retrieve an Opportunity',
				value: 'get',
				action: 'Retrieve an opportunity',
				routing: { request: { method: 'GET', url: '=/opportunities/{{$parameter.opportunityUUID}}' } },
			},
			{
				name: 'Update an Opportunity',
				value: 'update',
				action: 'Update an opportunity',
				routing: { request: { method: 'PATCH', url: '=/opportunities/{{$parameter.opportunityUUID}}' } },
			},
		],
		default: 'get',
	},
	...createDescription,
	...deleteDescription,
	...getDescription,
	...updateDescription,
	...listDescription
];
