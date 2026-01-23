import type { PlanProperties } from "../../Interfaces";

export const planCreateDescription: PlanProperties = [
    {
        displayName: 'Data Source UUID',
        name: 'dataSourceUUID',
        type: 'string',
        default: '',
        description: 'The UUID of the data source where the plan is to be created',
        displayOptions: { show: { operation: ['create'], resource: ['plan'] } },
        required: true,
    },
    {
        displayName: 'Interval Count',
        name: 'intervalCount',
        type: 'number',
        default: 1,
        description: 'The frequency of the billing interval',
        displayOptions: { show: { operation: ['create'], resource: ['plan'] } },
        required: true,
    },
    {
        displayName: 'Interval Unit',
        name: 'intervalUnit',
        type: 'options',
        options: [
            { name: 'Day', value: 'day' },
            { name: 'Month', value: 'month' },
            { name: 'Year', value: 'year' },
        ],
        default: 'month',
        description: 'The unit of time for the billing interval',
        displayOptions: { show: { operation: ['create'], resource: ['plan'] } },
        required: true,
    },
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the plan to be created',
        displayOptions: { show: { operation: ['create'], resource: ['plan'] } },
        required: true,
    },
    {   
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        options: [
            {
                displayName: 'External ID',
                name: 'externalId',
                type: 'string',
                default: '',
                description: 'An unique identifier for the plan',
            },
        ],
        displayOptions: { show: { operation: ['create'], resource: ['plan'] } },
    },
];