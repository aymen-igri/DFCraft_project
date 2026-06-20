import Header from "../Header/Header.jsx";
import Body from "../Body/Body.jsx";
import { useState } from "react";
import { TimerProvider } from "../../../shared/providers/TimerProvider.jsx";
import { UrlProvider } from "../../../shared/providers/UrlProvider.jsx";

export default function MainLayout() {
  const [choosenPage, setChoosenPage] = useState("");

  return (
    <>
      <TimerProvider>
        <Header setChoosenPage={setChoosenPage} />
        <UrlProvider>
          <Body choosenPage={choosenPage} />
        </UrlProvider>
      </TimerProvider>
    </>
  );
}
