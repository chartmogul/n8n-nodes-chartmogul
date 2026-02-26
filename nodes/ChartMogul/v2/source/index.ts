import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { listDescription } from './list';

export const sourceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'create',
		options: [
			{
				name: 'Create a Source',
				value: 'create',
				action: 'Create a source',
				routing: { request: { method: 'POST', url: '/data_sources' } },
			},
			{
				name: 'List Sources',
				value: 'list',
				action: 'List all sources',
				routing: {
					request: { method: 'GET', url: '/data_sources' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data_sources' } }] },
				},
			},
			{
				name: 'Retrieve a Source',
				value: 'get',
				action: 'Retrieve a source',
				routing: { request: { method: 'GET', url: '=/data_sources/{{$parameter.dataSourceUUID}}' } },
			},
			{
				name: 'Delete a Source',
				value: 'delete',
				action: 'Delete a source',
				routing: { request: { method: 'DELETE', url: '=/data_sources/{{$parameter.dataSourceUUID}}' } },
			},
		],
		displayOptions: { show: { resource: ['source'] } },
	},
	...createDescription,
	...deleteDescription,
	...getDescription,
	...listDescription,
];
