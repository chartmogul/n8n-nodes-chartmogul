import type { INodeProperties } from 'n8n-workflow';

import * as create from './create';
import * as get from './get';
import * as list from './list';

export { create, get, list };

export const descriptions: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['activities'],
            },
        },
        options: [
            {
                name: 'Create an Activities Export',
                value: 'create',
                action: 'Create an activities export',
            },
            {
                name: 'List Activities',
                value: 'list',
                action: 'List activities',
            },
            {
                name: 'Retrieve an Activities Export',
                value: 'get',
                action: 'Retrieve an activities export',
            },        
        ],
        default: 'list',
    },

    ...create.description,
    ...list.description,
    ...get.description,

];