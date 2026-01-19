import type { INodeProperties } from 'n8n-workflow';

type Location = 'body' | 'qs' | 'path';
type FieldArgs =
	| { location: Location; displayName?: string; description?: string; pathURL?: string }
	| Location;

const toRequest = (location: Location, field_name: string, pathURL?: string) =>
	location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };

export const NameField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Name' : (args.displayName ?? 'Name');
	const description =
		typeof args === 'string'
			? 'Display name of the object'
			: (args.description ?? 'Display name of the object');
	const name = 'name';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const DataSourceUUIDField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string' ? 'Data Source UUID' : (args.displayName ?? 'Data Source UUID');
	const description =
		typeof args === 'string'
			? 'ChartMogul UUID of the Data Source'
			: (args.description ?? 'ChartMogul UUID of the Data Source');
	const name = 'data_source_uuid';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
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

const CustomerUUIDField: INodeProperties = {
	displayName: 'Customer UUID',
	name: 'customerUUID',
	type: 'string',
	default: '',
	description: 'ChartMogul UUID of the Customer',
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

export const EmailField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'Email',
	name: 'email',
	type: 'string',
	default: '',
	placeholder: 'name@email.com',
	description: "The contact's email address",
	routing: {
		request: {
			body:
				entityType === 'contact'
					? { email: '={{$value}}' }
					: { primary_contact: { email: '={{$value}}' } },
		},
	},
});

export const FirstNameField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'First Name',
	name: 'first_name',
	type: 'string',
	default: '',
	description: "The contact's first name",
	routing: {
		request: {
			body:
				entityType === 'contact'
					? { first_name: '={{$value}}' }
					: { primary_contact: { first_name: '={{$value}}' } },
		},
	},
});

export const LastNameField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'Last Name',
	name: 'last_name',
	type: 'string',
	default: '',
	description: "The contact's last name",
	routing: {
		request: {
			body:
				entityType === 'contact'
					? { last_name: '={{$value}}' }
					: { primary_contact: { last_name: '={{$value}}' } },
		},
	},
});

export const LinkedInField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'LinkedIn',
	name: 'linked_in',
	type: 'string',
	default: '',
	description: "The contact's LinkedIn profile URL",

	routing: {
		request: {
			body:
				entityType === 'contact'
					? { linked_in: '={{$value}}' }
					: { primary_contact: { linked_in: '={{$value}}' } },
		},
	},
});

export const NotesField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'Notes',
	name: 'notes',
	type: 'string',
	typeOptions: {
		rows: 4,
	},
	default: '',
	description: 'Any additional notes you wish to add about the contact',
	routing: {
		request: {
			body:
				entityType === 'contact'
					? { notes: '={{$value}}' }
					: { primary_contact: { notes: '={{$value}}' } },
		},
	},
});

export const PhoneField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'Phone',
	name: 'phone',
	type: 'string',
	default: '',
	description: "The contact's phone number",
	routing: {
		request: {
			body:
				entityType === 'contact'
					? { phone: '={{$value}}' }
					: { primary_contact: { phone: '={{$value}}' } },
		},
	},
});

export const TitleField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'Title',
	name: 'title',
	type: 'string',
	default: '',
	description: "The contact's job title",
	routing: {
		request: {
			body:
				entityType === 'contact'
					? { title: '={{$value}}' }
					: { primary_contact: { title: '={{$value}}' } },
		},
	},
});

export const TwitterField = (entityType: 'contact' | 'customer'): INodeProperties => ({
	displayName: 'Twitter',
	name: 'twitter',
	type: 'string',
	default: '',
	description: "The contact's Twitter URL",
	routing: {
		request: {
			body:
				entityType === 'contact'
					? { twitter: '={{$value}}' }
					: { primary_contact: { twitter: '={{$value}}' } },
		},
	},
});

export const SharedOptionItems = {
	BillingSystemField,
	CursorField,
	CustomerUUIDField,
	DataSourceUUIDField,
	EmailField,
	ExternalIDField,
	FirstNameField,
	LastNameField,
	LinkedInField,
	NameField,
	NotesField,
	PerPageField,
	PhoneField,
	TitleField,
	TwitterField,
};
