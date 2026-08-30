'use client';

import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Readonly<Props>) {
  useEffect(() => {
    console.error('Application rendering failed.', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main role="alert" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>Please try again. If the problem continues, return later.</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
