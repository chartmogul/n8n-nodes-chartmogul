import { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

/* -- Reused fields -- */
type Location = 'body' | 'qs' | 'path';
type FieldArgs =
	| { location: Location; displayName?: string; description?: string; pathURL?: string }
	| Location;

const toRequest = (location: Location, field_name: string, pathURL?: string) =>
	location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };

export const AssigneeField = (args: FieldArgs): INodeProperties => {
	const location: Location = typeof args === 'string' ? args : args.location;
	const displayName = typeof args === 'string' ? 'Assignee' : (args.displayName ?? 'Assignee');
	const description =
		typeof args === 'string'
			? 'The email address of the ChartMogul user assigned to the task'
			: (args.description ?? 'The email address of the ChartMogul user assigned to the task');
	const name = 'assignee';
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

const TaskDetailsField: INodeProperties = {
	displayName: 'Task Details',
	name: 'task_details',
	type: 'string',
	default: '',
	description: 'A description of the task up to 255 characters',
	routing: { request: { body: { task_details: '={{$value}}' } } },
};

const DueDateField: INodeProperties = {
	displayName: 'Due Date',
	name: 'due_date',
	type: 'dateTime',
	default: '',
	description: 'The date when the task is due',
	routing: { request: { body: { due_date: '={{$value}}' } } },
};

const CompletedAtField: INodeProperties = {
	displayName: 'Completed At',
	name: 'completed_at',
	type: 'dateTime',
	default: '',
	description: 'The date when the task was completed',
	routing: { request: { body: { completed_at: '={{$value}}' } } },
};

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Create a Task',
				value: 'create',
				action: 'Create a task',
				routing: { request: { method: 'POST', url: '/tasks' } },
			},
			{
				name: 'Delete a Task',
				value: 'delete',
				action: 'Delete a task',
				routing: { request: { method: 'DELETE', url: '=/tasks/{{$parameter.taskUUID}}' } },
			},
			{
				name: 'List Tasks',
				value: 'list',
				action: 'List tasks',
				routing: { request: { method: 'GET', url: '/tasks' } },
			},
			{
				name: 'Retrieve a Task',
				value: 'get',
				action: 'Retrieve a task',
				routing: { request: { method: 'GET', url: '=/tasks/{{$parameter.taskUUID}}' } },
			},
			{
				name: 'Update a Task',
				value: 'update',
				action: 'Update a task',
				routing: { request: { method: 'PATCH', url: '=/tasks/{{$parameter.taskUUID}}' } },
			},
		],
		default: 'get',
	},
];

export const taskFields: INodeProperties[] = [
	{
		...SharedOptionItems.CustomerUUIDField,
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		required: true,
		routing: { request: { body: { customer_uuid: '={{$value}}' } } },
	},
	{
		...TaskDetailsField,
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		required: true,
	},
	{
		...AssigneeField('body'),
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		required: true,
	},
	{
		...DueDateField,
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		required: true,
	},
	{
		displayName: 'Completed',
		name: 'completed',
		type: 'boolean',
		default: false,
		description: 'Whether the task is completed',
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		routing: { request: { body: { completed: '={{$value}}' } } },
	},
	{
		...CompletedAtField,
		displayOptions: { show: { resource: ['task'], operation: ['create'], completed: [true] } },
	},
	{
		displayName: 'Task UUID',
		name: 'taskUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Task',
		displayOptions: { show: { resource: ['task'], operation: ['get', 'delete', 'update'] } },
		required: true,
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['task'], operation: ['list'] } },
		options: [
			AssigneeField('qs'),
			{
				...SharedOptionItems.CustomerUUIDField,
				routing: { request: { qs: { customer_uuid: '={{$value}}' } } },
			},
			{
				displayName: 'Due Date On or After',
				name: 'due_date_on_or_after',
				type: 'dateTime',
				default: '',
				description:
					'Use this parameter to limit your results to tasks due on or after a certain date',
				routing: { request: { qs: { due_date_on_or_after: '={{$value}}' } } },
			},
			{
				displayName: 'Due Date On or Before',
				name: 'due_date_on_or_before',
				type: 'dateTime',
				default: '',
				description:
					'Use this parameter to limit your results to tasks due on or before a certain date',
				routing: { request: { qs: { due_date_on_or_before: '={{$value}}' } } },
			},
			{
				displayName: 'Completed',
				name: 'completed',
				type: 'boolean',
				default: false,
				description: 'Whether the tasks to be fetched are completed (true) or ongoing (false)',
				routing: { request: { qs: { completed: '={{$value}}' } } },
			},
		],
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['task'], operation: ['list'] } },
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
	{
		displayName: 'Update Fields',
		name: 'updateOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['task'], operation: ['update'] } },
		options: [TaskDetailsField, AssigneeField('body'), DueDateField, CompletedAtField],
	},
];