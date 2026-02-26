import type { INodeProperties } from 'n8n-workflow';

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'get',
		options: [
			{
				name: 'Get Account Details',
				value: 'get',
				action: 'Get account details',
				routing: { request: { method: 'GET', url: '/account' } },
			},
		],
		displayOptions: { show: { resource: ['account'] } },
	},
];
