import type { INodeProperties } from 'n8n-workflow';

const showOnlyForActivitiesList = {
	resource: ['activities'],
	operation: ['list'],
};

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{$value}}',
			},
		},
		displayOptions: {
			show: showOnlyForActivitiesList,
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			request: {
				qs: {
					per_page: '={{ $value }}',
				},
			},
		},
		displayOptions: {
			show: {
				...showOnlyForActivitiesList,
				returnAll: [false],
			},
		},
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
				name: 'start_date',
				type: 'dateTime',
				description:
					'Activities whose date is greater than or equal to this value will be returned',
				default: '',
				routing: {
					request: {
						qs: {
							'start-date': '={{ $value.toISOString() }}',
						},
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				description: 'Activities whose date is less than or equal to this value will be returned',
				default: '',
				routing: {
					request: {
						qs: {
							'end-date': '={{ $value.toISOString() }}',
						},
					},
				},
			},
			{
				displayName: 'Movement Type',
				name: 'type',
				type: 'options',
				description: 'Filter activities by movement type',
				options: [
					{
						name: 'Churn',
						value: 'churn',
					},
					{
						name: 'Contraction',
						value: 'contraction',
					},
					{
						name: 'Expansion',
						value: 'expansion',
					},
					{
						name: 'New Business',
						value: 'new_biz',
					},
					{
						name: 'Reactivation',
						value: 'reactivation',
					},
				],
				default: 'new_biz',
				routing: {
					request: {
						qs: {
							type: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'order',
				type: 'options',
				description: 'Order in which activities will be returned',
				options: [
					{
						name: 'Descending',
						value: '-date',
					},
					{
						name: 'Ascending',
						value: 'date',
					},
				],
				default: 'date',
				routing: {
					request: {
						qs: {
							order: '={{ $value }}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: showOnlyForActivitiesList,
		},
	},
];
