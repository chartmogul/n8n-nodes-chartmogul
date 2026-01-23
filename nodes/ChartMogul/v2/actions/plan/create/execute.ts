import type { IExecuteFunctions, IDataObject, INodeExecutionData } from "n8n-workflow";

import { apiRequest } from "../../../transport";

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const intervalCount = this.getNodeParameter('intervalCount', index) as number;
    const intervalUnit = this.getNodeParameter('intervalUnit', index) as string;
    const dataSourceUUID = this.getNodeParameter('dataSourceUUID', index) as string;
    const name = this.getNodeParameter('name', index) as string;
    const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

    const requestMethod = 'POST';
    const endpoint = 'import/plans'
    const body = {} as IDataObject;
    const qs = {} as IDataObject;

    body.interval_count = intervalCount;
    body.interval_unit = intervalUnit;
    body.data_source_uuid = dataSourceUUID;
    body.name = name;

    if(additionalFields.externalId !== undefined) {
        body.external_id = additionalFields.externalId;
    }
    
    const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

    return this.helpers.returnJsonArray(responseData as IDataObject);
}