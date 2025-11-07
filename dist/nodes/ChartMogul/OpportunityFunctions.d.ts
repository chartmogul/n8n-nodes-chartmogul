import { INodeProperties } from 'n8n-workflow';
type Location = 'body' | 'qs' | 'path';
type FieldArgs = {
    location: Location;
    displayName?: string;
    description?: string;
    pathURL?: string;
} | Location;
export declare const OwnerField: (args: FieldArgs) => INodeProperties;
export declare const PipelineField: (args: FieldArgs) => INodeProperties;
export declare const PipelineStageField: (args: FieldArgs) => INodeProperties;
export declare const opportunityOperations: INodeProperties[];
export declare const opportunityFields: INodeProperties[];
export {};
