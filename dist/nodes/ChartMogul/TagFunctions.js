"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrichmentFields = exports.enrichmentOperations = void 0;
const SharedOptions_1 = require("./SharedOptions");
exports.enrichmentOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['enrichment'],
            },
        },
        options: [
            {
                name: 'Add Tags to a Customer',
                value: 'add_tags',
                action: 'Add tags to a customer',
                routing: {
                    request: {
                        method: 'POST',
                    },
                },
            },
            {
                name: 'Add Tags to a Customer by Email',
                value: 'add_tags_by_email',
                action: 'Add tags to a customer by email',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/customers/attributes/tags',
                    },
                },
            },
            {
                name: 'Remove Tags From a Customer',
                value: 'remove_tags',
                action: 'Remove tags from a customer',
                routing: {
                    request: {
                        method: 'DELETE',
                    },
                },
            },
            {
                name: 'Retrieve Customer\'s Tags and Attributes',
                value: 'get',
                action: 'Retrieve tags and attributes of a customer',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
        ],
        default: 'get',
    },
];
exports.enrichmentFields = [
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField({
            location: 'path',
            pathURL: '=/customers/{{$value}}/attributes/tags',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['enrichment'],
                operation: ['add_tags', 'remove_tags'],
            },
        },
    },
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField({
            location: 'path',
            pathURL: '=/customers/{{$value}}/attributes',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['enrichment'],
                operation: ['get'],
            },
        },
    },
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        placeholder: 'name@email.com',
        description: 'Email address of the customer',
        required: true,
        displayOptions: {
            show: {
                resource: ['tag'],
                operation: ['add_tags_by_email'],
            },
        },
        routing: { request: { body: { email: '={{$value}}' } } },
    },
    {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        placeholder: 'vip, important, trial',
        description: 'Comma-separated list of tags to add or remove',
        required: true,
        displayOptions: {
            show: {
                resource: ['tag'],
                operation: ['add_tags', 'add_tags_by_email', 'remove_tags'],
            },
        },
        routing: { request: { body: { tags: '={{$value.split(",").map(tag => tag.trim())}}', } } },
    },
];
//# sourceMappingURL=TagFunctions.js.map