import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { accountOperations } from './AccountFunctions';
import { contactFields, contactOperations } from './ContactFunctions';
import { customerFields, customerOperations } from './CustomerFunctions';
import { sourceFields, sourceOperations } from './SourceFunctions';
import { noteFields, noteOperations } from './NoteFunctions';
import { opportunityFields, opportunityOperations } from './OpportunityFunctions';
import { metricOperations, metricFields } from './MetricFunctions';
import { taskFields, taskOperations } from './TaskFunctions';
import { enrichmentFields, enrichmentOperations } from './EnrichmentFunctions';

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
					{ name: 'Contact', value: 'contact' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Enrichment', value: 'enrichment' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Line Item', value: 'line_item' },
					{ name: 'Metric', value: 'metric' },
					{ name: 'Note and Call Log', value: 'note' },
					{ name: 'Opportunity', value: 'opportunity' },
					{ name: 'Plan', value: 'plan' },
					{ name: 'Plan Group', value: 'plan_group' },
					{ name: 'Source', value: 'source' },
					{ name: 'Subscription', value: 'subscription' },
					{ name: 'Task', value: 'task' },
					{ name: 'Transaction', value: 'transaction' },
				],
				default: 'account',
			},
			...accountOperations,

			...contactOperations,
			...contactFields,

			...customerOperations,
			...customerFields,

			...metricOperations,
			...metricFields,

			...noteOperations,
			...noteFields,

			...opportunityOperations,
			...opportunityFields,

			...enrichmentOperations,
			...enrichmentFields,

			...sourceOperations,
			...sourceFields,

			...taskOperations,
			...taskFields,
		],
	};
}
