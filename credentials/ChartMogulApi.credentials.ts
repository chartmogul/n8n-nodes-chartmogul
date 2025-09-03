import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class ChartMogulApi implements ICredentialType {
	name = 'chartmogulApi';
	displayName = 'ChartMogul API';
	documentationUrl = 'https://dev.chartmogul.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your ChartMogul API Key',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.apiKey}}',
				password: '={{$credentials.apiKey}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.chartmogul.com/v1',
			url: '/ping',
		},
	};
}
