# Express Image Server

Express Image Server는 이미지 업로드 및 캐싱을 위한 간단한 서버 애플리케이션입니다. 이 프로젝트는 Express, MongoDB, TypeScript, Multer 및 Memory-Cache를 사용하여 구현되었습니다. Bun을 사용하여 빌드 및 컴파일을 수행합니다.

### 필수 조건

이 프로젝트를 실행하기 위해서는 다음이 필요합니다:

- Node.js (>= 14.x)
- npm, Yarn, Bun, Pnpm
- MongoDB

### 설치

다음 명령어를 사용하여 프로젝트를 클론하고 의존성을 설치하세요:

```sh
git clone https://github.com/waylake/express-image-server.git
cd express-image-server
bun install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
PORT=3000
NODE_ENV=development
API_VERSION=v1
MONGO_URI=mongodb://localhost:27017/imageDB
```

### 실행

개발 서버를 실행하려면 다음 명령어를 사용하세요:

```sh
bun run
```

또는 Bun을 사용하여 빌드 및 실행하려면 다음 명령어를 사용하세요:

```sh
bun run build

bun run start
# or
node dist/app.js
```

## API 사용법

### 이미지 업로드

이미지를 업로드하려면 `POST /api/v1/images/upload` 엔드포인트를 사용하세요.

- **URL** : `/api/v1/images/upload`

- **Method** : `POST`

- **Headers** : `Content-Type: multipart/form-data`

- **Body** : FormData (key: `image`, value: 이미지 파일)

#### 예시

```sh
curl -X POST http://localhost:3000/api/v1/images/upload -F "image=@/path/to/your/image.jpg"
```

### 이미지 조회

특정 이미지를 조회하려면 `GET /api/v1/images/:id` 엔드포인트를 사용하세요.

#### 코드 설명

`memory-cache` 라이브러리를 사용하여 응답을 메모리에 저장하고, 동일한 요청이 들어왔을 때 캐시된 응답을 반환합니다.

1. **캐싱 미들웨어 함수** :

- `duration`을 인자로 받아 캐싱 기간(초)을 설정합니다.

2. **미들웨어 로직** :

- 요청의 `originalUrl`을 키로 사용하여 캐시된 데이터를 확인합니다.

- 캐시된 데이터가 있으면(`HIT`), 응답 헤더에 캐시 히트 정보를 추가하고, 캐시된 데이터를 응답으로 보냅니다.

- 캐시된 데이터가 없으면(`MISS`), 원래 `send` 메서드를 오버라이드하여 데이터를 캐시에 저장하고, 응답 헤더에 캐시 미스 정보를 추가합니다.

3. **헤더 설정** :

- `X-Cache`: 캐시 히트 여부(`HIT` 또는 `MISS`).

- `Cache-Control`: 브라우저 캐싱을 제어하는 지시문(`public, max-age=duration`).

- `X-Cache-Duration`: 캐시 유효 기간을 초 단위로 표시.

- **URL** : `/api/v1/images/:id`

- **Method** : `GET`

- **Headers** : `None`

#### 예시

```sh
curl http://localhost:3000/api/v1/images/60d21b4667d0d8992e610c85
```

### 이미지 삭제

특정 이미지를 삭제하려면 `DELETE /api/v1/images/:id` 엔드포인트를 사용하세요.

- **URL** : `/api/v1/images/:id`

- **Method** : `DELETE`

- **Headers** : `None`

#### 예시

```sh
curl -X DELETE http://localhost:3000/api/v1/images/60d21b4667d0d8992e610c85
```

### 모든 이미지 조회

모든 이미지를 조회하려면 `GET /api/v1/images` 엔드포인트를 사용하세요.

- **URL** : `/api/v1/images`

- **Method** : `GET`

- **Headers** : `None`

#### 예시

```sh
curl http://localhost:3000/api/v1/images
```

## 구조

```text
.
├── README.md
├── dist
│   └── app.mjs
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   │   ├── databaseConfig.ts
│   │   ├── envConfig.ts
│   │   ├── index.ts
│   │   └── loggerConfig.ts
│   ├── controllers
│   │   ├── imageController.ts
│   │   └── index.ts
│   ├── interfaces
│   │   ├── imageInterface.ts
│   │   └── index.ts
│   ├── middlewares
│   │   └── cacheMiddleware.ts
│   ├── models
│   │   ├── imageModel.ts
│   │   └── index.ts
│   ├── routes
│   │   └── imageRoutes.ts
│   └── services
│       ├── imageService.ts
│       └── index.ts
├── test_upload.py
└── tsconfig.json
```

## 기술 스택

- **Express** : 웹 프레임워크

- **MongoDB** : 데이터베이스

- **TypeScript** : 프로그래밍 언어

- **Multer** : 파일 업로드 미들웨어

- **Memory-Cache** : 캐싱 라이브러리

- **Bun** : 빌드 도구

- **Winston** : 로깅 라이브러리

## 기여

기여를 환영합니다! 버그를 보고하거나 기능을 제안하려면 이슈를 생성하세요. 풀 리퀘스트도 환영합니다.
