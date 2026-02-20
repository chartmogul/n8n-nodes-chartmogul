import type { INodeProperties } from 'n8n-workflow';

export const listDescription: INodeProperties[] = [
		{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['activities'],
				operation: ['list'],
			},
		},
		routing: {
			send: {
				paginate: '={{ $value }}',
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		displayOptions: {
			show: {
				resource: ['activities'],
				operation: ['list'],
			},
			hide: {
				returnAll: [true],
			},
		},
		routing: {
			request: {
				qs: {
					per_page: '={{$value}}'
				}
			}
		}
	},
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'The start date for activities to be retrieved',
				routing: {
					request: {
						qs: {
							'start-date': '={{$value}}'
						}
					}
				}
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'The end date for activities to be retrieved',
				routing: {
					request: {
						qs: {
							'end-date': '={{$value}}'
						}
					}
				}
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Churn',
						value: 'churn'
					},
					{
						name: 'Contraction',
						value: 'contraction'
					},
					{
						name: 'Expansion',
						value: 'expansion'
					},
					{
						name: 'New Business',
						value: 'new_biz'
					},
					{
						name: 'Reactivation',
						value: 'reactivation'
					},
				],
				default: 'new_biz',
				description: 'The type of activities to be retrieved',
				routing: {
					request: {
						qs: {
							type: '={{$value}}'
						}
					}
				}
			},
			{
				displayName: 'Sort Order',
				name: 'order',
				type: 'options',
				options: [
					{
						name: 'Ascending',
						value: 'date'
					},
					{
						name: 'Descending',
						value: '-date'
					},
				],
				default: '-date',
				routing: {
					request: {
						qs: {
							order: '={{$value}}'
						}
					}
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['activities'],
				operation: ['list']
			}
		},
	},
];
