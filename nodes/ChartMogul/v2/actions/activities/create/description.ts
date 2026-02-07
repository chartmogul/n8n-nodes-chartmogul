import type { ActivityProperties } from '../../Interfaces';

export const activitiesCreateDescription: ActivityProperties = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{
				displayName: 'Movement Type',
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
					}
				],
				default: 'new_biz',
				description: 'The type of activity movement to filter by',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'The start date for the activities export',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'The end date for the activities export',
			},
		],
		displayOptions: {
			show: {
				resource: ['activities'],
				operation: ['create'],
			},
		},
	},
];
