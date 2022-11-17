# 💒찾아방

## 🧑‍💻팀원

- 박윤환
- 공진호

## 진행상황
[🗓 Notion](https://halved-octave-4e7.notion.site/621e89afe3294ff899525ced8ee6d868?v=2603f2a168ba4af4921a7021eeddaaaa)

## 기능적 요구사항

| #  | 요구사항명      | 요구사항 상세                               |
|----|------------|---------------------------------------|
| 1  | 회원 관리      | 회원 가입, 회원 정보 조회 / 수정 / 삭제             |
| 2  | 로그인 관리     | 로그인, 로그아웃                             |
| 3  | 게시판 관리     | 게시글 목록 조회  ,게시글(답글) 작성 / 조회 / 수정 / 삭제 |
| 4  | 주택 실거래가 검색 | 시/도, 군/구, 동으로 아파트 목록 검색               |
|    |            | 아파트 상세 정보 조회                          |
|    |            | 아파트 최근 실거래가 차트로 조회                    |
| 5  | 관심 지역      | 유저별 관심 아파트 매물 검색 / 추가/삭제/저장           |
|    |            | 관심 아파트 매물 순위  제공                      |
| 6  | 지도 제공      | 매물의 위치를 지도 상에 표시하여 제공                 |
|    |            | 지도상 존재하는 카테고리별(카페,편의점, 마트 등) 지도에 제공   |





## 비기능적 요구사항

| # | 비요구사항명            | 요구사항 상세                                                   |
|---|-------------------|-----------------------------------------------------------|
| 1 | XSS               | Lucy Filter을 통하여 XSS 필터링                                  |
| 2 | 로그인 시도 횟수 제한      | 같은 회원에 대하여 5번 연속 로그인 실패 시 로그인 제한                          |
| 3 | 자동 가입 방지 recapcha | 스크립트를 이용한 자동 회원가입을 막기위하여 recapcha 사용                      |
| 4 | 2차 인증             | 회원정보, 글 등의 수정, 삭제시 `confirm`을 통해 사용자 의사 재확인               |
| 5 | 데이터 출력 최소화        | 에러를 구체적으로 알리지 않으며 `console.log`, `System.out` 등 부가 결과물 제거 |
| 6 | 소셜 로그인            | Oauth을 이용하여 소셜로그인                                         |
| 7 | 암호화               | SHA256,AES128을 이용하여 사용자 정보 암호화                            |


### 유스케이스 다이어그램
![usecase diagram](https://user-images.githubusercontent.com/62232531/202087060-5e23bca4-6161-453e-ae95-1e1060c9ea29.png)


### ER 다이어그램

| 테이블       | 컬럼                                                                                                                                                                                                                                                                                               |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| security  | id(pk) <br/> salt(sha에 사용할 랜덤값) <br/>seckey(AES Key)                                                                                                                                                                                                                                             |
| dongcode  | dongcode(pk)<br/>sidoName<br/>gugunName<br/>dongName                                                                                                                                                                                                                                             |
| housedeal | no(pk) <br/>dealAmout<br/> dealYear<br/>           dealMonth<br/> dealDay<br/>area<br/>floor<br/>cancelDealType<br/>aptCode<br/>                                                                                                                                                                 |
| houseinfo | aptCode(pk) <br/>buildYear<br/> roadName<br/>           roadNameBonbun<br/> roadNameBubun<br/>roadNameSeq<br/>roadNameBasementCode<br/>roadNameCode<br/>dong<br/>bonbun<br/> bubun<br/>sigunguCode<br/>eubmyundongCode<br/>dongCode<br/>landCode<br/>apartmentName<br/>jibun<br/>lng<br/>lat<br/> |
| member    | id(pk)<br/>pw(SHA을 이용하여 암호화)<br/>nickname(유니크)<br/>reg_date<br/>                                                                                                                                                                                                                                 |
| board     | article_no(pk)<br/>id(member의 id 참조)<br/>title<br/>content<br/>hit(기본값 0)<br/>reg_date(게시글 작성시각)<br/>                                                                                                                                                                                            |

![ER 다이어그램](https://user-images.githubusercontent.com/62232531/202130732-7b6b0dce-2a00-4d8e-af6b-6ec4abd19a52.png)



## 설계서

### 메인페이지
<img src="https://user-images.githubusercontent.com/62232531/202116648-5b120cf3-7599-4e93-841a-8c4bd9d358bf.png">





