
import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function create(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'POST';
	const endpoint = `activities_export`;

	const filterOptions = this.getNodeParameter('filterOptions', index, []) as IDataObject;
	
	if (filterOptions?.startDate) {
		body['start-date'] = filterOptions.startDate;
	}

	if (filterOptions?.endDate) {
		body['end-date'] = filterOptions.endDate;
	}

	if (filterOptions?.type) {
		body.type = filterOptions.type;
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData as IDataObject);
}