import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { accountOperations } from './AccountFunctions';
import { activitiesFields, activitiesOperations } from './ActivitiesFunctions';
import { contactFields, contactOperations } from './ContactFunctions';
import { customerFields, customerOperations } from './CustomerFunctions';
import { enrichmentFields, enrichmentOperations } from './EnrichmentFunctions';
import { eventFields, eventOperations } from './SubscriptionEventFunctions';
import { invoiceFields, invoiceOperations } from './InvoiceFunctions';
import { lineItemFields, lineItemOperations } from './LineItemFunctions';
import { metricFields, metricOperations } from './MetricFunctions';
import { noteFields, noteOperations } from './NoteFunctions';
import { opportunityFields, opportunityOperations } from './OpportunityFunctions';
import { planFields, planOperations } from './PlanFunctions';
import { planGroupFields, planGroupOperations } from './PlanGroupFunctions';
import { sourceFields, sourceOperations } from './SourceFunctions';
import { subscriptionFields, subscriptionOperations } from './SubscriptionFunctions';
import { taskFields, taskOperations } from './TaskFunctions';
import { transactionFields, transactionOperations } from './TransactionFunctions';

export class ChartmogulV1 implements INodeType {
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
					{ name: 'Activity', value: 'activities' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Enrichment', value: 'enrichment' },
					{ name: 'Event', value: 'event' },
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

			...activitiesOperations,
			...activitiesFields,

			...contactOperations,
			...contactFields,

			...customerOperations,
			...customerFields,

			...enrichmentOperations,
			...enrichmentFields,

			...eventOperations,
			...eventFields,

			...invoiceOperations,
			...invoiceFields,

			...lineItemOperations,
			...lineItemFields,

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

			...subscriptionOperations,
			...subscriptionFields,

			...taskOperations,
			...taskFields,

			...transactionOperations,
			...transactionFields,
		],
	};
}
