import { INodeProperties } from 'n8n-workflow';
import { deleteDescription } from './delete';
import { getDescription } from './get';
import { createDescription } from './create';

/* -- Reused fields -- */
type Location = 'body' | 'qs' | 'path';
type FieldArgs =
	| { location: Location; displayName?: string; description?: string; pathURL?: string }
	| Location;

const toRequest = (location: Location, field_name: string, pathURL?: string) =>
	location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };

export const OwnerField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Owner' : (args.displayName ?? 'Owner');
	const description =
		typeof args === 'string'
			? 'The email address of the ChartMogul user with a CRM seat who is the primary salesperson responsible for this opportunity'
			: (args.description ??
				'The email address of the ChartMogul user with a CRM seat who is the primary salesperson responsible for this opportunity');
	const name = 'owner';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const PipelineField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Pipeline' : (args.displayName ?? 'Pipeline');
	const description =
		typeof args === 'string'
			? 'The sales pipeline name'
			: (args.description ?? 'The sales pipeline name');
	const name = 'pipeline';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

export const PipelineStageField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string' ? 'Pipeline Stage' : (args.displayName ?? 'Pipeline Stage');
	const description =
		typeof args === 'string'
			? 'The name of the current deal stage within the sales pipeline.'
			: (args.description ?? 'The name of the current deal stage within the sales pipeline.');
	const name = 'pipeline_stage';
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name) },
	};
};

const EstimatedCloseDateField: INodeProperties = {
	displayName: 'Estimated Close Date',
	name: 'estimated_close_date',
	type: 'dateTime',
	default: '',
	description: 'The date when the opportunity is expected to close',
	routing: { request: { body: { estimated_close_date: '={{$value}}' } } },
};

const AmountInCentsField: INodeProperties = {
	displayName: 'Amount in Cents',
	name: 'amount_in_cents',
	type: 'number',
	default: 0,
	description: 'Amount in cents of expected close value of this opportunity',
	routing: { request: { body: { amount_in_cents: '={{$value}}' } } },
};

const CurrencyField: INodeProperties = {
	displayName: 'Currency',
	name: 'currency',
	type: 'string',
	default: '',
	description: 'The three-letter currency code of the currency of the expected close value',
	routing: { request: { body: { currency: '={{$value}}' } } },
};

const TypeField: INodeProperties = {
	displayName: 'Opportunity Type',
	name: 'type',
	type: 'options',
	options: [
		{ name: 'Recurring', value: 'recurring' },
		{ name: 'One Time', value: 'one-time' },
	],
	default: 'recurring',
	routing: { request: { body: { type: '={{$value}}' } } },
};

const ForecastCategoryField: INodeProperties = {
	displayName: 'Forecast Category',
	name: 'forecast_category',
	type: 'options',
	options: [
		{ name: 'Best Case', value: 'best_case' },
		{ name: 'Closed Lost', value: 'lost' },
		{ name: 'Closed Won', value: 'won' },
		{ name: 'Committed', value: 'committed' },
		{ name: 'Pipeline', value: 'pipeline' },
	],
	default: 'pipeline',
	description: "The opportunity's grouping based on its likelihood of closing",
	routing: { request: { body: { forecast_category: '={{$value}}' } } },
};

const WinLikelihoodField: INodeProperties = {
	displayName: 'Win Likelihood',
	name: 'win_likelihood',
	type: 'number',
	default: 0,
	description:
		'An integer between 0 and 100 representing the likelihood (as a percentage) that this opportunity will successfully close. If not provided, it is set to the default win likelihood for a given pipeline stage.',
	routing: { request: { body: { win_likelihood: '={{$value}}' } } },
};

export const opportunityDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['opportunity']
			}
		},
		options: [
			{
				name: 'Create an Opportunity',
				value: 'create',
				action: 'Create an opportunity',
				routing: {
					request: {
						method: 'POST',
						url: '/opportunities'
					}
				},
			},
			{
				name: 'Delete an Opportunity',
				value: 'delete',
				action: 'Delete an opportunity',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/opportunities/{{$parameter.opportunityUUID}}'
					},
				},
			},
			{
				name: 'List Opportunities',
				value: 'list',
				action: 'List opportunities',
				routing: {
					request: {
						method: 'GET',
						url: '/opportunities'
					}
				},
			},
			{
				name: 'Retrieve an Opportunity',
				value: 'get',
				action: 'Retrieve an opportunity',
				routing: {
					request: { method: 'GET', url: '=/opportunities/{{$parameter.opportunityUUID}}' },
				},
			},
			{
				name: 'Update an Opportunity',
				value: 'update',
				action: 'Update an opportunity',
				routing: {
					request: { method: 'PATCH', url: '=/opportunities/{{$parameter.opportunityUUID}}' },
				},
			},
		],
		default: 'get',
	},
	...createDescription,
	...deleteDescription,
	...getDescription,
];

export const opportunityFields: INodeProperties[] = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['opportunity'], operation: ['list'] } },
		options: [
			{
				displayName: 'Customer UUID',
				name: 'customerUUID',
				type: 'string',
				default: '',
				description: 'ChartMogul UUID of the Customer',
				routing: { request: { qs: { customer_uuid: '={{$value}}' } } },
			},
			OwnerField('qs'),
			PipelineField('qs'),
			PipelineStageField('qs'),
			{
				displayName: 'Estimated Close Date On or After',
				name: 'estimated_close_date_on_or_after',
				type: 'dateTime',
				default: '',
				description:
					'Use this parameter to limit your results to opportunities due on or after a certain date',
				routing: { request: { body: { estimated_close_date_on_or_after: '={{$value}}' } } },
			},
			{
				displayName: 'Estimated Close Date On or Before',
				name: 'estimated_close_date_on_or_before',
				type: 'dateTime',
				default: '',
				description:
					'Use this parameter to limit your results to opportunities due on or before a certain date',
				routing: { request: { body: { estimated_close_date_on_or_before: '={{$value}}' } } },
			},
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['opportunity'], operation: ['update'] } },
		options: [
			OwnerField('body'),
			PipelineField('body'),
			PipelineStageField('body'),
			EstimatedCloseDateField,
			AmountInCentsField,
			CurrencyField,
			TypeField,
			ForecastCategoryField,
			WinLikelihoodField,
		],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['opportunity'], operation: ['list'] } },
		options: [
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				default: '',
				description:
					'Set the cursor for use in pagination. To fetch the next page of results, set the cursor to the value of the "cursor" field in the previous response.',
				routing: { request: { qs: { cursor: '={{$value}}' } } },
			},
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 200 },
				default: 200,
				description: 'The number of records to return. Default and max is 200.',
				routing: { request: { qs: { per_page: '={{$value}}' } } },
			},
		],
	},
];
