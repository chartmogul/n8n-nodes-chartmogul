import type { SourceProperties } from '../../Interfaces';

export const sourceListDescription: SourceProperties = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Billing System',
				name: 'system',
				type: 'string',
				default: '',
			},
		],
		displayOptions: {
			show: {
				operation: ['list'],
				resource: ['source'],
			},
		},
	},
];
