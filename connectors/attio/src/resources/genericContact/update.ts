import { Update } from "@runmorph/cdk";

import mapper, { type AttioPerson } from "./mapper";

export default new Update({
  scopes: [],
  mapper: mapper,
  handler: async (connection, { id, data }) => {
    // Update the person in Attio API
    const { data: responseData, error } = await connection.proxy<{
      data: AttioPerson;
    }>({
      method: "PATCH",
      path: `/v2/objects/people/records/${id}`,
      data: {
        data,
      },
    });

    if (error) {
      return { error };
    }

    return responseData.data;
  },
});
