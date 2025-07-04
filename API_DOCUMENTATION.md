# 포스트 API 문서

## 개요
이 문서는 포트폴리오 사이트의 포스트 관련 API 엔드포인트를 설명합니다. 모든 API는 Supabase와 연동되어 있으며, 인증이 필요한 작업에는 로그인이 필요합니다.

## 인증
- 포스트 생성, 수정, 삭제는 인증된 사용자만 가능합니다.
- 인증은 Supabase Auth를 통해 처리됩니다.
- 미들웨어가 자동으로 인증을 확인합니다.

## API 엔드포인트

### 1. 포스트 목록 조회
```
GET /api/posts
```

**설명**: 모든 포스트를 최신순으로 조회합니다.

**인증 필요**: 아니오

**응답 예시**:
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "포스트 제목",
    "content": "포스트 내용...",
    "date": "2024-01-15",
    "tags": ["nextjs", "react"],
    "thumbnail": "https://example.com/image.jpg",
    "description": "포스트 설명",
    "author_id": "user-id",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
]
```

### 2. 개별 포스트 조회
```
GET /api/posts/[id]
```

**설명**: 특정 ID의 포스트를 조회합니다.

**인증 필요**: 아니오

**파라미터**:
- `id`: 포스트 ID (UUID)

**응답 예시**:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "포스트 제목",
  "content": "포스트 내용...",
  "date": "2024-01-15",
  "tags": ["nextjs", "react"],
  "thumbnail": "https://example.com/image.jpg",
  "description": "포스트 설명",
  "author_id": "user-id",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### 3. 포스트 생성
```
POST /api/posts
```

**설명**: 새로운 포스트를 생성합니다.

**인증 필요**: 예

**요청 본문**:
```json
{
  "title": "포스트 제목 (필수)",
  "content": "포스트 내용 (필수)",
  "tags": ["tag1", "tag2"],
  "thumbnail": "https://example.com/image.jpg",
  "description": "포스트 설명"
}
```

**응답**: 생성된 포스트 객체 (201 Created)

### 4. 포스트 수정
```
PUT /api/posts/[id]
```

**설명**: 기존 포스트를 수정합니다. 자신이 작성한 포스트만 수정 가능합니다.

**인증 필요**: 예

**파라미터**:
- `id`: 포스트 ID (UUID)

**요청 본문**:
```json
{
  "title": "수정된 제목",
  "content": "수정된 내용",
  "tags": ["tag1", "tag2"],
  "thumbnail": "https://example.com/new-image.jpg",
  "description": "수정된 설명"
}
```

**응답**: 수정된 포스트 객체

### 5. 포스트 삭제
```
DELETE /api/posts/[id]
```

**설명**: 포스트를 삭제합니다. 자신이 작성한 포스트만 삭제 가능합니다.

**인증 필요**: 예

**파라미터**:
- `id`: 포스트 ID (UUID)

**응답**: 204 No Content

## 에러 응답

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```
인증이 필요한 작업에서 로그인하지 않은 경우

### 403 Forbidden
```json
{
  "error": "Forbidden"
}
```
다른 사용자의 포스트를 수정/삭제하려는 경우

### 404 Not Found
```json
{
  "error": "Post not found"
}
```
존재하지 않는 포스트에 접근하는 경우

### 500 Internal Server Error
```json
{
  "error": "에러 메시지"
}
```
서버 오류가 발생한 경우

## Supabase 설정

1. `supabase_schema.sql` 파일을 실행하여 테이블을 생성합니다.
2. 환경 변수를 설정합니다:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Row Level Security(RLS) 정책이 자동으로 적용됩니다.

## 보안 기능

- **인증**: Supabase Auth를 통한 사용자 인증
- **권한 관리**: 자신의 포스트만 수정/삭제 가능
- **RLS**: 데이터베이스 레벨에서의 보안 정책
- **미들웨어 보호**: API 경로별 메서드 단위 보호