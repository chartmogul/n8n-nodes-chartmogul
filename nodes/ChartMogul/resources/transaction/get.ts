import type { INodeProperties } from 'n8n-workflow';

export const getDescription: INodeProperties[] = [
	{
		displayName: 'Transaction UUID',
		name: 'transactionUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Transaction',
		displayOptions: { show: { resource: ['transaction'], operation: ['get'] } },
		required: true,
	},
];
