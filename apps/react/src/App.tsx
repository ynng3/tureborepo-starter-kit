import { API_CONFIG, APP_NAME, SHARED_MESSAGE } from '@repo/constants';

export default function App() {
  return (
    <main className="shell">
      <section className="card">
        <p className="eyebrow">React App</p>
        <h1>{APP_NAME}</h1>
        <p>{SHARED_MESSAGE.welcome}</p>
        <p>{SHARED_MESSAGE.database}</p>
        <p>API path: {API_CONFIG.baseUrl}</p>
      </section>
    </main>
  );
}
