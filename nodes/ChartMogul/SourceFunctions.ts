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
				routing: {
					request: {
						method: 'POST',
						url: '/data_sources',
					},
				},
			},
			{
				name: 'List Sources',
				value: 'list',
				action: 'List all sources',
				routing: {
					request: {
						method: 'GET',
						url: '/data_sources',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data_sources',
								},
							},
						],
					},
				},
			},
			{
				name: 'Retrieve a Source',
				value: 'get',
				action: 'Retrieve a source',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Delete a Source',
				value: 'delete',
				action: 'Delete a source',
				routing: {
					request: {
						method: 'DELETE',
					},
				},
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
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Source UUID',
		name: 'source_uuid',
		type: 'string',
		required: true,
		default: '',
		description: 'The UUID of the source',
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['get', 'delete'],
			},
		},
		routing: {
			request: {
				url: '=/data_sources/{{$value}}',
			},
		},
	},

	/* -- Optional fields -- */
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['list'],
			},
		},
		options: [
			SharedOptionItems.NameField({
				location: 'qs',
				displayName: 'Data Source Name',
				description: 'Filter results by source name',
			}),
			SharedOptionItems.BillingSystemField,
		],
	},
];
