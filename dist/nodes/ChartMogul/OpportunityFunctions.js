"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunityFields = exports.opportunityOperations = exports.PipelineStageField = exports.PipelineField = exports.OwnerField = void 0;
const SharedOptions_1 = require("./SharedOptions");
const toRequest = (location, field_name, pathURL) => location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };
const OwnerField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Owner' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Owner');
    const description = typeof args === 'string'
        ? 'The email address of the ChartMogul user with a CRM seat who is the primary salesperson responsible for this opportunity'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The email address of the ChartMogul user with a CRM seat who is the primary salesperson responsible for this opportunity');
    const name = 'owner';
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
exports.OwnerField = OwnerField;
const PipelineField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Pipeline' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Pipeline');
    const description = typeof args === 'string'
        ? 'The sales pipeline name'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The sales pipeline name');
    const name = 'pipeline';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.PipelineField = PipelineField;
const PipelineStageField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Pipeline Stage' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Pipeline Stage');
    const description = typeof args === 'string'
        ? 'The name of the current deal stage within the sales pipeline.'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The name of the current deal stage within the sales pipeline.');
    const name = 'pipeline_stage';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.PipelineStageField = PipelineStageField;
const EstimatedCloseDateField = {
    displayName: 'Estimated Close Date',
    name: 'estimated_close_date',
    type: 'dateTime',
    default: '',
    description: 'The date when the opportunity is expected to close',
    routing: { request: { body: { estimated_close_date: '={{$value}}' } } },
};
const AmountInCentsField = {
    displayName: 'Amount in Cents',
    name: 'amount_in_cents',
    type: 'number',
    default: 0,
    description: 'Amount in cents of expected close value of this opportunity',
    routing: { request: { body: { amount_in_cents: '={{$value}}' } } },
};
const CurrencyField = {
    displayName: 'Currency',
    name: 'currency',
    type: 'string',
    default: '',
    description: 'The three-letter currency code of the currency of the expected close value',
    routing: { request: { body: { currency: '={{$value}}' } } },
};
const TypeField = {
    displayName: 'Opportunity Type',
    name: 'type',
    type: 'options',
    options: [
        { name: 'Recurring', value: 'recurring' },
        { name: 'One Time', value: 'one-time' },
    ],
    default: 'recurring',
    routing: { request: { body: { type: '={{$value}}' } } },
};
const ForecastCategoryField = {
    displayName: 'Forecast Category',
    name: 'forecast_category',
    type: 'options',
    options: [
        { name: 'Best Case', value: 'best_case' },
        { name: 'Closed Lost', value: 'lost' },
        { name: 'Closed Won', value: 'won' },
        { name: 'Committed', value: 'committed' },
        { name: 'Pipeline', value: 'pipeline' },
    ],
    default: 'pipeline',
    description: "The opportunity's grouping based on its likelihood of closing",
    routing: { request: { body: { forecast_category: '={{$value}}' } } },
};
const WinLikelihoodField = {
    displayName: 'Win Likelihood',
    name: 'win_likelihood',
    type: 'number',
    default: 0,
    description: 'An integer between 0 and 100 representing the likelihood (as a percentage) that this opportunity will successfully close. If not provided, it is set to the default win likelihood for a given pipeline stage.',
    routing: { request: { body: { win_likelihood: '={{$value}}' } } },
};
exports.opportunityOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['opportunity'] } },
        options: [
            {
                name: 'Create an Opportunity',
                value: 'create',
                action: 'Create an opportunity',
                routing: { request: { method: 'POST', url: '/opportunities' } },
            },
            {
                name: 'Delete an Opportunity',
                value: 'delete',
                action: 'Delete an opportunity',
                routing: {
                    request: { method: 'DELETE', url: '=/opportunities/{{$parameter.opportunityUUID}}' },
                    output: {
                        postReceive: [{ type: 'set', properties: { value: '={{ { deleted: true } }}' } }],
                    },
                },
            },
            {
                name: 'List Opportunities',
                value: 'list',
                action: 'List opportunities',
                routing: { request: { method: 'GET', url: '/opportunities' } },
            },
            {
                name: 'Retrieve an Opportunity',
                value: 'get',
                action: 'Retrieve an opportunity',
                routing: {
                    request: { method: 'GET', url: '=/opportunities/{{$parameter.opportunityUUID}}' },
                },
            },
            {
                name: 'Update an Opportunity',
                value: 'update',
                action: 'Update an opportunity',
                routing: {
                    request: { method: 'PATCH', url: '=/opportunities/{{$parameter.opportunityUUID}}' },
                },
            },
        ],
        default: 'get',
    },
];
exports.opportunityFields = [
    {
        displayName: 'Opportunity UUID',
        name: 'opportunityUUID',
        type: 'string',
        default: '',
        description: 'The UUID of the Opportunity',
        displayOptions: { show: { resource: ['opportunity'], operation: ['get', 'delete', 'update'] } },
        required: true,
    },
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField,
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        required: true,
        routing: { request: { body: { customer_uuid: '={{$value}}' } } },
    },
    {
        ...(0, exports.OwnerField)('body'),
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        required: true,
    },
    {
        ...(0, exports.PipelineField)('body'),
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        required: true,
    },
    {
        ...(0, exports.PipelineStageField)('body'),
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        required: true,
    },
    {
        ...EstimatedCloseDateField,
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        required: true,
    },
    {
        ...AmountInCentsField,
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        required: true,
    },
    {
        ...CurrencyField,
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        required: true,
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['opportunity'], operation: ['create'] } },
        options: [TypeField, ForecastCategoryField, WinLikelihoodField],
    },
    {
        displayName: 'Filter Options',
        name: 'filterOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['opportunity'], operation: ['list'] } },
        options: [
            {
                ...SharedOptions_1.SharedOptionItems.CustomerUUIDField,
                routing: { request: { qs: { customer_uuid: '={{$value}}' } } },
            },
            (0, exports.OwnerField)('qs'),
            (0, exports.PipelineField)('qs'),
            (0, exports.PipelineStageField)('qs'),
            {
                displayName: 'Estimated Close Date On or After',
                name: 'estimated_close_date_on_or_after',
                type: 'dateTime',
                default: '',
                description: 'Use this parameter to limit your results to opportunities due on or after a certain date',
                routing: { request: { body: { estimated_close_date_on_or_after: '={{$value}}' } } },
            },
            {
                displayName: 'Estimated Close Date On or Before',
                name: 'estimated_close_date_on_or_before',
                type: 'dateTime',
                default: '',
                description: 'Use this parameter to limit your results to opportunities due on or before a certain date',
                routing: { request: { body: { estimated_close_date_on_or_before: '={{$value}}' } } },
            },
        ],
    },
    {
        displayName: 'Update Fields',
        name: 'updateOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['opportunity'], operation: ['update'] } },
        options: [
            (0, exports.OwnerField)('body'),
            (0, exports.PipelineField)('body'),
            (0, exports.PipelineStageField)('body'),
            EstimatedCloseDateField,
            AmountInCentsField,
            CurrencyField,
            TypeField,
            ForecastCategoryField,
            WinLikelihoodField,
        ],
    },
    {
        displayName: 'Pagination',
        name: 'pagination',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['opportunity'], operation: ['list'] } },
        options: [SharedOptions_1.SharedOptionItems.CursorField, SharedOptions_1.SharedOptionItems.PerPageField],
    },
];
//# sourceMappingURL=OpportunityFunctions.js.map