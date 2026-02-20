import type { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['list'] } },
		options: [
			{
				displayName: 'Data Source UUID',
				name: 'dataSourceUUID',
				type: 'string',
				default: '',
				description: 'ChartMogul UUID of the Data Source',
				routing: { request: { qs: { data_source_uuid: '={{$value}}' } } },
			},
			{
				displayName: 'Customer UUID',
				name: 'customerUUID',
				type: 'string',
				description: 'ChartMogul UUID of the Customer',
				default: '',
				routing: { request: { qs: { customer_uuid: '={{$value}}' } } },
			},
			{
				displayName: 'Invoice External ID',
				name: 'externalId',
				type: 'string',
				default: '',
				description: 'The external ID of the invoice',
				routing: { request: { qs: { external_id: '={{$value}}' } } },
			},
			{
				displayName: 'Validation Type',
				name: 'validationType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Valid', value: 'valid' },
					{ name: 'Invalid', value: 'invalid' },
				],
				default: 'valid',
				routing: { request: { qs: { validation_type: '={{$value}}' } } },
			},
			{
				displayName: 'Include Edit History',
				name: 'include_edit_histories',
				type: 'boolean',
				default: false,
				description: 'Whether to include the edit_history_summary objects in the response',
				routing: { request: { qs: { include_edit_histories: '={{$value}}' } } },
			},
			{
				displayName: 'Include Disabled Line Items',
				name: 'with_disabled',
				type: 'boolean',
				default: false,
				description: 'Whether to include disabled line items in the response',
				routing: { request: { qs: { with_disabled: '={{$value}}' } } },
			},
		],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['invoice'], operation: ['list'] } },
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
