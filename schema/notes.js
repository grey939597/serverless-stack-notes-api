import * as dynamoose from "dynamoose";

const notesSchema = new dynamoose.Schema({
  userId: {
    type: String,
    hashKey: true,
  },
  noteId: {
    type: String,
    rangeKey: true,
  },
  content: {
    type: String,
  },
  attachment: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const Notes = dynamoose.model("notes", notesSchema, { update: true });

export default Notes;
