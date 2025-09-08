import type { INodeProperties } from 'n8n-workflow';

type Location = 'body' | 'qs' | 'path';
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

const CursorField: INodeProperties = {
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	default: '',
	description:
		'Set the cursor for use in pagination. To fetch the next page of results, set the cursor to the value of the "cursor" field in the previous response.',
	routing: { request: { qs: { cursor: '={{$value}}' } } },
};

const DataSourceUUIDField: INodeProperties = {
	displayName: 'Data Source UUID',
	name: 'dataSourceUuid',
	type: 'string',
	default: '',
	description: 'ChartMogul UUID of the Data Source',
	routing: { request: { qs: { data_source_uuid: '={{$value}}' } } },
};

const ExternalIDField: INodeProperties = {
	displayName: 'External ID',
	name: 'externalId',
	type: 'string',
	default: '',
	description: 'A unique identifier specified by you, typically from your internal system',
	routing: { request: { qs: { external_id: '={{$value}}' } } },
};

const PerPageField: INodeProperties = {
	displayName: 'Per Page',
	name: 'perPage',
	type: 'number',
	typeOptions: {
		minValue: 1,
		maxValue: 200,
	},
	default: 200,
	description: 'The number of records to return. Default and max is 200.',
	routing: { request: { qs: { per_page: '={{$value}}' } } },
};

export const SharedOptionItems = {
	BillingSystemField,
	CursorField,
	DataSourceUUIDField,
	ExternalIDField,
	NameField,
	PerPageField,
};
