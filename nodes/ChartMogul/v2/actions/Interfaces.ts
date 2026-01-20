import type { AllEntities, Entity, PropertiesOf } from "n8n-workflow";

type ChartMogulMap = {
    account: 'get',
    source: 'create' | 'list' | 'get' | 'delete',
}

export type ChartMogul = AllEntities<ChartMogulMap>;

export type ChartMogulAccount = Entity<ChartMogulMap, 'account'>;
export type ChartMogulSource = Entity<ChartMogulMap, 'source'>;

export type AccountProperties = PropertiesOf<ChartMogulAccount>;
export type SourceProperties = PropertiesOf<ChartMogulSource>;

export interface IAttachment {
    fields: {
        item?: object[];
    };
    actions: {
        item?: object[];
    };
}