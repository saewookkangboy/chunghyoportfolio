# 문제 해결 가이드

## 브라우저 콘솔 에러 해결 방법

### 1. Tailwind CDN 경고 해결

**문제:** `cdn.tailwindcss.com should not be used in production` 경고

**원인:** 브라우저가 이전에 캐시된 HTML을 사용하고 있습니다.

**해결 방법:**

1. **하드 리프레시 (권장)**
   - **Mac**: `Cmd + Shift + R`
   - **Windows/Linux**: `Ctrl + Shift + R`
   - 또는 `Cmd/Ctrl + F5`

2. **브라우저 캐시 완전 삭제**
   - Chrome/Edge: 개발자 도구 (F12) → Network 탭 → "Disable cache" 체크
   - 또는 브라우저 설정에서 캐시 삭제

3. **시크릿/프라이빗 모드에서 테스트**
   - 새로운 시크릿 창에서 `http://localhost:3000` 접속

4. **개발 서버 재시작**
   ```bash
   # 기존 서버 종료
   pkill -f vite
   
   # 서버 재시작
   npm run dev
   ```

### 2. Zustand Deprecation 경고

**문제:** `[DEPRECATED] Default export is deprecated. Instead use 'import { create } from 'zustand'`

**원인:** `framer-motion` 라이브러리의 내부 의존성에서 발생하는 경고입니다.

**해결 방법:**
- 이 경고는 **기능에 영향을 주지 않습니다**
- `framer-motion`이 업데이트되면 자동으로 해결됩니다
- 빌드 설정에서 경고를 억제하도록 설정했습니다

**참고:** 이 경고는 개발 환경에서만 표시되며, 프로덕션 빌드에는 영향을 주지 않습니다.

## 확인 사항

✅ Tailwind CSS는 PostCSS 플러그인으로 설치되어 있습니다
✅ `index.html`에는 CDN 참조가 없습니다
✅ CSS 파일은 `index.css`에서 import됩니다
✅ 빌드 산출물에 CSS가 포함되어 있습니다

## 추가 확인

개발 서버가 올바른 파일을 서빙하는지 확인:

```bash
# 개발 서버 재시작
npm run dev

# 빌드 테스트
npm run build
npm run preview
```

