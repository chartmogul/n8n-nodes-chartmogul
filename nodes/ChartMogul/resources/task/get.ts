import type { INodeProperties } from 'n8n-workflow';

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Task UUID',
		name: 'taskUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Task',
		displayOptions: { show: { resource: ['task'], operation: ['get'] } },
		required: true,
	},
];
