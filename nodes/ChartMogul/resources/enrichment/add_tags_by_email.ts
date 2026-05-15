import type { INodeProperties } from 'n8n-workflow';

export const addTagsByEmailDescription: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description: 'Email address of the customer',
		displayOptions: { show: { resource: ['enrichment'], operation: ['add_tags_by_email'] } },
		required: true,
		routing: { request: { body: { email: '={{$value}}' } } },
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		placeholder: 'vip, important, trial',
		description: 'Comma-separated list of tags to add',
		displayOptions: { show: { resource: ['enrichment'], operation: ['add_tags_by_email'] } },
		required: true,
		routing: { request: { body: { tags: '={{$value.split(",").map(tag => tag.trim())}}' } } },
	},
];
