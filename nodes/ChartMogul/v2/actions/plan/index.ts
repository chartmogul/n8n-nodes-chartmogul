import type { INodeProperties } from 'n8n-workflow';

import * as create from './create';
import * as get from './get';
import * as list from './list';
import * as del from './del';
import * as update from './update';

export { create, get, list, del as delete, update };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'Create a Plan', value: 'create', action: 'Create a plan' },
			{ name: 'Delete a Plan', value: 'delete', action: 'Delete a plan' },
			{ name: 'List Plans', value: 'list', action: 'List plans' },
			{ name: 'Retrieve a Plan', value: 'get', action: 'Retrieve a plan' },
			{ name: 'Update a Plan', value: 'update', action: 'Update a plan' },
		],
		default: 'create',
		displayOptions: { show: { resource: ['plan'] } },
	},

	...create.description,
	...list.description,
	...get.description,
	...del.description,
	...update.description,
];
