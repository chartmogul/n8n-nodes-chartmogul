import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Task UUID',
		name: 'taskUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Task',
		displayOptions: { show: { resource: ['task'], operation: ['delete'] } },
		required: true,
	},
];
