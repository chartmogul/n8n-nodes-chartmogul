import { INodeProperties } from 'n8n-workflow';

import { allDescription } from './all';
import { ltvDescription } from './ltv';

export const metricDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'all',
		options: [
			{
				name: 'All Key Metrics',
				value: 'all',
				action: 'Get all key metrics',
				routing: {
					request: { method: 'GET', url: '/metrics/all' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'Annual Run Rate (ARR)',
				value: 'arr',
				action: 'Get ARR',
				routing: {
					request: { method: 'GET', url: '/metrics/arr' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'Average Revenue per Account (ARPA)',
				value: 'arpa',
				action: 'Get ARPA',
				routing: {
					request: { method: 'GET', url: '/metrics/arpa' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'Average Sale Price (ASP)',
				value: 'asp',
				action: 'Get ASP',
				routing: {
					request: { method: 'GET', url: '/metrics/asp' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'Customer Churn Rate',
				value: 'customer-churn-rate',
				action: 'Get customer churn rate',
				routing: {
					request: { method: 'GET', url: '/metrics/customer-churn-rate' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'Customer Count',
				value: 'customer-count',
				action: 'Get customer count',
				routing: {
					request: { method: 'GET', url: '/metrics/customer-count' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'Customer Lifetime Value (LTV)',
				value: 'ltv',
				action: 'Get LTV',
				routing: {
					request: { method: 'GET', url: '/metrics/ltv' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'Monthly Recurring Revenue (MRR)',
				value: 'mrr',
				action: 'Get MRR',
				routing: {
					request: { method: 'GET', url: '/metrics/mrr' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
			{
				name: 'MRR Churn Rate',
				value: 'mrr-churn-rate',
				action: 'Get MRR churn rate',
				routing: {
					request: { method: 'GET', url: '/metrics/mrr-churn-rate' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'entries' } }] },
				},
			},
		],
		displayOptions: { show: { resource: ['metric'] } },
	},
	...allDescription,
	...ltvDescription,
];
