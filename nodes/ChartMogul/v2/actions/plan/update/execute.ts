import type { IExecuteFunctions, IDataObject, INodeExecutionData } from "n8n-workflow";

import { apiRequest } from "../../../transport";

export async function update(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const planUUID = this.getNodeParameter('planUUID', index) as string;
    
    const requestMethod = 'PATCH';
    const endpoint = `plans/${planUUID}`;
    const body = {} as IDataObject;
    const qs = {} as IDataObject;

    Object.assign(body, this.getNodeParameter('updateFields', index));
    
    const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

    return this.helpers.returnJsonArray(responseData as IDataObject);
}