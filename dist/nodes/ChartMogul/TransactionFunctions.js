"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionFields = exports.transactionOperations = void 0;
const TypeField = {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    default: 'payment',
    description: 'The type of the transaction',
    options: [
        { name: 'Payment', value: 'payment' },
        { name: 'Refund', value: 'refund' },
    ],
    routing: { request: { body: { type: '={{$value}}' } } },
};
const DateField = {
    displayName: 'Date',
    name: 'date',
    type: 'dateTime',
    default: '',
    description: 'The date of the transaction',
    routing: { request: { body: { date: '={{$value}}' } } },
};
const ExternalIDField = {
    displayName: 'External ID',
    name: 'external_id',
    type: 'string',
    default: '',
    description: 'The unique identifier of the transaction',
    routing: { request: { body: { external_id: '={{$value}}' } } },
};
const HandleAsUserEditField = {
    displayName: 'Handle As User Edit',
    name: 'handle_as_user_edit',
    type: 'boolean',
    default: false,
    description: 'Whether to handle the transaction as a user edit to an existing transaction from automatic sources (e.g. Stripe, Chargebee, Recurly, etc.)',
    routing: { request: { qs: { handle_as_user_edit: '={{$value}}' } } },
};
const ResultField = {
    displayName: 'Result',
    name: 'result',
    type: 'options',
    default: 'successful',
    description: 'The result of the attempted transaction',
    options: [
        { name: 'Successful', value: 'successful' },
        { name: 'Failed', value: 'failed' },
    ],
    routing: { request: { body: { result: '={{$value}}' } } },
};
const AmountInCentsField = {
    displayName: 'Amount in Cents',
    name: 'amount_in_cents',
    type: 'number',
    default: 0,
    description: 'The amount of the transaction in cents. Omitting this field will default to the invoice amount.',
    routing: { request: { body: { amount_in_cents: '={{$value}}' } } },
};
const TransactionFeeInCentsField = {
    displayName: 'Transaction Fee in Cents',
    name: 'transaction_fees_in_cents',
    type: 'number',
    default: 0,
    description: 'The transaction fee amount in cents. Defaults to 0 if not specified.',
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
exports.transactionOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['transaction'],
            },
        },
        options: [
            {
                name: 'Create a Transaction',
                value: 'create',
                action: 'Create a transaction',
                routing: {
                    request: { method: 'POST' },
                },
            },
            {
                name: 'Delete a Transaction',
                value: 'delete',
                action: 'Delete a transaction',
                routing: {
                    request: { method: 'DELETE' },
                },
            },
            {
                name: 'Disable a Transaction',
                value: 'disable',
                action: 'Disable a transaction',
                routing: {
                    request: { method: 'DELETE' },
                },
            },
            {
                name: 'Retrieve a Transaction',
                value: 'get',
                action: 'Retrieve a transaction',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
            {
                name: 'Update a Transaction',
                value: 'update',
                action: 'Update a transaction',
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
exports.transactionFields = [
    {
        ...HandleAsUserEditField,
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['create', 'update'],
            },
        },
    },
    {
        displayName: 'Invoice UUID',
        name: 'invoice_uuid',
        type: 'string',
        default: '',
        description: 'The UUID of the Invoice to which the Transaction belongs',
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['create'],
            },
        },
        required: true,
        routing: {
            request: {
                url: '=/invoices/{{$value}}/transactions',
            },
        },
    },
    {
        ...TypeField,
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['create', 'update'],
            },
        },
        required: true,
    },
    {
        ...DateField,
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['create', 'update'],
            },
        },
        required: true,
    },
    {
        ...ResultField,
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['create', 'update'],
            },
        },
        required: true,
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['create'],
            },
        },
        options: [
            AmountInCentsField,
            ExternalIDField,
            TransactionFeeInCentsField,
            TransactionFeeCurrencyField,
        ],
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['update'],
            },
        },
        options: [AmountInCentsField, TransactionFeeInCentsField, TransactionFeeCurrencyField],
    },
    {
        displayName: 'Transaction UUID',
        name: 'transaction_uuid',
        type: 'string',
        default: '',
        description: 'The UUID of the Transaction',
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['get', 'delete', 'update'],
            },
        },
        required: true,
        routing: {
            request: {
                url: '=/transactions/{{$value}}',
            },
        },
    },
    {
        displayName: 'Transaction UUID',
        name: 'transaction_uuid',
        type: 'string',
        default: '',
        description: 'The UUID of the Transaction',
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['disable'],
            },
        },
        required: true,
        routing: {
            request: {
                url: '=/transactions/{{$value}}/disabled_state',
            },
        },
    },
    {
        displayName: 'Disabled',
        name: 'disabled',
        type: 'boolean',
        default: false,
        description: 'Whether to disable (true) or enable (false) the transaction',
        displayOptions: {
            show: {
                resource: ['transaction'],
                operation: ['disable'],
            },
        },
        required: true,
        routing: { request: { body: { disabled: '={{$value}}' } } },
    },
];
//# sourceMappingURL=TransactionFunctions.js.map