import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Data Source UUID',
		name: 'dataSourceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Data Source',
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['delete'],
			},
		},
	},
];