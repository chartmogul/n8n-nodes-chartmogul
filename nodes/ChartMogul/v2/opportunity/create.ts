import { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Customer UUID',
		name: 'customerUUID',
		type: 'string',
		default: '',
		description: 'The UUID of the customer to which this opportunity is associated with',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		routing: {
			request: {
				body: {
					customer_uuid: '={{$value}}'
				}
			}
		},
	},
	{
		displayName: 'Owner',
		name: 'owner',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description: 'The email of the owner of this opportunity',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		routing: {
			request: {
				body: {
					owner: '={{$value}}'
				}
			}
		},
	},
	{
		displayName: 'Pipeline',
		name: 'pipeline',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		routing: {
			request: {
				body: {
					pipeline: '={{$value}}'
				}
			}
		},
	},
	{
		displayName: 'Pipeline Stage',
		name: 'pipeline_stage',
		type: 'string',
		default: '',
		description: 'The name of the current deal stage within the sales pipeline',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		routing: {
			request: {
				body: {
					pipeline_stage: '={{$value}}'
				}
			}
		},
	},
	{
		displayName: 'Estimated Close Date',
		name: 'estimated_close_date',
		type: 'dateTime',
		default: '',
		description: 'The date when the opportunity is expected to close',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		routing: {
			request: {
				body: {
					estimated_close_date: '={{$value}}'
				}
			}
		},
	},
	{
		displayName: 'Amount in Cents',
		name: 'amount_in_cents',
		type: 'number',
		default: 0,
		description: 'The value of the opportunity in cents',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		routing: {
			request: {
				body: {
					amount_in_cents: '={{$value}}'
				}
			}
		},
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: '',
		placeholder: 'USD',
		description: 'The currency of the opportunity',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		routing: {
			request: {
				body: {
					currency: '={{$value}}'
				}
			}
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create']
			}
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'One Time',
						value: 'one_time'
					},
					{
						name: 'Recurring',
						value: 'recurring'
					},
				],
				default: 'recurring',
				description: 'The type of opportunity',
				routing: {
					request: {
						body: {
							type: '={{$value}}'
						}
					}
				}
			},
			{
				displayName: 'Forecast Category',
				name: 'forecast_category',
				type: 'options',
				options: [
					{
						name: 'Best Case',
						value: 'best_case'
					},
					{
						name: 'Closed Lost',
						value: 'lost'
					},
					{
						name: 'Closed Won',
						value: 'won'
					},
					{
						name: 'Committed',
						value: 'committed'
					},
					{
						name: 'Pipeline',
						value: 'pipeline'
					},
				],
				default: 'pipeline',
				description: "The opportunity's grouping based on its likelihood of closing",
				routing: {
					request: {
						body: {
							forecast_category: '={{$value}}'
						}
					}
				},
			},
			{
				displayName: 'Win Likelihood',
				name: 'win_likelihood',
				type: 'number',
				default: 0,
				description:
					'An integer between 0 and 100 representing the likelihood (as a percentage) that this opportunity will successfully close. If not provided, it is set to the default win likelihood for a given pipeline stage.',
				routing: {
					request: {
						body: {
							win_likelihood: '={{$value}}'
						}
					}
				},
			}
		],
	},
];
