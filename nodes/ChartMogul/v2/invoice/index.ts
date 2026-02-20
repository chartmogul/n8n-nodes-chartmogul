import type { INodeProperties } from 'n8n-workflow';

import { createDescription } from './create';
import { deleteDescription } from './delete';
import { deleteAllDescription } from './delete_all';
import { disableDescription } from './disable';
import { getDescription } from './get';
import { listDescription } from './list';
import { updateDescription } from './update';
import { updateStatusDescription } from './update_status';

export const invoiceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['invoice'] } },
		options: [
			{
				name: 'Create an Invoice',
				value: 'create',
				action: 'Create an invoice',
				routing: {
					request: {
						method: 'POST',
						url: '=/import/customers/{{$parameter.customerUUID}}/invoices',
						body: `={{ (() => {
							const clean = (v) => {
								if (Array.isArray(v)) {
								const arr = v.map(clean).filter(x => x != null && x !== '');
								return arr.length ? arr : undefined;
								}
								if (v && typeof v === 'object') {
								const o = Object.fromEntries(
									Object.entries(v)
									.map(([k, val]) => [k, clean(val)])
									.filter(([, val]) => val !== undefined && val !== null && val !== '')
								);
								return Object.keys(o).length ? o : undefined;
								}
								return (v === '' || v == null) ? undefined : v;
							};

							const inv = { ...($parameter.invoice ?? {}) };

							inv.external_id = $parameter.externalId;
							inv.date = $parameter.date;
							inv.currency = $parameter.currency;

							const li = $parameter.line_items || {};
							const oneTime = Array.isArray(li.one_time) ? li.one_time : [];
  							const subscription = Array.isArray(li.subscription) ? li.subscription : [];

							inv.line_items = clean([...oneTime, ...subscription]) ?? [];

							const tx = $parameter.transactions || {};
							const transactions = Array.isArray(tx.transaction) ? tx.transaction : [];

							inv.transactions = clean(transactions) ?? [];

							const cleanedInv = clean(inv);
							return { invoices: cleanedInv ? [cleanedInv] : [] };
						})() }}`,
					},
				},
			},
			{
				name: 'Delete All Invoices of a Customer',
				value: 'deleteAll',
				action: 'Delete all invoices of a customer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/data_sources/{{$parameter.dataSourceUUID}}/customers/{{$parameter.customerUUID}}/invoices',
					},
				},
			},
			{
				name: 'Delete an Invoice',
				value: 'delete',
				action: 'Delete an invoice',
				routing: { request: { method: 'DELETE', url: '=/invoices/{{$parameter.invoiceUUID}}' } },
			},
			{
				name: 'Disable an Invoice',
				value: 'disable',
				action: 'Disable an invoice',
				routing: {
					request: { method: 'PATCH', url: '=/invoices/{{$parameter.invoiceUUID}}/disabled_state' },
				},
			},
			{
				name: 'List Invoices',
				value: 'list',
				action: 'List invoices',
				routing: { request: { method: 'GET', url: '/invoices' } },
			},
			{
				name: 'Retrieve an Invoice',
				value: 'get',
				action: 'Retrieve an invoice',
				routing: { request: { method: 'GET', url: '=/invoices/{{$parameter.invoiceUUID}}' } },
			},
			{
				name: 'Update an Invoice',
				value: 'update',
				action: 'Update an invoice',
				routing: { request: { method: 'PATCH', url: '=/invoices/{{$parameter.invoiceUUID}}' } },
			},
			{
				name: 'Update Invoice Status',
				value: 'updateStatus',
				action: 'Update invoice status',
				routing: {
					request: {
						method: 'PUT',
						url: '=/data_sources/{{$parameter.dataSourceUUID}}/invoices/{{$parameter.externalId}}/status',
					},
				},
			},
		],
		default: 'create',
	},
	...createDescription,
	...deleteDescription,
	...deleteAllDescription,
	...disableDescription,
	...getDescription,
	...listDescription,
	...updateDescription,
	...updateStatusDescription,
];
