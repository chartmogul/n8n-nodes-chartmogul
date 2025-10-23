import type { IAuthenticateGeneric, Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class ChartmogulApi implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    icon?: Icon | undefined;
    properties: INodeProperties[];
    authenticate: IAuthenticateGeneric;
    test: ICredentialTestRequest;
}
