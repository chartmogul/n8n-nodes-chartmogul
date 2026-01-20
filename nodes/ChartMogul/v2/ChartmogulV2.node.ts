import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { versionDescription } from './actions/versionDescription';
import { router } from './actions/router';

export class ChartmogulV2 implements INodeType {
	description: INodeTypeDescription;

	constructor() {
		this.description = versionDescription;
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return await router.call(this);
	}
}
