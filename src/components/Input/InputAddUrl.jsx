import { useState } from "react";
import { useTranslation } from "../../shared/i18n/translations";

const InputAddUrl = ({ elements, setElement, setShowAddSection }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation("blockPages");

  function normalizeDomain(input) {
    // Strip protocol (http://, https://, etc.)
    let domain = input.trim().replace(/^https?:\/\//, "");
    // Strip www.
    domain = domain.replace(/^www\./, "");
    // Strip path (everything after the first /)
    domain = domain.split("/")[0];
    // Strip port number
    domain = domain.split(":")[0];
    return domain.toLowerCase();
  }

  function isValidDomain(domain) {
    // Must not be empty
    if (!domain) return false;
    // Must contain at least one dot (e.g., youtube.com)
    if (!domain.includes(".")) return false;
    // Must not contain spaces
    if (domain.includes(" ")) return false;
    // Must be at least 4 characters (e.g., a.co)
    if (domain.length < 4) return false;
    // Must only contain valid domain characters
    if (!/^[a-z0-9.-]+$/.test(domain)) return false;
    return true;
  }

  function addElement(input) {
    setError("");

    const normalized = normalizeDomain(input);

    // Validate
    if (!isValidDomain(normalized)) {
      setError(t("invalidUrl"));
      return;
    }

    // Check for duplicates (compare normalized values)
    const existe = elements.some(
      (el) => normalizeDomain(el.url) === normalized,
    );
    if (existe) {
      setError(t("urlExists"));
      return;
    }

    // Add the normalized domain
    setElement((prv) => [
      ...prv,
      {
        url: normalized,
        sowndBlocked: false,
        urlBlocked: false,
      },
    ]);
    setValue("");
    setShowAddSection(false);
  }

  return (
    <div className="text-light dark:text-dark">
      <div
        className="fixed inset-0 bg-light dark:bg-dark opacity-30 backdrop-blur-sm"
        onClick={() => setShowAddSection(false)}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lightElements dark:bg-darkElements rounded-lg p-4 w-[90%] flex flex-col items-center justify-center">
        <span className="text-light dark:text-dark text-sm mb-1 block">
          {t("add")}
        </span>
        <input
          value={value}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addElement(value);
            }
          }}
          placeholder={t("Atitle")}
          className={`m-2 p-3 w-full rounded-lg bg-lightList dark:bg-darkList ${value ? "text-light dark:text-dark" : "placeholder:text-lightPlaceHolder dark:placeholder:text-darkPlaceHolder"} focus:outline-none`}
        />
        {error && (
          <span className="text-red-500 text-xs mt-1 text-center">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputAddUrl;
