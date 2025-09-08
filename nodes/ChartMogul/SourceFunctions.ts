import type { INodeProperties } from 'n8n-workflow';

type Location = 'body' | 'qs';
type NameFieldArgs = { location: Location; displayName?: string; description?: string } | Location;

const toRequest = (location: Location) => ({
	[location]: { name: '={{$value}}' },
});

export const NameField = (args: NameFieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Name' : (args.displayName ?? 'Name');
	const description =
		typeof args === 'string'
			? 'Display name of the object'
			: (args.description ?? 'Display name of the object');
	return {
		displayName,
		name: 'name',
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location) },
	};
};

const BillingSystemField: INodeProperties = {
	displayName: 'Billing System',
	name: 'billingSystem',
	type: 'string',
	default: '',
	description: 'The billing system you are using, e.g., Stripe, Recurly, etc',
	routing: { request: { qs: { system: '={{$value}}' } } },
};

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
		...NameField({
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
			NameField({
				location: 'qs',
				description: 'Filter results by source name',
			}),
			BillingSystemField,
		],
	},
];
