import Notes from "./schema/notes";
import { createResponse } from "./libs/handler-lib";

export const main = async (event, context) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        requestContext: {
          identity: { cognitoIdentityId },
        },
        pathParameters: { id },
      } = event;
      await Notes.delete({
        userId: cognitoIdentityId,
        noteId: id,
      });
      resolve(createResponse(200, { status: true }));
    } catch (e) {
      reject(createResponse(500, { error: e.message }));
    }
  });
