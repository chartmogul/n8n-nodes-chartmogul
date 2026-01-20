import type {
	INodeType,
	INodeTypeBaseDescription,
	IVersionedNodeType,
} from 'n8n-workflow';
import { ApplicationError } from 'n8n-workflow';

import { ChartmogulV1 } from './v1/ChartmogulV1.node';

export class Chartmogul implements IVersionedNodeType {
	nodeVersions: IVersionedNodeType['nodeVersions'] = {
		1: new ChartmogulV1(),
	};

	currentVersion = 1;

	description: INodeTypeBaseDescription = {
		displayName: 'ChartMogul',
		name: 'chartmogul',
		icon: 'file:chartmogul.svg',
		group: ['transform'],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ChartMogul API',
		defaultVersion: 1,
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
