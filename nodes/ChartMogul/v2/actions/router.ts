import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { ChartMogul } from './Interfaces';
import * as account from './account';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<ChartMogul>('resource', i);
		const operation = this.getNodeParameter('operation', i) as string;

		const chartmogul = {
			resource,
			operation,
		} as ChartMogul;


		try {
			if (chartmogul.resource === 'account') {
				if (chartmogul.operation === 'get') {
					responseData = await account[chartmogul.operation].execute.call(this);
				}
			}

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

	return [returnData]
}
