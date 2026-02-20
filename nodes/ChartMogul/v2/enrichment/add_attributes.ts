import type { INodeProperties } from 'n8n-workflow';

export const addAttributesDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['enrichment'], operation: ['add_attributes'] } },
		required: true,
	},
	{
		displayName: 'Custom Attributes',
		name: 'custom',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: [],
		placeholder: 'Add Attribute',
		options: [
			{
				name: 'custom',
				displayName: 'Attribute',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						description: 'Name of the custom attribute',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'String',
						options: [
							{ name: 'Boolean', value: 'Boolean' },
							{ name: 'Decimal', value: 'Decimal' },
							{ name: 'Integer', value: 'Integer' },
							{ name: 'String', value: 'String' },
							{ name: 'Timestamp', value: 'Timestamp' },
						],
						description: 'Type of the custom attribute',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'boolean',
						default: false,
						displayOptions: { show: { type: ['Boolean'] } },
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'number',
						default: 0,
						displayOptions: { show: { type: ['Decimal', 'Integer'] } },
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						displayOptions: { show: { type: ['String'] } },
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'dateTime',
						default: '',
						displayOptions: { show: { type: ['Timestamp'] } },
					},
				],
			},
		],
		displayOptions: { show: { resource: ['enrichment'], operation: ['add_attributes'] } },
		required: true,
		routing: { request: { body: '={{$value}}' } },
	},
];
