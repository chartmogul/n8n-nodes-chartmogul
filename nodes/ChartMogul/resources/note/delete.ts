import { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Note UUID',
		name: 'noteUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Note or Call Log',
		required: true,
		displayOptions: { show: { resource: ['note'], operation: ['delete'] } },
	},
];
