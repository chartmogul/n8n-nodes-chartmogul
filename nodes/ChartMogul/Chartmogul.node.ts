import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { CustomerOptionItems } from './customer-options';
import { SharedOptionItems } from './shared-options';
import { PlanOptionItems } from './plan-options';

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
						name: 'List Customers',
						value: 'list',
						action: 'List all customers',
						routing: {
							request: {
								method: 'GET',
								url: '/customers',
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
				...SharedOptionItems.NameField({
					location: 'body',
					displayName: 'Plan Name',
					description: 'The name of the plan',
				}),
				required: true,
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['create'],
					},
				},
			},
			{
				...PlanOptionItems.PlanIntervalCountField,
				required: true,
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['create'],
					},
				},
			},
			{
				...PlanOptionItems.PlanIntervalUnitField,
				required: true,
				displayOptions: {
					show: {
						resource: ['plan'],
						operation: ['create'],
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
					SharedOptionItems.NameField({
						location: 'body',
						displayName: 'Plan Name',
						description: 'The name of the plan',
					}),
					PlanOptionItems.PlanIntervalCountField,
					PlanOptionItems.PlanIntervalUnitField,
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
				options: [SharedOptionItems.ExternalIDField],
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
					SharedOptionItems.BillingSystemField,
					SharedOptionItems.CursorField,
					SharedOptionItems.DataSourceUUIDField,
					SharedOptionItems.ExternalIDField,
					SharedOptionItems.PerPageField,
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
					SharedOptionItems.NameField({
						location: 'qs',
						description: 'Filter results by source name',
					}),
					SharedOptionItems.BillingSystemField,
				],
			},
			// Customer Optional Fields
			{
				displayName: 'Filter Options',
				name: 'filterOptions',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['list'],
					},
				},
				options: [
					SharedOptionItems.BillingSystemField,
					SharedOptionItems.CursorField,
					SharedOptionItems.DataSourceUUIDField,
					SharedOptionItems.ExternalIDField,
					SharedOptionItems.PerPageField,
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Active', value: 'Active' },
							{ name: 'Cancelled', value: 'Cancelled' },
							{ name: 'New Lead', value: 'New_Lead' },
							{ name: 'Past Due', value: 'Past_Due' },
							{ name: 'Qualified Lead', value: 'Qualified_Lead' },
							{ name: 'Unqualified Lead', value: 'Unqualified_Lead' },
							{ name: 'Working Lead', value: 'Working_Lead' },
						],
						default: 'Active',
						description: 'Filter results by customer status',
						routing: { request: { qs: { status: '={{$value}}' } } },
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
						resource: ['customer'],
						operation: ['create'],
					},
				},
				options: [
					CustomerOptionItems.CityField,
					CustomerOptionItems.CompanyField,
					CustomerOptionItems.CountryField,
					CustomerOptionItems.CustomAttributesField,
					CustomerOptionItems.FreeTrialField,
					CustomerOptionItems.LeadCreatedField,
					CustomerOptionItems.OwnerField,
					CustomerOptionItems.PrimaryContactField,
					CustomerOptionItems.StateField,
					CustomerOptionItems.TagsField,
					CustomerOptionItems.WebsiteURLField,
					CustomerOptionItems.ZipCodeField,
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
						resource: ['customer'],
						operation: ['update'],
					},
				},
				options: [
					CustomerOptionItems.CityField,
					CustomerOptionItems.CompanyField,
					CustomerOptionItems.CountryField,
					CustomerOptionItems.CustomAttributesField,
					CustomerOptionItems.FreeTrialField,
					CustomerOptionItems.LeadCreatedField,
					CustomerOptionItems.OwnerField,
					CustomerOptionItems.PrimaryContactField,
					CustomerOptionItems.StateField,
					CustomerOptionItems.StatusField,
					CustomerOptionItems.TagsField,
					CustomerOptionItems.WebsiteURLField,
					CustomerOptionItems.ZipCodeField,
				],
			},
		],
	};
}
