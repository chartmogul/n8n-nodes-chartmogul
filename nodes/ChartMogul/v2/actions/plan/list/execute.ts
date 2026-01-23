import type { IExecuteFunctions, IDataObject, INodeExecutionData } from "n8n-workflow";

import { apiRequest } from "../../../transport";

export async function list(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const requestMethod = 'GET';
    const endpoint = 'plans';
    const body = {} as IDataObject;
    const qs = {} as IDataObject;
    const returnAll = this.getNodeParameter('returnAll', index) as boolean;

    Object.assign(qs, this.getNodeParameter('filterOptions', index));

    if (returnAll) {
        // Fetch all results using cursor-based pagination
        let allPlans: IDataObject[] = [];
        let cursor: string | undefined;
        let hasMore = true;

        while (hasMore) {
            const queryParams = { ...qs };
            if (cursor) {
                queryParams.cursor = cursor;
            }

            const responseData = await apiRequest.call(this, requestMethod, endpoint, body, queryParams) as IDataObject;
            const plans = (responseData.plans as IDataObject[]) || [];
            allPlans = allPlans.concat(plans);

            // Check if there are more pages
            hasMore = responseData.has_more as boolean || false;
            cursor = responseData.cursor as string;

            // Safety check to prevent infinite loops
            if (!hasMore || !cursor) {
                break;
            }
        }

        return this.helpers.returnJsonArray(allPlans);
    } else {
        // Use limit parameter to restrict results
        const limit = this.getNodeParameter('limit', index) as number;
        let allPlans: IDataObject[] = [];
        let cursor: string | undefined;
        let remaining = limit;

        while (remaining > 0) {
            const queryParams = { ...qs };
            if (cursor) {
                queryParams.cursor = cursor;
            }
            // Request appropriate page size (API max is typically 200)
            queryParams.per_page = Math.min(remaining, 200);

            const responseData = await apiRequest.call(this, requestMethod, endpoint, body, queryParams) as IDataObject;
            const plans = (responseData.plans as IDataObject[]) || [];

            // Add plans up to the limit
            const plansToAdd = plans.slice(0, remaining);
            allPlans = allPlans.concat(plansToAdd);
            remaining -= plansToAdd.length;

            // Check if there are more pages and we need more results
            const hasMore = responseData.has_more as boolean || false;
            cursor = responseData.cursor as string;

            if (!hasMore || !cursor || plans.length === 0) {
                break;
            }
        }

        return this.helpers.returnJsonArray(allPlans);
    }
}