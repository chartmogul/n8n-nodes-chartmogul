import type {
    IExecuteFunctions,
    IHookFunctions,
    ILoadOptionsFunctions,
    GenericValue,
    IDataObject,
    IHttpRequestMethods,
    IHttpRequestOptions
} from 'n8n-workflow';

/**
 * Makes an authenticated API request to ChartMogul
 */
export async function apiRequest(
    this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: IDataObject | GenericValue | GenericValue[] = {},
    query: IDataObject = {},
) {
    const credentials = await this.getCredentials('chartmogulApi');
    const baseUrl = 'https://api.chartmogul.com/v1';

    const options: IHttpRequestOptions = {
        method,
        body,
        qs: query,
        url: `${baseUrl}/${endpoint}`,
        headers: {
            'Content-Type': 'application/json',
        },
        auth: {
            username: credentials.apiKey as string,
            password: '',
        }
    };

    return await this.helpers.httpRequestWithAuthentication.call(this, 'chartmogulApi', options);
}

export async function apiRequestAllItems(
    this: IExecuteFunctions | ILoadOptionsFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: IDataObject = {},
    query: IDataObject = {},
) {
    const returnData: IDataObject[] = [];
    
    let responseData;
    query.cursor = '';
    query.per_page = 200;

    do {
        responseData = await apiRequest.call(this, method, endpoint, body, query);
        query.cursor = responseData.cursor;
        returnData.push(...responseData.entries);
    } while (responseData.cursor !== null && responseData.cursor !== undefined && responseData.cursor !== '');

    return returnData;
}