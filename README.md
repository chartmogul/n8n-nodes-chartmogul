# n8n-nodes-chartmogul

This is an n8n community node. It lets you interact with the ChartMogul API in your n8n workflows. 

[ChartMogul](https://www.chartmogul.com/) is a subscription analytics platform that helps SaaS (Software-as-a-Service) and recurring revenue businesses understand, measure, and grow their revenue. ChartMogul CRM is a customer relationship management platform built specifically for B2B SaaS companies that unifies sales pipeline tracking with subscription analytics, enabling teams to manage leads, opportunities, and recurring revenue in a single integrated system.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

* [Installation](#installation)
* [Operations](#operations)
* [Credentials](#credentials)
* [Compatibility](#compatibility)
* [Resources](#resources)
* [Version history](#version-history)

## Installation
### Community Nodes (Recommended)
1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-chartmogul` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes: select **I understand the risks of installing unverified code from a public source**.
5. Select **Install**.

After installing the node, you can use it like any other node. n8n displays the node in search results in the **Nodes** panel.

## Operations
V1 of the ChartMogul N8N node focuses on functions that help you interface with ChartMogul CRM. These are based on the publicly available endpoints found at [https://dev.chartmogul.com/](https://dev.chartmogul.com/).
Functions:
1. Sources
2. Customers
3. Contacts
4. Enrichment (Custom Attributes and Tags)
5. Notes and Call Logs
6. Opportunities
7. Tasks
   
## Credentials

_If users need to authenticate with the app/service, provide details here. You should include prerequisites (such as signing up with the service), available authentication methods, and how to set them up._
You need to have a ChartMogul account to interact with this node.

In ChartMogul, create an API key by navigating to **Profile > View Profile > API keys**. Then:
1. Click **Add API Key**.
2. Enter a unique name for the key in the **Name** field.
3. A **Read & Write** key is required for this node.
4. Click **Add** to create the key.
5. Copy your newly created key and add create a ChartMogul credential in N8N
<img width="776" height="370" alt="image" src="https://github.com/user-attachments/assets/6443c18e-fe9e-4146-a3e1-b4e62862b774" />

## Compatibility

This node was developed and tested using N8N version 1.116.2.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [ChartMogul Help Center](https://help.chartmogul.com)
* [ChartMogul Developer Reference](https://dev.chartmogul.com)
  
## Version history

v1.0.0
Initial Release
