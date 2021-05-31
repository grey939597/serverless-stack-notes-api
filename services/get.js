import Notes from "../schema/notes";
import { createResponse } from "../libs/handler-lib";

export const main = async (event, context) =>
  new Promise(async (resolve, reject) => {
    try {
      const aNote = await Notes.get({
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: event.pathParameters.id,
      });
      if (!aNote) {
        throw new Error("Item not found.");
      }
      resolve(createResponse(200, aNote));
    } catch (e) {
      reject(createResponse(500, { error: e.message }));
    }
  });
