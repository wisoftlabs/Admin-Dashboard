# Wisoft 관리자 대시보드

## 시작하기

### 전제 조건

[Bun](https://bun.sh/)이 설치되어 있는지 확인하세요.

Bun 1.3.3을 기준으로 개발되었습니다. (.tool-versions 참고)

### 설치

1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/wisoftlabs/Admin-Dashboard.git
   ```
2. 의존성을 설치합니다.
   ```bash
   bun install
   ```

### 개발

개발 서버와 테스트용 JSON 서버를 시작하려면

```bash
bun run dev
```

이 명령은 React 개발 서버와 API 모킹을 위한 `json-server`를 동시에 시작합니다.

### 프로덕션 빌드

프로젝트를 프로덕션용으로 빌드하려면

```bash
bun run build
```

빌드 후, 아래 명령어를 통해 로컬에서 프로덕션 빌드를 미리 볼 수 있습니다.

```bash
bun run preview
```