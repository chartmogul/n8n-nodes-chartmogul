import type { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Task UUID',
		name: 'taskUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Task',
		displayOptions: { show: { resource: ['task'], operation: ['update'] } },
		required: true,
	},
	{
		displayName: 'Update Fields',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['task'], operation: ['update'] } },
		options: [
			{
				displayName: 'Task Details',
				name: 'task_details',
				type: 'string',
				default: '',
				description: 'A description of the task up to 255 characters',
				routing: { request: { body: { task_details: '={{$value}}' } } },
			},
			{
				displayName: 'Assignee',
				name: 'assignee',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				description: 'The email address of the ChartMogul user assigned to the task',
				routing: { request: { body: { assignee: '={{$value}}' } } },
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'dateTime',
				default: '',
				description: 'The date when the task is due',
				routing: { request: { body: { due_date: '={{$value}}' } } },
			},
			{
				displayName: 'Completed At',
				name: 'completed_at',
				type: 'dateTime',
				default: '',
				description: 'The date when the task was completed',
				routing: { request: { body: { completed_at: '={{$value}}' } } },
			},
		],
	},
];
