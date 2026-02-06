import type { SourceProperties } from '../../Interfaces';

export const sourceCreateDescription: SourceProperties = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
                resource: ['source'],
                operation: ['create'],
            },
		},
	},
];
