import { INodeProperties } from 'n8n-workflow';
type Location = 'body' | 'qs' | 'path';
type FieldArgs = {
    location: Location;
    displayName?: string;
    description?: string;
    pathURL?: string;
} | Location;
export declare const AssigneeField: (args: FieldArgs) => INodeProperties;
export declare const taskOperations: INodeProperties[];
export declare const taskFields: INodeProperties[];
export {};
