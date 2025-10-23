import { INodeProperties } from 'n8n-workflow';
type Location = 'body' | 'qs' | 'path';
type FieldArgs = {
    location: Location;
    displayName?: string;
    description?: string;
    pathURL?: string;
} | Location;
export declare const TypeField: (args: FieldArgs) => INodeProperties;
export declare const AuthorField: (args: FieldArgs) => INodeProperties;
export declare const noteOperations: INodeProperties[];
export declare const noteFields: INodeProperties[];
export {};
