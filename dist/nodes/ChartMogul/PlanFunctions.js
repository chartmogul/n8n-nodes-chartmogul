"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planFields = exports.planOperations = void 0;
const SharedOptions_1 = require("./SharedOptions");
const PlanIntervalCountField = {
    displayName: 'Plan Interval Count',
    name: 'interval_count',
    type: 'number',
    default: 1,
    typeOptions: { minValue: 1 },
    description: 'The number of intervals between each billing cycle',
    routing: { request: { body: { interval_count: '={{$value}}' } } },
};
const PlanIntervalUnitField = {
    displayName: 'Plan Interval Unit',
    name: 'interval_unit',
    type: 'options',
    options: [
        { name: 'Day', value: 'day' },
        { name: 'Month', value: 'month' },
        { name: 'Year', value: 'year' },
    ],
    default: 'month',
    description: 'The unit of time for the plan interval',
    routing: { request: { body: { interval_unit: '={{$value}}' } } },
};
exports.planOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['plan'],
            },
        },
        options: [
            {
                name: 'Create a Plan',
                value: 'create',
                action: 'Create a plan',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/plans',
                    },
                },
            },
            {
                name: 'Delete a Plan',
                value: 'delete',
                action: 'Delete a plan',
                routing: {
                    request: {
                        method: 'DELETE',
                    },
                },
            },
            {
                name: 'List Plans',
                value: 'list',
                action: 'List all plans',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/plans',
                    },
                },
            },
            {
                name: 'Retrieve a Plan',
                value: 'get',
                action: 'Retrieve a plan',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
            {
                name: 'Update a Plan',
                value: 'update',
                action: 'Update a plan',
                routing: {
                    request: {
                        method: 'PATCH',
                    },
                },
            },
        ],
        default: 'list',
    },
];
exports.planFields = [
    {
        ...SharedOptions_1.SharedOptionItems.DataSourceUUIDField({
            location: 'body',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Plan UUID',
        name: 'plan_uuid',
        type: 'string',
        required: true,
        default: '',
        description: 'The UUID of the plan',
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['get', 'delete', 'update'],
            },
        },
        routing: {
            request: {
                url: '=/plans/{{$value}}',
            },
        },
    },
    {
        ...SharedOptions_1.SharedOptionItems.NameField({
            location: 'body',
            displayName: 'Plan Name',
            description: 'The name of the plan',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create'],
            },
        },
    },
    {
        ...PlanIntervalCountField,
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create'],
            },
        },
    },
    {
        ...PlanIntervalUnitField,
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Update Options',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['update'],
            },
        },
        options: [
            SharedOptions_1.SharedOptionItems.NameField({
                location: 'body',
                displayName: 'Plan Name',
                description: 'The name of the plan',
            }),
            PlanIntervalCountField,
            PlanIntervalUnitField,
        ],
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Define External ID',
        default: {},
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create'],
            },
        },
        options: [SharedOptions_1.SharedOptionItems.ExternalIDField],
    },
    {
        displayName: 'Filter Options',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['list'],
            },
        },
        options: [
            SharedOptions_1.SharedOptionItems.BillingSystemField,
            SharedOptions_1.SharedOptionItems.DataSourceUUIDField({ location: 'qs' }),
            SharedOptions_1.SharedOptionItems.ExternalIDField,
        ],
    },
    {
        displayName: 'Pagination',
        name: 'pagination',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['list'],
            },
        },
        options: [SharedOptions_1.SharedOptionItems.CursorField, SharedOptions_1.SharedOptionItems.PerPageField],
    },
];
//# sourceMappingURL=PlanFunctions.js.map