# TanStack Query anecdotes — exercises 6.16–6.22

Based on the official course starter and unchanged supplied acceptance tests.
TanStack Query fetches data and handles creation/voting mutations through a custom hook. The cache updates on success. Context stores notifications with a resettable five-second timer, exposed through useNotify. The backend rejects content shorter than five characters; mutation onError shows the server error while preserving the form.

Run npm install, npm run server and npm run dev in separate terminals here. From ../query-anecdotes-tests run npm install, npx playwright install chromium and npm test. Tests use db-test.json, not the development db.json.
