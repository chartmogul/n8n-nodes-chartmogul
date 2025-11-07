"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountOperations = void 0;
exports.accountOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Get Account Details',
                value: 'get',
                action: 'Get account details',
                routing: { request: { method: 'GET', url: '/account' } },
            },
        ],
        default: 'get',
        displayOptions: { show: { resource: ['account'] } },
    },
];
//# sourceMappingURL=AccountFunctions.js.map