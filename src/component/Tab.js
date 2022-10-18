import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../Colors/COLORS";
import TimelinePost from "./TimelinePost";
import Group from "./Group";

import AdComp from "./AdComp";

const tabName = [
  {
    id: 1,
    title: "TIMELINE",
  },
  {
    id: 2,
    title: "GROUPS",
  },
];

const Tab = ({ allPosts, mygroups, invitedGroups, selectedGroupId }) => {
  const [tabTitle, setTabTitle] = useState("TIMELINE");

  // console.log("allposts", allPosts);
  const selectTab = (item) => {
    setTabTitle(item.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabName.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={[
              styles.itemStyle,
              item.id == 1 && styles.borderRightStyle,
              item.title == tabTitle && styles.activeStyle,
            ]}
            onPress={() => selectTab(item)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentWrapper}>
          {tabTitle == "TIMELINE" ? (
            <>
              <AdComp />
              {allPosts?.length > 0 ? (
                <>
                  {allPosts.map((post) => (
                    <TimelinePost
                      key={post.id}
                      postData={post}
                      id={selectedGroupId}
                    />
                  ))}
                  <AdComp />
                </>
              ) : (
                <>
                  <AdComp />
                  <EmptyTimeline
                    title="Welcome to your Timeline"
                    subText="No Post Till now."
                  />
                  <AdComp />
                </>
              )}
            </>
          ) : (
            <>
              <AdComp />
              {mygroups?.length > 0 ? (
                <View style={{ paddingHorizontal: 15, marginTop: 7 }}>
                  {mygroups.map((group) => (
                    <Group key={group.id} groupData={group} />
                  ))}
                </View>
              ) : (
                <EmptyTimeline
                  title="Welcome to your Groups"
                  subText="No Groups Till now."
                />
              )}

              <>
                <AdComp />
                {invitedGroups?.length > 0 ? (
                  <View style={{ paddingHorizontal: 15 }}>
                    <Text style={styles.invitedTExt}>INVITED GROUPS</Text>
                    {invitedGroups.map((group) => (
                      <Group key={group.id} groupData={group} />
                    ))}
                  </View>
                ) : null}
              </>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Tab;

const EmptyTimeline = ({ title, subText }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{title}</Text>
    <Text style={styles.emptyText}>{subText}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  itemStyle: {
    width: "50%",
    height: 55,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  borderRightStyle: {
    borderRightColor: "#bbb",
    borderRightWidth: 1,
  },
  activeStyle: {
    borderBottomColor: COLORS.yellow,
    borderBottomWidth: 3,
  },
  contentWrapper: {
    // paddingVertical: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  invitedTExt: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    letterSpacing: 1,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingBottom: 5,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  emptyText: { fontFamily: "Poppins-Regular", fontSize: 17 },
});
