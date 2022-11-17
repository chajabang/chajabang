# Where Is My Home_Spring

- 팀원 : 공진호 박윤환

## ER 다이어그램
<img src="https://user-images.githubusercontent.com/62232531/199578118-4997546e-fc35-46ba-aeb2-635c3ef52570.png">

## 클래스 다이어그램
<img src="https://user-images.githubusercontent.com/62232531/199576513-3be6e7b6-0959-44f5-b1bc-0c4685c09f95.png">

# 회원가입

<img src="https://user-images.githubusercontent.com/62232531/199557813-9a25f87c-fa9c-4ee2-a92a-43afd939e0f7.gif">

- 회원가입은 메인페이지에서 모달 형태로 화면이 뜬다.
- 회원가입은 성공하면 메인페이지로 이동한다.
- 회원가입을 실패하면 회원가입 페이지에 머물러 있는다.
- 값을 입력하지 않은 칸이 있다면 빈칸을 입력해달라는 알림문이 뜬다.
- 비밀번호와 비밀번호 확인이 일치하지 않으면 경고문이 뜬다.
- 패스워드(pw)와 난수(salt)를 결합하여 해싱을 한다. `SHA256`

### 회원 정보 수정 / 삭제

<img src="https://user-images.githubusercontent.com/62232531/199557153-53e29597-2a2d-4695-a9bd-9f4071372b57.gif">

- `수정 / 삭제` 버튼 클릭시 서버로 부터 id, name 정보를 가져온다.
- `수정 / 삭제` 버튼을 누를 시 모달 형태로 화면이 뜬다.
- 현재 비밀번호는 필수적으로 입력하여야 한다.
- 이름과 비밀번호를 변경할 수 있다.
- 이름 수정 성공시 쿠키의 값을 해당 이름으로 변경한다.
- `삭제`버튼 클릭 시 알림창이 발생한 뒤 삭제하게 된다.

## 회원가입 동작과정

1. RegisterCommand은 id, pw , name, ssn 값을 입력받는다.
2. member테이블에 id가 있는지 체크한다.
3. id가 중복이 아니라면 난수인 uuid을 생성하여 복호화 할 수 없게 pw+uuid을 sha256 해슁한다.
4. secKey키는 OpenCrypt.generateKey()을 통해 생성
5. id,salt(uuid), seyKey값을 sec테이블에 저장
6. id, sha256 해슁된 pw, name을 member테이블에 저장한다.

## 회원가입 성공시

### member테이블

<img src="https://user-images.githubusercontent.com/62232531/199560424-a5bab299-f219-40dc-b03b-17bf4a02062d.png">

### sec테이블

<img src="https://user-images.githubusercontent.com/62232531/199560268-4f95d88e-5c32-40f0-b9b0-116fbdede7fc.png">

# 로그인 동작과정

1. LoginCommand은 유저로부터 id와 pw을 입력받는다.
2. `sec`테이블에서 id에 해당하는 salt값을 가져온다.
3. pw와 salt을 이용하여 해슁한 결과 pw와 id을 이용하여`member`테이블에 존재하는지 확인한다.
4. 존재한다면 세션에 member객체를 추가하고 id정보 반환한다.

## 공지사항

<img src="https://user-images.githubusercontent.com/62232531/199572366-94afb530-fb47-4512-a1cc-0eb699cd3edb.gif">

- `관리자`만 공지사항 글쓰기가 가능하다.
- 페이지당 5개의 글을 확인할 수 있으며 아래의 `번호`를 클릭하여 페이지 이동이 가능하다.

## 아파트시세

<img src="https://user-images.githubusercontent.com/62232531/199566841-4b272dc3-c81a-4365-aea9-ff8f27117052.gif">

- 시,군,구 + 년,월을 이용하여 아파트 시세를 가져온다.
- 군,구의 데이터는 이전의 드롭박스 선택시 가져온다.

## 웹캠

<img src="https://user-images.githubusercontent.com/62232531/199541234-e68e60ff-9a8b-4ecf-8b3a-d4047237a224.png">

- 카메라를 연동하여 `찰칵`버튼 클릭 시 현재 화면을 찍고, 다음의 레포지터리에 저장하는 기능을 구현

<img src="https://user-images.githubusercontent.com/62232531/199541449-7a3add13-a295-425c-9a42-8baa9b19c838.png">

## 비기능 구현한 것들

### 비밀번호 암호화

- 비밀번호 패스워드(pw)와 난수(salt)를 결합하여 해싱을 한다. `SHA256`

### SHA256 단방향 암호화

<img src="https://user-images.githubusercontent.com/62232531/195262938-c81a2831-3080-4cda-a46c-05ab50df0a2d.png">

- 평문을 암호화했을 때 다시 평문으로 복호화할 수 없는 암호화인 단방향 암호화 알고리즘을 기반으로 한다.
- 키의 경우 난수인 `uuid`을 이용한다.(중복이 거의 발생하지 않는다.)
- SHA256의 경우 임의의 입력 값을 받아 256bit(32byte)로 `64자리` 문자열을 반환한다.

## CSRF-Token

### CSRF란(Cross Site Request Forgery)

> 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 하는 공격

비정상적인 루트로 접근하는 것을 막기 위하여 일반적인 루트에 `임의의 난수`(CSRF-Token)을 심고 `세션`에 저장한다.  
그리고 사용자의 매 요청마다 해당 난수 값을 포함시켜서 전송시킨다.  
이후 서버에서는 요청을 받을 때 마다 세션에 저장된 토큰값과 요청 파라미터에 전달된 토큰 값이 같은지 검사한다.

해커가 스크립트를 심어 자동 글쓰기를 막을 수 있다.

### SQL Injection 방어

<img src="https://user-images.githubusercontent.com/62232531/199553155-994e53f5-be0b-40fe-9111-122b9ecd725f.png">

- Mybatis에서는 내부적으로 #{} ${} 두 가지 형식으로 파라미터를 받는다.

- `#{}` : 내부적으로 `PreparedStatement`를 사용하기 때문에 sql injection 공격에 안전하다.

- `${}` : 파라미터가 바로 출력된다 -> SQL Injection 공격에 취약

### WEB-INF 밑에 파일 저장

<img src="https://user-images.githubusercontent.com/62232531/199564172-69f5402e-438f-465e-827b-ee3e4fbd8c61.png">
해커가 직접 접근할 수 없는 `WEB-INF` 디렉토리 하위에 파일을 저장하여 보안성을 높였다.

```java
String realPath = servletContext.getRealPath("WEB-INF/upload/webcam");
```

### 비기능 생각해볼 것들

### XSS(Cross-Site Script) 방어

> XSS란 웹 페이지에 악의적인 악성 스크립트 코드를 삽입할 수 있는 취약점이다.

- `httponly` 속성  
  브라우저에서는 쿠키에 접근할 수 없도록 제한하기 위한 옵션이다. 해커들은 다양한 방법으로 이 쿠키를 탈취할 수 없음

### 로그인 횟수 제한

`SpringSeucurity`를 활용하여 로그인 실패 시 처리되야하는 프로세스를 추가해보자.

- 로그인 실패 시 실패 횟수를 증가시킨다.

- 5번이상 실패하면 계정을 비활성화시킨다.

- 로그인 실패에 대한 에러 메시지를 session처리 방식에서 request.setAttribute방식으로 변경한다.

### re-capcha

회원가입 마지막에 re-capcha을 추가하여
스크립트를 이용한 회원가입 막을 수 있다.
