import type { IExecuteFunctions, IDataObject, INodeExecutionData } from "n8n-workflow";

import { apiRequest } from "../../../transport";

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const filterOptions = this.getNodeParameter('filterOptions', index);

    const requestMethod = 'GET';
    const endpoint = 'data_sources';
    const body = {} as IDataObject;
    const qs = {} as IDataObject;

    Object.assign(qs, filterOptions);
    
    const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

    return this.helpers.returnJsonArray(responseData);
}