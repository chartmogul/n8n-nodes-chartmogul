import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { accountOperations } from './AccountFunctions';
import { contactFields, contactOperations } from './ContactFunctions';
import { customerFields, customerOperations } from './CustomerFunctions';
import { enrichmentFields, enrichmentOperations } from './EnrichmentFunctions';
import { noteFields, noteOperations } from './NoteFunctions';
import { opportunityFields, opportunityOperations } from './OpportunityFunctions';
import { planFields, planOperations } from './PlanFunctions';
import { planGroupFields, planGroupOperations } from './PlanGroupFunctions';
import { sourceFields, sourceOperations } from './SourceFunctions';
import { taskFields, taskOperations } from './TaskFunctions';

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
					{ name: 'Note and Call Log', value: 'note' },
					{ name: 'Opportunity', value: 'opportunity' },
					{ name: 'Plan', value: 'plan' },
					{ name: 'Plan Group', value: 'plan_group' },
					{ name: 'Source', value: 'source' },
					{ name: 'Task', value: 'task' },
				],
				default: 'account',
			},
			...accountOperations,

			...contactOperations,
			...contactFields,

			...customerOperations,
			...customerFields,

			...enrichmentOperations,
			...enrichmentFields,

			...noteOperations,
			...noteFields,

			...opportunityOperations,
			...opportunityFields,

			...planOperations,
			...planFields,

			...planGroupOperations,
			...planGroupFields,

			...sourceOperations,
			...sourceFields,

			...taskOperations,
			...taskFields,
		],
	};
}
