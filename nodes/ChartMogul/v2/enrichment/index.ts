import type { INodeProperties } from 'n8n-workflow';

import { addAttributesDescription } from './add_attributes';
import { addAttributesByEmailDescription } from './add_attributes_by_email';
import { addTagsDescription } from './add_tags';
import { addTagsByEmailDescription } from './add_tags_by_email';
import { removeAttributesDescription } from './remove_attributes';
import { removeTagsDescription } from './remove_tags';
import { getDescription } from './get';

export const enrichmentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['enrichment'] } },
		options: [
			{
				name: 'Add Custom Attributes to a Customer',
				value: 'add_attributes',
				action: 'Add custom attributes to a customer',
				routing: {
					request: {
						method: 'POST',
						url: '=/customers/{{$parameter.customerUUID}}/attributes/custom',
					},
				},
			},
			{
				name: 'Add Custom Attributes to a Customer by Email',
				value: 'add_attributes_by_email',
				action: 'Add custom attributes to a customer by email',
				routing: {
					request: {
						method: 'POST',
						url: '/customers/attributes/custom',
					},
				},
			},
			{
				name: 'Add Tags to a Customer',
				value: 'add_tags',
				action: 'Add tags to a customer',
				routing: {
					request: {
						method: 'POST',
						url: '=/customers/{{$parameter.customerUUID}}/attributes/tags',
					},
				},
			},
			{
				name: 'Add Tags to a Customer by Email',
				value: 'add_tags_by_email',
				action: 'Add tags to a customer by email',
				routing: {
					request: {
						method: 'POST',
						url: '/customers/attributes/tags',
					},
				},
			},
			{
				name: 'Remove Custom Attributes From a Customer',
				value: 'remove_attributes',
				action: 'Remove custom attributes from a customer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/customers/{{$parameter.customerUUID}}/attributes/custom',
					},
				},
			},
			{
				name: 'Remove Tags From a Customer',
				value: 'remove_tags',
				action: 'Remove tags from a customer',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/customers/{{$parameter.customerUUID}}/attributes/tags',
					},
				},
			},
			{
				name: "Retrieve Customer's Tags and Attributes",
				value: 'get',
				action: 'Retrieve tags and attributes of a customer',
				routing: {
					request: {
						method: 'GET',
						url: '=/customers/{{$parameter.customerUUID}}/attributes',
					},
				},
			},
		],
		default: 'get',
	},
	...addAttributesDescription,
	...addAttributesByEmailDescription,
	...addTagsDescription,
	...addTagsByEmailDescription,
	...removeAttributesDescription,
	...removeTagsDescription,
	...getDescription,
];
