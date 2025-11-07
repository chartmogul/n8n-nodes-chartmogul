"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedOptionItems = exports.TwitterField = exports.TitleField = exports.PhoneField = exports.NotesField = exports.LinkedInField = exports.LastNameField = exports.FirstNameField = exports.EmailField = exports.DataSourceUUIDField = exports.NameField = void 0;
const toRequest = (location, field_name, pathURL) => location === 'path' ? { url: pathURL } : { [location]: { [field_name]: '={{$value}}' } };
const NameField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Name' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Name');
    const description = typeof args === 'string'
        ? 'Display name of the object'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'Display name of the object');
    const name = 'name';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.NameField = NameField;
const DataSourceUUIDField = (args) => {
    var _a, _b;
    const location = typeof args === 'string' ? args : args.location;
    const displayName = typeof args === 'string' ? 'Data Source UUID' : ((_a = args.displayName) !== null && _a !== void 0 ? _a : 'Data Source UUID');
    const description = typeof args === 'string'
        ? 'ChartMogul UUID of the Data Source'
        : ((_b = args.description) !== null && _b !== void 0 ? _b : 'ChartMogul UUID of the Data Source');
    const name = 'data_source_uuid';
    return {
        displayName,
        name,
        type: 'string',
        default: '',
        description,
        routing: { request: toRequest(location, name) },
    };
};
exports.DataSourceUUIDField = DataSourceUUIDField;
const BillingSystemField = {
    displayName: 'Billing System',
    name: 'billingSystem',
    type: 'string',
    default: '',
    description: 'The billing system you are using, e.g., Stripe, Recurly, etc',
    routing: { request: { qs: { system: '={{$value}}' } } },
};
const CursorField = {
    displayName: 'Cursor',
    name: 'cursor',
    type: 'string',
    default: '',
    description: 'Set the cursor for use in pagination. To fetch the next page of results, set the cursor to the value of the "cursor" field in the previous response.',
    routing: { request: { qs: { cursor: '={{$value}}' } } },
};
const CustomerUUIDField = {
    displayName: 'Customer UUID',
    name: 'customerUUID',
    type: 'string',
    default: '',
    description: 'ChartMogul UUID of the Customer',
};
const ExternalIDField = {
    displayName: 'External ID',
    name: 'externalId',
    type: 'string',
    default: '',
    description: 'A unique identifier specified by you, typically from your internal system',
    routing: { request: { qs: { external_id: '={{$value}}' } } },
};
const PerPageField = {
    displayName: 'Per Page',
    name: 'perPage',
    type: 'number',
    typeOptions: {
        minValue: 1,
        maxValue: 200,
    },
    default: 200,
    description: 'The number of records to return. Default and max is 200.',
    routing: { request: { qs: { per_page: '={{$value}}' } } },
};
const EmailField = (entityType) => ({
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    placeholder: 'name@email.com',
    description: "The contact's email address",
    routing: {
        request: {
            body: entityType === 'contact'
                ? { email: '={{$value}}' }
                : { primary_contact: { email: '={{$value}}' } },
        },
    },
});
exports.EmailField = EmailField;
const FirstNameField = (entityType) => ({
    displayName: 'First Name',
    name: 'first_name',
    type: 'string',
    default: '',
    description: "The contact's first name",
    routing: {
        request: {
            body: entityType === 'contact'
                ? { first_name: '={{$value}}' }
                : { primary_contact: { first_name: '={{$value}}' } },
        },
    },
});
exports.FirstNameField = FirstNameField;
const LastNameField = (entityType) => ({
    displayName: 'Last Name',
    name: 'last_name',
    type: 'string',
    default: '',
    description: "The contact's last name",
    routing: {
        request: {
            body: entityType === 'contact'
                ? { last_name: '={{$value}}' }
                : { primary_contact: { last_name: '={{$value}}' } },
        },
    },
});
exports.LastNameField = LastNameField;
const LinkedInField = (entityType) => ({
    displayName: 'LinkedIn',
    name: 'linked_in',
    type: 'string',
    default: '',
    description: "The contact's LinkedIn profile URL",
    routing: {
        request: {
            body: entityType === 'contact'
                ? { linked_in: '={{$value}}' }
                : { primary_contact: { linked_in: '={{$value}}' } },
        },
    },
});
exports.LinkedInField = LinkedInField;
const NotesField = (entityType) => ({
    displayName: 'Notes',
    name: 'notes',
    type: 'string',
    typeOptions: {
        rows: 4,
    },
    default: '',
    description: 'Any additional notes you wish to add about the contact',
    routing: {
        request: {
            body: entityType === 'contact'
                ? { notes: '={{$value}}' }
                : { primary_contact: { notes: '={{$value}}' } },
        },
    },
});
exports.NotesField = NotesField;
const PhoneField = (entityType) => ({
    displayName: 'Phone',
    name: 'phone',
    type: 'string',
    default: '',
    description: "The contact's phone number",
    routing: {
        request: {
            body: entityType === 'contact'
                ? { phone: '={{$value}}' }
                : { primary_contact: { phone: '={{$value}}' } },
        },
    },
});
exports.PhoneField = PhoneField;
const TitleField = (entityType) => ({
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    description: "The contact's job title",
    routing: {
        request: {
            body: entityType === 'contact'
                ? { title: '={{$value}}' }
                : { primary_contact: { title: '={{$value}}' } },
        },
    },
});
exports.TitleField = TitleField;
const TwitterField = (entityType) => ({
    displayName: 'Twitter',
    name: 'twitter',
    type: 'string',
    default: '',
    description: "The contact's Twitter URL",
    routing: {
        request: {
            body: entityType === 'contact'
                ? { twitter: '={{$value}}' }
                : { primary_contact: { twitter: '={{$value}}' } },
        },
    },
});
exports.TwitterField = TwitterField;
exports.SharedOptionItems = {
    BillingSystemField,
    CursorField,
    CustomerUUIDField,
    DataSourceUUIDField: exports.DataSourceUUIDField,
    EmailField: exports.EmailField,
    ExternalIDField,
    FirstNameField: exports.FirstNameField,
    LastNameField: exports.LastNameField,
    LinkedInField: exports.LinkedInField,
    NameField: exports.NameField,
    NotesField: exports.NotesField,
    PerPageField,
    PhoneField: exports.PhoneField,
    TitleField: exports.TitleField,
    TwitterField: exports.TwitterField,
};
//# sourceMappingURL=SharedOptions.js.map