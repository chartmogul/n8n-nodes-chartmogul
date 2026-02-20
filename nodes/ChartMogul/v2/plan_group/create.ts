import type { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Plan Group Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The name of the plan group',
		required: true,
		displayOptions: { show: { resource: ['plan_group'], operation: ['create'] } },
		routing: { request: { body: { name: '={{$value}}' } } },
	},
	{
		displayName: 'Included Plans',
		name: 'plans',
		type: 'string',
		typeOptions: { multipleValues: true, multipleValueButtonText: 'Add Plan' },
		default: [],
		description: 'An array of the UUIDs of the plans to be added to the plan group',
		required: true,
		displayOptions: { show: { resource: ['plan_group'], operation: ['create'] } },
		routing: { request: { body: { plans: '={{$value}}' } } },
	},
];
