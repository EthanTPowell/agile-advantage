import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import * as util from "util";
import * as _ from "lodash";
// const uuid = require('uuid');
const { v4: uuidv4 } = require("uuid");

const app = admin.initializeApp();
const firestore = app.firestore();

// import * as cors from 'cors';
// const corsHandler = cors({origin: true});

export const scheduledFunction7amET = functions.pubsub
  .schedule("0 7 * * 1-5")
  .timeZone("America/New_York")
  // export const scheduledFunction = functions.pubsub.schedule('every 5 minutes')
  .onRun((context) => {
    console.log("This will be run weekdays at 7AM!");
    firestore
      .collection(`covid-notification`)
      .get()
      .then((res) => {
        res.forEach((docSnap) => {
          console.log(util.inspect(docSnap.data()));
          var item = docSnap.data();
          if (item.notifying) {
            let my_uuid = uuidv4();
            let date = new Date();
            let data = {
              subject: "RDR CVOID Screening",
              body:
                "Hello " +
                item.firstName +
                " " +
                item.lastName +
                " Click here: https://support.davesa.com/covid-survey-form/" +
                item.id +
                "",
              url:
                "https://support.davesa.com/covid-survey-form/" + item.id + "",
              businessId: null,
              created_at: date,
              updated_at: date,
              deleted_at: null,
              from: "+16787016606",
              id: my_uuid,
              to: item.mobileNo,
            };

            admin
              .firestore()
              .collection("messages")
              .add(data)
              .then(() => console.log("Queued message for delivery!"));
          }
        });
      });
  });

export const createCovidSurvey = functions.firestore
  .document("covid-survey/{userId}")
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const item = snap.data();

    if (item.symptoms || item.testPositive || item.traveledOut) {
      let my_uuid = uuidv4();
      let date = new Date();
      let data = {
        body:
          "Hello " +
          item.userName +
          " Please notify your supervisor that you are at risk of contracting COVID",
        created_at: date,
        updated_at: date,
        deleted_at: null,
        from: "+16787016606",
        id: my_uuid,
        to: item.mobileNo,
      };

      admin
        .firestore()
        .collection("messages")
        .add(data)
        .then(() => console.log("Queued message for delivery!"));

      const nurseNo: string[] = [];

      firestore
        .collection(`covid-notification`)
        .get()
        .then((res) => {
          res.forEach((docSnap) => {
            console.log(util.inspect(docSnap.data()));
            var item = docSnap.data();
            if (item.nurse) {
              nurseNo.push(item.mobileNo);
            }
          });
          nurseNo.forEach((number) => {
            let my_uuid = uuidv4();
            let date = new Date();
            let reasons = "";
            if (item.symptoms) reasons += " showing symptoms,";
            if (item.testPositive) reasons += " tested positive,";
            if (item.traveledOut)
              reasons += " traveled out of the state/country recently,";
            let data = {
              body:
                "Please be aware " +
                item.userName +
                " may be at risk of contracting COVID for the following reasons:" +
                reasons.slice(0, -1),
              businessId: null,
              created_at: date,
              updated_at: date,
              deleted_at: null,
              from: "+16787016606",
              id: my_uuid,
              to: number,
            };

            admin
              .firestore()
              .collection("messages")
              .add(data)
              .then(() => console.log("Queued message for delivery!"));
          });
        });
    }
  });

export const sendSurveys_v2 = functions.https.onCall((data, context) => {
  const userId = context.auth?.uid;

  return new Promise((resolve, reject) => {
    if (userId) {
      firestore
        .collection(`covid-notification`)
        .get()
        .then((res) => {
          res.forEach((docSnap) => {
            console.log(util.inspect(docSnap.data()));
            var item = docSnap.data();
            if (item.notifying) {
              let my_uuid = uuidv4();
              let date = new Date();
              let data = {
                subject: "RDR CVOID Screening",
                body:
                  "Hello " +
                  item.firstName +
                  " " +
                  item.lastName +
                  " Click here: https://support.davesa.com/covid-survey-form/" +
                  item.id +
                  "",
                url:
                  "https://support.davesa.com/covid-survey-form/" +
                  item.id +
                  "",
                businessId: null,
                created_at: date,
                updated_at: date,
                deleted_at: null,
                from: "+16787016606",
                id: my_uuid,
                to: item.mobileNo,
              };

              admin
                .firestore()
                .collection("messages")
                .add(data)
                .then(() => console.log("Queued message for delivery!"));
            }
          });
          resolve("COVID Surveys Sent!!");
        })
        .catch((reason) => {
          console.log("getRoutineCount_v0: " + reason);
          reject(reason);
        });
    } else {
      resolve(`Invalid User Permissions`);
    }
  });
});

// export const sendSurveys_v1 = functions.https.onRequest(async (request, response) => {
//   response.set("Access-Control-Allow-Origin", "*"); // you can also whitelist a specific domain like "http://127.0.0.1:4000"
//   response.set("Access-Control-Allow-Headers", "Content-Type");
//   corsHandler(request, response, () => {});
//   firestore
//   .collection(`covid-notification`)
//   .get()
//   .then((res) => {
//     res.forEach((docSnap) => {
//       console.log(util.inspect(docSnap.data()));
//       var item = docSnap.data();
//       if (item.notifying) {
//         let my_uuid = uuidv4();
//         let date = new Date();
//         let data = {
//           subject: "RDR CVOID Screening",
//           body:
//             "Hello " +
//             item.firstName +
//             " " +
//             item.lastName +
//             " Click here: https://support.davesa.com/covid-survey-form/" +
//             item.id +
//             "",
//           url:
//             "https://support.davesa.com/covid-survey-form/" + item.id + "",
//           businessId: null,
//           created_at: date,
//           updated_at: date,
//           deleted_at: null,
//           from: "+18557711748",
//           id: my_uuid,
//           to: item.mobileNo,
//         };

//         admin
//           .firestore()
//           .collection("messages")
//           .add(data)
//           .then(() => console.log("Queued message for delivery!"));
//       }
//     });
//   });
//   response.send("COVID Surveys Sent!!");
//  });

// export const notificationsCreate = functions.firestore
// .document(`/notifications/{notificationID}`)
// .onCreate((snap, context) => {
//   let notifySnap = snap.data();
//   // const payload = {
//   //   notification: {
//   //     title: `${notifySnap.title}`,
//   //     body: `${notifySnap.body}`,
//   //     icon: notifySnap.image
//   //   },
//   //   data: notifySnap.data
//   // };

//   let payload = {
//     token: notifySnap.token,
//       notification: {
//           title: `${notifySnap.title}`,
//           body: `${notifySnap.body}`,
//       },
//       data: {
//           body: `${notifySnap.body}`,
//       }
//   };

//   notifySnap.sent = true;

//   firestore.doc(`notifications/${notifySnap.id}`).update(notifySnap).then(res => {
//     admin.messaging().send(payload).then((response) => {
//       // Response is a message ID string.
//       console.log('Successfully sent message:', response);
//       return {success: true};
//     }).catch((error) => {
//         return {error: error.code};
//     });
//   });

//   // console.log(`payload: ${util.inspect(payload)}`)
//   // return admin.messaging().sendToDevice(notifySnap.token, payload)
// });

// export const sendNotification_v0 = functions.https.onCall((data, context) => {
//   const userId = context.auth?.uid;
//   return new Promise((resolve, reject) => {
//       if(userId) {
//         // const payload = {
//         //   notification: {
//         //     title: `${data.title}`,
//         //     body: `${data.body}`,
//         //     icon: data.image
//         //   },
//         // };

//         let payload = {
//           token: data.token,
//             notification: {
//                 title: `${data.title}`,
//                 body: `${data.body}`,
//             },
//             data: {
//                 body: `${data.body}`,
//             }
//         };

//         admin.messaging().send(payload).then((response) => {
//           // Response is a message ID string.
//           console.log('Successfully sent message:', response);
//           return {success: true};
//         }).catch((error) => {
//             return {error: error.code};
//         });

//         // console.log(`payload: ${util.inspect(payload)}`)
//         // admin.messaging().sendToDevice(data.token, payload).then(res => {
//         //   resolve(res);
//         // }).catch(err => {
//         //   reject(err);
//         // });
//       } else {
//         reject(`ERROR`);
//       }
//   });
// });

// exports.scheduledFunction = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
//   console.log('This will be run every 5 minutes!');
//   firestore.collection(`covid-notifications`).get().then(res => {
//     res.forEach(docSnap => {
//       console.log(util.inspect(docSnap.data()));
//       var item = docSnap.data();

//       let my_uuid = uuidv4();
//       let date = new Date();
//       let data = {
//         body: "This is a test",
//         businessId: null,
//         created_at: date,
//         updated_at: date,
//         deleted_at: null,
//         from: '+18557711748',
//         id: my_uuid,
//         to: item.mobileNo
//       }

//       firestore.collection('messages').add(data).then(res => {
//         console.log('messages: ' + util.inspect(data));
//       });

//     })
//   });

//   return null;
// });

// export const getRoutines_rest_routines_v0 = functions.https.onRequest(async (request, response) => {
//   const userId = request.query.uid;
//   if (userId) {
//       const userDoc = await firestore.doc(`users/${userId}`).get();
//       const userData = userDoc.data();
//       if(userData) {
//           response.send(util.inspect(userData));
//           return;
//       } else {
//           response.send(`No Records`);
//           return;

//       }
//       return;
//   }
//   response.send(`No user ID. What\'s up with that?`);
// });
