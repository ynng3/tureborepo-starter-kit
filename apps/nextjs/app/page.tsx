import { API_CONFIG, APP_NAME, SHARED_MESSAGE } from '@repo/constants';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{APP_NAME}</h1>
      <p>{SHARED_MESSAGE.welcome}</p>
      <p>{SHARED_MESSAGE.database}</p>
      <p>API base: {API_CONFIG.baseUrl}</p>
    </main>
  );
}
