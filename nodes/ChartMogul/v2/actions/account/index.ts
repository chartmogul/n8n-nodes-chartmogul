import type { INodeProperties } from 'n8n-workflow';

import * as get from './get';

export { get};

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Get Account Details',
				value: 'get',
				action: 'Get account details',
			},
		],
		default: 'get',
	},
	...get.description,
];