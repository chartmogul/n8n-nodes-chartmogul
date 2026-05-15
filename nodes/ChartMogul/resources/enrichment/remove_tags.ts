import type { INodeProperties } from 'n8n-workflow';

export const removeTagsDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['enrichment'], operation: ['remove_tags'] } },
		required: true,
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		placeholder: 'vip, important, trial',
		description: 'Comma-separated list of tags to remove',
		displayOptions: { show: { resource: ['enrichment'], operation: ['remove_tags'] } },
		required: true,
		routing: { request: { body: { tags: '={{$value.split(",").map(tag => tag.trim())}}' } } },
	},
];
