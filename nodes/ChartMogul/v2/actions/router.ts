import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { ChartMogul } from './Interfaces';

import * as account from './account';
import * as activities from './activities';
import * as source from './source';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<ChartMogul>('resource', i);
		let operation = this.getNodeParameter('operation', i) as string;
		if (operation === 'del') {
			operation = 'delete';
		}

		const chartmogul = {
			resource,
			operation,
		} as ChartMogul;

		try {
			if (chartmogul.resource === 'account') {
				responseData = await account[chartmogul.operation].execute.call(this);
			} else if (chartmogul.resource === 'activities') {
				responseData = await activities[chartmogul.operation].execute.call(this, i);
			} else if (chartmogul.resource === 'source') {
				responseData = await source[chartmogul.operation].execute.call(this, i);
			} /*else if (chartmogul.resource === 'plan') {
				responseData = await plan[chartmogul.operation].execute.call(this, i);
			}*/

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData),
				{ itemData: { item: i } },
			);
			returnData.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				returnData.push({ json: this.getInputData(i)[0].json, error: err });
			} else {
				if (err.context) err.context.itemIndex = i;
				throw err;
			}
		}
	}

	return [returnData];
}
