import { List } from "@runmorph/cdk";

import HubSpotContactMapper, { type HubSpotContact } from "./mapper";

interface HubSpotContactListResponse {
  results: HubSpotContact[];
  paging?: {
    next?: {
      after?: string;
    };
  };
}

interface FilterGroups {
  filters: Array<{
    propertyName: string;
    operator: string;
    value: string;
  }>;
}

export default new List({
  scopes: ["crm.objects.contacts.read"],
  mapper: HubSpotContactMapper,
  handler: async (connection, { limit, cursor, fields, q }) => {
    const body: {
      sorts: never[];
      filterGroups: FilterGroups[];
      limit: number;
      properties: string[];
      after: string | null;
      query?: string;
    } = {
      sorts: [],
      filterGroups: [] as FilterGroups[],
      limit: limit,
      properties: fields,
      after: cursor || null,
    };

    if (q) {
      // For non-text queries, use filters
      if (q.type === "phone") {
        // Create separate filter groups for each phone format and field
        const phoneFields = ["phone", "mobilephone"];
        const phoneFormats = Array.from(
          new Set([q.e164, q.nationalNumber, q.internationalNumber])
        );

        phoneFields.forEach((field) => {
          phoneFormats.forEach((format) => {
            if (format) {
              const phoneFilterGroup: FilterGroups = { filters: [] };
              phoneFilterGroup.filters.push({
                propertyName: field,
                operator: "CONTAINS_TOKEN",
                value: format,
              });
              body.filterGroups.push(phoneFilterGroup);
            }
          });
        });
      } else {
        body.query = q.raw;
      }
    }

    const { data, error } = await connection.proxy<HubSpotContactListResponse>({
      method: "POST",
      path: "/crm/v3/objects/contacts/search",
      data: body,
    });

    if (error) {
      return { error };
    }

    return {
      data: data.results,
      next: data.paging?.next?.after || null,
    };
  },
});
