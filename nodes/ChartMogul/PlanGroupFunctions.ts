import { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

/* -- Reused fields -- */
type Location = 'body' | 'qs' | 'path';
type FieldArgs =
	| { location: Location; displayName?: string; description?: string; pathURL?: string }
	| Location;

const toRequest = (location: Location, field_name: string, pathURL?: string) =>
	location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };

export const PlanGroupUUIDField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName =
		typeof args === 'string' ? 'Plan Group UUID' : (args.displayName ?? 'Plan Group UUID');
	const description =
		typeof args === 'string'
			? 'The ChartMogul UUID of the plan group'
			: (args.description ?? 'The ChartMogul UUID of the plan group');
	const name = 'plan_group_uuid';
	const pathURL =
		typeof args === 'string' ? undefined : 'pathURL' in args ? args.pathURL : undefined;
	return {
		displayName,
		name,
		type: 'string',
		default: '',
		description,
		routing: { request: toRequest(location, name, pathURL) },
	};
};

const NameField: INodeProperties = {
	displayName: 'Plan Group Name',
	name: 'name',
	type: 'string',
	default: '',
	description: 'The name of the plan group',
	routing: { request: { body: { name: '={{$value}}' } } },
};

const PlansField: INodeProperties = {
	displayName: 'Included Plans',
	name: 'plans',
	type: 'string',
	typeOptions: {
		multipleValues: true,
		multipleValueButtonText: 'Add Plan',
	},
	default: [],
	description: 'An array of the UUIDs of the plans to be added to the plan group',
	routing: { request: { body: { plans: '={{$value}}' } } },
};

export const planGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['plan_group'],
			},
		},
		options: [
			{
				name: 'Create a Plan Group',
				value: 'create',
				action: 'Create a plan group',
				routing: {
					request: { method: 'POST', url: '/plan_groups' },
				},
			},
			{
				name: 'Delete a Plan Group',
				value: 'delete',
				action: 'Delete a plan group',
				routing: {
					request: { method: 'DELETE' },
				},
			},
			{
				name: 'List Plan Groups',
				value: 'list',
				action: 'List all plan groups',
				routing: {
					request: { method: 'GET', url: '/plan_groups' },
				},
			},
			{
				name: 'List Plans in a Plan Group',
				value: 'list_contents',
				action: 'List all plans in a plan group',
				routing: {
					request: { method: 'GET' },
				},
			},
			{
				name: 'Retrieve a Plan Group',
				value: 'get',
				action: 'Retrieve a plan group',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Update a Plan Group',
				value: 'update',
				action: 'Update a plan group',
				routing: {
					request: {
						method: 'PATCH',
					},
				},
			},
		],
		default: 'list',
	},
];

export const planGroupFields: INodeProperties[] = [
	/* -- Required Fields -- */
	{
		...PlanGroupUUIDField({
			location: 'path',
			pathURL: '=/plan_groups/{{$value}}',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['plan_group'],
				operation: ['get', 'delete', 'update'],
			},
		},
	},
	{
		...PlanGroupUUIDField({
			location: 'path',
			pathURL: '=/plan_groups/{{$value}}/plans',
		}),
		required: true,
		displayOptions: {
			show: {
				resource: ['plan_group'],
				operation: ['list_contents'],
			},
		},
	},
	{
		...NameField,
		required: true,
		displayOptions: {
			show: {
				resource: ['plan_group'],
				operation: ['create'],
			},
		},
	},
	{
		...PlansField,
		required: true,
		displayOptions: {
			show: {
				resource: ['plan_group'],
				operation: ['create'],
			},
		},
	},
	/* -- Optional Fields -- */
	{
		displayName: 'Update Fields',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['plan_group'],
				operation: ['update'],
			},
		},
		options: [NameField, PlansField],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['plan_group'],
				operation: ['list', 'list_contents'],
			},
		},
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
];
