import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { disableDescription } from './disable';
import { getDescription } from './get';
import { updateDescription } from './update';

export const transactionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['transaction'] } },
		options: [
			{
				name: 'Create a Transaction',
				value: 'create',
				action: 'Create a transaction',
				routing: {
					request: {
						method: 'POST',
						url: '=/import/invoices/{{$parameter.invoiceUUID}}/transactions',
					},
				},
			},
			{
				name: 'Delete a Transaction',
				value: 'delete',
				action: 'Delete a transaction',
				routing: {
					request: { method: 'DELETE', url: '=/transactions/{{$parameter.transactionUUID}}' },
				},
			},
			{
				name: 'Disable a Transaction',
				value: 'disable',
				action: 'Disable a transaction',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/transactions/{{$parameter.transactionUUID}}/disabeld_state',
					},
				},
			},
			{
				name: 'Retrieve a Transaction',
				value: 'get',
				action: 'Retrieve a transaction',
				routing: {
					request: { method: 'GET', url: '=/transactions/{{$parameter.transactionUUID}}' },
				},
			},
			{
				name: 'Update a Transaction',
				value: 'update',
				action: 'Update a transaction',
				routing: {
					request: { method: 'PATCH', url: '=/transactions/{{$parameter.transactionUUID}}' },
				},
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
