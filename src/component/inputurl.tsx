import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import Dialog from "react-native-dialog";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

interface Props {
  feedUrl: string;
  setFeedUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsGetFeed: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputUrl: React.FC<Props> = (props) => {
  const { feedUrl, setFeedUrl, setIsGetFeed } = props;
  const [getUrl, setGetUrl] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [localUrl, setLocalUrl] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const colorMode = useColorScheme();

  useEffect(() => {
    saveData(feedUrl);
  }, [feedUrl]);

  setTimeout(() => getData(), 1000);

  const saveData = async (url: string) => {
    if (url) {
      await AsyncStorage.setItem(url, url);
      getData();
    }
  };
  const getData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const formatkeys = keys.map((key) => ({ label: key, value: key }));
    setLocalUrl(formatkeys);
  };

  const handleOK = () => {
    setFeedUrl(getUrl);
    setGetUrl("");
    setVisible(false);
  };

  const handleCansel = () => {
    setVisible(false);
  };
  const getFeed = () => {
    setIsGetFeed(true);
  };

  return (
    <>
      <View style={styles.addUrl}>
        <View style={styles.flex}>
          <Pressable style={styles.Button} onPress={() => setVisible(true)}>
            <Text style={styles.text}>Add URL</Text>
          </Pressable>
          <Pressable onPress={getFeed} style={styles.Button}>
            <Text style={styles.text}>GetFeed</Text>
          </Pressable>
          <Pressable style={styles.Button} onPress={() => AsyncStorage.clear()}>
            <Text style={styles.text}>Clrar URL</Text>
          </Pressable>
        </View>
        <RNPickerSelect
          onValueChange={(url) => setFeedUrl(url)}
          items={localUrl}
        />
      </View>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title style={{ color: colorMode ? "#000000" : "#ffffff" }}>
            Add Feed URL
          </Dialog.Title>
          <Dialog.Input
            style={{ color: colorMode ? "#000000" : "#ffffff" }}
            placeholder="input URL"
            value={getUrl}
            onChangeText={(url) => setGetUrl(url)}
          />
          <Dialog.Button label="Cancel" onPress={handleCansel} />
          <Dialog.Button label="OK" onPress={handleOK} />
        </Dialog.Container>
      </View>
    </>
  );
};

export default InputUrl;

const styles = StyleSheet.create({
  addUrl: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  flex: {
    flexDirection: "row",
  },
  Button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 1,
    padding: 25,
    margin: -25,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  text: {
    color: "#000000",
    fontSize: 15,
  },
});
