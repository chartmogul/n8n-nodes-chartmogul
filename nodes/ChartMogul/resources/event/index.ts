import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { disableDescription } from './disable';
import { listDescription } from './list';
import { updateDescription } from './update';

export const eventDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['event'] } },
		options: [
			{
				name: 'Create a Subscription Event',
				value: 'create',
				action: 'Create a subscription event',
				routing: { request: { method: 'POST', url: '/subscription_events' } },
			},
			{
				name: 'Delete a Subscription Event',
				value: 'delete',
				action: 'Delete a subscription event',
				routing: { request: { method: 'DELETE', url: '/subscription_events' } },
			},
			{
				name: 'Disable a Subscription Event',
				value: 'disable',
				action: 'Disable a subscription event',
				routing: {
					// External-ID variant omits the id path segment (mirrors delete) — docs are
					// ambiguous on the exact path, verify if the alternative ever fails.
					request: {
						method: 'PATCH',
						url: '={{ $parameter.disableUsing === "eventId" ? "/subscription_events/" + $parameter.eventId + "/disabled_state" : "/subscription_events/disabled_state" }}',
					},
				},
			},
			{
				name: 'List Subscription Events',
				value: 'list',
				action: 'List subscription events',
				routing: {
					request: {
						method: 'GET',
						url: '/subscription_events',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							customer_external_id: '={{$parameter.customer_external_id}}',
							data_source_uuid: '={{$parameter.data_source_uuid}}',
							subscription_external_id: '={{$parameter.subscription_external_id}}',
							plan_external_id: '={{$parameter.plan_external_id}}',
							external_id: '={{$parameter.external_id}}',
							event_type: '={{$parameter.event_type}}',
							event_date: '={{$parameter.event_date}}',
							effective_date: '={{$parameter.effective_date}}',
							with_disabled: '={{$parameter.with_disabled}}',
							include_edit_histories: '={{$parameter.include_edit_histories}}',
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
										customer_external_id: '={{$parameter.customer_external_id}}',
										data_source_uuid: '={{$parameter.data_source_uuid}}',
										subscription_external_id: '={{$parameter.subscription_external_id}}',
										plan_external_id: '={{$parameter.plan_external_id}}',
										external_id: '={{$parameter.external_id}}',
										event_type: '={{$parameter.event_type}}',
										event_date: '={{$parameter.event_date}}',
										effective_date: '={{$parameter.effective_date}}',
										with_disabled: '={{$parameter.with_disabled}}',
										include_edit_histories: '={{$parameter.include_edit_histories}}',
										cursor: '={{$response.body.cursor}}',
									},
								},
							},
						},
					},
				},
			},
			{
				name: 'Update a Subscription Event',
				value: 'update',
				action: 'Update a subscription event',
				routing: { request: { method: 'PATCH', url: '/subscription_events' } },
			},
		],
		default: 'create',
	},
	...createDescription,
	...deleteDescription,
	...disableDescription,
	...listDescription,
	...updateDescription,
];
