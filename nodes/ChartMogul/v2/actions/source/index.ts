import type { INodeProperties } from 'n8n-workflow';

import * as create from './create';
import * as del from './delete';
import * as get from './get';
import * as list from './list';

export { create, del as delete, get, list };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Create a Source',
				value: 'create',
				action: 'Create a source',
			},
			{
				name: 'Delete a Source',
				value: 'delete',
				action: 'Delete a source',
			},
			{
				name: 'List Sources',
				value: 'list',
				action: 'List sources',
			},
			{
				name: 'Retrieve a Source',
				value: 'get',
				action: 'Retrieve a source',
			},
			
		],
		default: 'create',
	},
	...create.description,
	...del.description,
	...list.description,
	...get.description
];