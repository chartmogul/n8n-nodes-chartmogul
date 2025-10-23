"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventFields = exports.eventOperations = exports.EventTypeField = exports.PlanExternalIdField = exports.SubscriptionExternalIdField = exports.IdField = exports.ExternalIdField = exports.EffectiveDateField = exports.EventDateField = exports.CustomerExternalIdField = exports.AssigneeField = void 0;
const SharedOptions_1 = require("./SharedOptions");
const toRequest = (location, field_name, pathURL) => location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };
const AssigneeField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Assignee' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Assignee');
    const description = typeof args === 'string'
        ? 'The email address of the ChartMogul user assigned to the task'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The email address of the ChartMogul user assigned to the task');
    const name = 'assignee';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        placeholder: 'name@email.com',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.AssigneeField = AssigneeField;
const CustomerExternalIdField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string'
        ? 'Customer External ID'
        : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Customer External ID');
    const description = typeof args === 'string'
        ? 'A unique identifier of the customer associated with the subscription event'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'A unique identifier for the customer associated with the subscription event');
    const name = 'customer_external_id';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.CustomerExternalIdField = CustomerExternalIdField;
const CurrencyField = {
    displayName: 'Currency',
    name: 'currency',
    type: 'string',
    default: '',
    description: 'The three-letter currency code',
    routing: { request: { body: { currency: '={{$value}}' } } },
};
const EventDateField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Event Date' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Event Date');
    const description = typeof args === 'string'
        ? 'The date and time when the event was created'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The date and time when the event was created');
    const name = 'event_date';
    return {
        displayName,
        name,
        type: 'dateTime',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.EventDateField = EventDateField;
const EffectiveDateField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Effective Date' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Effective Date');
    const description = typeof args === 'string'
        ? 'The date and time when the event takes effect'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The date and time when the event takes effect');
    const name = 'effective_date';
    return {
        displayName,
        name,
        type: 'dateTime',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.EffectiveDateField = EffectiveDateField;
const ExternalIdField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'External ID' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'External ID');
    const description = typeof args === 'string'
        ? 'The unique identifier for the subscription event'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The unique identifier for the subscription event');
    const name = 'external_id';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.ExternalIdField = ExternalIdField;
const IdField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'ID' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'ID');
    const description = typeof args === 'string'
        ? 'The ChartMogul UUID for the subscription event'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The ChartMogul UUID for the subscription event');
    const name = 'id';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.IdField = IdField;
const SubscriptionExternalIdField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string'
        ? 'Subscription External ID'
        : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Subscription External ID');
    const description = typeof args === 'string'
        ? "A unique identifier for the subscription to which you're adding the subscription event"
        : ((_b = args.description) !== null && _b !== void 0 ? _b : "A unique identifier for the subscription to which you're adding the subscription event");
    const name = 'subscription_external_id';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.SubscriptionExternalIdField = SubscriptionExternalIdField;
const PlanExternalIdField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Plan External ID' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Plan External ID');
    const description = typeof args === 'string'
        ? 'A unique identifier for the plan associated with the subscription event'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'A unique identifier for the plan associated with the subscription event');
    const name = 'plan_external_id';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.PlanExternalIdField = PlanExternalIdField;
const EventTypeField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Event Type' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Event Type');
    const description = typeof args === 'string'
        ? 'The type of the subscription event'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The type of the subscription event');
    const name = 'event_type';
    return {
        displayName,
        name,
        type: 'options',
        options: [
            { name: 'Scheduled Cancellation', value: 'subscription_cancellation_scheduled' },
            {
                name: 'Scheduled Cancellation (Retracted)',
                value: 'scheduled_subscription_cancellation_retracted',
            },
            { name: 'Scheduled Start', value: 'subscription_start_scheduled' },
            { name: 'Scheduled Start (Retracted)', value: 'scheduled_subscription_start_retracted' },
            { name: 'Scheduled Update', value: 'subscription_update_scheduled' },
            { name: 'Scheduled Update (Retracted)', value: 'scheduled_subscription_update_retracted' },
            { name: 'Subscription Cancelled', value: 'subscription_cancelled' },
            { name: 'Subscription Event (Retracted)', value: 'subscription_event_retracted' },
            { name: 'Subscription Start', value: 'subscription_start' },
            { name: 'Subscription Updated', value: 'subscription_updated' },
        ],
        default: 'subscription_cancelled',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.EventTypeField = EventTypeField;
exports.eventOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['event'],
            },
        },
        options: [
            {
                name: 'Create a Subscription Event',
                value: 'create',
                action: 'Create a subscription event',
                routing: {
                    request: { method: 'POST', url: '/subscription_events' },
                },
            },
            {
                name: 'Delete a Subscription Event',
                value: 'delete',
                action: 'Delete a subscription event',
                routing: {
                    request: { method: 'DELETE' },
                },
            },
            {
                name: 'List Subscription Events',
                value: 'list',
                action: 'List subscription events',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/subscription_events',
                    },
                },
            },
            {
                name: 'Retrieve a Subscription Event',
                value: 'get',
                action: 'Retrieve a subscription event',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
            {
                name: 'Update a Subscription Event',
                value: 'update',
                action: 'Update a subscription event',
                routing: {
                    request: {
                        method: 'PATCH',
                    },
                },
            },
        ],
        default: 'get',
    },
];
exports.eventFields = [
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField('body'),
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        ...SharedOptions_1.SharedOptionItems.DataSourceUUIDField('body'),
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        ...(0, exports.EventTypeField)('body'),
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        ...(0, exports.EventDateField)('body'),
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        ...(0, exports.EffectiveDateField)('body'),
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        ...(0, exports.SubscriptionExternalIdField)('body'),
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Filter Options',
        name: 'filterOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['event'],
                operation: ['list'],
            },
        },
        options: [
            (0, exports.ExternalIdField)('qs'),
            (0, exports.CustomerExternalIdField)('qs'),
            SharedOptions_1.SharedOptionItems.DataSourceUUIDField('qs'),
            (0, exports.SubscriptionExternalIdField)('qs'),
            (0, exports.EventTypeField)('qs'),
            (0, exports.EventDateField)('qs'),
            (0, exports.EffectiveDateField)('qs'),
            (0, exports.PlanExternalIdField)('qs'),
            {
                displayName: 'Include Edit History',
                name: 'include_edit_histories',
                type: 'boolean',
                default: false,
                description: 'Whether should contain the edit_history_summary object with a summary of user edits for automatic sources (Stripe, Chargebee, Recurly, Braintree, Google Play and App Store Connect)',
                routing: { request: { qs: { include_edit_histories: '={{$value}}' } } },
            },
            {
                displayName: 'With Disabled Events',
                name: 'with_disabled',
                type: 'boolean',
                default: false,
                description: 'Whether to include disabled events in the response',
                routing: { request: { qs: { with_disabled: '={{$value}}' } } },
            },
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
                resource: ['event'],
                operation: ['list'],
            },
        },
        options: [SharedOptions_1.SharedOptionItems.CursorField, SharedOptions_1.SharedOptionItems.PerPageField],
    },
    {
        displayName: 'Target Subscription Event Using',
        name: 'targetSubscriptionEvent',
        type: 'options',
        options: [
            {
                name: 'External ID and Data Source UUID',
                value: 'externalIdDataSource',
            },
            {
                name: 'ID',
                value: 'id',
            },
        ],
        default: 'externalIdDataSource',
        displayOptions: {
            show: {
                resource: ['event'],
                operation: ['delete', 'update'],
            },
        },
        required: true,
    },
    {
        ...(0, exports.ExternalIdField)('body'),
        displayOptions: {
            show: {
                resource: ['event'],
                operation: ['delete', 'update'],
                targetSubscriptionEvent: ['externalIdDataSource'],
            },
        },
        required: true,
    },
    {
        ...SharedOptions_1.SharedOptionItems.DataSourceUUIDField('body'),
        displayOptions: {
            show: {
                resource: ['event'],
                operation: ['delete', 'update'],
                targetSubscriptionEvent: ['externalIdDataSource'],
            },
        },
        required: true,
    },
    {
        ...(0, exports.IdField)('body'),
        displayOptions: {
            show: {
                resource: ['event'],
                operation: ['delete', 'update'],
                targetSubscriptionEvent: ['id'],
            },
        },
        required: true,
    },
    {
        displayName: 'Update Fields',
        name: 'updateOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['event'],
                operation: ['update'],
            },
        },
        options: [
            (0, exports.CustomerExternalIdField)('body'),
            (0, exports.EventTypeField)('body'),
            (0, exports.EventDateField)('body'),
            (0, exports.EffectiveDateField)('body'),
            (0, exports.SubscriptionExternalIdField)('body'),
            (0, exports.PlanExternalIdField)('body'),
            CurrencyField,
        ],
    },
];
//# sourceMappingURL=SubscriptionEventFunctions.js.map