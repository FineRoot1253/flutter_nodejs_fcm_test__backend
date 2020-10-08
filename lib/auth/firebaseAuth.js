let admin = require("firebase-admin");
let express = require("express");
let serviceAccount = require("../../my-flutter-51990-firebase-adminsdk-8d70g-21efd5cb89.json");

let deviceToken = 'fAyDBI6d2Rg:APA91bHPrjiJpaBg3b9rNlZqh2wP_noEYhr05q_WT7O2hQsLw0slelbnf5RLdVBCcoDcEQIUUSSE6aSGQl8afgPo2jcFFA_3mikTR7T0AYIlCO-SkwrLyq8cNXS_8OpaMohrrW7Rkl2l';
let appName;
let message =  { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    notification: {

        title: '알림',   //제목

        body: '알림 메시지'  //보낼메시지

    },
    data: {
        score: "50:5",
        metchteam: "team name vs team name"
    },
};
let msg = [{
    notification: {
        title: "바겐 세일",
        body: "전 품목 99%세일!!(최대)"
    },
    topic:'matchscore'}];

const sendingPushmsg = async (res, req, next) =>{
    
    if(!appName){
        appName = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://my-flutter-51990.firebaseio.com"
        });
    }else{
    admin.messaging().sendAll(
        //deviceToken,
        msg).then((res) => {
            console.log('sending success', res)
        }).catch((err) => {
                console.log('error occured : ', err);
            }
        );
    next();
    }
}




module.exports = sendingPushmsg;