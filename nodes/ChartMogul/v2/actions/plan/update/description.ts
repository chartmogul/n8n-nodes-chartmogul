import type { PlanProperties } from '../../Interfaces';

export const planUpdateDescription: PlanProperties = [
	{
		displayName: 'Plan UUID',
		name: 'planUUID',
		type: 'string',
		default: '',
		description: 'UUID of the plan to be updated',
		displayOptions: { show: { operation: ['update'], resource: ['plan'] } },
		required: true,
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the plan',
			},
			{
				displayName: 'Interval Count',
				name: 'interval_count',
				type: 'number',
				default: 1,
				description: 'The frequency of the billing interval',
			},
			{
				displayName: 'Interval Unit',
				name: 'interval_unit',
				type: 'options',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Month', value: 'month' },
					{ name: 'Year', value: 'year' },
				],
				default: 'month',
				description: 'The unit of time for the billing interval',
			}
		],
		displayOptions: { show: { operation: ['update'], resource: ['plan'] } },
	}
];
