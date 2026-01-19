# ChartMogul n8n Node - Versioning Structure

This document explains the versioning structure implemented for the ChartMogul n8n community node.

## Overview

The ChartMogul node now implements n8n's versioning system, which allows for multiple versions of the node to coexist. This enables backwards compatibility when introducing breaking changes or major feature updates.

## Directory Structure

```
nodes/ChartMogul/
├── Chartmogul.node.ts          # Main node file (versioning controller)
├── Chartmogul.node.json        # Node metadata
├── chartmogul.svg              # Node icon
└── v1/                         # Version 1 implementation
    ├── ChartmogulV1.node.ts    # V1 node implementation
    ├── chartmogul.svg          # V1 icon (copied)
    ├── AccountFunctions.ts
    ├── ActivitiesFunctions.ts
    ├── ContactFunctions.ts
    ├── CustomerFunctions.ts
    ├── EnrichmentFunctions.ts
    ├── InvoiceFunctions.ts
    ├── LineItemFunctions.ts
    ├── MetricFunctions.ts
    ├── NoteFunctions.ts
    ├── OpportunityFunctions.ts
    ├── PlanFunctions.ts
    ├── PlanGroupFunctions.ts
    ├── SharedOptions.ts
    ├── SourceFunctions.ts
    ├── SubscriptionEventFunctions.ts
    ├── SubscriptionFunctions.ts
    ├── TaskFunctions.ts
    └── TransactionFunctions.ts
```

## How It Works

### Main Node File (Chartmogul.node.ts)

The main node file acts as a version controller. It implements the `IVersionedNodeType` interface and:

1. **Defines available versions**: Lists all supported node versions in the `nodeVersions` object
2. **Sets current version**: Specifies the latest version via `currentVersion` property
3. **Provides version routing**: The `getNodeType()` method returns the appropriate version implementation

```typescript
export class Chartmogul implements IVersionedNodeType {
	nodeVersions: IVersionedNodeType['nodeVersions'] = {
		1: new ChartmogulV1(),
	};

	currentVersion = 1;

	description: INodeTypeBaseDescription = {
		displayName: 'ChartMogul',
		name: 'chartmogul',
		icon: 'file:chartmogul.svg',
		group: ['transform'],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ChartMogul API',
		defaultVersion: 1,
		usableAsTool: true,
	};

	getNodeType(version?: number): INodeType {
		const nodeVersion = version ?? this.currentVersion;
		if (!this.nodeVersions[nodeVersion]) {
			throw new ApplicationError(`Version ${nodeVersion} of ChartMogul node is not supported`);
		}
		return this.nodeVersions[nodeVersion] as INodeType;
	}
}
```

### Version-Specific Implementation (v1/ChartmogulV1.node.ts)

Each version has its own implementation file that implements the standard `INodeType` interface:

```typescript
export class ChartmogulV1 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ChartMogul',
		name: 'chartmogul',
		icon: 'file:chartmogul.svg',
		group: ['transform'],
		version: 1,
		// ... rest of the node description
	};
}
```

## Current Version: v1

Version 1 includes the following resources:

1. **Account** - Account management operations
2. **Activities** - Activity tracking and retrieval
3. **Contact** - Contact management in ChartMogul CRM
4. **Customer** - Customer data operations
5. **Enrichment** - Custom attributes and tags
6. **Event** - Subscription events
7. **Invoice** - Invoice management
8. **Line Item** - Line item operations
9. **Metric** - Metrics and analytics data
10. **Note and Call Log** - Notes and call logs in CRM
11. **Opportunity** - Sales opportunities in CRM
12. **Plan** - Subscription plan management
13. **Plan Group** - Plan group operations
14. **Source** - Data source management
15. **Subscription** - Subscription operations
16. **Task** - Task management in CRM
17. **Transaction** - Transaction operations

## Adding a New Version

When you need to add a new version (e.g., v2):

1. **Create a new version directory**:
   ```bash
   mkdir nodes/ChartMogul/v2
   ```

2. **Copy and modify the version implementation**:
   ```bash
   cp nodes/ChartMogul/v1/ChartmogulV1.node.ts nodes/ChartMogul/v2/ChartmogulV2.node.ts
   ```

3. **Update the class name and version number**:
   ```typescript
   export class ChartmogulV2 implements INodeType {
       description: INodeTypeDescription = {
           // ...
           version: 2,
           // ...
       };
   }
   ```

4. **Copy or create new function files** as needed in the v2 directory

5. **Update the main node file** to include the new version:
   ```typescript
   import { ChartmogulV2 } from './v2/ChartmogulV2.node';

   export class Chartmogul implements IVersionedNodeType {
       nodeVersions: IVersionedNodeType['nodeVersions'] = {
           1: new ChartmogulV1(),
           2: new ChartmogulV2(),
       };

       currentVersion = 2; // Update to latest version

       description: INodeTypeBaseDescription = {
           // ...
           defaultVersion: 2, // Update default version
       };
   }
   ```

6. **Build and test**:
   ```bash
   npm run build
   npm run lint
   ```

## Benefits

1. **Backwards Compatibility**: Existing workflows using v1 will continue to work
2. **Breaking Changes**: You can introduce breaking changes in v2 without affecting v1 users
3. **Gradual Migration**: Users can migrate to newer versions at their own pace
4. **Clear History**: Version-specific code is isolated and easy to maintain

## Testing

After building, the compiled files will be in the dist folder with the same structure:

```
dist/nodes/ChartMogul/
├── Chartmogul.node.js
├── Chartmogul.node.json
├── chartmogul.svg
└── v1/
    ├── ChartmogulV1.node.js
    └── [all function files compiled]
```

Test the node by:
1. Installing in a local n8n instance
2. Creating workflows with the ChartMogul node
3. Verifying all operations work as expected

## References

- [n8n Versioned Node Documentation](https://docs.n8n.io/integrations/creating-nodes/build/versioning/)
- [ChartMogul API Reference](https://dev.chartmogul.com/)
