# flutter_nodejs_fcm_test__backend

## FCM 테스트 백엔드 입니다.

- 추후에 auth도 추가가 필요합니다.

## 사용법
- 푸시알람을 보내는 방법은 다음과 같습니다.             
"http://localhost:3000/?title=제목&body=내용&url=화면이동경로&target=ALL" 이렇게 요청을 보내면              
제목과 내용을 알아서 채운 **전체 푸시 알람**이 보내집니다.              
"http://localhost:3000/?target=ALL" 이렇게만 보내면             
처음에 초기화한 제목인 "Default_Title_Text" 와 
내용인 "Default_Title_Body",
url은 "/" 가 보내집니다.                
**target은 반드시 넣어서 보내지 않으면 400 에러를 보냅니다.**              
"http://localhost:3000/?target=기기토큰"을 보내면 해당기기로 토큰을 보냅니다.             

## 주의사항
- url syntax에 맞게 %0a를 넣으면 스낵바 내부에서 줄바꿈기능이 지원됩니다.               
그러나 현재 푸시알람은 줄바꿈기능을 지원하지 않습니다. (카톡알람과 비슷합니다)              
푸시알람에 한눈에 보이는 바디를 구성하고 싶다면 20자 내에서 처리해주세요.               
**target은 반드시 넣어서 보내지 않으면 400 에러를 보냅니다.!!!**              