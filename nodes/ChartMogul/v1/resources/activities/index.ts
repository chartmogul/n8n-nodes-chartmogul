import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { getDescription } from './get';
import { listDescription } from './list';

const showOnlyForActivities = {
	resource: ['activities'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create an Activities Export',
				value: 'create',
				action: 'Create an activities export',
				routing: {
					request: {
						method: 'POST',
						url: '/activities_export',
					},
				},
			},
			{
				name: 'List Activities',
				value: 'list',
				action: 'List activities',
				routing: {
					request: {
						method: 'GET',
						url: '/activities',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'entries',
								},
							},
						],
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !!$response.body.cursor }}',
								request: {
									qs: {
										cursor: '={{ $response.body.cursor }}',
									},
								},
							},
						},
					},
				},
			},
			{
				name: 'Retrieve an Activities Export',
				value: 'get',
				action: 'Retrieve an activities export',
				routing: {
					request: {
						method: 'GET',
						url: '=/activities_export/{{$parameter.id}}',
					},
				},
			},
		],
		default: 'create',
		displayOptions: { show: showOnlyForActivities },
	},

	...createDescription,
	...getDescription,
	...listDescription,
];
