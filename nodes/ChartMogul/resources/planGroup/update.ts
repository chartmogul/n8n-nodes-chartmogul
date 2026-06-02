import type { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Plan Group UUID',
		name: 'planGroupUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the plan group',
		required: true,
		displayOptions: { show: { resource: ['planGroup'], operation: ['update'] } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['planGroup'], operation: ['update'] } },
		options: [
			{
				displayName: 'Plan Group Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the plan group',
				routing: { request: { body: { name: '={{$value}}' } } },
			},
			{
				displayName: 'Included Plans',
				name: 'plans',
				type: 'string',
				typeOptions: { multipleValues: true, multipleValueButtonText: 'Add Plan' },
				default: [],
				description: 'An array of the UUIDs of the plans included in the plan group. This will replace the existing array of included plans.',
				routing: { request: { body: { plans: '={{$value}}' } } },
			},
		],
	},
];
