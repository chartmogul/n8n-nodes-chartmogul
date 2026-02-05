import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSourceCreate = {
	resource: ['source'],
	operation: ['create'],
};

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		description: 'The desired name for the new data source',
		type: 'string',
		required: true,
		default: '',
		routing: {
			request: {
				body: {
					name: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: showOnlyForSourceCreate,
		},
	},
];
