/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { INodeTypeDescription } from 'n8n-workflow';
	
import * as account from './account';
//import * as plan from './plan';
import * as source from './source';

export const versionDescription: INodeTypeDescription = {
	displayName: 'ChartMogul',
	name: 'chartmogul',
	icon: 'file:../../../icons/chartmogul.svg',
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
	credentials: [
		{
			name: 'chartmogulApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{ name: 'Account', value: 'account' },
				//{ name: 'Plan', value: 'plan' },
				{ name: 'Source', value: 'source' },
			],
			default: 'account',
		},

		...account.descriptions,
		//...plan.descriptions,
		...source.descriptions,

	],
};
