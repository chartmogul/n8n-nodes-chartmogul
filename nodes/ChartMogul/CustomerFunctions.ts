import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './shared-options';

const CityField: INodeProperties = {
	displayName: 'City',
	name: 'city',
	type: 'string',
	default: '',
	description: 'The city where the customer is located',
	routing: { request: { body: { city: '={{$value}}' } } },
};

const CompanyField: INodeProperties = {
	displayName: 'Company',
	name: 'company',
	type: 'string',
	default: '',
	description: "The customer's company or organization",
	routing: { request: { body: { company: '={{$value}}' } } },
};

const CountryField: INodeProperties = {
	displayName: 'Country',
	name: 'country',
	type: 'string',
	default: '',
	description: "The two-letter ISO code for the customer's country",
	routing: { request: { body: { country: '={{$value}}' } } },
};

const CustomAttributesField: INodeProperties = {
	displayName: 'Custom Attributes',
	name: 'custom',
	type: 'fixedCollection',
	typeOptions: { multipleValues: true },
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

				// Value Variants
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					description: 'The value of the custom attribute',
					displayOptions: { show: { type: ['String'] } },
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'number',
					typeOptions: { numberPrecision: 0 },
					default: '',
					description: 'The value of the custom attribute',
					displayOptions: { show: { type: ['Integer'] } },
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'number',
					typeOptions: { numberPrecision: 2 },
					default: '',
					description: 'The value of the custom attribute',
					displayOptions: { show: { type: ['Decimal'] } },
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'dateTime',
					default: '',
					description: 'The value of the custom attribute',
					displayOptions: { show: { type: ['Timestamp'] } },
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'boolean',
					default: false,
					description: 'Whether the custom attribute is true or false',
					displayOptions: { show: { type: ['Boolean'] } },
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
};

const FreeTrialField: INodeProperties = {
	displayName: 'Free Trial Started At',
	name: 'free_trial_started_at',
	type: 'dateTime',
	default: '',
	description: 'The date and time the customer started their free trial',
	routing: { request: { body: { free_trial_started_at: '={{$value}}' } } },
};

const LeadCreatedField: INodeProperties = {
	displayName: 'Lead Created At',
	name: 'lead_created_at',
	type: 'dateTime',
	default: '',
	description: 'The date and time the lead was created',
	routing: { request: { body: { lead_created_at: '={{$value}}' } } },
};

const OwnerField: INodeProperties = {
	displayName: 'Owner',
	name: 'owner',
	type: 'string',
	default: '',
	description:
		'The email of the account owner or manager for this customer - must exist as a user in ChartMogul',
	routing: { request: { body: { owner: '={{$value}}' } } },
};

const PrimaryContactField: INodeProperties = {
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
			description: "The contact's job title",
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
			description: "The contact's Twitter URL",
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
};

const StateField: INodeProperties = {
	displayName: 'State',
	name: 'state',
	type: 'string',
	default: '',
	description: 'The ISO US State code where the customer is located',
	hint: 'Works only if country is "US"',
	routing: { request: { body: { state: '={{$value}}' } } },
};

const StatusField: INodeProperties = {
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
	routing: { request: { body: { status: '={{$value}}' } } },
};

const TagsField: INodeProperties = {
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
};

const WebsiteURLField: INodeProperties = {
	displayName: 'Website URL',
	name: 'website_url',
	type: 'string',
	default: '',
	description: "The customer's website URL",
	routing: { request: { body: { website_url: '={{$value}}' } } },
};

const ZipCodeField: INodeProperties = {
	displayName: 'Zip Code',
	name: 'zip_code',
	type: 'string',
	default: '',
	description: 'The zip code where the customer is located',
	routing: { request: { body: { zip: '={{$value}}' } } },
};

export const customerOperations: INodeProperties[] = [
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
];

export const customerFields: INodeProperties[] = [
	/* -- Required fields -- */
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
		displayName: 'Data Source UUID',
		name: 'source_uuid',
		type: 'string',
		required: true,
		default: '',
		description: 'The UUID of the source',
		displayOptions: {
			show: {
				resource: ['customer'],
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
	/* -- Optional fields -- */
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
			CityField,
			CompanyField,
			CountryField,
			CustomAttributesField,
			FreeTrialField,
			LeadCreatedField,
			OwnerField,
			PrimaryContactField,
			StateField,
			TagsField,
			WebsiteURLField,
			ZipCodeField,
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
			CityField,
			CompanyField,
			CountryField,
			CustomAttributesField,
			FreeTrialField,
			LeadCreatedField,
			OwnerField,
			PrimaryContactField,
			StateField,
			StatusField,
			TagsField,
			WebsiteURLField,
			ZipCodeField,
		],
	},
];
