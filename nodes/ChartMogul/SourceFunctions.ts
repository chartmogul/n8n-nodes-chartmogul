import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

export const sourceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Create a Source',
				value: 'create',
				action: 'Create a source',
				routing: { request: { method: 'POST', url: '/data_sources' } },
			},
			{
				name: 'List Sources',
				value: 'list',
				action: 'List all sources',
				routing: {
					request: { method: 'GET', url: '/data_sources' },
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'data_sources' },
							},
						],
					},
				},
			},
			{
				name: 'Retrieve a Source',
				value: 'get',
				action: 'Retrieve a source',
				routing: { request: { method: 'GET', url: '=/data_sources/{{$parameter.dataSourceUUID}}' } },
			},
			{
				name: 'Delete a Source',
				value: 'delete',
				action: 'Delete a source',
				routing: { request: { method: 'DELETE', url: '=/data_sources/{{$parameter.dataSourceUUID}}' } },
			},
		],
		default: 'create',
	},
];

export const sourceFields: INodeProperties[] = [
	/* -- Required fields -- */
	{
		...SharedOptionItems.NameField({
			location: 'body',
			displayName: 'Data Source Name',
			description: 'The desired name for the new data source',
		}),
		displayOptions: { show: { resource: ['source'], operation: ['create'] } },
		required: true,
	},
	{	
		displayName: 'Data Source UUID',
		name: 'dataSourceUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Data Source',
		displayOptions: { show: { resource: ['source'], operation: ['get', 'delete'] } },
		required: true,
	},

	/* -- Optional fields -- */
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter results by source name',
				routing: { request: { qs: { name: '={{$value}}', }, }, },
			},
			{
				displayName: 'Billing System',
				name: 'system',
				type: 'string',
				default: '',
				description: 'Filter results by billing system',
				routing: { request: { qs: { system: '={{$value}}', }, }, },
			}
		],
		displayOptions: { show: { resource: ['source'], operation: ['list'] } },
	},
];
