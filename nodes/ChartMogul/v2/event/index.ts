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
					request: { method: 'PATCH', url: '=/subscription_events/{{$parameter.eventId}}/disable' },
				},
			},
			{
				name: 'List Subscription Events',
				value: 'list',
				action: 'List subscription events',
				routing: { request: { method: 'GET', url: '/subscription_events' } },
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
