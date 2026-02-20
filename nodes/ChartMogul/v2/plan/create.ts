import type { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
    {
        displayName: 'Data Source UUID',
        name: 'data_source_uuid',
        type: 'string',
        default: '',
        description: 'ChartMogul UUID of the Data Source the plan belongs to',
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create']
            }
        },
        routing: {
            request: {
                body: {
                    data_source_uuid: '={{$value}}'
                }
            }
        }
    },
    {
        displayName: 'Plan Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create']
            }
        },
        routing: {
            request: {
                body: {
                    name: '={{$value}}'
                }
            }
        },
    },
    {
        displayName: 'Plan Interval Count',
        name: 'interval_count',
        type: 'number',
        typeOptions: {
            minValue: 1
        },
        default: 1,
        description: 'The number of intervals between each billing cycle',
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create']
            }
        },
        routing: {
            request: {
                body: {
                    interval_count: '={{$value}}'
                }
            }
        },
    },
    {
        displayName: 'Plan Interval Unit',
        name: 'interval_unit',
        type: 'options',
        default: 'month',
        description: 'The unit of time for the plan interval',
        options: [
            {
                name: 'Day',
                value: 'day'
            },
            {
                name: 'Month',
                value: 'month'
            },
            {
                name: 'Year',
                value: 'year'
            },
        ],
        required: true,
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create']
            }
        },
        routing: {
            request: {
                body: {
                    interval_unit: '={{$value}}'
                }
            }
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        default: {},
        placeholder: 'Define Plan External ID',
        options: [
            {
                displayName: 'External ID',
                name: 'externalId',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        body: {
                            external_id: '={{$value}}'
                        }
                    }
                },
            }
        ],
        displayOptions: {
            show: {
                resource: ['plan'],
                operation: ['create']
            }
        },
    },
];