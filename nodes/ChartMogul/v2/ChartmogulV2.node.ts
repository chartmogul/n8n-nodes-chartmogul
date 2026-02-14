import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import * as account from './resources/account';
import * as metric from './resources/metric';
import * as plan from './resources/plan';
import * as source from './resources/source';

export class ChartmogulV2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ChartMogul',
		name: 'chartmogul',
		icon: 'file:chartmogul.svg',
		group: ['transform'],
		version: 2,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ChartMogul API',
		defaults: {
			name: 'ChartMogul',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'chartmogulApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.chartmogul.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Metric', value: 'metric' },
					{ name: 'Plan', value: 'plan' },
					{ name: 'Source', value: 'source' },
				],
				default: 'account',
			},
			...account.description,
			...metric.description,
			...plan.description,
			...source.description,
		],
	};
}
