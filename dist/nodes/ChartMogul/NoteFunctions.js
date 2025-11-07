"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteFields = exports.noteOperations = exports.AuthorField = exports.TypeField = void 0;
const SharedOptions_1 = require("./SharedOptions");
const toRequest = (location, field_name, pathURL) => location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };
const TypeField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Type' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Type');
    const description = typeof args === 'string'
        ? 'The type of customer note'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The type of customer note');
    const name = 'type';
    return {
        displayName,
        name,
        type: 'options',
        options: [
            { name: 'Call', value: 'call' },
            { name: 'Note', value: 'note' },
        ],
        default: 'note',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.TypeField = TypeField;
const AuthorField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Author Email' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Author Email');
    const description = typeof args === 'string'
        ? 'The email of the author of the note or call log'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'The email of the author of the note or call log');
    const name = 'author_email';
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
exports.AuthorField = AuthorField;
const TextField = {
    displayName: 'Text',
    name: 'text',
    type: 'string',
    default: '',
    description: 'Contents of the note or call log',
    routing: { request: { body: { text: '={{$value}}' } } },
};
const CallDurationField = {
    displayName: 'Call Duration',
    name: 'call_duration',
    type: 'number',
    default: 60,
    description: 'Relevant for type call. Duration of the call in seconds.',
    routing: { request: { body: { call_duration: '={{$value}}' } } },
};
const CreatedAtField = {
    displayName: 'Created At',
    name: 'created_at',
    type: 'dateTime',
    default: '',
    description: 'The date and time when this note or call was made',
    routing: { request: { body: { created_at: '={{$value}}' } } },
};
exports.noteOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['note'],
            },
        },
        options: [
            {
                name: 'Create a Note or Call Log',
                value: 'create',
                action: 'Create a note or call log',
                routing: { request: { method: 'POST', url: '/customer_notes' } },
            },
            {
                name: 'Delete a Note or Call Log',
                value: 'delete',
                action: 'Delete a note or call log',
                routing: {
                    request: { method: 'DELETE', url: '=/customer_notes/{{$parameter.noteUUID}}' },
                    output: {
                        postReceive: [{ type: 'set', properties: { value: '={{ { deleted: true } }}' } }],
                    },
                },
            },
            {
                name: 'List Notes and Call Logs',
                value: 'list',
                action: 'List notes and call logs',
                routing: { request: { method: 'GET', url: '/customer_notes' } },
            },
            {
                name: 'Retrieve a Note or Call Log',
                value: 'get',
                action: 'Retrieve a note or call log',
                routing: { request: { method: 'GET', url: '=/customer_notes/{{$parameter.noteUUID}}' } },
            },
            {
                name: 'Update a Note or Call Log',
                value: 'update',
                action: 'Update a note or call log',
                routing: { request: { method: 'PATCH', url: '=/customer_notes/{{$parameter.noteUUID}}' } },
            },
        ],
        default: 'get',
    },
];
exports.noteFields = [
    {
        ...SharedOptions_1.SharedOptionItems.CustomerUUIDField,
        displayOptions: { show: { resource: ['note'], operation: ['create'] } },
        required: true,
        routing: { request: { body: { customer_uuid: '={{$value}}' } } },
    },
    {
        ...(0, exports.TypeField)('body'),
        displayOptions: { show: { resource: ['note'], operation: ['create'] } },
        required: true,
    },
    {
        ...CallDurationField,
        displayOptions: { show: { resource: ['note'], operation: ['create'], type: ['call'] } },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [(0, exports.AuthorField)('body'), TextField, CreatedAtField],
        displayOptions: { show: { resource: ['note'], operation: ['create'] } },
    },
    {
        displayName: 'Note UUID',
        name: 'noteUUID',
        type: 'string',
        default: '',
        description: 'The UUID of the Note or Call Log',
        displayOptions: { show: { resource: ['note'], operation: ['get', 'delete', 'update'] } },
        required: true,
    },
    {
        displayName: 'Filter Options',
        name: 'filterOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [
            {
                ...SharedOptions_1.SharedOptionItems.CustomerUUIDField,
                routing: { request: { qs: { customer_uuid: '={{$value}}' } } },
            },
            (0, exports.TypeField)('qs'),
            (0, exports.AuthorField)('qs'),
        ],
        displayOptions: { show: { resource: ['note'], operation: ['list'] } },
    },
    {
        displayName: 'Pagination',
        name: 'pagination',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [SharedOptions_1.SharedOptionItems.CursorField, SharedOptions_1.SharedOptionItems.PerPageField],
        displayOptions: { show: { resource: ['note'], operation: ['list'] } },
    },
    {
        displayName: 'Update Fields',
        name: 'updateOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [
            (0, exports.AuthorField)('body'),
            TextField,
            CallDurationField,
            CreatedAtField,
            {
                displayName: 'Updated At',
                name: 'updated_at',
                type: 'dateTime',
                default: '',
                description: 'The date and time when this note or call was updated',
                routing: { request: { body: { updated_at: '={{$value}}' } } },
            },
        ],
        displayOptions: { show: { resource: ['note'], operation: ['update'] } },
    },
];
//# sourceMappingURL=NoteFunctions.js.map