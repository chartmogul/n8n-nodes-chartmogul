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
					request: {
						method: 'GET',
						url: '/metrics/all'
					}
				},
			},
			{
				name: 'Annual Run Rate (ARR)',
				value: 'arr',
				action: 'Get ARR',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/arr'
					}
				},
			},
			{
				name: 'Average Revenue per Account (ARPA)',
				value: 'arpa',
				action: 'Get ARPA',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/arpa'
					}
				},
			},
			{
				name: 'Average Sale Price (ASP)',
				value: 'asp',
				action: 'Get ASP',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/asp'
					}
				},
			},
			{
				name: 'Customer Churn Rate',
				value: 'customer-churn-rate',
				action: 'Get customer churn rate',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/customer-churn-rate'
					}
				},
			},
			{
				name: 'Customer Count',
				value: 'customer-count',
				action: 'Get customer count',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/customer-count'
					}
				},
			},
			{
				name: 'Customer Lifetime Value (LTV)',
				value: 'ltv',
				action: 'Get LTV',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/ltv'
					}
				},
			},
			{
				name: 'Monthly Recurring Revenue (MRR)',
				value: 'mrr',
				action: 'Get MRR',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/mrr'
					}
				},
			},
			{
				name: 'MRR Churn Rate',
				value: 'mrr-churn-rate',
				action: 'Get MRR churn rate',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics/mrr-churn-rate'
					}
				},
			},
		],
		displayOptions: {
			show: {
				resource: ['metric']
			}
		},
	},
	...allDescription,
	...ltvDescription,
];
