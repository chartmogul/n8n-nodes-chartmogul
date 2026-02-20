import type { INodeProperties } from 'n8n-workflow';

export const removeAttributesDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['enrichment'], operation: ['remove_attributes'] } },
		required: true,
	},
	{
		displayName: 'Attributes to Remove',
		name: 'custom',
		type: 'string',
		default: '',
		placeholder: 'attribute_key_1, attribute_key_2',
		description: 'Comma-separated list of custom attribute keys to remove',
		displayOptions: { show: { resource: ['enrichment'], operation: ['remove_attributes'] } },
		required: true,
		routing: { request: { body: { custom: '={{$value.split(",").map(attr => attr.trim())}}' } } },
	},
];
