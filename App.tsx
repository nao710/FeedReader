import React, { useState } from "react";
import InputUrl from "./src/component/inputurl";
import GetFeed from "./src/component/getfeed";

export default function App() {
  const [feedUrl, setFeedUrl] = useState<string>("");
  const [isGetFeed, setIsGetFeed] = useState<boolean>(false);
  return (
    <>
      <InputUrl
        feedUrl={feedUrl}
        setFeedUrl={setFeedUrl}
        setIsGetFeed={setIsGetFeed}
      />
      <GetFeed feedUrl={feedUrl} isGetFeed={isGetFeed} />
    </>
  );
}
