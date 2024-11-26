import { IntlProvider } from "next-intl";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router; // Use Next.js router to determine locale dynamically

  return (
    <IntlProvider locale={locale || "en"} messages={pageProps.messages}>
      <Component {...pageProps} />
    </IntlProvider>
  );
}
