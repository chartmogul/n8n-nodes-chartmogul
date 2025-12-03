import type { INodeProperties } from 'n8n-workflow';
import { SharedOptionItems } from './SharedOptions';

const StartDateField: INodeProperties = {
	displayName: 'Start Date',
	name: 'start-date',
	type: 'dateTime',
	default: '',
	description: 'The start date for activities to be retrieved',
};

const EndDateField: INodeProperties = {
	displayName: 'End Date',
	name: 'end-date',
	type: 'dateTime',
	default: '',
	description: 'The end date for activities to be retrieved',
};

const TypeField: INodeProperties = {
	displayName: 'Type',
	name: 'type',
	type: 'options',
	options: [
		{ name: 'Churn', value: 'churn' },
		{ name: 'Contraction', value: 'contraction' },
		{ name: 'Expansion', value: 'expansion' },
		{ name: 'New Business', value: 'new_biz' },
		{ name: 'Reactivation', value: 'reactivation' },
	],
	default: 'new_biz',
	description: 'The type of activities to be retrieved',
};

export const activitiesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create an Activities Export',
				value: 'create',
				action: 'Create an activities export',
				routing: { request: { method: 'GET', url: '/activities_export' } },
			},
			{
				name: 'List Activities',
				value: 'list',
				action: 'List activities',
				routing: { request: { method: 'GET', url: '/activities' } },
			},
			{
				name: 'Retrieve an Activities Export',
				value: 'get',
				action: 'Retrieve an activities export',
				routing: { request: { method: 'GET', url: '=/activities_export/{{$parameter.id}}' } },
			},
		],
		default: 'create',
		displayOptions: { show: { resource: ['activities'] } },
	},
];

export const activitiesFields: INodeProperties[] = [
	// ----------------------------------------------------------
	//         activities: create
	// --------------------------------------------------------
	{
		...StartDateField,
		displayOptions: { show: { resource: ['activities'], operation: ['create'] } },
		routing: { request: { body: { 'start-date': '={{$value}}' } } },
	},
	{
		...EndDateField,
		displayOptions: { show: { resource: ['activities'], operation: ['create'] } },
		routing: { request: { body: { 'end-date': '={{$value}}' } } },
	},
	{
		...TypeField,
		displayOptions: { show: { resource: ['activities'], operation: ['create'] } },
		routing: { request: { body: { type: '={{$value}}' } } },
	},

	// ----------------------------------------------------------
	//         activities: get
	// --------------------------------------------------------
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'The ID of the activities export to retrieve',
		displayOptions: { show: { resource: ['activities'], operation: ['get'] } },
	},

	// ----------------------------------------------------------
	//         activities: list
	// --------------------------------------------------------
	{
		displayName: 'Filter Options',
		name: 'filterOptions',
		type: 'collection',
		placeholder: 'Add Filter Option',
		default: {},
		options: [
			{ ...StartDateField, routing: { request: { qs: { 'start-date': '={{$value}}' } } } },
			{ ...EndDateField, routing: { request: { qs: { 'end-date': '={{$value}}' } } } },
			{ ...TypeField, routing: { request: { qs: { type: '={{$value}}' } } } },
			{
				displayName: 'Sort Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'date' },
					{ name: 'Descending', value: '-date' },
				],
				default: '-date',
				routing: { request: { qs: { order: '={{$value}}' } } },
			}
		],
		displayOptions: { show: { resource: ['activities'], operation: ['list'] } },
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['activities'], operation: ['list'] } },
		options: [SharedOptionItems.CursorField, SharedOptionItems.PerPageField],
	},
];
