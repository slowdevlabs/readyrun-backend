# ReadyRun 백엔드 API

ReadyRun 애플리케이션의 백엔드 API 서버입니다. 이 프로젝트는 마라톤 정보를 조회, 검색하고 사용자의 즐겨찾기 및 알림을 관리하는 기능을 제공합니다.

**배포 URL:** [https://readyrun-backend.vercel.app/](https://readyrun-backend.vercel.app/)

## ✨ 주요 기능

-   Firebase Authentication을 이용한 사용자 인증 및 회원가입
-   마라톤 대회 정보 조회, 검색
-   사용자별 마라톤 즐겨찾기 추가/삭제
-   알림 목록 조회 및 읽음 처리
-   관리자를 위한 대회 정보 승인/거부 기능

## 🛠️ 기술 스택

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** Supabase (PostgreSQL)
-   **Authentication:** Firebase Authentication
-   **Deployment:** Vercel

## 🔑 인증

`/auth/register`를 제외한 모든 API는 인증이 필요합니다. 클라이언트에서 받은 Firebase ID Token을 `Authorization` 헤더에 `Bearer` 스킴으로 담아 요청해야 합니다.

**Header Example:**
```
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

## 📚 API 명세

### Health Check

| Method | Endpoint | 설명             | 인증 |
| :----- | :------- | :--------------- | :--- |
| `GET`  | `/`      | API 서버 상태 확인 | ❌   |

### Auth (인증)

| Method | Endpoint         | 설명                       | 인증 |
| :----- | :--------------- | :------------------------- | :--- |
| `POST` | `/api/v1/auth/register` | Firebase 정보로 서비스 회원가입 | ❌   |

**Request Body (`/api/v1/auth/register`)**
```json
{
  "firebase_uid": "string",
  "email": "string",
  "display_name": "string",
  "preferred_language": "string",
  "preferred_units": "string"
}
```

### Marathons (마라톤)

| Method | Endpoint                | 설명                 | 인증 |
| :----- | :---------------------- | :------------------- | :--- |
| `GET`  | `/api/v1/marathons`         | 마라톤 목록 조회     | ✅   |
| `GET`  | `/api/v1/marathons/search`  | 마라톤 검색          | ✅   |
| `GET`  | `/api/v1/marathons/:id`     | 마라톤 상세 정보 조회 | ✅   |

<details>
<summary><b>Response Example (`/api/v1/marathons/:id`)</b></summary>

```json
{
  "success": true,
  "data": {
    "marathon": {
      "id": "uuid",
      "name": "string",
      "slug": "string",
      "date_start": "2024-04-15T09:00:00.000Z",
      "date_end": "2024-04-15T15:00:00.000Z",
      "country": "string",
      "city": "string",
      "address": "string",
      "latitude": "number",
      "longitude": "number",
      "distances": ["5k", "10k", "half", "full"],
      "registration_fee": "integer",
      "currency": "string",
      "registration_deadline": "2024-03-31T23:59:59.000Z",
      "registration_url": "string (url)",
      "official_website": "string (url)",
      "thumbnail_url": "string (url)",
      "hero_image_url": "string (url)",
      "course_map_url": "string (url)",
      "description": "text",
      "organizer": "string",
      "max_participants": "integer",
      "elevation_gain": "integer",
      "difficulty_level": "integer",
      "status": "active | pending | rejected",
      "tags": ["string"],
      "created_at": "2023-10-27T10:00:00.000Z",
      "updated_at": "2023-10-28T10:00:00.000Z",
      "source": "string",
      "source_url": "string (url)",
      "confidence_score": "integer",
      "approved_by": "uuid",
      "approved_at": "2023-10-29T10:00:00.000Z",
      "rejection_reason": "text",
      "view_count": "integer",
      "favorite_count": "integer",
      "is_favorited": "boolean"
    }
  }
}
```
</details>

### Favorites (즐겨찾기)

| Method   | Endpoint                    | 설명           | 인증 |
| :------- | :-------------------------- | :------------- | :--- |
| `GET`    | `/api/v1/favorites`         | 즐겨찾기 목록 조회 | ✅   |
| `POST`   | `/api/v1/favorites`         | 즐겨찾기 추가    | ✅   |
| `DELETE` | `/api/v1/favorites/:marathon_id` | 즐겨찾기 삭제    | ✅   |

<details>
<summary><b>Response Example (`/api/v1/favorites`)</b></summary>

```json
{
  "success": true,
  "data": {
    "favorites": [
      {
        "marathon_id": "uuid",
        "created_at": "2023-11-01T14:30:00.000Z",
        "marathons": {
            "id": "uuid",
            "name": "string",
            "slug": "string",
            "date_start": "2024-03-20T09:00:00.000Z",
            "date_end": "2024-03-20T15:00:00.000Z",
            "country": "string",
            "city": "string",
            "address": "string",
            "latitude": "number",
            "longitude": "number",
            "distances": ["5k", "10k", "half", "full"],
            "registration_fee": "integer",
            "currency": "string",
            "registration_deadline": "2024-02-29T23:59:59.000Z",
            "registration_url": "string (url)",
            "official_website": "string (url)",
            "thumbnail_url": "string (url)",
            "hero_image_url": "string (url)",
            "course_map_url": "string (url)",
            "description": "text",
            "organizer": "string",
            "max_participants": "integer",
            "elevation_gain": "integer",
            "difficulty_level": "integer",
            "status": "active | pending | rejected",
            "tags": ["string"],
            "created_at": "2023-10-20T10:00:00.000Z",
            "updated_at": "2023-10-21T10:00:00.000Z",
            "source": "string",
            "source_url": "string (url)",
            "confidence_score": "integer",
            "approved_by": "uuid",
            "approved_at": "2023-10-22T10:00:00.000Z",
            "rejection_reason": "text",
            "view_count": "integer",
            "favorite_count": "integer"
        }
      }
    ]
  }
}
```
</details>

**Request Body (`/api/v1/favorites`)**
```json
{
  "marathon_id": "string"
}
```

### Notifications (알림)

| Method  | Endpoint                | 설명             | 인증 |
| :------ | :---------------------- | :--------------- | :--- |
| `GET`   | `/api/v1/notifications` | 알림 목록 조회     | ✅   |
| `PATCH` | `/api/v1/notifications/:id` | 알림 읽음 처리     | ✅   |

<details>
<summary><b>Response Example (`/api/v1/notifications`)</b></summary>

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "user_id": "uuid",
        "type": "string",
        "title": "string",
        "body": "text",
        "data": {},
        "is_read": "boolean",
        "sent_at": "2023-11-05T18:00:00.000Z",
        "created_at": "2023-11-05T18:00:00.000Z",
        "marathon_id": "uuid"
      }
    ],
    "pagination": {
      "total": "integer",
      "page": "integer",
      "limit": "integer"
    }
  }
}
```
</details>

### Admin (관리자)

`[ADMIN]` 권한이 있는 사용자만 접근 가능합니다.

| Method | Endpoint                             | 설명                       | 인증   |
| :----- | :----------------------------------- | :------------------------- | :----- |
| `GET`  | `/api/v1/admin/marathons/pending`      | 승인 대기 마라톤 목록 조회 | ✅ (Admin) |
| `POST` | `/api/v1/admin/marathons/:id/approve`  | 마라톤 정보 승인           | ✅ (Admin) |
| `POST` | `/api/v1/admin/marathons/:id/reject`   | 마라톤 정보 거부           | ✅ (Admin) |

<details>
<summary><b>Response Example (`/api/v1/admin/marathons/pending`)</b></summary>

```json
{
  "success": true,
  "data": {
    "marathons": [
       {
            "id": "uuid",
            "name": "string",
            "slug": "string",
            "date_start": "2024-05-01T08:30:00.000Z",
            "date_end": "2024-05-01T14:30:00.000Z",
            "country": "string",
            "city": "string",
            "address": "string",
            "latitude": "number",
            "longitude": "number",
            "distances": ["5k", "10k", "half", "full"],
            "registration_fee": "integer",
            "currency": "string",
            "registration_deadline": "2024-04-15T23:59:59.000Z",
            "registration_url": "string (url)",
            "official_website": "string (url)",
            "thumbnail_url": "string (url)",
            "hero_image_url": "string (url)",
            "course_map_url": "string (url)",
            "description": "text",
            "organizer": "string",
            "max_participants": "integer",
            "elevation_gain": "integer",
            "difficulty_level": "integer",
            "status": "pending",
            "tags": ["string"],
            "created_at": "2023-10-28T11:20:00.000Z",
            "updated_at": "2023-10-28T11:20:00.000Z",
            "source": "string",
            "source_url": "string (url)",
            "confidence_score": "integer",
            "approved_by": null,
            "approved_at": null,
            "rejection_reason": null,
            "view_count": 0,
            "favorite_count": 0
      }
    ]
  }
}
```
</details>
