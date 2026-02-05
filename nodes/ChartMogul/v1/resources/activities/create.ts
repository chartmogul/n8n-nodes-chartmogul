import type { INodeProperties } from 'n8n-workflow';

const showOnlyForActivitiesCreate = {
	resource: ['activities'],
	operation: ['create'],
};

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
				name: 'start_date',
				type: 'dateTime',
				description:
					'Activities whose date is greater than or equal to this value will be returned',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'start-date',
						value: '={{ $value.toISOString() }}',
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
					send: {
						type: 'body',
						property: 'end-date',
						value: '={{ $value.toISOString() }}',
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
					send: {
						type: 'body',
						property: 'type',
					},
				},
			},
		],
		displayOptions: {
			show: showOnlyForActivitiesCreate,
		},
	},
];
