"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricFields = exports.metricOperations = void 0;
exports.metricOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['metric'],
            },
        },
        options: [
            {
                name: 'All Key Metrics',
                value: 'all',
                action: 'Get all key metrics',
                routing: {
                    request: { method: 'GET', url: '/metrics/all' },
                },
            },
            {
                name: 'ARR',
                value: 'arr',
                action: 'Get ARR',
                routing: {
                    request: { method: 'GET', url: '/metrics/arr' },
                },
            },
            {
                name: 'Average Revenue per Account (ARPA)',
                value: 'arpa',
                action: 'Get ARPA',
                routing: {
                    request: { method: 'GET', url: '/metrics/arpa' },
                },
            },
            {
                name: 'Average Sale Price (ASP)',
                value: 'asp',
                action: 'Get ASP',
                routing: {
                    request: { method: 'GET', url: '/metrics/asp' },
                },
            },
            {
                name: 'Customer Churn Rate',
                value: 'customer-churn-rate',
                action: 'Get customer churn rate',
                routing: {
                    request: { method: 'GET', url: '/metrics/customer-churn-rate' },
                },
            },
            {
                name: 'Customer Count',
                value: 'customer-count',
                action: 'Get customer count',
                routing: {
                    request: { method: 'GET', url: '/metrics/customer-count' },
                },
            },
            {
                name: 'Customer Lifetime Value (LTV)',
                value: 'ltv',
                action: 'Get LTV',
                routing: {
                    request: { method: 'GET', url: '/metrics/ltv' },
                },
            },
            {
                name: 'MRR',
                value: 'mrr',
                action: 'Get MRR',
                routing: {
                    request: { method: 'GET', url: '/metrics/mrr' },
                },
            },
            {
                name: 'MRR Churn Rate',
                value: 'mrr-churn-rate',
                action: 'Get MRR churn rate',
                routing: {
                    request: { method: 'GET', url: '/metrics/mrr-churn-rate' },
                },
            },
        ],
        default: 'all',
    },
];
exports.metricFields = [
    {
        displayName: 'Start Date',
        name: 'start-date',
        type: 'dateTime',
        default: '',
        description: 'The start date of the required period of data',
        routing: { request: { qs: { 'start-date': '={{$value}}' } } },
        displayOptions: {
            show: {
                resource: ['metric'],
            },
        },
        required: true,
    },
    {
        displayName: 'End Date',
        name: 'end-date',
        type: 'dateTime',
        default: '',
        description: 'The end date of the required period of data',
        routing: { request: { qs: { 'end-date': '={{$value}}' } } },
        displayOptions: {
            show: {
                resource: ['metric'],
            },
        },
        required: true,
    },
    {
        displayName: 'Reporting Interval',
        name: 'interval',
        type: 'options',
        options: [
            { name: 'Day', value: 'day' },
            { name: 'Month', value: 'month' },
            { name: 'Quarter', value: 'quarter' },
            { name: 'Week', value: 'week' },
            { name: 'Year', value: 'year' },
        ],
        default: 'month',
        routing: { request: { body: { interval: '={{$value}}' } } },
        displayOptions: {
            show: {
                resource: ['metric'],
            },
            hide: {
                operation: ['ltv'],
            },
        },
    },
    {
        displayName: 'Region',
        name: 'geo',
        type: 'string',
        default: '',
        description: 'A comma-separated list of 2-letter country codes to filter the results to, e.g. US,GB,DE',
        displayOptions: {
            show: {
                resource: ['metric'],
            },
        },
    },
    {
        displayName: 'Plans',
        name: 'plans',
        type: 'string',
        default: '',
        description: 'A comma-separated list of plan UUIDs, external IDs or names to filter the results',
        displayOptions: {
            show: {
                resource: ['metric'],
            },
        },
    },
];
//# sourceMappingURL=MetricFunctions.js.map