import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import InputUrl from "./src/component/inputurl";
import GetFeed from "./src/component/getfeed";

export default function App() {
  const [feedUrl, setFeedUrl] = useState<string>("");
  return (
    <>
      <View style={styles.container}>
        <InputUrl feedUrl={feedUrl} setFeedUrl={setFeedUrl} />
        <GetFeed feedUrl={feedUrl} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
