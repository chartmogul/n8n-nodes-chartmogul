import { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

/* -- Reused fields -- */
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
	typeOptions: { multipleValues: true, multipleValueButtonText: 'Add Plan' },
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
		displayOptions: { show: { resource: ['plan_group'] } },
		options: [
			{
				name: 'Create a Plan Group',
				value: 'create',
				action: 'Create a plan group',
				routing: { request: { method: 'POST', url: '/plan_groups' } },
			},
			{
				name: 'Delete a Plan Group',
				value: 'delete',
				action: 'Delete a plan group',
				routing: {
					request: { method: 'DELETE', url: '=/plan_groups/{{$parameter.planGroupUUID}}' },
				},
			},
			{
				name: 'List Plan Groups',
				value: 'list',
				action: 'List all plan groups',
				routing: { request: { method: 'GET', url: '/plan_groups' } },
			},
			{
				name: 'List Plans in a Plan Group',
				value: 'list_contents',
				action: 'List all plans in a plan group',
				routing: {
					request: { method: 'GET', url: '=/plan_groups/{{$parameter.planGroupUUID}}/plans' },
				},
			},
			{
				name: 'Retrieve a Plan Group',
				value: 'get',
				action: 'Retrieve a plan group',
				routing: { request: { method: 'GET', url: '=/plan_groups/{{$parameter.planGroupUUID}}' } },
			},
			{
				name: 'Update a Plan Group',
				value: 'update',
				action: 'Update a plan group',
				routing: {
					request: { method: 'PATCH', url: '=/plan_groups/{{$parameter.planGroupUUID}}' },
				},
			},
		],
		default: 'list',
	},
];

export const planGroupFields: INodeProperties[] = [
	/* -- Required Fields -- */
	{
		displayName: 'Plan Group UUID',
		name: 'planGroupUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the plan group',
		displayOptions: {
			show: { resource: ['plan_group'], operation: ['get', 'delete', 'update', 'list_contents'] },
		},
		required: true,
	},
	{
		...NameField,
		displayOptions: { show: { resource: ['plan_group'], operation: ['create'] } },
		required: true,
	},
	{
		...PlansField,
		displayOptions: { show: { resource: ['plan_group'], operation: ['create'] } },
		required: true,
	},

	/* -- Optional Fields -- */
	{
		displayName: 'Update Fields',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [NameField, PlansField],
		displayOptions: { show: { resource: ['plan_group'], operation: ['update'] } },
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
		displayOptions: { show: { resource: ['plan_group'], operation: ['list', 'list_contents'] } },
	},
];
