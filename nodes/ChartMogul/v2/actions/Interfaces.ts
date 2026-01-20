import type { AllEntities, Entity, PropertiesOf } from "n8n-workflow";

type ChartMogulMap = {
    account: 'get',
}

export type ChartMogul = AllEntities<ChartMogulMap>;

export type ChartMogulAccount = Entity<ChartMogulMap, 'account'>;

export type AccountProperties = PropertiesOf<ChartMogulAccount>;

export interface IAttachment {
    fields: {
        item?: object[];
    };
    actions: {
        item?: object[];
    };
}