import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function list(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = `data_sources`;

	const filterOptions = this.getNodeParameter('filterOptions', index, {}) as IDataObject;

	if (filterOptions?.name) {
		qs.name = filterOptions.name;
	}

	if (filterOptions?.system) {
		qs.system = filterOptions.system;
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData.data_sources as IDataObject[]);
}