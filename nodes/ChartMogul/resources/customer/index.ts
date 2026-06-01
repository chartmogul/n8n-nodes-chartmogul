import type { INodeProperties } from 'n8n-workflow';

import { addContactDescription } from './add_contact';
import { createDescription } from './create';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { listDescription } from './list';
import { listActivitiesDescription } from './list_activities';
import { listByEmailDescription } from './list_by_email';
import { listInvoicesDescription } from './list_invoices';
import { mergeDescription } from './merge';
import { unmergeDescription } from './unmerge';
import { updateDescription } from './update';

export const customerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['customer'] } },
		options: [
			{
				name: 'Add Contact to Customer',
				value: 'add_contact',
				action: 'Add a contact to a customer',
				routing: { request: { method: 'POST', url: '=/customers/{{$parameter.customerUUID}}/contacts' }, },
			},
			{
				name: 'Create a Customer',
				value: 'create',
				action: 'Create a customer',
				routing: { request: { method: 'POST', url: '/customers' } },
			},
			{
				name: 'Delete a Customer',
				value: 'delete',
				action: 'Delete a customer',
				routing: { request: { method: 'DELETE', url: '=/customers/{{$parameter.customerUUID}}' }, },
			},
			{
				name: "List Customer's Activities",
				value: 'list_activities',
				action: 'List activities of a customer',
				routing: {
					request: {
						method: 'GET',
						url: '=/customers/{{$parameter.customerUUID}}/activities',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
						}
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ $response.body.has_more === true }}',
								request: {
									qs: {
										per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						}
					}
				},
			},
			{
				name: "List Customer's Invoices",
				value: 'list_invoices',
				action: 'List invoices of a customer',
				routing: {
					request: {
						method: 'GET',
						url: '=/import/customers/{{$parameter.customerUUID}}/invoices',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							validation_type: '={{$parameter.validationType}}',
						}
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ $response.body.has_more === true }}',
								request: {
									qs: {
										per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
										cursor: '={{$response.body.cursor}}',
										validation_type: '={{$parameter.validationType}}',
									}
								}
							}
						}
					}
				},
			},
			{
				name: 'List Customers',
				value: 'list',
				action: 'List customers',
				routing: { 
					request: { 
						method: 'GET', 
						url: '/customers',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							system: '={{$parameter.billingSystem}}',
							data_source_uuid: '={{$parameter.dataSourceUUID}}',
							external_id: '={{$parameter.externalId}}',
							status: '={{$parameter.status}}',
						}
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ $response.body.has_more === true }}',
								request: {
									qs: {
										per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
										system: '={{$parameter.billingSystem}}',
										data_source_uuid: '={{$parameter.dataSourceUUID}}',
										external_id: '={{$parameter.externalId}}',
										status: '={{$parameter.status}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						}
					} 
				},
			},
			{
				name: 'List Customers by Email',
				value: 'list_by_email',
				action: 'List customers by email',
				routing: { 
					request: { 
						method: 'GET', 
						url: '/customers/search',
						qs: {
							per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
							email: '={{$parameter.email}}',
							with_associated_emails: '={{$parameter.includeAssociatedEmails}}',
						}
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ $response.body.has_more === true }}',
								request: {
									qs: {
										per_page: '={{$parameter.returnAll ? 200 : ($parameter.limit ?? 50)}}',
										email: '={{$parameter.email}}',
										with_associated_emails: '={{$parameter.includeAssociatedEmails}}',
										cursor: '={{$response.body.cursor}}',
									}
								}
							}
						}
					}
				},
			},
			{
				name: 'Merge Customers',
				value: 'merge',
				action: 'Merge customers',
				routing: { 
					request: { method: 'POST', url: '/customers/merges' }, 
					output: { postReceive: [{ type: 'set', properties: { value: '={{ { merged: true } }}' } }] },
				},
			},
			{
				name: 'Retrieve a Customer',
				value: 'get',
				action: 'Retrieve a customer',
				routing: { request: { method: 'GET', url: '=/customers/{{$parameter.customerUUID}}' } },
			},
			{
				name: 'Unmerge Customers',
				value: 'unmerge',
				action: 'Unmerge customers',
				routing: {
					request: {
						method: 'POST',
						url: '/customers/unmerges',
						body: { customer_uuid: '={{$parameter.customerUUID}}' },
					},
					output: {
						postReceive: [{ type: 'set', properties: { value: '={{ { unmerged: true } }}' } }],
					},
				},
			},
			{
				name: 'Update a Customer',
				value: 'update',
				action: 'Update a customer',
				routing: { request: { method: 'PATCH', url: '=/customers/{{$parameter.customerUUID}}' } },
			},
		],
		default: 'get',
	},
	...addContactDescription,
	...createDescription,
	...deleteDescription,
	...getDescription,
	...listDescription,
	...listActivitiesDescription,
	...listByEmailDescription,
	...listInvoicesDescription,
	...mergeDescription,
	...unmergeDescription,
	...updateDescription,
];
