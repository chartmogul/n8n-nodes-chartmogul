"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFields = exports.contactOperations = void 0;
const SharedOptions_1 = require("./SharedOptions");
exports.contactOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['contact'],
            },
        },
        options: [
            {
                name: 'Create a Contact',
                value: 'create',
                action: 'Create a contact',
                routing: {
                    request: { method: 'POST', url: '/contacts' },
                },
            },
            {
                name: 'Delete a Contact',
                value: 'delete',
                action: 'Delete a contact',
                routing: {
                    request: { method: 'DELETE' },
                },
            },
            {
                name: 'List Contacts',
                value: 'list',
                action: 'List contacts',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/contacts',
                    },
                },
            },
            {
                name: 'Retrieve a Contact',
                value: 'get',
                action: 'Retrieve a contact',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
            {
                name: 'Update a Contact',
                value: 'update',
                action: 'Update a contact',
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
exports.contactFields = [
    {
        displayName: 'Contact UUID',
        name: 'contact_uuid',
        type: 'string',
        required: true,
        default: '',
        description: 'The UUID of the contact',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['get', 'delete', 'update'],
            },
        },
        routing: {
            request: {
                url: '=/contacts/{{$value}}',
            },
        },
    },
    {
        ...SharedOptions_1.SharedOptionItems.DataSourceUUIDField({
            location: 'body',
            description: 'The data source UUID where you want to store this contact record',
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
            },
        },
    },
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField({
            location: 'body',
            description: "The ChartMogul UUID of the customer for the contact you're creating",
        }),
        required: true,
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['create'],
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
                resource: ['contact'],
                operation: ['create', 'update'],
            },
        },
        options: [
            SharedOptions_1.SharedOptionItems.EmailField('contact'),
            SharedOptions_1.SharedOptionItems.FirstNameField('contact'),
            SharedOptions_1.SharedOptionItems.LastNameField('contact'),
            SharedOptions_1.SharedOptionItems.LinkedInField('contact'),
            SharedOptions_1.SharedOptionItems.NotesField('contact'),
            SharedOptions_1.SharedOptionItems.PhoneField('contact'),
            SharedOptions_1.SharedOptionItems.TitleField('contact'),
            SharedOptions_1.SharedOptionItems.TwitterField('contact'),
            {
                displayName: 'Position',
                name: 'position',
                type: 'number',
                typeOptions: { numberPrecision: 0 },
                default: 1,
                description: 'Sets the position of the contact in the UI',
                routing: { request: { body: { position: '={{$value}}' } } },
            },
        ],
    },
    {
        displayName: 'Filter Options',
        name: 'filterOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['list'],
            },
        },
        options: [
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
                placeholder: 'name@email.com',
                description: "The contact's email address",
                routing: {
                    request: {
                        qs: { email: '={{$value}}' },
                    },
                },
            },
            {
                displayName: 'Customer External ID',
                name: 'customer_external_id',
                type: 'string',
                default: '',
                description: 'The unique external identifier of the customer whose contacts you want to retrieve',
                routing: {
                    request: {
                        qs: { customer_external_id: '={{$value}}' },
                    },
                },
            },
            SharedOptions_1.SharedOptionItems.CursorField,
            SharedOptions_1.SharedOptionItems.PerPageField,
        ],
    },
];
//# sourceMappingURL=ContactFunctions.js.map