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
					{ name: 'Account', value: 'account' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Plan', value: 'plan' },
					{ name: 'Source', value: 'source' },
					{ name: 'Transaction', value: 'transaction' },
				],
				default: 'account',
			},
			// Account Operations
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
			// Plan Operations
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
			// Source Operations
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
			// Customer Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['customer'],
					},
				},
				options: [
					{
						name: 'Create a Customer',
						value: 'create',
						action: 'Create a customer',
						routing: {
							request: {
								method: 'POST',
								url: '/customers',
							},
						},
					},
					{
						name: 'Delete a Customer',
						value: 'delete',
						action: 'Delete a customer',
						routing: {
							request: {
								method: 'DELETE',
							},
						},
					},
					{
						name: 'Retrieve a Customer',
						value: 'get',
						action: 'Retrieve a customer',
						routing: {
							request: {
								method: 'GET',
							},
						},
					},
					{
						name: 'Update a Customer',
						value: 'update',
						action: 'Update a customer',
						routing: {
							request: {
								method: 'PATCH',
							},
						},
					},
				],
				default: 'get',
			},
			// Shared Required Fields
			{
				displayName: 'Data Source UUID',
				name: 'source_uuid',
				type: 'string',
				required: true,
				default: '',
				description: 'The UUID of the source',
				displayOptions: {
					show: {
						resource: ['plan', 'customer'],
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
			// Customer Required Fields
			{
				displayName: 'Customer UUID',
				name: 'customer_uuid',
				type: 'string',
				required: true,
				default: '',
				description: 'The UUID of the customer',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['get', 'delete', 'update'],
					},
				},
				routing: {
					request: {
						url: '=/customers/{{$value}}',
					},
				},
			},
			{
				displayName: 'External ID',
				name: 'external_id',
				type: 'string',
				required: true,
				default: '',
				description: 'A unique identifier specified by you, typically from your internal system',
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create'],
					},
				},
				routing: {
					request: {
						body: {
							external_id: '={{$value}}',
						},
					},
				},
			},
			// Source Required Fields
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
			// Plan Required Fields
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
			// Plan Optional Fields
			{
				displayName: 'Update Options',
				name: 'additionalFields',
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
			// Source Optional Fields
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
			// Customer Optional Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
						description: 'The city where the customer is located',
						routing: {
							request: {
								body: {
									city: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Company',
						name: 'company',
						type: 'string',
						default: '',
						description: "The customer's company or organization",
						routing: {
							request: {
								body: {
									company: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'The two-letter ISO code for the customer’s country',
						routing: {
							request: {
								body: {
									country: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Custom Attributes',
						name: 'custom',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						default: {},
						placeholder: 'Add a Custom Attribute',
						options: [
							{
								name: 'custom',
								displayName: 'Custom Attribute',
								values: [
									{
										displayName: 'Key',
										name: 'key',
										type: 'string',
										default: '',
										description: 'The name of the custom attribute',
									},
									{
										displayName: 'Type',
										name: 'type',
										type: 'options',
										options: [
											{ name: 'Boolean', value: 'Boolean' },
											{ name: 'Decimal', value: 'Decimal' },
											{ name: 'Integer', value: 'Integer' },
											{ name: 'String', value: 'String' },
											{ name: 'Timestamp', value: 'Timestamp' },
										],
										default: 'String',
										description: 'The type of the custom attribute',
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										default: '',
										description: 'The value of the custom attribute',
										displayOptions: {
											show: {
												type: ['String'],
											},
										},
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'number',
										typeOptions: {
											numberPrecision: 0,
										},
										default: '',
										description: 'The value of the custom attribute',
										displayOptions: {
											show: {
												type: ['Integer'],
											},
										},
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'number',
										typeOptions: {
											numberPrecision: 2,
										},
										default: '',
										description: 'The value of the custom attribute',
										displayOptions: {
											show: {
												type: ['Decimal'],
											},
										},
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'dateTime',
										default: '',
										description: 'The value of the custom attribute',
										displayOptions: {
											show: {
												type: ['Timestamp'],
											},
										},
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'boolean',
										default: false,
										description: 'Whether the custom attribute is true or false',
										displayOptions: {
											show: {
												type: ['Boolean'],
											},
										},
									},
								],
							},
						],
						routing: {
							request: {
								body: {
									attributes: {
										custom:
											'={{$value.custom.map(item => ({ key: item.key, value: item.value, type: item.type }))}}',
									},
								},
							},
						},
					},
					{
						displayName: 'Free Trial Started At',
						name: 'free_trial_started_at',
						type: 'dateTime',
						default: '',
						description: 'The date and time the customer started their free trial',
						routing: {
							request: {
								body: {
									free_trial_started_at: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Lead Created At',
						name: 'lead_created_at',
						type: 'dateTime',
						default: '',
						description: 'The date and time the lead was created',
						routing: {
							request: {
								body: {
									lead_created_at: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Owner',
						name: 'owner',
						type: 'string',
						default: '',
						description:
							'The email of the account owner or manager for this customer - must exist as a user in ChartMogul',
						routing: {
							request: {
								body: {
									owner: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Primary Contact',
						name: 'primary_contact',
						type: 'collection',
						default: {},
						placeholder: 'Add contact details',
						options: [
							{
								displayName: 'Email',
								name: 'email',
								type: 'string',
								default: '',
								placeholder: 'name@email.com',
								description: "The contact's email address",
								routing: {
									request: {
										body: {
											primary_contact: {
												email: '={{$value}}',
											},
										},
									},
								},
							},
							{
								displayName: 'First Name',
								name: 'first_name',
								type: 'string',
								default: '',
								description: "The contact's first name",
								routing: {
									request: {
										body: {
											primary_contact: {
												first_name: '={{$value}}',
											},
										},
									},
								},
							},
							{
								displayName: 'Last Name',
								name: 'last_name',
								type: 'string',
								default: '',
								description: "The contact's last name",
								routing: {
									request: {
										body: {
											primary_contact: {
												last_name: '={{$value}}',
											},
										},
									},
								},
							},
							{
								displayName: 'LinkedIn',
								name: 'linked_in',
								type: 'string',
								default: '',
								description: "The contact's LinkedIn profile URL",
								routing: {
									request: {
										body: {
											primary_contact: {
												linked_in: '={{$value}}',
											},
										},
									},
								},
							},
							{
								displayName: 'Notes',
								name: 'notes',
								type: 'string',
								typeOptions: {
									rows: 4,
								},
								description: 'Any additional notes you wish to add about the contact',
								routing: {
									request: {
										body: {
											primary_contact: {
												notes: '={{$value}}',
											},
										},
									},
								},
								default: '',
							},
							{
								displayName: 'Phone',
								name: 'phone',
								type: 'string',
								default: '',
								description: "The contact's phone number",
								routing: {
									request: {
										body: {
											primary_contact: {
												phone: '={{$value}}',
											},
										},
									},
								},
							},
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: "The customer's job title",
								routing: {
									request: {
										body: {
											primary_contact: {
												title: '={{$value}}',
											},
										},
									},
								},
							},
							{
								displayName: 'Twitter',
								name: 'twitter',
								type: 'string',
								default: '',
								description: "The contacts's Twitter URL",
								routing: {
									request: {
										body: {
											primary_contact: {
												twitter: '={{$value}}',
											},
										},
									},
								},
							},
						],
					},
					{
						displayName: 'State',
						name: 'state',
						type: 'string',
						default: '',
						description: 'The ISO US State code where the customer is located',
						hint: 'Works only if country is "US"',
						routing: {
							request: {
								body: {
									state: '={{$value}}',
								},
							},
						},
					},
					/* {
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'New Lead', value: 'New Lead' },
							{ name: 'Working Lead', value: 'Working Lead' },
							{ name: 'Qualified Lead', value: 'Qualified Lead' },
							{ name: 'Unqualified Lead', value: 'Unqualified Lead' },
						],
						default: 'New Lead',
						description: "The customer's status",
						hint: "You can only set a customer's lead status. Other statuses are automatically assigned\.",
						routing: {
							request: {
								body: {
									status: '={{$value}}',
								},
							},
						},
						displayOptions: {
							show: {
								operation: ['update'],
							},
						},
					}, */
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'A list of tags to apply to the customer (comma-separated)',
						routing: {
							request: {
								body: {
									attributes: {
										tags: '={{$value.split(",").map(tag => tag.trim())}}',
									},
								},
							},
						},
					},
					{
						displayName: 'Website URL',
						name: 'website_url',
						type: 'string',
						default: '',
						description: "The customer's website URL",
						routing: {
							request: {
								body: {
									website_url: '={{$value}}',
								},
							},
						},
					},
					{
						displayName: 'Zip Code',
						name: 'zip_code',
						type: 'string',
						default: '',
						description: 'The zip code where the customer is located',
						routing: {
							request: {
								body: {
									zip: '={{$value}}',
								},
							},
						},
					},
				],
			},
		],
	};
}
