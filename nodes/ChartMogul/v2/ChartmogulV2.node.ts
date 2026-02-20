import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { accountDescription } from './account';
import { activitiesDescription } from './activity';
import { contactDescription } from './contact';
import { customerDescription } from './customer';
import { enrichmentDescription } from './enrichment';
import { eventDescription } from './event';
import { invoiceDescription } from './invoice';
import { lineItemDescription } from './line_item';
import { metricDescription } from './metric';
import { noteDescription } from './note';
import { opportunityDescription, opportunityFields } from './opportunity';
import { planDescription } from './plan';
import { planGroupDescription } from './plan_group';
import { sourceDescription } from './source';
import { subscriptionDescription } from './subscription';
import { taskDescription } from './task';
import { transactionDescription } from './transaction';

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
