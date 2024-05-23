import '../styles/globals.css'
import Script from 'next/script'
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((response) => response.json()),
        }}
      >
        {/* Move the script tags inside the Head component */}
        <Script src="https://code.jquery.com/jquery-3.5.1.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" />
        <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" />

        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}