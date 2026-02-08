
import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function list(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const body = {} as IDataObject;
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = 'activities';

	const filterOptions = this.getNodeParameter('filterOptions', index, []) as IDataObject;

	if (filterOptions?.startDate) {
		qs['start-date'] = filterOptions.startDate;
	}

	if (filterOptions?.endDate) {
		qs['end-date'] = filterOptions.endDate;
	}

	if (filterOptions?.type) {
		qs.type = filterOptions.type;
	}

	if (filterOptions?.sortOrder) {
		qs.order = filterOptions.sortOrder;
	}

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray(responseData.entries as IDataObject[]);
}