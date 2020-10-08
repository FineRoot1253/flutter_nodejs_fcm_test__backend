# flutter_nodejs_fcm_test__backend

## FCM 테스트 백엔드 입니다.

- 추후에 auth도 추가가 필요합니다.

## 사용법
- 푸시알람을 보내는 방법은 다음과 같습니다.
"http://localhost:3000/?title=제목&body=내용" 이렇게 요청을 보내면 
제목과 내용을 알아서 채운 푸시 알람이 보내집니다.
"http://localhost:3000/" 이렇게만 보내면 처음에 초기화한 제목인 
"Default_Title_Text" 와 내용인 "Default_Title_Body"가 보내집니다.

## 주의사항
- 현재 푸시알람은 줄바꿈기능을 지원하지 않습니다. (카톡알람과 비슷합니다)
푸시알람에 한눈에 보이는 바디를 구성하고 싶다면 20자 내에서 처리해주세요.