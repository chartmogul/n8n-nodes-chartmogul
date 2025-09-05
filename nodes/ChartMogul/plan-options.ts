import type { INodeProperties } from 'n8n-workflow';

const PlanIntervalCountField: INodeProperties = {
	displayName: 'Plan Interval Count',
	name: 'interval_count',
	type: 'number',
	default: 1,
	typeOptions: { minValue: 1 },
	description: 'The number of intervals between each billing cycle',
	routing: { request: { body: { interval_count: '={{$value}}' } } },
};

const PlanIntervalUnitField: INodeProperties = {
	displayName: 'Plan Interval Unit',
	name: 'interval_unit',
	type: 'options',
	options: [
		{ name: 'Day', value: 'day' },
		{ name: 'Month', value: 'month' },
		{ name: 'Year', value: 'year' },
	],
	default: 'month',
	description: 'The unit of time for the plan interval',
	routing: { request: { body: { interval_unit: '={{$value}}' } } },
};

export const PlanOptionItems = {
	PlanIntervalCountField,
	PlanIntervalUnitField,
};
