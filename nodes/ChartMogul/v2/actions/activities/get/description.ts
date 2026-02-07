import type { ActivityProperties } from '../../Interfaces';

export const activitiesGetDescription: ActivityProperties = [
	{
		displayName: 'Export ID',
		name: 'exportId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the activities export to retrieve',
		displayOptions: {
			show: {
				resource: ['activities'],
				operation: ['get'],
			},
		},
	}
];
