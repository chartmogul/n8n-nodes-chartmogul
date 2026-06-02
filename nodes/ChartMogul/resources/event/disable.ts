import type { INodeProperties } from 'n8n-workflow';

export const disableDescription: INodeProperties[] = [
	{
		displayName: 'Target Subscription Event Using',
		name: 'disableUsing',
		type: 'options',
		options: [
			{ name: 'Event ID', value: 'eventId' },
			{ name: 'External ID and Data Source UUID', value: 'externalIdandDataSourceUUID' },
		],
		default: 'externalIdandDataSourceUUID',
		displayOptions: { show: { resource: ['event'], operation: ['disable'] } },
	},
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		default: '',
		description: 'The ID of the subscription event',
		displayOptions: {
			show: { resource: ['event'], operation: ['disable'], disableUsing: ['eventId'] },
		},
		required: true,
	},
	{
		displayName: 'Data Source UUID',
		name: 'data_source_uuid',
		type: 'string',
		default: '',
		description: 'The UUID of the Data Source',
		displayOptions: {
			show: { resource: ['event'], operation: ['disable'] },
			hide: { disableUsing: ['eventId'] },
		},
		required: true,
		routing: { request: { body: { data_source_uuid: '={{$value}}' } } },
	},
	{
		displayName: 'External ID',
		name: 'external_id',
		type: 'string',
		default: '',
		description: 'The external ID of the subscription event',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['disable'],
				disableUsing: ['externalIdandDataSourceUUID'],
			},
		},
		required: true,
		routing: { request: { body: { external_id: '={{$value}}' } } },
	},
	{
		displayName: 'Disable',
		name: 'disabled',
		type: 'boolean',
		default: false,
		description: 'Whether to disable (true) or enable (false) the subscription event',
		displayOptions: { show: { resource: ['event'], operation: ['disable'] } },
		required: true,
		routing: { request: { body: { disabled: '={{$value}}' } } },
	},
];
