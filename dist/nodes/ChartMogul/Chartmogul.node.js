"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chartmogul = void 0;
const AccountFunctions_1 = require("./AccountFunctions");
const ContactFunctions_1 = require("./ContactFunctions");
const CustomerFunctions_1 = require("./CustomerFunctions");
const EnrichmentFunctions_1 = require("./EnrichmentFunctions");
const NoteFunctions_1 = require("./NoteFunctions");
const OpportunityFunctions_1 = require("./OpportunityFunctions");
const SourceFunctions_1 = require("./SourceFunctions");
const TaskFunctions_1 = require("./TaskFunctions");
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
                        { name: 'Note and Call Log', value: 'note' },
                        { name: 'Opportunity', value: 'opportunity' },
                        { name: 'Source', value: 'source' },
                        { name: 'Task', value: 'task' },
                    ],
                    default: 'account',
                },
                ...AccountFunctions_1.accountOperations,
                ...ContactFunctions_1.contactOperations,
                ...ContactFunctions_1.contactFields,
                ...CustomerFunctions_1.customerOperations,
                ...CustomerFunctions_1.customerFields,
                ...EnrichmentFunctions_1.enrichmentOperations,
                ...EnrichmentFunctions_1.enrichmentFields,
                ...NoteFunctions_1.noteOperations,
                ...NoteFunctions_1.noteFields,
                ...OpportunityFunctions_1.opportunityOperations,
                ...OpportunityFunctions_1.opportunityFields,
                ...SourceFunctions_1.sourceOperations,
                ...SourceFunctions_1.sourceFields,
                ...TaskFunctions_1.taskOperations,
                ...TaskFunctions_1.taskFields,
            ],
        };
    }
}
exports.Chartmogul = Chartmogul;
//# sourceMappingURL=Chartmogul.node.js.map