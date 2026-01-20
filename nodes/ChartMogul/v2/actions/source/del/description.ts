import type { SourceProperties } from "../../Interfaces";

export const sourceDeleteDescription: SourceProperties = [
    {
        displayName: 'Data Source UUID',
        name: 'dataSourceUUID',
        type: 'string',
        default: '',
        description: 'The UUID of the data source to be deleted',
        displayOptions: { show: { operation: ['delete'], resource: ['source'] } },
        required: true,
    }
];