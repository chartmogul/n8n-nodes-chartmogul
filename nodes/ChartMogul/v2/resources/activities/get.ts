import type { INodeProperties } from 'n8n-workflow';

const showOnlyForActivitiesGet = {
	resource: ['activities'],
	operation: ['get'],
};

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Export ID',
		name: 'id',
		description: 'The ID of the export to retrieve',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForActivitiesGet,
		},
	},
];
