# ReadyRun 마라톤 대회 정보 앱 상세기획서 v3.0

## 📋 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택 및 아키텍처](#2-기술-스택-및-아키텍처)
3. [기능 명세서](#3-기능-명세서)
4. [데이터베이스 설계](#4-데이터베이스-설계)
5. [API 설계](#5-api-설계)
6. [UI/UX 설계](#6-uiux-설계)
7. [수익 모델](#7-수익-모델)
8. [개발 로드맵](#8-개발-로드맵)
9. [운영 계획](#9-운영-계획)
10. [부록](#10-부록)

---

## 1. 프로젝트 개요

### 1.1 서비스 소개
**ReadyRun**은 전 세계 마라톤 대회 정보를 한 곳에서 찾고 관리할 수 있는 iOS 앱입니다. AI 크롤링을 통해 실시간으로 마라톤 대회 정보를 수집하고, 사용자에게 맞춤형 대회 추천 서비스를 제공합니다.

### 1.2 타겟 사용자
- **주 타겟**: 마라톤 참가 경험이 있는 러너 (25-45세)
- **부 타겟**: 마라톤에 관심 있는 초보 러너
- **지역**: 국내 우선, 해외 확장 계획

### 1.3 핵심 가치 제안
- **편의성**: 흩어져 있는 마라톤 정보를 한 곳에서 검색
- **정확성**: AI 기반 정보 수집 및 관리자 검수
- **개인화**: 사용자 선호도 기반 맞춤 추천
- **실시간성**: 등록 마감, 대회 변경사항 실시간 알림

### 1.4 비즈니스 목표
- **1년차**: DAU 1,000명, MAU 5,000명
- **2년차**: DAU 5,000명, MAU 25,000명
- **수익**: AdMob 광고 수익 월 $500+ (1년차 목표)

---

## 2. 기술 스택 및 아키텍처

### 2.1 기술 스택

#### Frontend (iOS)
- **언어**: Swift 5.9+
- **최소 지원 버전**: iOS 15.0+
- **UI 프레임워크**: UIKit + SwiftUI (부분적)
- **아키텍처**: MVVM-C (Model-View-ViewModel-Coordinator)
- **의존성 관리**: Swift Package Manager
- **네트워킹**: URLSession + Async/Await
- **로컬 저장소**: Core Data
- **광고**: Google AdMob SDK
- **인증**: Firebase Authentication

#### Backend
- **런타임**: Node.js 18.x
- **프레임워크**: Express.js 4.18+
- **데이터베이스**: Supabase PostgreSQL
- **인증**: Firebase Admin SDK
- **크롤링**: Puppeteer + Cheerio
- **스케줄링**: node-cron
- **파일 저장**: Supabase Storage
- **배포**: Vercel (무료 티어)

#### 인프라
- **데이터베이스**: Supabase (무료 티어 500MB)
- **백엔드 호스팅**: Vercel (무료 티어)
- **인증**: Firebase (Spark 플랜)
- **모니터링**: Sentry (무료 티어)
- **분석**: Firebase Analytics

### 2.2 시스템 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   iOS App       │◄──►│   API Gateway   │◄──►│  Backend API    │
│   (Swift)       │    │   (Vercel)     │    │  (Node.js)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         ▼                                              ▼
┌─────────────────┐                          ┌─────────────────┐
│  Firebase Auth  │                          │   Supabase      │
│  + Analytics    │                          │   PostgreSQL    │
└─────────────────┘                          └─────────────────┘
                                                       │
                                              ┌─────────────────┐
                                              │   AI Crawler    │
                                              │   (Puppeteer)   │
                                              └─────────────────┘
                                                       │
                                              ┌─────────────────┐
                                              │  External       │
                                              │  Marathon Sites │
                                              └─────────────────┘
```

---

## 3. 기능 명세서

### 3.1 MVP 기능 (1차 출시)

#### 사용자 기능
1. **회원가입/로그인**
   - Firebase Authentication (이메일, Google, Apple 로그인)
   - 프로필 설정 (선호 거리, 지역, 언어)

2. **마라톤 검색 및 브라우징**
   - 홈 화면: "내 주변" + "인기 대회" 섹션
   - 검색: 대회명, 지역, 날짜, 거리별 필터링
   - 정렬: 날짜순, 거리순, 인기순

3. **대회 상세 정보**
   - 기본 정보: 날짜, 장소, 거리, 참가비
   - 등록 정보: 마감일, 등록 링크
   - 코스맵, 대회 이미지

4. **즐겨찾기**
   - 관심 대회 저장
   - 즐겨찾기 목록 관리

5. **푸시 알림**
   - 즐겨찾기 대회 등록 마감 알림
   - 새로운 추천 대회 알림

#### 관리자 기능
1. **대회 승인 시스템**
   - AI 크롤링된 대회 정보 검수
   - 승인/거부/수정 처리
   - 승인 히스토리 관리

### 3.2 향후 개발 기능 (2-3차 출시)

1. **개인화 추천**
   - 사용자 행동 기반 ML 추천
   - 날씨, 시즌 고려한 추천

2. **소셜 기능**
   - 대회 후기 및 평점
   - 러닝 크루 매칭

3. **고급 필터링**
   - 고도, 난이도, 완주 메달 여부 등

---

## 4. 데이터베이스 설계

### 4.1 ERD (Entity Relationship Diagram)

```
User ||--o{ Favorite : has
User ||--o{ Notification : receives
Favorite }o--|| Marathon : for
Marathon ||--o{ MarathonApproval : has
MarathonApproval }o--|| AdminUser : approved_by
AdminUser ||--o{ AdminUser : created_by
```

### 4.2 테이블 스키마

#### users 테이블
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    display_name VARCHAR(100),
    preferred_language VARCHAR(5) DEFAULT 'ko',
    preferred_units VARCHAR(10) DEFAULT 'metric',
    preferred_distances TEXT[], -- ['5K', '10K', 'Half', 'Full']
    preferred_countries TEXT[], -- ['KR', 'US', 'JP']
    push_notifications_enabled BOOLEAN DEFAULT true,
    location_permission_granted BOOLEAN DEFAULT false,
    last_location_lat DECIMAL(10, 8),
    last_location_lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP
);
```

#### marathons 테이블
```sql
CREATE TABLE marathons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE, -- URL-friendly name
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    distances TEXT[] NOT NULL, -- ['5K', '10K', 'Half', 'Full']
    registration_fee INTEGER, -- cents
    currency VARCHAR(3) DEFAULT 'KRW',
    registration_deadline TIMESTAMP,
    registration_url TEXT,
    official_website TEXT,
    thumbnail_url TEXT,
    hero_image_url TEXT,
    course_map_url TEXT,
    description TEXT,
    organizer VARCHAR(255),
    max_participants INTEGER,
    elevation_gain INTEGER, -- meters
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    status VARCHAR(20) DEFAULT 'pending', -- pending, active, cancelled, completed, rejected
    tags TEXT[], -- ['scenic', 'flat', 'challenging', 'beginner-friendly']
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    source VARCHAR(100), -- manual, ai_crawler, api_import
    source_url TEXT, -- original URL where data was found
    confidence_score INTEGER DEFAULT 100 CHECK (confidence_score BETWEEN 0 AND 100),
    approved_by UUID REFERENCES admin_users(id),
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    view_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0
);
```

#### favorites 테이블
```sql
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    marathon_id UUID NOT NULL REFERENCES marathons(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, marathon_id)
);
```

#### admin_users 테이블
```sql
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'admin', -- admin, super_admin
    permissions TEXT[], -- ['marathon_approval', 'user_management', 'system_admin']
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP,
    created_by UUID REFERENCES admin_users(id),
    is_active BOOLEAN DEFAULT true
);
```

#### marathon_approvals 테이블
```sql
CREATE TABLE marathon_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    marathon_id UUID NOT NULL REFERENCES marathons(id) ON DELETE CASCADE,
    admin_user_id UUID NOT NULL REFERENCES admin_users(id),
    action VARCHAR(20) NOT NULL, -- approved, rejected, modified, pending_review
    notes TEXT,
    changes_made JSONB, -- what fields were modified
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### notifications 테이블
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- registration_deadline, new_recommendation, status_change
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    data JSONB, -- additional data for the notification
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    marathon_id UUID REFERENCES marathons(id) ON DELETE SET NULL
);
```

### 4.3 인덱스 설계

```sql
-- 성능 최적화를 위한 인덱스
CREATE INDEX idx_marathons_date_country ON marathons(date_start, country);
CREATE INDEX idx_marathons_location ON marathons(latitude, longitude);
CREATE INDEX idx_marathons_status_date ON marathons(status, date_start) WHERE status = 'active';
CREATE INDEX idx_marathons_distances ON marathons USING GIN(distances);
CREATE INDEX idx_marathons_search ON marathons USING GIN(to_tsvector('english', name || ' ' || city));

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_marathon_id ON favorites(marathon_id);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at);

-- 관리자 기능을 위한 인덱스
CREATE INDEX idx_marathons_pending ON marathons(status, created_at) WHERE status = 'pending';
```

---

## 5. API 설계

### 5.1 API 기본 구조

```
Base URL: https://readyrun-api.vercel.app/api/v1
Authentication: Bearer Token (Firebase JWT)
Response Format: JSON
```

### 5.2 인증 관련 API

#### POST /auth/register
사용자 등록 (Firebase UID 기반)
```json
Request:
{
  "firebase_uid": "string",
  "email": "string",
  "display_name": "string",
  "preferred_language": "ko",
  "preferred_units": "metric"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "firebase_uid": "string",
      "email": "string",
      "display_name": "string",
      "created_at": "ISO 8601"
    }
  }
}
```

### 5.3 마라톤 관련 API

#### GET /marathons
마라톤 목록 조회
```
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20, max: 100)
- sort: string (date_asc, date_desc, name_asc, popularity_desc)
- country: string (ISO 2-letter code)
- city: string
- distance: string[] (5K, 10K, Half, Full)
- date_from: string (ISO 8601)
- date_to: string (ISO 8601)
- lat: number (for location-based search)
- lng: number (for location-based search)
- radius: number (km, default: 50)
- tags: string[] (scenic, flat, challenging, etc.)
```

```json
Response:
{
  "success": true,
  "data": {
    "marathons": [{
      "id": "uuid",
      "name": "string",
      "slug": "string",
      "date_start": "ISO 8601",
      "location": {
        "country": "string",
        "city": "string",
        "coordinates": {
          "lat": "number",
          "lng": "number"
        }
      },
      "distances": ["5K", "10K", "Half", "Full"],
      "registration": {
        "fee": "number",
        "currency": "string",
        "deadline": "ISO 8601",
        "url": "string"
      },
      "images": {
        "thumbnail": "string",
        "hero": "string"
      },
      "tags": ["string"],
      "favorite_count": "number",
      "is_favorited": "boolean"
    }],
    "pagination": {
      "current_page": 1,
      "total_pages": 50,
      "total_count": 1000,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

#### GET /marathons/:id
마라톤 상세 조회
```json
Response:
{
  "success": true,
  "data": {
    "marathon": {
      "id": "uuid",
      "name": "string",
      "slug": "string",
      "date_start": "ISO 8601",
      "date_end": "ISO 8601",
      "location": {
        "country": "string",
        "city": "string",
        "address": "string",
        "coordinates": {
          "lat": "number",
          "lng": "number"
        }
      },
      "distances": ["Full", "Half"],
      "registration": {
        "fee": 50000,
        "currency": "KRW",
        "deadline": "ISO 8601",
        "url": "string",
        "max_participants": 10000
      },
      "images": {
        "thumbnail": "string",
        "hero": "string",
        "course_map": "string"
      },
      "details": {
        "description": "string",
        "organizer": "string",
        "official_website": "string",
        "elevation_gain": 200,
        "difficulty_level": 3
      },
      "tags": ["scenic", "challenging"],
      "stats": {
        "view_count": 1250,
        "favorite_count": 89
      },
      "is_favorited": false,
      "metadata": {
        "created_at": "ISO 8601",
        "updated_at": "ISO 8601",
        "source": "ai_crawler"
      }
    }
  }
}
```

#### GET /marathons/search
마라톤 검색
```
Query Parameters:
- q: string (검색어)
- filters: object (복합 필터)
```

### 5.4 즐겨찾기 API

#### POST /favorites
즐겨찾기 추가
```json
Request:
{
  "marathon_id": "uuid"
}

Response:
{
  "success": true,
  "message": "Marathon added to favorites"
}
```

#### DELETE /favorites/:marathon_id
즐겨찾기 제거

#### GET /favorites
사용자 즐겨찾기 목록

### 5.5 관리자 API

#### GET /admin/marathons/pending
승인 대기 중인 마라톤 목록

#### POST /admin/marathons/:id/approve
마라톤 승인
```json
Request:
{
  "notes": "string",
  "changes": {
    "name": "corrected name",
    "date_start": "ISO 8601"
  }
}
```

#### POST /admin/marathons/:id/reject
마라톤 거부
```json
Request:
{
  "reason": "Duplicate event",
  "notes": "string"
}
```

### 5.6 에러 응답 구조

```json
{
  "success": false,
  "error": {
    "code": "MARATHON_NOT_FOUND",
    "message": "Marathon with given ID not found",
    "details": {}
  }
}
```

### 5.7 에러 코드 정의

| 코드 | HTTP 상태 | 설명 |
|------|-----------|------|
| INVALID_REQUEST | 400 | 잘못된 요청 |
| UNAUTHORIZED | 401 | 인증 필요 |
| FORBIDDEN | 403 | 권한 없음 |
| NOT_FOUND | 404 | 리소스 없음 |
| VALIDATION_ERROR | 422 | 데이터 검증 실패 |
| RATE_LIMIT_EXCEEDED | 429 | 요청 제한 초과 |
| INTERNAL_ERROR | 500 | 서버 오류 |

---

## 6. UI/UX 설계

### 6.1 디자인 시스템

#### 색상 팔레트
- **Primary Blue**: #007AFF (iOS 시스템 블루)
- **Secondary Orange**: #FF6B35 (에너지감, 활동성)
- **Success Green**: #34C759 (완료, 성공)
- **Warning Orange**: #FF9500 (주의, 중요)
- **Error Red**: #FF3B30 (에러, 위험)
- **Background**: #F2F2F7 (iOS 시스템 백그라운드)
- **Text Primary**: #000000
- **Text Secondary**: #6C6C70

#### 타이포그래피
- **Large Title**: SF Pro Display, 34pt, Bold
- **Title 1**: SF Pro Display, 28pt, Regular
- **Title 2**: SF Pro Display, 22pt, Regular
- **Title 3**: SF Pro Display, 20pt, Regular
- **Headline**: SF Pro Text, 17pt, Semibold
- **Body**: SF Pro Text, 17pt, Regular
- **Callout**: SF Pro Text, 16pt, Regular
- **Caption**: SF Pro Text, 12pt, Regular

#### 스페이싱 시스템
- **XXS**: 4pt
- **XS**: 8pt
- **S**: 12pt
- **M**: 16pt
- **L**: 24pt
- **XL**: 32pt
- **XXL**: 48pt

### 6.2 화면별 상세 설계

#### 홈 화면 (Home)
```
┌─────────────────────────────────────┐
│ ReadyRun                    [🔔] [👤] │ ← Navigation Bar
├─────────────────────────────────────┤
│ 🔍 Search marathons...              │ ← Search Bar
├─────────────────────────────────────┤
│ 📍 Near You              [See All] │ ← Section Header
│ ┌─────────────────────────────────┐ │
│ │ [Hero Image]                    │ │
│ │ Seoul International Marathon    │ │ ← Marathon Card
│ │ Mar 17, 2024 • Seoul, KR       │ │
│ │ 42.2K • ₩50,000            [♡] │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [Hero Image]                    │ │
│ │ Jeju Island Marathon            │ │
│ │ Apr 14, 2024 • Jeju, KR        │ │
│ │ 21.1K • ₩35,000            [♡] │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 🔥 Popular This Month    [See All] │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐         │ ← Horizontal Scroll
│ │[I]│ │[I]│ │[I]│ │[I]│         │
│ │ B │ │ T │ │ N │ │ L │         │
│ │ M │ │ M │ │ Y │ │ M │         │
│ └───┘ └───┘ └───┘ └───┘         │
├─────────────────────────────────────┤
│ [AdMob Banner Ad]                   │ ← 광고 영역
└─────────────────────────────────────┘
│ [Home] [Search] [❤️] [Profile]      │ ← Tab Bar
└─────────────────────────────────────┘
```

**상호작용**:
- 검색바 탭 → 검색 화면으로 이동
- 마라톤 카드 탭 → 상세 화면으로 이동
- 하트 아이콘 탭 → 즐겨찾기 토글
- "See All" 탭 → 해당 카테고리 목록 화면

#### 검색 화면 (Search)
```
┌─────────────────────────────────────┐
│ ✕  🔍 Search...           [Filter] │ ← Search + Filter
├─────────────────────────────────────┤
│ 📍 Korea • 🏃 Full • 📅 2024   ✕   │ ← Active Filters
├─────────────────────────────────────┤
│ Sort: Date ↑                    [≡] │ ← Sort Options
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [Thumb] Seoul Marathon          │ │
│ │         Mar 17 • Seoul          │ │ ← Search Results
│ │         ♡ 89 views • 42.2K      │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [Thumb] Busan International     │ │
│ │         Apr 14 • Busan          │ │
│ │         ♡ 156 views • 21.1K     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [Thumb] Jeju Marathon           │ │
│ │         May 20 • Jeju           │ │
│ │         ♡ 203 views • 10K       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Load More Results]                 │
├─────────────────────────────────────┤
│ [AdMob Banner Ad]                   │
└─────────────────────────────────────┘
```

**필터 옵션**:
- **거리**: 5K, 10K, Half Marathon, Full Marathon
- **국가**: 대한민국, 일본, 미국, 기타
- **날짜**: Custom Date Range Picker
- **참가비**: 무료, ~50,000원, 50,000~100,000원, 100,000원+
- **태그**: 경치좋은, 평지, 도전적, 초보자친화적

#### 마라톤 상세 화면 (Marathon Detail)
```
┌─────────────────────────────────────┐
│ ← Seoul International Marathon  [♡] │ ← Navigation + Favorite
├─────────────────────────────────────┤
│ [                                 ] │
│ [       Hero Image                ] │ ← Hero Image
│ [                                 ] │
├─────────────────────────────────────┤
│ 📅 March 17, 2024 (Sunday)         │
│ 📍 Seoul Olympic Park, Seoul, KR   │ ← Basic Info
│ 🏃 42.2K Full Marathon             │
│ 💳 ₩50,000 • Deadline: Feb 28      │
├─────────────────────────────────────┤
│ [Register Now] [Share] [Directions] │ ← Action Buttons
├─────────────────────────────────────┤
│ ℹ️ Details                          │
│ The Seoul International Marathon    │
│ is one of Korea's premier running   │ ← Description
│ events, featuring a scenic course   │
│ through the heart of Seoul...       │
├─────────────────────────────────────┤
│ 🗺️ Course Map                       │
│ [                                 ] │
│ [       Course Map Image          ] │ ← Course Map
│ [                                 ] │
├─────────────────────────────────────┤
│ 📊 Event Details                    │
│ • Organizer: Seoul Sports Council   │
│ • Max Participants: 30,000          │ ← Additional Info
│ • Elevation Gain: 150m              │
│ • Difficulty: ⭐⭐⭐                 │
├─────────────────────────────────────┤
│ [AdMob Banner Ad]                   │
└─────────────────────────────────────┘
```

#### 즐겨찾기 화면 (Favorites)
```
┌─────────────────────────────────────┐
│ My Favorites                   [Edit] │ ← Navigation
├─────────────────────────────────────┤
│ 📅 Upcoming (3)                     │ ← Section
│ ┌─────────────────────────────────┐ │
│ │ [Thumb] Seoul Marathon          │ │
│ │         Mar 17 • 15 days left   │ │ ← Time until event
│ │         Registration closes in  │ │
│ │         3 days                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📋 Past Events (12)                 │
│ ┌─────────────────────────────────┐ │
│ │ [Thumb] Tokyo Marathon          │ │
│ │         Feb 25 • Completed      │ │
│ │         [Add Review]            │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [AdMob Banner Ad]                   │
└─────────────────────────────────────┘
```

#### 프로필 화면 (Profile)
```
┌─────────────────────────────────────┐
│ Profile                      [Settings] │
├─────────────────────────