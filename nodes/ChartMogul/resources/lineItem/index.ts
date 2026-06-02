import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { disableDescription } from './disable';
import { getDescription } from './get';
import { updateDescription } from './update';

export const lineItemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['line_item'] } },
		options: [
			{
				name: 'Create a Line Item',
				value: 'create',
				action: 'Create a line item',
				routing: { request: { method: 'POST' } },
			},
			{
				name: 'Delete a Line Item',
				value: 'delete',
				action: 'Delete a line item',
				routing: { request: { method: 'DELETE', url: '=/line_items/{{$parameter["lineItemUUID"]}}' } },
			},
			{
				name: 'Disable a Line Item',
				value: 'disable',
				action: 'Disable a line item',
				routing: { request: { method: 'PATCH', url: '=/line_items/{{$parameter["lineItemUUID"]}}/disabled_state' } },
			},
			{
				name: 'Retrieve a Line Item',
				value: 'get',
				action: 'Retrieve a line item',
				routing: { request: { method: 'GET', url: '=/line_items/{{$parameter["lineItemUUID"]}}' } },
			},
			{
				name: 'Update a Line Item',
				value: 'update',
				action: 'Update a line item',
				routing: { request: { method: 'PATCH', url: '=/line_items/{{$parameter["lineItemUUID"]}}' } },
			},
		],
		default: 'get',
	},
	...createDescription,
	...deleteDescription,
	...disableDescription,
	...getDescription,
	...updateDescription,
];
