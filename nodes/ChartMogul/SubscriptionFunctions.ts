import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

export const subscriptionOperations: INodeProperties[] = [
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
				},
			},
		],
		default: 'list',
	},
];

export const subscriptionFields: INodeProperties[] = [
	/* -- Required fields -- */
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		displayOptions: {
			show: { resource: ['subscription'], operation: ['connect', 'disconnect', 'list'] },
		},
		required: true,
	},

	/* -- Optional fields -- */
	{
		displayName: 'Subscriptions',
		name: 'subscription',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Subscription',
			minValue: 2,
		},
		default: {},
		options: [
			{
				name: 'subscriptions',
				displayName: 'Subscription',
				values: [
					{
						displayName: 'Data Source UUID',
						name: 'data_source_uuid',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Subscription External ID',
						name: 'external_id',
						type: 'string',
						default: '',
					},
				],
			},
		],
		displayOptions: { show: { resource: ['subscription'], operation: ['connect', 'disconnect'] } },
		required: true,
		routing: {
			request: {
				body: '{{ { subscriptions: [$parameter.subscription.subscriptions] } }}',
			},
		},
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['subscription'], operation: ['list'] } },
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
];
