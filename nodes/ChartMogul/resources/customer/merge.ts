import type { INodeProperties } from 'n8n-workflow';

export const mergeDescription: INodeProperties[] = [
	{
		displayName: 'Merge Using',
		name: 'merge_using',
		type: 'options',
		default: 'customer_uuid_merge',
		description: 'Choose how to merge the customers',
		options: [
			{
				name: 'Customer UUID',
				value: 'customer_uuid_merge',
			},
			{
				name: 'Data Source UUID & External ID',
				value: 'data_source_uuid_external_id_merge',
			},
		],
		displayOptions: { show: { resource: ['customer'], operation: ['merge'] } },
		required: true,
	},
	{
		displayName: 'Merge From',
		name: 'merge_from',
		type: 'string',
		default: '',
		description: 'Merge from this customer',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['customer_uuid_merge'],
			},
		},
		required: true,
		routing: { request: { body: { from: { customer_uuid: '={{$value}}' } } } },
	},
	{
		displayName: 'Merge Into',
		name: 'merge_into',
		type: 'string',
		default: '',
		description: 'Merge into this customer',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['customer_uuid_merge'],
			},
		},
		required: true,
		routing: { request: { body: { into: { customer_uuid: '={{$value}}' } } } },
	},
	{
		displayName: 'Merge From',
		name: 'merge_from',
		type: 'fixedCollection',
		default: {},
		description: 'Merge from this customer',
		options: [
			{
				name: 'mergeFrom',
				displayName: 'Merge From',
				values: [
					{
						displayName: 'Data Source UUID',
						name: 'data_source_uuid',
						type: 'string',
						description: 'Data Source UUID of the customer to merge from',
						default: '',
					},
					{
						displayName: 'External ID',
						name: 'external_id',
						type: 'string',
						description: 'External ID of the customer to merge from',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['data_source_uuid_external_id_merge'],
			},
		},
		required: true,
		routing: {
			request: {
				body: {
					from: {
						data_source_uuid: '={{$value.mergeFrom.data_source_uuid}}',
						external_id: '={{$value.mergeFrom.external_id}}',
					},
				},
			},
		},
	},
	{
		displayName: 'Merge Into',
		name: 'merge_into',
		type: 'fixedCollection',
		default: {},
		description: 'Merge into this customer',
		options: [
			{
				name: 'mergeInto',
				displayName: 'Merge Into',
				values: [
					{
						displayName: 'Data Source UUID',
						name: 'data_source_uuid',
						type: 'string',
						description: 'Data Source UUID of the customer to merge into',
						default: '',
					},
					{
						displayName: 'External ID',
						name: 'external_id',
						type: 'string',
						description: 'External ID of the customer to merge into',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['data_source_uuid_external_id_merge'],
			},
		},
		required: true,
		routing: {
			request: {
				body: {
					into: {
						data_source_uuid: '={{$value.mergeInto.data_source_uuid}}',
						external_id: '={{$value.mergeInto.external_id}}',
					},
				},
			},
		},
	},
];
