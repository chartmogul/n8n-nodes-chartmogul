import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Line Item UUID',
		name: 'lineItemUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Line Item',
		displayOptions: { show: { resource: ['line_item'], operation: ['delete'] } },
		required: true,
	},
];
