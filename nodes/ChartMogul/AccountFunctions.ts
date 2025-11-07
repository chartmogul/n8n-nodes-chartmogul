import type { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['account'] } },
		options: [
			{
				name: 'Get Account Details',
				value: 'get',
				action: 'Get account details',
				routing: { request: { method: 'GET', url: '/account' } },
			},
		],
		default: 'get',
	},
];
