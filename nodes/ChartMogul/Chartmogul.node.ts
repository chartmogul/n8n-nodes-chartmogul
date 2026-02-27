import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { accountDescription } from './resources/account';
import { activitiesDescription } from './resources/activity';
import { contactDescription } from './resources/contact';
import { customerDescription } from './resources/customer';
import { enrichmentDescription } from './resources/enrichment';
import { eventDescription } from './resources/event';
import { invoiceDescription } from './resources/invoice';
import { lineItemDescription } from './resources/line_item';
import { metricDescription } from './resources/metric';
import { noteDescription } from './resources/note';
import { opportunityDescription, opportunityFields } from './resources/opportunity';
import { planDescription } from './resources/plan';
import { planGroupDescription } from './resources/planGroup';
import { sourceDescription } from './resources/source';
import { subscriptionDescription } from './resources/subscription';
import { taskDescription } from './resources/task';
import { transactionDescription } from './resources/transaction';

export class Chartmogul implements INodeType {
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
					{ name: 'Plan Group', value: 'planGroup' },
					{ name: 'Source', value: 'source' },
					{ name: 'Subscription', value: 'subscription' },
					{ name: 'Task', value: 'task' },
					{ name: 'Transaction', value: 'transaction' },
				],
				default: 'account',
			},
			...accountDescription,
			...activitiesDescription,
			...contactDescription,
			...customerDescription,
			...enrichmentDescription,
			...eventDescription,
			...invoiceDescription,
			...lineItemDescription,
			...metricDescription,
			...noteDescription,
			...opportunityDescription,
			...opportunityFields,
			...planDescription,
			...planGroupDescription,
			...sourceDescription,
			...subscriptionDescription,
			...taskDescription,
			...transactionDescription,
		],
	};
}
