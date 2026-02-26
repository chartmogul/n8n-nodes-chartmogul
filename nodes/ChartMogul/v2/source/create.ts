import type { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Data Source Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The name of the source to create',
		required: true,
		displayOptions: { show: { resource: ['source'], operation: ['create'] } },
		routing: { request: { body: { name: '={{$value}}', } } },
	},
];