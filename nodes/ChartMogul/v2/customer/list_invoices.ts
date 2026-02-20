import type { INodeProperties } from 'n8n-workflow';

export const listInvoicesDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['customer'], operation: ['list_invoices'] } },
		required: true,
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['customer'], operation: ['list_invoices'] } },
		options: [
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				default: '',
				description:
					'Set the cursor for use in pagination. To fetch the next page of results, set the cursor to the value of the "cursor" field in the previous response.',
				routing: { request: { qs: { cursor: '={{$value}}' } } },
			},
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 200 },
				default: 200,
				description: 'The number of records to return. Default and max is 200.',
				routing: { request: { qs: { per_page: '={{$value}}' } } },
			},
		],
	},
];
