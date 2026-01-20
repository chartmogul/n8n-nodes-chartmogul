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

    return await this.helpers.httpRequest(options);
}