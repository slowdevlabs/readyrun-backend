ReadyRun API 개발 상세 태스크 & 세부작업 (크롤링 포함)
1. 프로젝트 환경 및 기본 구조 세팅
[ ] Node.js/Express 프로젝트 초기화 및 폴더 구조 설계
[ ] npm 프로젝트 초기화, git 설정
[ ] src/ 하위 폴더(controllers, routes, services, middlewares, config, utils, crawlers) 생성
[ ] .gitignore, .env, README.md 작성
[ ] 패키지 설치 및 환경설정
[ ] express, @supabase/supabase-js, firebase-admin, dotenv, morgan, cors 등 설치
[ ] puppeteer, cheerio 등 크롤링 관련 패키지 설치
[ ] 환경변수(.env) 예시 작성 및 보안 설정
[ ] Supabase(PostgreSQL) 연동 및 테스트
[ ] Supabase 프로젝트 생성 및 DB 테이블/인덱스 설계
[ ] supabase-js로 연결 및 샘플 쿼리 테스트
[ ] Firebase Admin SDK 연동 및 인증 테스트
[ ] Firebase 프로젝트/서비스 계정 생성
[ ] firebase-admin 연동 및 JWT 검증 테스트
[ ] 공통 미들웨어 적용
[ ] CORS, morgan, error handler 등 미들웨어 구현 및 적용
2. 인증/회원가입/프로필 API
[ ] Firebase JWT 인증 미들웨어 구현
[ ] Authorization 헤더 파싱 및 토큰 검증
[ ] 유저 DB 정보 attach
[ ] 인증 실패/권한 없음 에러 처리
[ ] 회원가입/로그인 API (POST /auth/register)
[ ] 요청 파라미터 검증 (firebase_uid, email, display_name 등)
[ ] users 테이블 신규 row 생성 (중복 UID 체크)
[ ] 최초 프로필 정보 입력(선호 거리, 지역, 언어, 단위)
[ ] 성공/실패 응답 포맷 구현
[ ] 내 정보 조회/수정 API (GET/PATCH /users/me)
[ ] GET: 인증된 사용자 정보 반환
[ ] PATCH: 선호 거리, 지역, 언어, 단위 등 수정
[ ] 입력값 검증 및 DB 업데이트
[ ] 성공/실패 응답 포맷 구현
[ ] 계정 탈퇴 API (DELETE /users/me)
[ ] 인증된 사용자 row 삭제 (연관 데이터 cascade)
[ ] 성공/실패 응답 포맷 구현
3. 마라톤 대회 API
[ ] 마라톤 목록 조회 API (GET /marathons)
[ ] 쿼리 파라미터(위치, 거리, 날짜, 태그, 정렬, 페이징) 파싱
[ ] Supabase 쿼리 작성 및 결과 반환
[ ] 각 대회별 is_favorited 필드 포함
[ ] pagination 정보 포함 응답
[ ] 마라톤 상세 조회 API (GET /marathons/:id)
[ ] 대회 상세 정보 조회
[ ] is_favorited, 통계(조회수 증가) 포함
[ ] 존재하지 않을 경우 404 처리
[ ] 마라톤 검색 API (GET /marathons/search)
[ ] 검색어, 복합 필터, 정렬 파라미터 파싱
[ ] Supabase full-text search 쿼리 작성
[ ] 결과 및 pagination 반환
[ ] (관리자) 마라톤 등록/수정/삭제 API
[ ] 관리자 권한 체크
[ ] 입력값 검증 및 DB 반영
[ ] 승인/거부/수정 이력 기록
4. 즐겨찾기 API
[ ] 즐겨찾기 추가 API (POST /favorites)
[ ] marathon_id 파라미터 검증
[ ] favorites 테이블에 row 추가 (중복 체크)
[ ] 성공/실패 응답
[ ] 즐겨찾기 삭제 API (DELETE /favorites/:marathon_id)
[ ] marathon_id 파라미터 검증
[ ] favorites row 삭제
[ ] 성공/실패 응답
[ ] 즐겨찾기 목록 조회 API (GET /favorites)
[ ] 인증된 사용자 기준 즐겨찾기 목록 조회
[ ] 예정/지난 대회 구분, 페이징 처리
[ ] 각 대회 상세 정보 포함
5. 알림(Notification) API
[ ] 알림 목록 조회 API (GET /notifications)
[ ] 인증된 사용자 기준 알림 목록 조회
[ ] 읽음/안읽음, 생성일 기준 정렬, 페이징
[ ] 알림 읽음 처리 API (PATCH /notifications/:id)
[ ] 알림 id 파라미터 검증
[ ] is_read 필드 true로 업데이트
[ ] (향후) 알림 발송/설정 API
[ ] 알림 타입별 발송 로직 구현
[ ] 사용자별 알림 설정 on/off
6. 관리자(Admin) API
[ ] 승인 대기 마라톤 목록 조회 API (GET /admin/marathons/pending)
[ ] 관리자 권한 체크
[ ] status='pending' 대회 목록 조회, 페이징
[ ] 마라톤 승인 API (POST /admin/marathons/:id/approve)
[ ] 관리자 권한 체크
[ ] notes, 변경사항 파라미터 검증
[ ] status='active'로 변경, 승인 이력 기록
[ ] 마라톤 거부 API (POST /admin/marathons/:id/reject)
[ ] 관리자 권한 체크
[ ] 거부 사유, notes 파라미터 검증
[ ] status='rejected'로 변경, 이력 기록
[ ] (향후) 관리자 계정 관리, 승인 이력 조회 등
7. 크롤링(AI Crawler) 시스템
[ ] 크롤러 설계 및 구현 (Puppeteer + Cheerio)
[ ] 크롤링 대상 사이트/URL 목록 정의
[ ] Puppeteer로 동적 페이지 렌더링 및 HTML 추출
[ ] Cheerio로 HTML 파싱 및 데이터(대회명, 날짜, 장소, 상세링크 등) 추출
[ ] 상세 페이지 진입 및 추가 정보(설명, 참가비, 마감일 등) 추출
[ ] User-Agent, 헤더, 딜레이 등 차단 방지 로직 적용
[ ] 크롤링 실패/예외 처리 및 로깅
[ ] 크롤링 데이터 정제 및 DB 저장
[ ] 추출 데이터 유효성/중복 체크
[ ] marathons 테이블에 source='ai_crawler', status='pending'으로 저장
[ ] 기존 데이터와 중복/갱신 로직 구현
[ ] 크롤러 스케줄링 및 자동화
[ ] node-cron 등으로 정기 실행 스케줄러 구현
[ ] 크롤링 결과 요약/로그 저장
[ ] 관리자에게 신규/변경 대회 알림(향후)
[ ] 크롤링 관리/모니터링
[ ] 크롤링 성공/실패 통계, 에러 알림(향후)
[ ] 크롤링 데이터 검수/승인 프로세스와 연동
8. 공통/유틸리티
[ ] 표준 응답 포맷(success/error) 유틸 구현
[ ] 성공/실패 응답 구조 통일
[ ] 에러 코드/메시지 관리
[ ] 공통 에러 핸들러 및 에러 코드 관리
[ ] 미들웨어로 모든 에러 캐치
[ ] API 명세에 맞는 에러 코드/메시지 반환
[ ] API 요청/응답 로깅 및 모니터링
[ ] morgan 등으로 요청/응답 로그 기록
[ ] (향후) Sentry 등 연동
[ ] Swagger/OpenAPI 기반 API 문서화
[ ] 각 엔드포인트별 파라미터/응답/에러 예시 작성
[ ] Swagger UI 연동
9. 보안/운영/테스트
[ ] 환경변수 관리 및 민감정보 보호
[ ] .env 예시, 실제 값 git 미포함
[ ] 서비스키, Firebase JSON 등 안전하게 관리
[ ] 관리자/사용자 권한 분기 및 접근제어
[ ] 미들웨어에서 권한 체크
[ ] 관리자 전용 API 보호
[ ] 단위/통합 테스트 코드 작성(Jest 등)
[ ] 각 API별 정상/에러 케이스 테스트
[ ] 인증/권한/에러 분기 테스트
[ ] 크롤러 테스트(실제 사이트/Mock)
[ ] 배포 스크립트 및 CI/CD 연동(향후)
[ ] Vercel, Github Actions 등 연동
10. 데이터베이스/마이그레이션
[ ] Supabase 테이블/인덱스/관계 설계 및 생성
[ ] users, marathons, favorites, notifications, admin_users, marathon_approvals 등
[ ] 인덱스/제약조건/관계 설정
[ ] 샘플 데이터/시드 스크립트 작성
[ ] 개발/테스트용 데이터 입력
[ ] DB 마이그레이션 관리(향후)
[ ] 스키마 변경 이력 관리
11. 확장/고급 기능(향후)
[ ] ML 기반 개인화 추천 API
[ ] 사용자 행동 데이터 수집/분석
[ ] 추천 결과 API 설계/구현
[ ] 후기/평점/소셜 기능 API
[ ] 후기/평점 테이블 및 API 설계/구현
[ ] 관리자용 통계/모니터링 API
[ ] 대회/사용자/알림 등 통계 API
[ ] 오프라인/캐시 데이터 지원
[ ] 네트워크 장애 시 캐시 데이터 제공