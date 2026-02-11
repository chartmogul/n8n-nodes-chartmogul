import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccount = {
	resource: ['account'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Get Account Details',
				value: 'get',
				action: 'Get account details',
				routing: { request: { method: 'GET', url: '/account', }, },
			},
		],
		default: 'get',
		displayOptions: {
			show: showOnlyForAccount,
		},
	},
];
