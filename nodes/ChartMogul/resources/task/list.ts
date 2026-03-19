import type { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['task'], operation: ['list'] } },
		routing: { 
			send: { paginate: '={{ $value }}' }, 
			output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] } 
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: { minValue: 1, maxValue: 200 },
		displayOptions: { show: { resource: ['task'], operation: ['list'] }, hide: { returnAll: [true] } },
		routing: { request: { qs: { per_page: '={{$value}}' } } },
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['task'], operation: ['list'] } },
		options: [
			{
				displayName: 'Assignee',
				name: 'assignee',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				description: 'The email address of the ChartMogul user assigned to the task',
			},
			{
				displayName: 'Completed',
				name: 'completed',
				type: 'boolean',
				default: false,
				description: 'Whether the tasks to be fetched are completed (true) or ongoing (false)',
			},
			{
				displayName: 'Customer UUID',
				name: 'customerUUID',
				type: 'string',
				default: '',
				description: 'ChartMogul UUID of the Customer',
			},
			{
				displayName: 'Due Date On or After',
				name: 'due_date_on_or_after',
				type: 'dateTime',
				default: '',
				description:
					'Use this parameter to limit your results to tasks due on or after a certain date',
			},
			{
				displayName: 'Due Date On or Before',
				name: 'due_date_on_or_before',
				type: 'dateTime',
				default: '',
				description:
					'Use this parameter to limit your results to tasks due on or before a certain date',
			},
		],
	},

];
