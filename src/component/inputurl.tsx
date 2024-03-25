import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  feedUrl: string;
  setFeedUrl: React.Dispatch<React.SetStateAction<string>>;
}

const InputUrl: React.FC<Props> = (props) => {
  const { feedUrl, setFeedUrl } = props;

  return (
    <>
      <TextInput
        style={styles.Input}
        onChangeText={setFeedUrl}
        value={feedUrl}
      />
    </>
  );
};

export default InputUrl;

const styles = StyleSheet.create({
  Input: {
    marginTop: 50,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#000000",
  },
});
