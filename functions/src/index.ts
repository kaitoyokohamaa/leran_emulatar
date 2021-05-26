import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });

//   response.send("Hello from Firebase!");
// });

exports.fetchBookInfo = functions.https.onRequest(async (request, response) => {
  if (request.method !== "GET") {
    response.status(400).send("リクエストタイプが不正です");
  }
  const query = request.query.isbn;
  if (query === undefined) {
    response.status(400).send("クエリが不正です。");
  }
  try {
    const db = admin.firestore();
    const doc = await db.collection("books").doc("000-0000000000").get();
    const bookInfo = doc.data();
    response.send(bookInfo);
  } catch (e) {
    console.log(e);
    response.status(500).send(e);
  }
});
