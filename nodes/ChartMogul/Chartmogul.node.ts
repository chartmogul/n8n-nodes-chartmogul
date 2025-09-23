import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import { accountOperations } from './AccountFunctions';
import { contactFields, contactOperations } from './ContactFunctions';
import { customerFields, customerOperations } from './CustomerFunctions';
import { planFields, planOperations } from './PlanFunctions';
import { sourceFields, sourceOperations } from './SourceFunctions';
import { noteFields, noteOperations } from './NoteFunctions';
import { taskFields, taskOperations } from './TaskFunctions';
import { opportunityFields, opportunityOperations } from './OpportunityFunctions';
import { metricOperations, metricFields } from './MetricFunctions';
import { planGroupFields, planGroupOperations } from './PlanGroupFunctions';

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
					{ name: 'Metric', value: 'metric' },
					{ name: 'Note and Call Log', value: 'notes' },
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

			...metricOperations,
			...metricFields,

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
