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
      "created_at": "timestamp",
      "name": "string",
      "description": "text",
      "date_start": "timestamp",
      "date_end": "timestamp",
      "location": "string",
      "country": "string",
      "city": "string",
      "url_official": "string (url)",
      "url_register": "string (url)",
      "distances": ["5k", "10k", "half", "full"],
      "image_url": "string (url)",
      "tags": ["string"],
      "status": "active | pending | rejected",
      "favorite_count": "integer",
      "view_count": "integer",
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
        "id": "uuid",
        "name": "string",
        "date_start": "timestamp",
        "location": "string",
        "image_url": "string (url)",
        "distances": ["5k", "10k", "half", "full"],
        "favorited_at": "timestamp"
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
        "type": "string",
        "message": "string",
        "is_read": "boolean",
        "created_at": "timestamp"
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
        "created_at": "timestamp",
        "name": "string",
        "description": "text",
        "date_start": "timestamp",
        "location": "string",
        "url_official": "string (url)",
        "status": "pending"
      }
    ]
  }
}
```
</details>
