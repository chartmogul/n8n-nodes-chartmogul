import type { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['customer'], operation: ['list'] } },
		options: [
			{
				displayName: 'Billing System',
				name: 'billingSystem',
				type: 'string',
				default: '',
				description: 'The billing system you are using, e.g., Stripe, Recurly, etc',
				routing: { request: { qs: { system: '={{$value}}' } } },
			},
			{
				displayName: 'Data Source UUID',
				name: 'data_source_uuid',
				type: 'string',
				default: '',
				description: 'ChartMogul UUID of the Data Source',
				routing: { request: { qs: { data_source_uuid: '={{$value}}' } } },
			},
			{
				displayName: 'External ID',
				name: 'externalId',
				type: 'string',
				default: '',
				description: 'A unique identifier specified by you, typically from your internal system',
				routing: { request: { qs: { external_id: '={{$value}}' } } },
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'Active' },
					{ name: 'Cancelled', value: 'Cancelled' },
					{ name: 'New Lead', value: 'New_Lead' },
					{ name: 'Past Due', value: 'Past_Due' },
					{ name: 'Qualified Lead', value: 'Qualified_Lead' },
					{ name: 'Unqualified Lead', value: 'Unqualified_Lead' },
					{ name: 'Working Lead', value: 'Working_Lead' },
				],
				default: 'Active',
				description: 'Filter results by customer status',
				routing: { request: { qs: { status: '={{$value}}' } } },
			},
		],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['customer'], operation: ['list'] } },
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
