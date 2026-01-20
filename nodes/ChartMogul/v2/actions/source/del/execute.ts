import type { IExecuteFunctions, IDataObject, INodeExecutionData } from "n8n-workflow";

import { apiRequest } from "../../../transport";

export async function del(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const dataSourceUUID = this.getNodeParameter('dataSourceUUID', index) as string;

    const requestMethod = 'DELETE';
    const endpoint = `data_sources/${dataSourceUUID}`;
    const body = {} as IDataObject;
    const qs = {} as IDataObject;
    
    const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

    return this.helpers.returnJsonArray(responseData);
}