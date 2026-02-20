import type { INodeProperties } from 'n8n-workflow';

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Plan Group UUID',
		name: 'planGroupUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the plan group',
		required: true,
		displayOptions: { show: { resource: ['plan_group'], operation: ['get'] } },
	},
];
