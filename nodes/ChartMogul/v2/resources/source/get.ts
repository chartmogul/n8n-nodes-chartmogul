import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSourceGet = {
	resource: ['source'],
	operation: ['get'],
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Data Source UUID',
		name: 'dataSourceUUID',
		description: 'The UUID of the data source to retrieve',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForSourceGet,
		},
	},
];
