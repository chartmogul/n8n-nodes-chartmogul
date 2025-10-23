"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineitemFields = exports.lineitemOperations = void 0;
const TypeField = {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    default: 'subscription',
    description: 'The type of the line item',
    options: [
        { name: 'Subscription', value: 'subscription' },
        { name: 'One Time', value: 'one_time' },
    ],
    routing: { request: { body: { type: '={{$value}}' } } },
};
const ExternalIDField = {
    displayName: 'External ID',
    name: 'external_id',
    type: 'string',
    default: '',
    description: 'The unique identifier of the line item',
    routing: { request: { body: { external_id: '={{$value}}' } } },
};
const HandleAsUserEditField = {
    displayName: 'Handle As User Edit',
    name: 'handle_as_user_edit',
    type: 'boolean',
    default: false,
    description: 'Whether to handle the line item as a user edit to an existing line item from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
    routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
};
const AmountInCentsField = {
    displayName: 'Amount in Cents',
    name: 'amount_in_cents',
    type: 'number',
    default: 0,
    routing: { request: { body: { amount_in_cents: '={{$value}}' } } },
};
const DiscountAmountInCentsField = {
    displayName: 'Discount Amount in Cents',
    name: 'discount_amount_in_cents',
    type: 'number',
    default: 0,
    routing: { request: { body: { discount_amount_in_cents: '={{$value}}' } } },
};
const DiscountCodeField = {
    displayName: 'Discount Code',
    name: 'discount_code',
    type: 'string',
    default: '',
    description: 'Optional reference code to identify the discount',
    routing: { request: { body: { discount_code: '={{$value}}' } } },
};
const DiscountDescriptionField = {
    displayName: 'Discount Description',
    name: 'discount_description',
    type: 'string',
    default: '',
    routing: { request: { body: { discount_description: '={{$value}}' } } },
};
const TaxAmountInCentsField = {
    displayName: 'Tax Amount in Cents',
    name: 'tax_amount_in_cents',
    type: 'number',
    default: 0,
    routing: { request: { body: { tax_amount_in_cents: '={{$value}}' } } },
};
const TransactionFeeInCentsField = {
    displayName: 'Transaction Fee in Cents',
    name: 'transaction_fees_in_cents',
    type: 'number',
    default: 0,
    routing: { request: { body: { transaction_fees_in_cents: '={{$value}}' } } },
};
const TransactionFeeCurrencyField = {
    displayName: 'Transaction Fee Currency',
    name: 'transaction_fees_currency',
    type: 'string',
    default: '',
    description: 'The three-letter currency code of the transaction fee',
    routing: { request: { body: { transaction_fees_currency: '={{$value}}' } } },
};
const EventOrderField = {
    displayName: 'Event Order',
    name: 'event_order',
    type: 'number',
    default: 0,
    description: 'A numeric value that determines the sequence in which events are processed when multiple events occur at the same timestamp',
    routing: { request: { body: { event_order: '={{$value}}' } } },
};
const QuantityField = {
    displayName: 'Quantity',
    name: 'quantity',
    type: 'number',
    default: 1,
    description: 'The quantity/seats of the product billed in the line item',
    routing: { request: { body: { quantity: '={{$value}}' } } },
};
const SubscriptionExternalIdField = {
    displayName: 'Subscription External ID',
    name: 'subscription_external_id',
    type: 'string',
    default: '',
    description: 'A reference identifier for the subscription in your system',
    routing: { request: { body: { subscription_external_id: '={{$value}}' } } },
};
const SubscriptionSetExternalIdField = {
    displayName: 'Subscription Set External ID',
    name: 'subscription_set_external_id',
    type: 'string',
    default: '',
    description: 'A reference identifier for a set of subscriptions in order to group several subscriptions into one set',
    routing: { request: { body: { subscription_set_external_id: '={{$value}}' } } },
};
const PlanUUIDField = {
    displayName: 'Plan UUID',
    name: 'plan_uuid',
    type: 'string',
    default: '',
    description: 'The ChartMogul UUID of the plan associated with the subscription',
    routing: { request: { body: { plan_uuid: '={{$value}}' } } },
};
const ServicePeriodStartField = {
    displayName: 'Service Period Start',
    name: 'service_period_start',
    type: 'dateTime',
    default: '',
    description: 'The start date of the service period for the subscription line item',
    routing: { request: { body: { service_period_start: '={{$value}}' } } },
};
const ServicePeriodEndField = {
    displayName: 'Service Period End',
    name: 'service_period_end',
    type: 'dateTime',
    default: '',
    description: 'The end date of the service period for the subscription line item',
    routing: { request: { body: { service_period_end: '={{$value}}' } } },
};
const ProratedField = {
    displayName: 'Prorated',
    name: 'prorated',
    type: 'boolean',
    default: false,
    description: 'Whether the subscription line item amount is prorated',
    routing: { request: { body: { prorated: '={{$value}}' } } },
};
const ProrationTypeField = {
    displayName: 'Proration Type',
    name: 'proration_type',
    type: 'options',
    default: 'differential',
    options: [
        { name: 'Differential', value: 'differential' },
        { name: 'Full', value: 'full' },
        { name: 'Differential MRR', value: 'differential_mrr' }
    ],
    routing: { request: { body: { proration_type: '={{$value}}' } } },
};
const DescriptionField = {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    description: 'The description of the line item',
    routing: { request: { body: { description: '={{$value}}' } } },
};
exports.lineitemOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['line_item'],
            },
        },
        options: [
            {
                name: 'Create a Line Item',
                value: 'create',
                action: 'Create a line item',
                routing: {
                    request: { method: 'POST' },
                },
            },
            {
                name: 'Delete a Line Item',
                value: 'delete',
                action: 'Delete a line item',
                routing: {
                    request: { method: 'DELETE' },
                },
            },
            {
                name: 'Disable a Line Item',
                value: 'disable',
                action: 'Disable a line item',
                routing: {
                    request: { method: 'DELETE' },
                },
            },
            {
                name: 'Retrieve a Line Item',
                value: 'get',
                action: 'Retrieve a line item',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
            {
                name: 'Update a Line Item',
                value: 'update',
                action: 'Update a line item',
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
exports.lineitemFields = [
    {
        ...HandleAsUserEditField,
        displayOptions: {
            show: {
                resource: ['line_item'],
                operation: ['create', 'update'],
            },
        },
    },
    {
        displayName: 'Invoice UUID',
        name: 'invoice_uuid',
        type: 'string',
        default: '',
        description: 'The UUID of the Invoice to which the Line Item belongs',
        displayOptions: {
            show: {
                resource: ['line_item'],
                operation: ['create'],
            },
        },
        required: true,
        routing: {
            request: {
                url: '=/invoices/{{$value}}/line_items',
            },
        },
    },
    {
        ...TypeField,
        displayOptions: {
            show: {
                resource: ['line_item'],
                operation: ['create'],
            },
        },
    },
    {
        ...AmountInCentsField,
        displayOptions: {
            show: {
                resource: ['line_item'],
                operation: ['create', ''],
            },
        },
    },
    {
        displayName: 'Subscription Line Item Fields',
        name: 'subscriptionLineItemFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['line_item'],
                operation: ['create'],
                type: ['subscription'],
            },
        },
        options: [
            SubscriptionExternalIdField,
            SubscriptionSetExternalIdField,
            PlanUUIDField,
            ServicePeriodStartField,
            ServicePeriodEndField,
            ProratedField,
            ProrationTypeField,
        ],
    },
    {
        ...DescriptionField,
        displayOptions: {
            show: {
                resource: ['line_item'],
                operation: ['create'],
                type: ['one_time'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['line_item'],
                operation: ['create'],
            },
        },
        options: [
            ExternalIDField,
            QuantityField,
            DiscountAmountInCentsField,
            DiscountCodeField,
            DiscountDescriptionField,
            TaxAmountInCentsField,
            TransactionFeeInCentsField,
            TransactionFeeCurrencyField,
            EventOrderField,
        ],
    },
];
//# sourceMappingURL=LineItemFunctions.js.map