"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartmogulApi = void 0;
class ChartmogulApi {
    constructor() {
        this.name = 'chartmogulApi';
        this.displayName = 'ChartMogul API';
        this.documentationUrl = 'https://dev.chartmogul.com/';
        this.icon = 'file:chartmogul.svg';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                auth: {
                    username: '={{$credentials.apiKey}}',
                    password: '',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.chartmogul.com/v1',
                url: '/ping',
            },
        };
    }
}
exports.ChartmogulApi = ChartmogulApi;
//# sourceMappingURL=ChartmogulApi.credentials.js.map