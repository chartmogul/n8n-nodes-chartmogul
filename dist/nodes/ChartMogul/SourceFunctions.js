"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceFields = exports.sourceOperations = void 0;
const SharedOptions_1 = require("./SharedOptions");
exports.sourceOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Create a Source',
                value: 'create',
                action: 'Create a source',
                routing: { request: { method: 'POST', url: '/data_sources' } },
            },
            {
                name: 'List Sources',
                value: 'list',
                action: 'List all sources',
                routing: {
                    request: { method: 'GET', url: '/data_sources' },
                    output: {
                        postReceive: [{ type: 'rootProperty', properties: { property: 'data_sources' } }],
                    },
                },
            },
            {
                name: 'Retrieve a Source',
                value: 'get',
                action: 'Retrieve a source',
                routing: {
                    request: { method: 'GET', url: '=/data_sources/{{$parameter.dataSourceUUID}}' },
                },
            },
            {
                name: 'Delete a Source',
                value: 'delete',
                action: 'Delete a source',
                routing: {
                    request: { method: 'DELETE', url: '=/data_sources/{{$parameter.dataSourceUUID}}' },
                    output: {
                        postReceive: [{ type: 'set', properties: { value: '={{ { deleted: true } }}' } }],
                    },
                },
            },
        ],
        default: 'create',
        displayOptions: { show: { resource: ['source'] } },
    },
];
exports.sourceFields = [
    {
        ...SharedOptions_1.SharedOptionItems.NameField({
            location: 'body',
            displayName: 'Data Source Name',
            description: 'The desired name for the new data source',
        }),
        displayOptions: { show: { resource: ['source'], operation: ['create'] } },
        required: true,
    },
    {
        displayName: 'Data Source UUID',
        name: 'dataSourceUUID',
        type: 'string',
        default: '',
        description: 'ChartMogul UUID of the Data Source',
        displayOptions: { show: { resource: ['source'], operation: ['get', 'delete'] } },
        required: true,
    },
    {
        displayName: 'Filter Options',
        name: 'filterOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'Filter results by source name',
                routing: { request: { qs: { name: '={{$value}}' } } },
            },
            {
                displayName: 'Billing System',
                name: 'system',
                type: 'string',
                default: '',
                description: 'Filter results by billing system',
                routing: { request: { qs: { system: '={{$value}}' } } },
            },
        ],
        displayOptions: { show: { resource: ['source'], operation: ['list'] } },
    },
];
//# sourceMappingURL=SourceFunctions.js.map