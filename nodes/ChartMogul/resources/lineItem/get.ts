import type { INodeProperties } from 'n8n-workflow';

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Line Item UUID',
		name: 'lineItemUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Line Item',
		displayOptions: { show: { resource: ['line_item'], operation: ['get'] } },
		required: true,
	},
	{
		displayName: 'Include Edit History',
		name: 'include_edit_histories',
		type: 'boolean',
		default: false,
		description: 'Whether to include the edit_history_summary objects in the response',
		displayOptions: { show: { resource: ['line_item'], operation: ['get'] } },
		routing: { request: { qs: { include_edit_histories: '={{$value}}' } } },
	},
	{
		displayName: 'Include Disabled Line Items',
		name: 'with_disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to include disabled line items in the response',
		displayOptions: { show: { resource: ['line_item'], operation: ['get'] } },
		routing: { request: { qs: { with_disabled: '={{$value}}' } } },
	},
];
