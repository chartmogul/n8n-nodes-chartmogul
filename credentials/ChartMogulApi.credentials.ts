import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChartmogulApi implements ICredentialType {
	name = 'chartmogulApi';

	displayName = 'ChartMogul API';
	
	documentationUrl = 'https://dev.chartmogul.com/';
	
	icon?: Icon | undefined = 'file:chartmogul.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
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
				password: '',
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
