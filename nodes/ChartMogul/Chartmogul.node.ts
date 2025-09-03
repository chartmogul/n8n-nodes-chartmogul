import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Chartmogul implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ChartMogul',
		name: 'chartmogul',
		icon: 'file:chartmogul.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ChartMogul API',
		defaults: {
			name: 'ChartMogul',
			//color: '#1A82e2',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'chartmogulApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.chartmogul.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Source',
						value: 'source',
					}
				],
				default: 'account',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Get Account Details',
						value: 'get',
						action: 'Get account details',
						routing: {
							request: {
								method: 'GET',
								url: '/account',
							},
						},
					},
				],
				default: 'get',
			},
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
			{
				displayName: 'Source Name',
				name: 'source_name',
				type: 'string',
				required: true,
				default: '',
				description: 'The desired name for the new source',
				displayOptions: {
					show: {
						resource: [
							'source'
						],
						operation: [
							'create'
						]
					}
				},
				routing: {
					request: {
						body: {
							name: '={{$value}}',
						},
					},
				}
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
						resource: [
							'source'
						],
						operation: [
							'get', 'delete'
						]
					}
				},
				routing: {
					request: {
						url: '=/data_sources/{{$value}}',
					},
				}
			}
		],
	};
}
