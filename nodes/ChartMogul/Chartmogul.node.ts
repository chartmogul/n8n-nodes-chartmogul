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
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Plan',
						value: 'plan',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Transaction',
						value: 'transaction',
					},
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
						resource: ['plan'],
					},
				},
				options: [
					{
						name: 'Create a Plan',
						value: 'create',
						action: 'Create a plan',
						routing: {
							request: {
								method: 'POST',
								url: '/plans',
							},
						},
					},
					{
						name: 'Delete a Plan',
						value: 'delete',
						action: 'Delete a plan',
						routing: {
							request: {
								method: 'DELETE',
							},
						},
					},
					{
						name: 'List Plans',
						value: 'list',
						action: 'List all plans',
						routing: {
							request: {
								method: 'GET',
								url: '/plans',
							},
						},
					},
					{
						name: 'Retrieve a Plan',
						value: 'get',
						action: 'Retrieve a plan',
						routing: {
							request: {
								method: 'GET',
							},
						},
					},
					{
						name: 'Update a Plan',
						value: 'update',
						action: 'Update a plan',
						routing: {
							request: {
								method: 'PATCH',
							},
						},
					},
				],
				default: 'list',
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
						resource: ['source'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							name: '={{$value}}',
						},
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
			{
				displayName: 'Plan UUID',
				name: 'plan_uuid',
				type: 'string',
				required: true,
				default: '',
				description: 'The UUID of the plan',
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['get', 'delete', 'update'],
					},
				},
				routing: {
					request: {
						url: '=/plans/{{$value}}',
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
						resource: ['plan'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							data_source_uuid: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Plan Name',
				name: 'plan_name',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the plan',
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							name: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Plan Interval Count',
				name: 'interval_count',
				type: 'number',
				required: true,
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: 'The frequency of the billing interval',
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							interval_count: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Plan Interval Unit',
				name: 'interval_unit',
				type: 'options',
				required: true,
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'Month',
						value: 'month',
					},
					{
						name: 'Year',
						value: 'year',
					},
				],
				default: 'month',
				description: 'The unit of the billing interval',
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							interval_unit: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Update Options',
				name: 'addtionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Plan Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the plan',
						routing: {
							request: {
								body: {
									name: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Plan Interval Count',
						name: 'interval_count',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 1,
						description: 'The frequency of the billing interval',
						routing: {
							request: {
								body: {
									interval_count: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Plan Interval Unit',
						name: 'interval_unit',
						type: 'options',
						options: [
							{
								name: 'Day',
								value: 'day',
							},
							{
								name: 'Month',
								value: 'month',
							},
							{
								name: 'Year',
								value: 'year',
							},
						],
						default: 'month',
						description: 'The unit of the billing interval',
						routing: {
							request: {
								body: {
									interval_unit: '={{$value}}',
								},
							},
						},
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Define External ID',
				default: {},
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'External ID',
						name: 'external_id',
						type: 'string',
						default: '',
						description: 'A unique identifier for the plan',
						routing: {
							request: {
								body: {
									external_id: '={{$value}}',
								},
							},
						},
					},
				],
			},
			{
				displayName: 'Filter Options',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['list'],
					},
				},
				options: [
					{
						displayName: 'Cursor',
						name: 'cursor',
						type: 'string',
						default: '',
						description:
							'Set the cursor for use in pagination. To fetch the next page of results, set the cursor to the value of the "cursor" field in the previous response.',
						routing: {
							request: {
								qs: {
									cursor: '={{$value}}',
								},
							},
						},
					},

					{
						displayName: 'External ID',
						name: 'external_id',
						type: 'string',
						default: '',
						description: 'Filter results by external ID',
						routing: {
							request: {
								qs: {
									external_id: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 200,
						},
						default: 200,
						description: 'Number of results to return per page. Default and max is 200.',
						routing: {
							request: {
								qs: {
									per_page: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Source UUID',
						name: 'source_uuid',
						type: 'string',
						default: '',
						description: 'Filter results by source UUID',
						routing: {
							request: {
								qs: {
									data_source_uuid: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'System',
						name: 'system',
						type: 'string',
						default: '',
						description: 'Filter results by type of billing system e.g. Stripe, Recurly, or Custom',
						routing: {
							request: {
								qs: {
									system: '={{$value}}',
								},
							},
						},
					},
				],
			},
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
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Filter results by source name',
						routing: {
							request: {
								qs: {
									name: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'System',
						name: 'system',
						type: 'string',
						default: '',
						description: 'Filter results by type of billing system e.g. Stripe, Recurly, or Custom',
						routing: {
							request: {
								qs: {
									system: '={{$value}}',
								},
							},
						},
					},
				],
			},
		],
	};
}
