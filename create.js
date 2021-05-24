import * as uuid from "uuid";
import Notes from "./schema/notes";
import { createResponse } from "./libs/handler-lib";

export const main = async (event, context) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = JSON.parse(event.body);
      const newNote = await Notes.create({
        userId: event.requestContext.identity.cognitoIdentityId, // The id of the author
        noteId: uuid.v1(), // A unique uuid
        content: data.content, // Parsed from request body
        attachment: data.attachment, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
      });
      resolve(createResponse(200, newNote));
    } catch (e) {
      reject(createResponse(500, { error: e.message }));
    }
  });
