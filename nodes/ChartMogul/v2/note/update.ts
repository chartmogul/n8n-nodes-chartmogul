import { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Note UUID',
		name: 'noteUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the Note or Call Log',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['update']
			}
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['update']
			}
		},
		options: [
			{
				displayName: 'Author Email',
				name: 'author_email',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				routing: {
					request: {
						body: {
							author_email: '={{$value}}'
						}
					}
				},
			},
			{
				displayName: 'Call Duration',
				name: 'call_duration',
				type: 'number',
				default: 60,
				description: 'Duration of the call in seconds',
				routing: {
					request: {
						body: {
							call_duration: '={{$value}}'
						}
					}
				},
			},
			{
				displayName: 'Created At',
				name: 'created_at',
				type: 'dateTime',
				default: '={{$now}}',
				description: 'The date and time when this note or call was made',
				routing: {
					request: {
						body: {
							created_at: '={{$value}}'
						}
					}
				},
			},
			{
				displayName: 'Note Contents',
				name: 'text',
				type: 'string',
				default: '',
				description: 'Contents of the note or call log',
				routing: {
					request: {
						body: {
							text: '={{$value}}'
						}
					}
				},
			},
			{
				displayName: 'Updated At',
				name: 'updated_at',
				type: 'dateTime',
				default: '={{$now}}',
				description: 'The date and time when this note or call was last updated',
				routing: {
					request: {
						body: {
							updated_at: '={{$value}}'
						}
					}
				},
			}
		]
	}
];
