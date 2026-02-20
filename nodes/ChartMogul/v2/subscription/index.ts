import type { INodeProperties } from 'n8n-workflow';

import { listDescription } from './list';
import { connectDescription } from './connect';
import { disconnectDescription } from './disconnect';

export const subscriptionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['subscription'] } },
		options: [
			{
				name: "List Customer's Subscriptions",
				value: 'list',
				action: 'List subscriptions for a customer',
				routing: {
					request: { method: 'GET', url: '=/customers/{{$parameter.customerUUID}}/subscriptions' },
				},
			},
			{
				name: 'Connect Subscriptions',
				value: 'connect',
				action: 'Connect subscriptions of a customer',
				routing: {
					request: {
						method: 'POST',
						url: '=/customers/{{$parameter.customerUUID}}/connect_subscriptions',
					},
					output: {
						postReceive: [{ type: 'set', properties: { value: '={{ { connected: true } }}' } }],
					},
				},
			},
			{
				name: 'Disconnect Subscriptions',
				value: 'disconnect',
				action: 'Disconnect subscriptions of a customer',
				routing: {
					request: {
						method: 'POST',
						url: '=/customers/{{$parameter.customerUUID}}/disconnect_subscriptions',
					},
					output: {
						postReceive: [{ type: 'set', properties: { value: '={{ { disconnected: true } }}' } }],
					},
				},
			},
		],
		default: 'list',
	},
	...listDescription,
	...connectDescription,
	...disconnectDescription,
];
