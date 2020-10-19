let admin = require("firebase-admin");
let serviceAccount = require("../../my-flutter-51990-firebase-adminsdk-8d70g-21efd5cb89.json");

let deviceToken = 'fAyDBI6d2Rg:APA91bHPrjiJpaBg3b9rNlZqh2wP_noEYhr05q_WT7O2hQsLw0slelbnf5RLdVBCcoDcEQIUUSSE6aSGQl8afgPo2jcFFA_3mikTR7T0AYIlCO-SkwrLyq8cNXS_8OpaMohrrW7Rkl2l';
// 어플 이름 (초기화 체크용)
let appName; 

// 메시지 초기화 List type
let msg = [{  
    android:{
        notification:{
        },
    },
    data:{
        click_action:'FLUTTER_NOTIFICATION_CLICK',
        msgID:"123",
    },
    //token: deviceToken
    topic:'ALL'
}];

// 푸시 알람 미들웨어
const sendingPushmsg = async (res, req, next) =>{

    // admin 초기화는 단 한번만, 초기화 검증이 필요함
    if(!appName){
        appName = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://my-flutter-51990.firebaseio.com"
        });
    }
    // 시스템에서 보낸 쿼리문 체크및 재초기화
    msg[0].data.title="Default_Title_Textasdf";
    msg[0].data.body="Default_Body_Textasdf";
    msg[0].data.URL="/";
    if(res.query.title)msg[0].data.title=res.query.title;
    if(res.query.body)msg[0].data.body=res.query.body;
    if(res.query.url)msg[0].data.URL=res.query.url;

    // 푸시 send, sendAll(), sendToDevice(), send()마다 사용법이 다름
    admin.messaging().send(
        msg[0]).then((res) => {
            console.log('sending success', res)
        }).catch((err) => {
                console.log('error occured : ', err);
            }
        );
    next();
}




module.exports = sendingPushmsg;