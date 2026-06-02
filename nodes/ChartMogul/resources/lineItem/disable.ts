import type { INodeProperties } from 'n8n-workflow';

export const disableDescription: INodeProperties[] = [
	{
		displayName: 'Line Item UUID',
		name: 'lineItemUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Line Item',
		displayOptions: { show: { resource: ['line_item'], operation: ['disable'] } },
		required: true,
	},
	{
		displayName: 'Disable',
		name: 'disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to disable (true) or enable (false) the line item',
		displayOptions: { show: { resource: ['line_item'], operation: ['disable'] } },
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
];
