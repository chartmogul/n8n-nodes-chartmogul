import type { INodeProperties } from 'n8n-workflow';

export const connectDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['subscription'], operation: ['connect'] } },
		required: true,
	},
	{
		displayName: 'Subscriptions',
		name: 'subscriptions',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Subscription',
			minValue: 2,
		},
		default: [],
		options: [
			{
				name: 'subscription',
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
		displayOptions: { show: { resource: ['subscription'], operation: ['connect'] } },
		required: true,
		routing: { request: { body: '={{ { subscriptions: $value.subscription } }}' } },
	},
];
