import type {
	INodeType,
	INodeTypeBaseDescription,
	IVersionedNodeType,
} from 'n8n-workflow';
import { ApplicationError } from 'n8n-workflow';

import { ChartmogulV1 } from './v1/ChartmogulV1.node';
import { ChartmogulV2 } from './v2/ChartmogulV2.node';

export class Chartmogul implements IVersionedNodeType {
	nodeVersions: IVersionedNodeType['nodeVersions'] = {
		1: new ChartmogulV1(),
		2: new ChartmogulV2(),
	};

	currentVersion = 1;

	description: INodeTypeBaseDescription = {
		displayName: 'ChartMogul',
		name: 'chartmogul',
		icon: 'file:chartmogul.svg',
		group: ['transform'],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ChartMogul API',
		defaultVersion: 2,
		usableAsTool: true,
	};

	getNodeType(version?: number): INodeType {
		const nodeVersion = version ?? this.currentVersion;
		if (!this.nodeVersions[nodeVersion]) {
			throw new ApplicationError(`Version ${nodeVersion} of ChartMogul node is not supported`);
		}
		return this.nodeVersions[nodeVersion] as INodeType;
	}
}
