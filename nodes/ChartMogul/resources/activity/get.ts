import type { INodeProperties } from 'n8n-workflow';

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Export ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The ID of the activities export to retrieve',
		required: true,
		displayOptions: { show: { resource: ['activities'], operation: ['get'] } },
	},
];