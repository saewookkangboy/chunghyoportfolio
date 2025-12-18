<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/120JJ5pNomVSz8Nt1jYmoBrU3PlKXSYqZ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. **Vercel에 프로젝트 연결**
   - [Vercel](https://vercel.com)에 로그인
   - "Add New Project" 클릭
   - GitHub/GitLab/Bitbucket에서 저장소 선택

2. **환경 변수 설정**
   - Vercel 프로젝트 설정에서 "Environment Variables" 섹션으로 이동
   - 다음 환경 변수를 추가:
     - `GEMINI_API_KEY`: Gemini API 키 값

3. **빌드 설정 확인**
   - Framework Preset: Vite (자동 감지됨)
   - Build Command: `npm run build` (자동 설정됨)
   - Output Directory: `dist` (자동 설정됨)

4. **배포**
   - "Deploy" 버튼 클릭
   - 배포가 완료되면 자동으로 URL이 생성됩니다

**참고:** `vercel.json` 파일이 프로젝트에 포함되어 있어 SPA 라우팅이 올바르게 작동합니다.
