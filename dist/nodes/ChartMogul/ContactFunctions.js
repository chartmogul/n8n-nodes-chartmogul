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
        options: [
            {
                name: 'Create a Contact',
                value: 'create',
                action: 'Create a contact',
                routing: { request: { method: 'POST', url: '/contacts' } },
            },
            {
                name: 'Delete a Contact',
                value: 'delete',
                action: 'Delete a contact',
                routing: {
                    request: { method: 'DELETE', url: '=/contacts/{{$parameter.contact_uuid}}' },
                    output: {
                        postReceive: [{ type: 'set', properties: { value: '={{ { deleted: true } }}' } }],
                    },
                },
            },
            {
                name: 'List Contacts',
                value: 'list',
                action: 'List contacts',
                routing: { request: { method: 'GET', url: '/contacts' } },
            },
            {
                name: 'Retrieve a Contact',
                value: 'get',
                action: 'Retrieve a contact',
                routing: { request: { method: 'GET', url: '=/contacts/{{$parameter.contact_uuid}}' } },
            },
            {
                name: 'Update a Contact',
                value: 'update',
                action: 'Update a contact',
                routing: { request: { method: 'PATCH', url: '=/contacts/{{$parameter.contact_uuid}}' } },
            },
        ],
        default: 'get',
        displayOptions: { show: { resource: ['contact'] } },
    },
];
exports.contactFields = [
    {
        displayName: 'Contact UUID',
        name: 'contact_uuid',
        type: 'string',
        default: '',
        description: 'The UUID of the contact',
        displayOptions: { show: { resource: ['contact'], operation: ['get', 'delete', 'update'] } },
        required: true,
    },
    {
        ...SharedOptions_1.SharedOptionItems.DataSourceUUIDField({
            location: 'body',
            description: 'The data source UUID where you want to store this contact record',
        }),
        displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
        required: true,
    },
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField,
        displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
        routing: { request: { body: { customer_uuid: '={{$value}}' } } },
        required: true,
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['contact'], operation: ['create', 'update'] } },
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
        displayOptions: { show: { resource: ['contact'], operation: ['list'] } },
        options: [
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
                placeholder: 'name@email.com',
                description: "The contact's email address",
                routing: { request: { qs: { email: '={{$value}}' } } },
            },
            {
                displayName: 'Customer External ID',
                name: 'customer_external_id',
                type: 'string',
                default: '',
                description: 'The unique external identifier of the customer whose contacts you want to retrieve',
                routing: { request: { qs: { customer_external_id: '={{$value}}' } } },
            },
        ],
    },
    {
        displayName: 'Pagination',
        name: 'pagination',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: { show: { resource: ['contact'], operation: ['list'] } },
        options: [SharedOptions_1.SharedOptionItems.CursorField, SharedOptions_1.SharedOptionItems.PerPageField],
    },
];
//# sourceMappingURL=ContactFunctions.js.map