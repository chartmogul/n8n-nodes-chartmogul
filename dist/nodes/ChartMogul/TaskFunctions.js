"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskFields = exports.taskOperations = exports.AssigneeField = void 0;
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
const TaskDetailsField = {
    displayName: 'Task Details',
    name: 'task_details',
    type: 'string',
    default: '',
    description: 'A description of the task up to 255 characters',
    routing: { request: { body: { task_details: '={{$value}}' } } },
};
const DueDateField = {
    displayName: 'Due Date',
    name: 'due_date',
    type: 'dateTime',
    default: '',
    description: 'The date when the task is due',
    routing: { request: { body: { due_date: '={{$value}}' } } },
};
const CompletedAtField = {
    displayName: 'Completed At',
    name: 'completed_at',
    type: 'dateTime',
    default: '',
    description: 'The date when the task was completed',
    routing: { request: { body: { completed_at: '={{$value}}' } } },
};
exports.taskOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['task'],
            },
        },
        options: [
            {
                name: 'Create a Task',
                value: 'create',
                action: 'Create a task',
                routing: {
                    request: { method: 'POST', url: '/tasks' },
                },
            },
            {
                name: 'Delete a Task',
                value: 'delete',
                action: 'Delete a task',
                routing: {
                    request: { method: 'DELETE' },
                },
            },
            {
                name: 'List Tasks',
                value: 'list',
                action: 'List tasks',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/tasks',
                    },
                },
            },
            {
                name: 'Retrieve a Task',
                value: 'get',
                action: 'Retrieve a task',
                routing: {
                    request: {
                        method: 'GET',
                    },
                },
            },
            {
                name: 'Update a Task',
                value: 'update',
                action: 'Update a task',
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
exports.taskFields = [
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
        ...TaskDetailsField,
        required: true,
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
    },
    {
        ...(0, exports.AssigneeField)('body'),
        required: true,
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
    },
    {
        ...DueDateField,
        required: true,
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Completed',
        name: 'completed',
        type: 'boolean',
        default: false,
        description: 'Whether the task is completed',
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
            },
        },
        routing: { request: { body: { completed: '={{$value}}' } } },
    },
    {
        ...CompletedAtField,
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['create'],
                completed: [true],
            },
        },
    },
    {
        displayName: 'Task UUID',
        name: 'task_uuid',
        type: 'string',
        default: '',
        description: 'The UUID of the Task',
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['get', 'delete', 'update'],
            },
        },
        required: true,
        routing: {
            request: {
                url: '=/tasks/{{$value}}',
            },
        },
    },
    {
        displayName: 'Filter Options',
        name: 'filterOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['list'],
            },
        },
        options: [
            SharedOptions_1.SharedOptionItems.CustomerUUIDField('qs'),
            (0, exports.AssigneeField)('qs'),
            {
                displayName: 'Due Date On or After',
                name: 'due_date_on_or_after',
                type: 'dateTime',
                default: '',
                description: 'Use this parameter to limit your results to tasks due on or after a certain date',
                routing: { request: { qs: { due_date_on_or_after: '={{$value}}' } } },
            },
            {
                displayName: 'Due Date On or Before',
                name: 'due_date_on_or_before',
                type: 'dateTime',
                default: '',
                description: 'Use this parameter to limit your results to tasks due on or before a certain date',
                routing: { request: { qs: { due_date_on_or_before: '={{$value}}' } } },
            },
            {
                displayName: 'Completed',
                name: 'completed',
                type: 'boolean',
                default: false,
                description: 'Whether the tasks to be fetched are completed (true) or ongoing (false)',
                routing: { request: { qs: { completed: '={{$value}}' } } },
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
                resource: ['task'],
                operation: ['list'],
            },
        },
        options: [SharedOptions_1.SharedOptionItems.CursorField, SharedOptions_1.SharedOptionItems.PerPageField],
    },
    {
        displayName: 'Update Fields',
        name: 'updateOptions',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['task'],
                operation: ['update'],
            },
        },
        options: [TaskDetailsField, (0, exports.AssigneeField)('body'), DueDateField, CompletedAtField],
    },
];
//# sourceMappingURL=TaskFunctions.js.map