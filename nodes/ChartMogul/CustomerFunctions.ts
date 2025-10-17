import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

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
		SharedOptionItems.EmailField('customer'),
		SharedOptionItems.FirstNameField('customer'),
		SharedOptionItems.LastNameField('customer'),
		SharedOptionItems.LinkedInField('customer'),
		SharedOptionItems.NotesField('customer'),
		SharedOptionItems.PhoneField('customer'),
		SharedOptionItems.TitleField('customer'),
		SharedOptionItems.TwitterField('customer'),
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
				name: 'Add Contact to Customer',
				value: 'add_contact',
				action: 'Add a contact to a customer',
				routing: {
					request: {
						method: 'POST',
					},
				},
			},
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
				name: "List Customer's Activities",
				value: 'list_activities',
				action: 'Returns a list of activities for a given customer',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: "List Customer's Invoices",
				value: 'list_invoices',
				action: 'Returns a list of invoices for a given customer',
				routing: {
					request: {
						method: 'GET',
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
				name: 'List Customers by Email',
				value: 'list_by_email',
				action: 'List customers by email',
				routing: {
					request: {
						method: 'GET',
						url: '/customer/search',
					},
				},
			},
			{
				name: 'Merge Customers',
				value: 'merge',
				action: 'Merge customers',
				routing: {
					request: {
						method: 'POST',
						url: '/customers/merges',
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
				name: 'Unmerge Customers',
				value: 'unmerge',
				action: 'Unmerge customers',
				routing: {
					request: {
						method: 'POST',
						url: '/customers/unmerges',
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
		...SharedOptionItems.CustomerUUIDField({
			location: 'path',
			pathURL: '=/customers/{{$value}}',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get', 'delete', 'update'],
			},
		},
	},
	{
		...SharedOptionItems.DataSourceUUIDField({ location: 'body' }),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
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
	{
		displayName: 'Merge Using',
		name: 'merge_using',
		type: 'options',
		required: true,
		default: 'customer_uuid_merge',
		description: 'Choose how to merge the customers',
		options: [
			{
				name: 'Customer UUID',
				value: 'customer_uuid_merge',
			},
			{
				name: 'Data Source UUID & External ID',
				value: 'data_source_uuid_external_id_merge',
			},
		],
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
			},
		},
	},
	{
		displayName: 'Merge From',
		name: 'merge_from',
		type: 'string',
		required: true,
		default: '',
		description: 'Merge from this customer',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['customer_uuid_merge'],
			},
		},
		routing: {
			request: {
				body: {
					from: {
						customer_uuid: '={{$value}}',
					},
				},
			},
		},
	},
	{
		displayName: 'Merge Into',
		name: 'merge_into',
		type: 'string',
		required: true,
		default: '',
		description: 'Merge into this customer',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['customer_uuid_merge'],
			},
		},
		routing: {
			request: {
				body: {
					into: {
						customer_uuid: '={{$value}}',
					},
				},
			},
		},
	},
	{
		displayName: 'Merge From',
		name: 'merge_from',
		type: 'fixedCollection',
		default: {},
		description: 'Merge from this customer',
		required: true,
		options: [
			{
				name: 'mergeFrom',
				displayName: 'Merge From',
				values: [
					{
						displayName: 'Data Source UUID',
						name: 'data_source_uuid',
						type: 'string',
						description: 'Data Source UUID of the customer to merge from',
						default: '',
					},
					{
						displayName: 'External ID',
						name: 'external_id',
						type: 'string',
						description: 'External ID of the customer to merge from',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['data_source_uuid_external_id_merge'],
			},
		},
		routing: {
			request: {
				body: {
					from: {
						data_source_uuid: '={{$value.mergeFrom.data_source_uuid}}',
						external_id: '={{$value.mergeFrom.external_id}}',
					},
				},
			},
		},
	},
	{
		displayName: 'Merge Into',
		name: 'merge_into',
		type: 'fixedCollection',
		default: {},
		description: 'Merge into this customer',
		required: true,
		options: [
			{
				name: 'mergeInto',
				displayName: 'Merge Into',
				values: [
					{
						displayName: 'Data Source UUID',
						name: 'data_source_uuid',
						type: 'string',
						description: 'Data Source UUID of the customer to merge into',
						default: '',
					},
					{
						displayName: 'External ID',
						name: 'external_id',
						type: 'string',
						description: 'External ID of the customer to merge into',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['merge'],
				merge_using: ['data_source_uuid_external_id_merge'],
			},
		},
		routing: {
			request: {
				body: {
					into: {
						data_source_uuid: '={{$value.mergeInto.data_source_uuid}}',
						external_id: '={{$value.mergeInto.external_id}}',
					},
				},
			},
		},
	},
	{
		...SharedOptionItems.CustomerUUIDField({
			location: 'body',
			description: 'ChartMogul UUID of the customer to unmerge',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['unmerge'],
			},
		},
	},
	{
		...SharedOptionItems.DataSourceUUIDField({
			location: 'body',
			description: 'Data Source UUID of the customer you want to unmerge into their own record',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['unmerge'],
			},
		},
	},
	{
		displayName: 'External ID',
		name: 'external_id',
		type: 'string',
		required: true,
		default: '',
		description: 'External ID of the customer you want to unmerge into their own record',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['unmerge'],
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
	{
		...SharedOptionItems.CustomerUUIDField({
			location: 'path',
			pathURL: '=/customers/{{$value}}/contacts',
			description: 'ChartMogul UUID of the customer to add the contact to',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['add_contact'],
			},
		},
	},
	{
		...SharedOptionItems.DataSourceUUIDField('body'),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['add_contact'],
			},
		},
	},
	{
		...SharedOptionItems.CustomerUUIDField({
			location: 'path',
			pathURL: '=/customers/{{$value}}/activities',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list_activities'],
			},
		},
	},
	{
		...SharedOptionItems.CustomerUUIDField({
			location: 'path',
			pathURL: '=/customers/{{$value}}/invoices',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list_invoices'],
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		description: 'Email address of the customer to search for',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list_by_email'],
			},
		},
		routing: { request: { qs: { email: '={{$value}}' } } },
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
			SharedOptionItems.DataSourceUUIDField({ location: 'qs' }),
			SharedOptionItems.ExternalIDField,
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
		displayName: 'Update Options',
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
	{
		displayName: 'Objects to Move to New Customer',
		name: 'move_to_new_customer',
		type: 'multiOptions',
		options: [
			{ name: 'Tasks', value: 'tasks' },
			{ name: 'Opportunities', value: 'opportunities' },
			{ name: 'Notes and Call Logs', value: 'notes' },
		],
		default: [],
		description: 'Objects to move to the new customer after unmerging',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['unmerge'],
			},
		},
		routing: {
			request: {
				body: {
					move_to_new_customer: '={{$value}}',
				},
			},
		},
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
				operation: ['add_contact'],
			},
		},
		options: [
			SharedOptionItems.FirstNameField('contact'),
			SharedOptionItems.LastNameField('contact'),
			SharedOptionItems.EmailField('contact'),
			SharedOptionItems.PhoneField('contact'),
			SharedOptionItems.TitleField('contact'),
			SharedOptionItems.LinkedInField('contact'),
			SharedOptionItems.TwitterField('contact'),
			SharedOptionItems.NotesField('contact'),
		],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list', 'list_activities', 'list_invoices', 'list_by_email'],
			},
		},
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
];
