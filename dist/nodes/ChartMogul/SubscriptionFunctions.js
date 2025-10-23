"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionFields = exports.subscriptionOperations = void 0;
const SharedOptions_1 = require("./SharedOptions");
exports.subscriptionOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['subscription'],
            },
        },
        options: [
            {
                name: "List Customer's Subscriptions",
                value: 'list',
                action: 'List subscriptions for a customer',
                routing: { request: { method: 'GET' } },
            },
            {
                name: 'Connect Subscriptions',
                value: 'connect',
                action: 'Connect subscriptions of a customer',
                routing: { request: { method: 'POST' } },
            },
            {
                name: 'Disconnect Subscriptions',
                value: 'disconnect',
                action: 'Disconnect subscriptions of a customer',
                routing: { request: { method: 'POST' } },
            },
        ],
        default: 'list',
    },
];
exports.subscriptionFields = [
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField({
            location: 'path',
            pathURL: '=/customers/{{$value}}/subscriptions',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['subscription'],
                operation: ['list'],
            },
        },
    },
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField({
            location: 'path',
            pathURL: '=/customers/{{$value}}/connect_subscriptions',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['subscription'],
                operation: ['connect'],
            },
        },
    },
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField({
            location: 'path',
            pathURL: '=/customers/{{$value}}/disconnect_subscriptions',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['subscription'],
                operation: ['disconnect'],
            },
        },
    },
    {
        displayName: 'Subscriptions',
        name: 'subscriptions',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
            multipleValueButtonText: 'Add Subscription',
            minValue: 2,
        },
        default: [],
        displayOptions: {
            show: {
                resource: ['subscription'],
                operation: ['connect', 'disconnect'],
            },
        },
        required: true,
        options: [
            {
                name: 'subscriptionValues',
                displayName: 'Subscription',
                values: [
                    {
                        displayName: 'Data Source UUID',
                        name: 'dataSourceUUID',
                        type: 'string',
                        required: true,
                        default: '',
                    },
                    {
                        displayName: 'Subscription External ID',
                        name: 'subscriptionExternalId',
                        type: 'string',
                        required: true,
                        default: '',
                    },
                ],
            },
        ],
        routing: { request: { body: { subscriptions: '={{value}}' } } },
    },
    {
        displayName: 'Pagination',
        name: 'pagination',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['subscription'],
                operation: ['list'],
            },
        },
        options: [SharedOptions_1.SharedOptionItems.CursorField, SharedOptions_1.SharedOptionItems.PerPageField],
    },
];
//# sourceMappingURL=SubscriptionFunctions.js.map