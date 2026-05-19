import type { INodeProperties } from 'n8n-workflow';

export const unmergeDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'ChartMogul UUID of the Customer',
		displayOptions: { show: { resource: ['customer'], operation: ['unmerge'] } },
		required: true,
	},
	{
		displayName: 'Data Source UUID',
		name: 'data_source_uuid',
		type: 'string',
		default: '',
		description: 'Data Source UUID of the customer you want to unmerge into their own record',
		displayOptions: { show: { resource: ['customer'], operation: ['unmerge'] } },
		required: true,
		routing: { request: { body: { data_source_uuid: '={{$value}}' } } },
	},
	{
		displayName: 'External ID',
		name: 'external_id',
		type: 'string',
		default: '',
		description: 'External ID of the customer you want to unmerge into their own record',
		displayOptions: { show: { resource: ['customer'], operation: ['unmerge'] } },
		required: true,
		routing: { request: { body: { external_id: '={{$value}}' } } },
	},
	{
		displayName: 'Objects to Move to New Customer',
		name: 'move_to_new_customer',
		type: 'multiOptions',
		options: [
			{ name: 'Tasks', value: 'tasks' },
			{ name: 'Opportunities', value: 'opportunities' },
			{ name: 'Notes and Call Logs', value: 'notes' },
		],
		default: [],
		description: 'Objects to move to the new customer after unmerging',
		displayOptions: { show: { resource: ['customer'], operation: ['unmerge'] } },
		routing: { request: { body: { move_to_new_customer: '={{$value}}' } } },
	},
];
