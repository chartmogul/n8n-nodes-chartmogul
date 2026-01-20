import type { INodeProperties } from 'n8n-workflow';

import * as get from './get';

export { get };

export const descriptions: INodeProperties[] = [
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
			},
		],
		default: 'get',
		displayOptions: { show: { resource: ['account'] } },
	},
    ...get.description,
];
