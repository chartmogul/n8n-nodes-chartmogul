"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chartmogul = void 0;
const AccountFunctions_1 = require("./AccountFunctions");
const ContactFunctions_1 = require("./ContactFunctions");
const CustomerFunctions_1 = require("./CustomerFunctions");
const PlanFunctions_1 = require("./PlanFunctions");
const SourceFunctions_1 = require("./SourceFunctions");
const NoteFunctions_1 = require("./NoteFunctions");
const OpportunityFunctions_1 = require("./OpportunityFunctions");
const MetricFunctions_1 = require("./MetricFunctions");
const PlanGroupFunctions_1 = require("./PlanGroupFunctions");
const TaskFunctions_1 = require("./TaskFunctions");
const TransactionFunctions_1 = require("./TransactionFunctions");
const SubscriptionFunctions_1 = require("./SubscriptionFunctions");
const LineItemFunctions_1 = require("./LineItemFunctions");
const EnrichmentFunctions_1 = require("./EnrichmentFunctions");
class Chartmogul {
    constructor() {
        this.description = {
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
                ...AccountFunctions_1.accountOperations,
                ...ContactFunctions_1.contactOperations,
                ...ContactFunctions_1.contactFields,
                ...CustomerFunctions_1.customerOperations,
                ...CustomerFunctions_1.customerFields,
                ...LineItemFunctions_1.lineitemOperations,
                ...LineItemFunctions_1.lineitemFields,
                ...MetricFunctions_1.metricOperations,
                ...MetricFunctions_1.metricFields,
                ...NoteFunctions_1.noteOperations,
                ...NoteFunctions_1.noteFields,
                ...OpportunityFunctions_1.opportunityOperations,
                ...OpportunityFunctions_1.opportunityFields,
                ...PlanFunctions_1.planOperations,
                ...PlanFunctions_1.planFields,
                ...PlanGroupFunctions_1.planGroupOperations,
                ...PlanGroupFunctions_1.planGroupFields,
                ...EnrichmentFunctions_1.enrichmentOperations,
                ...EnrichmentFunctions_1.enrichmentFields,
                ...SourceFunctions_1.sourceOperations,
                ...SourceFunctions_1.sourceFields,
                ...SubscriptionFunctions_1.subscriptionOperations,
                ...SubscriptionFunctions_1.subscriptionFields,
                ...TaskFunctions_1.taskOperations,
                ...TaskFunctions_1.taskFields,
                ...TransactionFunctions_1.transactionOperations,
                ...TransactionFunctions_1.transactionFields,
            ],
        };
    }
}
exports.Chartmogul = Chartmogul;
//# sourceMappingURL=Chartmogul.node.js.map