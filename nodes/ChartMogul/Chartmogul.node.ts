import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { accountOperations } from './AccountFunctions';
import { contactFields, contactOperations } from './ContactFunctions';
import { customerFields, customerOperations } from './CustomerFunctions';
import { planFields, planOperations } from './PlanFunctions';
import { sourceFields, sourceOperations } from './SourceFunctions';

export class Chartmogul implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ChartMogul',
		name: 'chartmogul',
		icon: 'file:chartmogul.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ChartMogul API',
		defaults: {
			name: 'ChartMogul',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'chartmogulApi',
				required: true,
			},
		],
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
					{ name: 'Contact', value: 'contact' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Plan', value: 'plan' },
					{ name: 'Source', value: 'source' },
				],
				default: 'account',
			},
			...accountOperations,

			...contactOperations,
			...contactFields,

			...customerOperations,
			...customerFields,

			...planOperations,
			...planFields,

			...sourceOperations,
			...sourceFields,
		],
	};
}
