import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSourceList = {
	resource: ['source'],
	operation: ['list'],
};

export const listDescription: INodeProperties[] = [
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter results by source name',
				routing: {
					request: {
						qs: {
							name: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Billing System',
				name: 'system',
				type: 'string',
				default: '',
				description: 'Filter results by billing system',
				routing: {
					request: {
						qs: {
							system: '={{ $value }}',
						},
					},
				},
			},
		],
		displayOptions: {
			show: showOnlyForSourceList,
		},
	},
];
