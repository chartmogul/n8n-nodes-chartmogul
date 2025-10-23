import { INodeProperties } from 'n8n-workflow';
type Location = 'body' | 'qs' | 'path';
type FieldArgs = {
    location: Location;
    displayName?: string;
    description?: string;
    pathURL?: string;
} | Location;
export declare const PlanGroupUUIDField: (args: FieldArgs) => INodeProperties;
export declare const planGroupOperations: INodeProperties[];
export declare const planGroupFields: INodeProperties[];
export {};
