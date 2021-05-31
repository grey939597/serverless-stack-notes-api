import Notes from "../schema/notes";
import { createResponse } from "../libs/handler-lib";

export const main = async (event, context) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        body,
        requestContext: {
          identity: { cognitoIdentityId },
        },
        pathParameters: { id },
      } = event;
      const data = JSON.parse(body);
      const newNote = await Notes.update(
        {
          userId: cognitoIdentityId,
          noteId: id,
        },
        {
          $PUT: {
            attachment: data.attachment || null,
            content: data.content || null,
          },
        }
      );
      resolve(createResponse(200, newNote));
    } catch (e) {
      reject(createResponse(500, { error: e.message }));
    }
  });
