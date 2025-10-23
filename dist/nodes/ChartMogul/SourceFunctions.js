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
        displayOptions: {
            show: {
                resource: ['source'],
            },
        },
        options: [
            {
                name: 'Create a Source',
                value: 'create',
                action: 'Create a source',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/data_sources',
                    },
                },
            },
            {
                name: 'List Sources',
                value: 'list',
                action: 'List all sources',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/data_sources',
                    },
                    output: {
                        postReceive: [
                            {
                                type: 'rootProperty',
                                properties: {
                                    property: 'data_sources',
                                },
                            },
                        ],
                    },
                },
            },
            {
                name: 'Retrieve a Source',
                value: 'get',
                action: 'Retrieve a source',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
            {
                name: 'Delete a Source',
                value: 'delete',
                action: 'Delete a source',
                routing: {
                    request: {
                        method: 'DELETE',
                    },
                },
            },
        ],
        default: 'create',
    },
];
exports.sourceFields = [
    {
        ...SharedOptions_1.SharedOptionItems.NameField({
            location: 'body',
            displayName: 'Data Source Name',
            description: 'The desired name for the new data source',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['source'],
                operation: ['create'],
            },
        },
    },
    {
        ...SharedOptions_1.SharedOptionItems.DataSourceUUIDField({
            location: 'path',
            pathURL: '=/data_sources/{{$value}}',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['source'],
                operation: ['get', 'delete'],
            },
        },
    },
    {
        displayName: 'Filter Options',
        name: 'filterOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['source'],
                operation: ['list'],
            },
        },
        options: [
            SharedOptions_1.SharedOptionItems.NameField({
                location: 'qs',
                displayName: 'Data Source Name',
                description: 'Filter results by source name',
            }),
            SharedOptions_1.SharedOptionItems.BillingSystemField,
        ],
    },
];
//# sourceMappingURL=SourceFunctions.js.map