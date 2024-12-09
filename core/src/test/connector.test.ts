import {
  Connector,
  List,
  Retrieve,
  Create,
  Update,
  Mapper,
  ConnectorBundle,
  EventMapper,
  SubscribeToGlobalEvent,
  GlobalEventMapper,
  SubscribeToEvent,
} from "@runmorph/cdk";
import type { ResourceModels } from "@runmorph/resource-models";

// Define the test contact model
const testContact = {
  id: "test-contact-123",
  properties: {
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    phone: "555-0123",
  },
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

// Define the type for a test contact
export type TestContact = {
  id: string;
  properties: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
};

// Create a mapper for the test contact
const TestContactMapper = new Mapper<
  ResourceModels["genericContact"],
  TestContact
>({
  id: {
    read: (from) => from("id"),
  },
  fields: {
    firstName: {
      read: (from) => from("properties.firstname"),
      write: (to) => to("properties.firstname"),
      key: "firstname",
      filter: "firstname",
    },
    lastName: {
      read: (from) => from("properties.lastname"),
      write: (to) => to("properties.lastname"),
      key: "lastname",
      filter: "lastname",
    },
    email: {
      read: (from) => from("properties.email"),
      write: (to) => to("properties.email"),
      key: "email",
      filter: "email",
    },
    phone: {
      read: (from) => from("properties.phone"),
      write: (to) => to("properties.phone"),
      key: "phone",
      filter: "phone",
    },
  },
  createdAt: {
    read: (from) => from("createdAt", (v) => new Date(v)),
  },
  updatedAt: {
    read: (from) => from("updatedAt", (v) => new Date(v)),
  },
});

// Sample opportunity data
const testOpportunity = {
  id: "opp_123",
  properties: {
    name: "Enterprise Deal",
    amount: 50000,
    stage: "Negotiation",
    probability: 75,
    expectedCloseDate: "2024-06-30",
    description: "Large enterprise software deal",
  },
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-16T15:45:00Z",
};

// Define the opportunity type
type TestOpportunity = {
  id: string;
  properties: {
    name: string;
    amount: number;
    stage: string;
    probability: number;
    expectedCloseDate: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
};

// Create mapper for CRM opportunity
const TestOpportunityMapper = new Mapper<
  ResourceModels["crmOpportunity"],
  TestOpportunity
>({
  id: {
    read: (from) => from("id"),
  },
  fields: {
    name: {
      read: (from) => from("properties.name"),
      write: (to) => to("properties.name"),
      key: "name",
      filter: "name",
    },
    amount: {
      read: (from) => from("properties.amount"),
      write: (to) => to("properties.amount"),
      key: "amount",
      filter: "amount",
    },

    stage: {
      read: (from) => from("properties.stage", (value) => ({ id: value })),
      write: (to) => to("properties.stage", (value) => value.id),
      key: "stage",
      filter: "stage",
    },
  },
  createdAt: {
    read: (from) => from("createdAt", (v) => new Date(v)),
  },
  updatedAt: {
    read: (from) => from("updatedAt", (v) => new Date(v)),
  },
});

// Define the connector
const connectorTest = new Connector({
  id: "test",
  name: "Test Connector",
  auth: {
    type: "oauth2::authorizationCode",
    authorizeUrl: "https://test.com/oauth/authorize",
    accessTokenUrl: "https://test.com/oauth/token",
    defaultScopes: ["contacts.read"],
  },
  proxy: {
    baseUrl: "https://api.test.com",
  },
});

const connectorTest2 = new Connector({
  id: "test-2",
  name: "Test Connector",
  auth: {
    type: "oauth2::authorizationCode",
    authorizeUrl: "https://test.com/oauth/authorize",
    accessTokenUrl: "https://test.com/oauth/token",
    defaultScopes: ["contacts.read"],
  },
  proxy: {
    baseUrl: "https://api.test.com",
  },
});

// Define the list operation
const listContacts = (
  mapper: typeof TestOpportunityMapper | typeof TestContactMapper
) =>
  new List({
    scopes: ["contacts.read"],
    mapper: mapper,
    handler: async (connection, { limit, cursor, fields, filters }) => {
      // Mock implementation for listing contacts
      return {
        data: [testContact], // Return an empty array for simplicity
        next: null,
      };
    },
  });

// Define the retrieve operation
const retrieveContact = (
  mapper: typeof TestOpportunityMapper | typeof TestContactMapper
) =>
  new Retrieve({
    scopes: ["contacts.read"],
    mapper: mapper,
    handler: async (connection, { id, fields }) => {
      // Mock implementation for retrieving a contact
      return testContact;
    },
  });

// Define the create operation
const createContact = (
  mapper: typeof TestOpportunityMapper | typeof TestContactMapper
) =>
  new Create({
    scopes: ["contacts.write"],
    mapper: mapper,
    handler: async (connection, { data }) => {
      // Mock implementation for creating a contact
      const retrunedContact = { ...testContact, ...{ propeeties: data } };
      return retrunedContact;
    },
  });

// Define the update operation
const updateContact = (
  mapper: typeof TestOpportunityMapper | typeof TestContactMapper
) =>
  new Update({
    scopes: ["contacts.write"],
    mapper: mapper,
    handler: async (connection, { id, data }) => {
      // Mock implementation for updating a contact
      const retrunedContact = { ...testContact, ...{ propeeties: data } };
      return retrunedContact;
    },
  });

// ... previous code ...

// Define webhook mappers and operations
const TestWebhookGlobalMapper = new GlobalEventMapper({
  eventRouter: {
    main: {
      crmOpportunity: ["created", "updated"],
    },
  },
  handler: async (request, globalRoute) => {
    return [
      {
        mapper: TestOpportunityMapper,
        trigger: "created",
        rawResource: {},
        identifierKey: "test::main::crmOpportunity::created",
        idempotencyKey: "test_event_1",
      },
    ];
  },
});

const TestWebhookSubscriptionMapper = new EventMapper({
  events: {
    genericContact: ["created", "updated", "deleted"],
  },
  handler(request) {
    return {
      mapper: TestContactMapper,
      trigger: "created",
      resourceRef: { id: "foo" },
      idempotencyKey: "test_event_1",
    };
  },
});

const TestWebhookGlobalCreate = new SubscribeToGlobalEvent({
  globalEventMapper: TestWebhookGlobalMapper,
  handler: async (connection, params) => {
    return {
      identifierKey: `test::${params.globalRoute}::${params.model}::${params.trigger}`,
    };
  },
});

const TestWebhookSubscriptionCreate = new SubscribeToEvent({
  eventMapper: TestWebhookSubscriptionMapper,
  handler: async (connection, { model, trigger, url }) => {
    return {
      id: "whk_test",
      meta: {
        secret: "test_secret",
      },
    };
  },
});

const connectorBundleTest = new ConnectorBundle({
  connector: connectorTest,
  resourceModelOperations: {
    genericContact: {
      list: listContacts(TestContactMapper),
      retrieve: retrieveContact(TestContactMapper),
      create: createContact(TestContactMapper),
      update: updateContact(TestContactMapper),
      mapper: TestContactMapper,
    },
  },
  webhookOperations: {
    subscription: {
      mapper: TestWebhookSubscriptionMapper as any,
      subscribe: TestWebhookSubscriptionCreate,
    },
  },
}).init;

const connectorBundleTest2 = new ConnectorBundle({
  connector: connectorTest2,
  resourceModelOperations: {
    genericContact: {
      list: listContacts(TestContactMapper),
      retrieve: retrieveContact(TestContactMapper),
      create: createContact(TestContactMapper),
      update: updateContact(TestContactMapper),
      mapper: TestContactMapper,
    },
    crmOpportunity: {
      list: listContacts(TestOpportunityMapper),
      retrieve: retrieveContact(TestOpportunityMapper),
      create: createContact(TestOpportunityMapper),
      update: updateContact(TestOpportunityMapper),
      mapper: TestOpportunityMapper,
    },
  },
  webhookOperations: {
    global: {
      mapper: TestWebhookGlobalMapper as any,
      subscribe: TestWebhookGlobalCreate,
    },
  },
}).init;

export { connectorBundleTest, connectorBundleTest2 };
