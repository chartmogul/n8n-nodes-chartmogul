import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

export const enrichmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['enrichment'],
			},
		},
		options: [
			{
				name: 'Add Custom Attributes to a Customer',
				value: 'add_attributes',
				action: 'Add custom attributes to a customer',
				routing: {
					request: {
						method: 'POST',
					},
				},
			},
			{
				name: 'Add Custom Attributes to a Customer by Email',
				value: 'add_attributes_by_email',
				action: 'Add custom attributes to a customer by email',
				routing: {
					request: {
						method: 'POST',
						url: '/customers/attributes/custom',
					},
				},
			},
			{
				name: 'Add Tags to a Customer',
				value: 'add_tags',
				action: 'Add tags to a customer',
				routing: {
					request: {
						method: 'POST',
					},
				},
			},
			{
				name: 'Add Tags to a Customer by Email',
				value: 'add_tags_by_email',
				action: 'Add tags to a customer by email',
				routing: {
					request: {
						method: 'POST',
						url: '/customers/attributes/tags',
					},
				},
			},
			{
				name: 'Remove Custom Attributes From a Customer',
				value: 'remove_attributes',
				action: 'Remove custom attributes from a customer',
				routing: {
					request: {
						method: 'DELETE',
					},
				},
			},
			{
				name: 'Remove Tags From a Customer',
				value: 'remove_tags',
				action: 'Remove tags from a customer',
				routing: {
					request: {
						method: 'DELETE',
					},
				},
			},
			{
				name: 'Retrieve Customer\'s Tags and Attributes',
				value: 'get',
				action: 'Retrieve tags and attributes of a customer',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
		],
		default: 'get',
	},
];

export const enrichmentFields: INodeProperties[] = [
	/* -- Required fields -- */
	{
		...SharedOptionItems.CustomerUUIDField({
			location: 'path',
			pathURL: '=/customers/{{$value}}/attributes/tags',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['add_tags', 'remove_tags'],
			},
		},
	},
	{
		...SharedOptionItems.CustomerUUIDField({
			location: 'path',
			pathURL: '=/customers/{{$value}}/attributes',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['get'],
			},
		},
	},
	{
		...SharedOptionItems.CustomerUUIDField({
			location: 'path',
			pathURL: '=/customers/{{$value}}/attributes/custom',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['add_attributes', 'remove_attributes'],
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description: 'Email address of the customer',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['add_tags_by_email', 'add_attributes_by_email'],
			},
		},
		routing: { request: { body: { email: '={{$value}}' } } },
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		placeholder: 'vip, important, trial',
		description: 'Comma-separated list of tags to add or remove',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['add_tags', 'add_tags_by_email', 'remove_tags'],
			},
		},
		routing: { request: { body: { tags: '={{$value.split(",").map(tag => tag.trim())}}', } } }, 
	},
	{
		displayName: 'Custom Attributes',
		name: 'custom',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true, },
		default: [],
		required: true,
		placeholder: 'Add Attribute',
		options: [
			{
				name: 'attribute',
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
						displayOptions: { show: { type: ['Boolean'], }, },
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'number',
						default: 0,
						displayOptions: { show: { type: ['Decimal', 'Integer'], }, },
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						displayOptions: { show: { type: ['String'], }, },
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'dateTime',
						default: '',
						displayOptions: { show: { type: ['Timestamp'], }, },
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['add_attributes', 'add_attributes_by_email'],
			},
		},
		routing: { request: { body: { custom: '={{$value}}' } } },	
	},
	{
		displayName: 'Attributes to Remove',
		name: 'custom',
		type: 'string',
		default: '',
		placeholder: 'attribute_key_1, attribute_key_2',
		description: 'Comma-separated list of custom attribute keys to remove',
		required: true,
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['remove_attributes'],
			},
		},
		routing: { request: { body: { custom: '={{$value.split(",").map(attr => attr.trim())}}', } } },	
	}
];
