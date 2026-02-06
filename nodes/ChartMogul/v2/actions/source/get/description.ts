import type { SourceProperties } from '../../Interfaces';

export const sourceGetDescription: SourceProperties = [
    {
        displayName: 'Data Source UUID',
        name: 'dataSourceUuid',
        type: 'string',
        default: '',
        required: true,
        description: 'The UUID of the data source to retrieve',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['source'],
            },
        }, 
    }
];