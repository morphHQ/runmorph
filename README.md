
# `@runmorph/core`

A powerful free and open-source TypeScript SDK for building unified integrations with any SaaS platforms (CRM, ATS, Helpdesk, ProjectTracker, ...). This SDK provides a consistent interface for managing connections, resources, and API interactions across multiple platforms.

## Features

- 🔌 Unified connector interface for any platforms
- 🔐 Built-in authentication handling (only OAuth2 for now)
- 📦 Modular architecture with pluggable connectors
- 🔄 Standardized CRUD operations for resources
- 🌐 Proxy capabilities for direct API access
- 📝 Type-safe operations with full TypeScript support
- 🗄️ Database adapter system for connection management

## Installation

```bash
yarn add @runmorph/core @runmorph/connector-hubspot @runmorph/connector-salesforce
```

## Quick Start

```typescript
// ./morph.ts
import { Morph, PrismaAdapter } from '@runmorph/core';
import HubSpotConnector from '@runmorph/connector-hubspot';
import SalesforceConnector from '@runmorph/connector-salesforce';

import { prisma } from "../server";


// Initialize the Morph client
const morph = Morph({
  connectors: [
    HubSpotConnector({
      clientId: process.env.MORPH_CONNECTOR_HUBSPOT_CLIENT_ID,
      clientSecret: process.env.MORPH_CONNECTOR_HUBSPOT_CLIENT_SECRET
    }),
    SalesforceConnector({
      clientId: process.env.MORPH_CONNECTOR_SALESFORCE_CLIENT_ID,
      clientSecret: process.env.MORPH_CONNECTOR_SALESFORCE_CLIENT_SECRET
    })
  ],
  database: {
    adapter: PrismaAdapter(prisma)
  }
});
```

## Core Concepts

### Connections

Manage authentication and connection state with integrated platforms:

```typescript
// Create a connection instance
const connection = morph.connection({
  connectorId: 'hubspot',
  ownerId: 'user-123'
});

// Create the connection with desired resource operations scope
const { data, error } = await connection.create({
  operations: [
    "genericUser::list",
    "crmOpportunity::list",
    "crmOpportunity::update"
  ]
});

// Authorize a connection
const { data, error } = await connection.authorize();

/* data
{
  "object": "connectionAuthorization",
  "connectorId": "hubspot",
  "ownerId": "user-123",
  "status": "awaitingAuthorization",
  "authorizationUrl": "https://app.hubspot.com/oauth/authorize?client_id=xxx&redirect_uri=xxx&state=xxx&response_type=xxx&scope=xxx"
}*/
```

### Resources

Interact with platform-specific resources using a standardized resource model:

```typescript
// Access a specific resource model
const contacts = connection.resources('contact');

// List resources
const { data, next, error } = await contacts.list({
  limit: 10,
  cursor: 'next-page-cursor'
});

// Retrieve a specific resource
const { data, error } = await contacts.retrieve('contact-123', {
  expand: ['company'], // return the whole company resource
  fields: ['email', 'name']
});

// Create a resource
const { data, error } = await contacts.create({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@corp.co
});

// Update a resource
const { data, error } = await contacts.update('contact-123', {
  firstName: "Jane",
});
```

### Proxy

Make direct API calls to the platform while maintaining authentication:

```typescript
// Check the connector used for a given connection
const hubspotConnection = connection.isConnector("hubspot");
if(!hubspotConnection) return; 

// Now you know for sure it's a HubSpot connection – you can call HubSpot API endpoint directly
const { data } = await hubspotConnection.proxy({
  path: '/v3/objects/contacts',
  method: 'GET',
  query: { limit: 10 },
});
```

## Database Adapter

Implement your own database adapter by conforming to the `Adapter` interface:

```typescript
interface Adapter {
  createConnection: (data: ConnectionData) => Promise<AdapterConnection>;
  retrieveConnection: (id: ConnectionId) => Promise<AdapterConnection | null>;
  updateConnection: (id: ConnectionId, data: Partial<ConnectionData>) => Promise<AdapterConnection>;
  deleteConnection: (id: ConnectionId) => Promise<void>;
}
```

## Supported Platforms

- HubSpot
- Pipedrive
- Salesforce
- More platforms coming soon 

You can build your own connector with `@runmorph/cdk` (aka Connector Development Kit)

## Error Handling

The SDK uses a consistent error handling pattern:

```typescript
const { data, error } = await connection.retrieve();

if (error) {
  console.error(`Error: ${error.code} - ${error.message}`);
  return;
}

// Process successful response
console.log(data);
```

## Logging

Configure logging behavior using the built-in logger system:

```typescript
import { ConsoleLogger, LogLevel } from '@runmorph/cdk';

morph.setLogger(new ConsoleLogger(LogLevel.INFO, customFormatter));
```

## TypeScript Support

The SDK is written in TypeScript and provides full type safety.
Meaning you will only be able to access resources models available in the connectors you've loaded and get proper TypeError when trying to acces a method not supported.


```typescript
type MorphClient<
  TAdapter extends Adapter,
  TConnectors extends Connector[]
> = {
  // Type-safe client methods
};
```

## Contributing

We welcome contributions! Please see [join the discussion on our Morph Community Slack](https://join.slack.com/t/morphcommunity/shared_invite/zt-2tc1vo0n7-8lUPL8~D7wwjC4UmbujAUA).

## License

MIT
