import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  BannerAd,
  BannerAdSize,
  GAMBannerAd,
  TestIds,
} from "react-native-google-mobile-ads";

const AdComp = () => {
  return (
    <BannerAd
      unitId={TestIds.BANNER}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};

export default AdComp;

const styles = StyleSheet.create({});
