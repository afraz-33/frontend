"use client"; // Ensures the component runs client-side
import { useRouter } from "next/router";

const LanguageSwitcher = () => {
  const { locale, asPath } = useRouter(); // Get the current locale and path
  const availableLocales = ["en", "nl"]; // Available languages (English and Dutch)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    // Navigate to the same path but with the new locale
    window.location.href = `/${selectedLocale}${asPath}`;
  };

  return (
    <select
      className="bg-white border border-black p-2"
      value={locale}
      onChange={handleChange}
    >
      {availableLocales.map((localeCode) => (
        <option key={localeCode} value={localeCode}>
          {localeCode === "en" ? "English" : "Nederlands"}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
