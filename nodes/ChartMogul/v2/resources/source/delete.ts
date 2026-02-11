import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSourceDelete = {
	resource: ['source'],
	operation: ['delete'],
};

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Data Source UUID',
		name: 'dataSourceUUID',
		description: 'The UUID of the data source to delete',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForSourceDelete,
		},
	},
];
