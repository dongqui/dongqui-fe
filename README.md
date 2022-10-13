# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

## 로그인

- 가정: 로그인 성공시 서버에서 httpOnly 쿠키로 token 저장 -> 필요시 유저 정보 요청

  - 임시로 클라이언트에서 쿠키 저장, 유저 정보 api 및 로그아웃 api 서버 요청 없이 임시로 구현

- 가정: 존재하지 않는 아이디, 틀린 비밀번호 에러코드 401.1, 401.2로 가정
  - 로그인 요청 실패시, 에러코드에 맞게 Form 에러 핸들링

<br>

## pagination, infinite-scroll, product 페이지

- 가정: 데이터 최신화가 필요하고 SEO가 중요하다고 가정
  - SSR로 구현 - msw 서버 이슈로 getServerSideProps 주석 처리
