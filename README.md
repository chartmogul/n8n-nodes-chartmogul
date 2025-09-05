# Setup

Build the ChartMogul n8n node

```
npm install
npm run rebuild && npm link
```

Prepare your local n8n for testing

```
mkdir ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
```

In the n8n installation folder, run

```
cd ~/.n8n/custom
npm link n8n-nodes-chartmogul
```
