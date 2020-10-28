let admin = require("firebase-admin");
let serviceAccount = require("../../my-flutter-51990-firebase-adminsdk-8d70g-21efd5cb89.json");

// 어플 이름 (초기화 체크용)
let appName; 

// 메시지 초기화 List type
let msg = {  
    notification:{
    },
    android:{
        priority:'high',
        notification:{
        },
    },
    data:{
        click_action:'FLUTTER_NOTIFICATION_CLICK',
        msgID:"123",
    },
    //일단 두개를 비워두고 if문에 따라서 보내는 것으로 변경 10_21 Jun_Geun_Hong modified
    //request시 target을 무조건 넣어주어야함 없으면 400 return
};

// 푸시 알람 미들웨어
const sendingPushmsg = async (req, res, next) =>{

    let {title, body, url, target} = req.body;

    console.log(title," : 제목");
    console.log(body," : 내용");
    console.log(url," : 목표위치");
    console.log(target," : 목표기기");
    
    // admin 초기화는 단 한번만, 초기화 검증이 필요함
    if(!appName){
       appName = admin.initializeApp({
           credential: admin.credential.cert(serviceAccount),
           databaseURL: "https://my-flutter-51990.firebaseio.com"
       });
    }
    // 시스템에서 보낸 쿼리문 체크및 재초기화
    msg.data.title="Default_Title_Textasdf";
    msg.data.body="Default_Body_Textasdf";
    msg.data.URL="/";
    if(title)msg.data.title=title;
    if(body)msg.data.body=body;
    if(url)msg.data.URL=url;
    if(target){
        if(target=="ALL"){
            msg.topic=target;
        }else{
            msg.token=target;
        }
    }else{
        return res.status(400).end();
        
    }

    // 푸시 send, sendAll(), sendToDevice(), send()마다 사용법이 다름
    await admin.messaging().send(
        msg).then((res) => {
            console.log('sending success', res);
        }).catch((err) => {
                console.log('error occured : ', err);
                return res.status(400).end();
            }
        );
        
        if(msg.token) delete msg.token;
        if(msg.topic) delete msg.topic;    
    next();
}




module.exports = sendingPushmsg;