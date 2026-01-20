import type { INodeProperties } from 'n8n-workflow';

import * as create from './create';
import * as get from './get';
import * as list from './list';
import * as del from './del';

export { create, get, list, del as delete };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'Create a Source', value: 'create', action: 'Create a source' },
			{ name: 'List Sources', value: 'list', action: 'List all sources' },
			{ name: 'Retrieve a Source', value: 'get', action: 'Retrieve a source' },
			{ name: 'Delete a Source', value: 'delete', action: 'Delete a source' },
		],
		default: 'create',
		displayOptions: { show: { resource: ['source'] } },
	},

	...create.description,
	...list.description,
	...get.description,
	...del.description,

];
