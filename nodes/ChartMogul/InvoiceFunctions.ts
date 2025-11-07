import type { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
			},
		},
		options: [
			{
				name: 'Create an Invoice',
				value: 'create',
				action: 'Create an invoice',
				routing: { 
					request: {
						method: 'POST', 
						url: '=/import/customers/{{$parameter.customer_uuid}}/invoices',
						body: `={{ (() => {
							const inv = { ...( $parameter.invoice || {} ) };
							const item = inv.line_items || {};
							const items = [];
							if (item.one_time.length > 0) {
								items.push(...item.one_time);
							}
							if (item.subscription.length > 0) {
								items.push(...item.subscription);
							}
							inv.line_items = items;				

							return { invoices: [ inv ] };
						})() }}`,
					} 
				},
			},
			/*{
				name: 'Delete an Invoice',
				value: 'delete',
				action: 'Delete an invoice',
				routing: { request: { method: 'DELETE' } },
			},
			{
				name: 'Delete All Invoices of a Customer',
				value: 'deleteAll',
				action: 'Delete all invoices of a customer',
				routing: { request: { method: 'DELETE' } },
			},
			{
				name: 'Diasble an Invoice',
				value: 'disable',
				action: 'Disable an invoice',
				routing: { request: { method: 'PATCH' } },
			},
			{
			}*/
		],
		default: 'create',
	}
];

export const invoiceFields: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customer_uuid',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		description: 'ChartMogul UUID of the Customer'
	},
	{
		displayName: 'Invoice',
		name: 'invoice',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['create'],
			},
		},
		options: [
			{ 
				displayName: 'Collection Method', name: 'collection_method', type: 'options', 
				options: [
					{ name: 'Automatic', value: 'automatic' },
					{ name: 'Manual', value: 'manual' },
				], 	
				default: 'automatic' 
			},
			{ displayName: 'Currency', name: 'currency', type: 'string', default: '', placeholder: 'USD' },
			{ displayName: 'Customer External ID', name: 'customer_external_id', type: 'string', default: '' },
			{ displayName: 'Date', name: 'date', type: 'dateTime', default: '', required: true },
			{ displayName: 'Due Date', name: 'due_date', type: 'dateTime', default: '', required: true },
			{ displayName: 'External ID', name: 'external_id', type: 'string', default: '' },
			{ 
				displayName: 'Line Items',
				name: 'line_items',
				type: 'fixedCollection',
				placeholder: 'Add Line Item',
				typeOptions: { multipleValues: true, },
				default: {},
				options: [
					{ 
						displayName: 'One Time',
						name: 'one_time',
						values: [
							{ displayName: 'Amount in Cents', name: 'amount_in_cents', type: 'number', default: 0, required: true },
							{ displayName: 'Description', name: 'description', type: 'string', default: '' },
							{ displayName: 'Quantity', name: 'quantity', type: 'number', default: 1 },
							{ displayName: 'Type', name: 'type', type: 'hidden', default: 'one_time' },
						],
					},
					{ 
						displayName: 'Subscription',
						name: 'subscription',
						values: [
							{ displayName: 'Amount in Cents', name: 'amount_in_cents', type: 'number', default: 0 },
						//	{ displayName: 'Description', name: 'description', type: 'string', default: '' },
						//	{ displayName: 'Quantity', name: 'quantity', type: 'number', default: 1 },
							{ displayName: 'Type', name: 'type', type: 'hidden', default: 'subscription' },
						],
					}
				]
			}
		],
	}
];
