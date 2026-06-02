import type { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{
				displayName: 'Start Date',
				name: 'start-date',
				type: 'dateTime',
				default: '',
				description: 'The start date for activities to be retrieved',
				routing: { request: { body: { 'start-date': '={{$value}}' } } }
			},
			{
				displayName: 'End Date',
				name: 'end-date',
				type: 'dateTime',
				default: '',
				description: 'The end date for activities to be retrieved',
				routing: { request: { body: { 'end-date': '={{$value}}' } } }
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Churn', value: 'churn' },
					{ name: 'Contraction', value: 'contraction' },
					{ name: 'Expansion', value: 'expansion' },
					{ name: 'New Business', value: 'new_biz' },
					{ name: 'Reactivation', value: 'reactivation' },
				],
				default: 'new_biz',
				description: 'The type of activities to be retrieved',
				routing: { request: { body: { type: '={{$value}}' } } }
			},
		],
		displayOptions: { show: { resource: ['activities'], operation: ['create'] }	},
	},
];
