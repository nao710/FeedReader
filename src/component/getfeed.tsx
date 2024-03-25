import React, { useState } from "react";
import * as rssParser from "react-native-rss-parser";
import {
  Button,
  FlatList,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  feedUrl: string;
}

const GetFeed: React.FC<Props> = (props) => {
  const { feedUrl } = props;
  const [feedItems, setFeedItems] = useState<
    Array<{
      title: string;
      link: string;
      image: string | undefined;
      authors: string | undefined;
    }>
  >([]);

  const fetchFeed = () => {
    fetch(feedUrl)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((item) =>
        item.items.map((item) => ({
          title: item.title,
          link: item.links[0].url,
          image: item.enclosures[0]?.url,
          authors: item.authors[0]?.name,
        })),
      )
      .then((rss) => setFeedItems(rss))
      .catch(() =>
        Alert.alert("URL Error", "URL is incorrect or does not exist", [
          { text: "OK" },
        ]),
      );
  };
  return (
    <>
      <Button onPress={fetchFeed} title="get" />
      <FlatList
        data={feedItems}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <Pressable onPress={() => Linking.openURL(item.link)}>
              {item.image != undefined && (
                <Image
                  source={{ uri: item.image }}
                  resizeMode="contain"
                  style={{
                    width: wp("90%"),
                    height: hp("30%"),
                  }}
                />
              )}
              <Text style={item.authors ? styles.title : styles.noImage}>
                {item.title}
                {"\n"}
                {item.authors}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </>
  );
};
export default GetFeed;

const styles = StyleSheet.create({
  content: {
    width: wp("90%"),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: wp("90%"),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  noImage: {
    width: wp("90%"),
    marginTop: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
