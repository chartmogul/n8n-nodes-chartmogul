import type { INodeTypeBaseDescription, IVersionedNodeType } from 'n8n-workflow';
import { VersionedNodeType } from 'n8n-workflow';

import { ChartmogulV1 } from './v1/ChartmogulV1.node';
import { ChartmogulV2 } from './v2/ChartmogulV2.node';

export class Chartmogul extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'ChartMogul',
			name: 'chartmogul',
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			icon: 'file:chartmogul.svg',
			group: ['transform'],
			description: 'Interact with ChartMogul API',
			defaultVersion: 2,
			usableAsTool: true,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new ChartmogulV1(),
			2: new ChartmogulV2(),
		};

		super(nodeVersions, baseDescription);
	}
}