import type { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
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
				routing: { request: { qs: { assignee: '={{$value}}' } } },
			},
			{
				displayName: 'Customer UUID',
				name: 'customerUUID',
				type: 'string',
				default: '',
				description: 'ChartMogul UUID of the Customer',
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
		options: [
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				default: '',
				description:
					'Set the cursor for use in pagination. To fetch the next page of results, set the cursor to the value of the "cursor" field in the previous response.',
				routing: { request: { qs: { cursor: '={{$value}}' } } },
			},
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 200 },
				default: 200,
				description: 'The number of records to return. Default and max is 200.',
				routing: { request: { qs: { per_page: '={{$value}}' } } },
			},
		],
	},
];
