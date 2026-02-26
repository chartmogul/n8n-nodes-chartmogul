import type { INodeProperties } from 'n8n-workflow';
import { getDescription } from './get';
import { createDescription } from './create';
import { listDescription } from './list';

export const activitiesDescription: INodeProperties[] = [
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
				routing: { request: { method: 'POST', url: '/activities_export' } },
			},
			{
				name: 'List Activities',
				value: 'list',
				action: 'List activities',
				routing: {
					request: {
						method: 'GET',
						url: '/activities',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							'start-date': '={{$parameter.filterOptions?.startDate || undefined}}',
							'end-date': '={{$parameter.filterOptions?.endDate || undefined}}',
							type: '={{$parameter.filterOptions?.type || undefined}}',
							order: '={{$parameter.filterOptions?.order || undefined}}',
						}
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ !!$response.body.cursor }}',
								request: {
									qs: {
										per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
										'start-date': '={{$parameter.filterOptions?.startDate || undefined}}',
										'end-date': '={{$parameter.filterOptions?.endDate || undefined}}',
										type: '={{$parameter.filterOptions?.type || undefined}}',
										order: '={{$parameter.filterOptions?.order || undefined}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						},
					},
				},
			},
			{
				name: 'Retrieve an Activities Export',
				value: 'get',
				action: 'Retrieve an activities export',
				routing: { request: { method: 'GET', url: '=/activities_export/{{$parameter.id}}' } },
			},
		],
		default: 'create',
		displayOptions: { show: { resource: ['activities'] } },
	},
	...createDescription,
	...getDescription,
	...listDescription,
];
