import type { IExecuteFunctions, IDataObject, INodeExecutionData } from "n8n-workflow";

import { apiRequest } from "../../../transport";

export async function create(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const name = this.getNodeParameter('name', index) as string;

    const requestMethod = 'POST';
    const endpoint = 'data_sources'
    const body = { name };
    const qs = {} as IDataObject;
    
    const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

    return this.helpers.returnJsonArray(responseData);
}