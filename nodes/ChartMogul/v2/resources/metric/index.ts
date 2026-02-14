import type { INodeProperties } from 'n8n-workflow';

import { allDescription } from './all';
import { arpaDescription } from './arpa';
import { arrDescription } from './arr';
import { aspDescription } from './asp';
import { cusChurnDescription } from './cusChurn';
import { cusCountDescription } from './cusCount';
import { ltvDescription } from './ltv';
import { mrrDescription } from './mrr';
import { mrrChurnDescription } from './mrrChurn';

const showOnlyForMetric = {
	resource: ['metric'],
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Get All Key Metrics',
				value: 'all',
				action: 'Get all key metrics',
				routing: { request: { method: 'GET', url: '/metrics/all', }, },
			},
			{
				name: 'Get ARR',
				value: 'arr',
				action: 'Get ARR',
				routing: { request: { method: 'GET', url: '/metrics/arr', }, },
			},
			{
				name: 'Get Average Revenue Per Account (ARPA)',
				value: 'arpa',
				action: 'Get ARPA',
				routing: { request: { method: 'GET', url: '/metrics/arpa', }, },
			},
			{
				name: 'Get Average Sale Price (ASP)',
				value: 'asp',
				action: 'Get ASP',
				routing: { request: { method: 'GET', url: '/metrics/asp', }, },
			},
			{
				name: 'Get Customer Churn Rate',
				value: 'cusChurn',
				action: 'Get customer churn rate',
				routing: { request: { method: 'GET', url: '/metrics/customer-churn-rate', }, },
			},
			{
				name: 'Get Customer Count',
				value: 'cusCount',
				action: 'Get customer count',
				routing: { request: { method: 'GET', url: '/metrics/customer-count', }, },
			},
			{
				name: 'Get Customer Lifetime Value (LTV)',
				value: 'ltv',
				action: 'Get customer lifetime value',
				routing: { request: { method: 'GET', url: '/metrics/ltv', }, },
			},
			{
				name: 'Get MRR',
				value: 'mrr',
				action: 'Get MRR',
				routing: { request: { method: 'GET', url: '/metrics/mrr', }, },
			},
			{
				name: 'Get MRR Churn Rate',
				value: 'mrrChurn',
				action: 'Get MRR churn rate',
				routing: { request: { method: 'GET', url: '/metrics/mrr-churn-rate', }, },
			}
		],
		default: 'all',
		displayOptions: {
			show: showOnlyForMetric,
		},
	},

	...allDescription,
	...arrDescription,
	...arpaDescription,
	...aspDescription,
	...cusChurnDescription,
	...cusCountDescription,
	...ltvDescription,
	...mrrDescription,
	...mrrChurnDescription,
];
