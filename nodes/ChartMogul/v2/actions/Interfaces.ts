import type { AllEntities, Entity, PropertiesOf } from "n8n-workflow";

type ChartMogulMap = {
    account: 'get',
    activities: 'create' | 'list' | 'get',
    source: 'create' | 'list' | 'get' | 'delete',
    plan: 'create' | 'list' | 'get' | 'delete' | 'update',
}

export type ChartMogul = AllEntities<ChartMogulMap>;

export type ChartMogulAccount = Entity<ChartMogulMap, 'account'>;
export type ChartMogulActivity = Entity<ChartMogulMap, 'activities'>;
export type ChartMogulSource = Entity<ChartMogulMap, 'source'>;
export type ChartMogulPlan = Entity<ChartMogulMap, 'plan'>;

export type AccountProperties = PropertiesOf<ChartMogulAccount>;
export type ActivityProperties = PropertiesOf<ChartMogulActivity>;
export type SourceProperties = PropertiesOf<ChartMogulSource>;
export type PlanProperties = PropertiesOf<ChartMogulPlan>;

export interface IAttachment {
    fields: {
        item?: object[];
    };
    actions: {
        item?: object[];
    };
}