import Notes from "./schema/notes";
import { createResponse } from "./libs/handler-lib";

export const main = async (event, context) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        requestContext: {
          identity: { cognitoIdentityId },
        },
      } = event;
      const notes = await Notes.query("userId").eq(cognitoIdentityId).exec();
      if (!notes) {
        throw new Error("Item not found.");
      }
      resolve(createResponse(200, notes));
    } catch (e) {
      reject(createResponse(500, { error: e.message }));
    }
  });
