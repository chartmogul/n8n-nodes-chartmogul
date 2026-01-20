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
				displayName: 'Source Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter results by source name',
			},
			{
				displayName: 'Billing System',
				name: 'system',
				type: 'string',
				default: '',
				description: 'Filter results by billing system',
			},
		],
		displayOptions: { show: { operation: ['list'], resource: ['source'] } },
	},
];
