import type { INodeProperties } from 'n8n-workflow';

export const deleteAllDescription: INodeProperties[] = [
	{
		displayName: 'Data Source UUID',
		name: 'dataSourceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Data Source',
		displayOptions: { show: { resource: ['invoice'], operation: ['deleteAll'] } },
		required: true,
	},
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		description: 'ChartMogul UUID of the Customer',
		default: '',
		displayOptions: { show: { resource: ['invoice'], operation: ['deleteAll'] } },
		required: true,
	},
];
