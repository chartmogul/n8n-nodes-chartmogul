import type { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Target Subscription Event Using',
		name: 'updateUsing',
		type: 'options',
		options: [
			{ name: 'Event ID', value: 'eventId' },
			{ name: 'External ID and Data Source UUID', value: 'externalIdandDataSourceUUID' },
		],
		default: 'externalIdandDataSourceUUID',
		displayOptions: { show: { resource: ['event'], operation: ['delete'] } },
	},
	{
		displayName: 'Data Source UUID',
		name: 'data_source_uuid',
		type: 'string',
		default: '',
		description: 'The UUID of the Data Source',
		displayOptions: {
			show: { resource: ['event'], operation: ['delete'] },
			hide: { updateUsing: ['eventId'] },
		},
		required: true,
		routing: { request: { body: { subscription_event: { data_source_uuid: '={{$value}}' } } } },
	},
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		default: '',
		description: 'The ID of the subscription event',
		displayOptions: {
			show: { resource: ['event'], operation: ['delete'], updateUsing: ['eventId'] },
		},
		required: true,
		routing: { request: { body: { subscription_event: { id: '={{$value}}' } } } },
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
				operation: ['delete'],
				updateUsing: ['externalIdandDataSourceUUID'],
			},
		},
		required: true,
		routing: { request: { body: { subscription_event: { external_id: '={{$value}}' } } } },
	},
];
