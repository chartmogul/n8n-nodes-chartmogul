import type { SourceProperties } from "../../Interfaces";

export const sourceGetDescription: SourceProperties = [
    {
        displayName: 'Data Source UUID',
        name: 'dataSourceUUID',
        type: 'string',
        default: '',
        description: 'The UUID of the data source to be retrieved',
        displayOptions: { show: { operation: ['get'], resource: ['source'] } },
        required: true,
    }
];