import * as Expo from "expo";
import React from "react";
import { Platform } from "react-native";
import { View, Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import envVars from "./env";

import { colors } from "./styles/base";

import Home from "./screens/home";
import LobbyList from "./screens/lobbylist";
import Lobby from "./screens/lobby";
import SideBar from "./screens/sidebar";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    LobbyList: { screen: LobbyList }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: colors.primaryColor
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    Lobby: { screen: Lobby }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const App = () => {
  const { adMobBannerIdAndroid, adMobBannerIdIOS } = envVars;

  return (
    <Root>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <AppNavigator />
      </View>
      <Expo.AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={
          Platform.OS === "ios" ? adMobBannerIdIOS : adMobBannerIdAndroid
        }
      />
    </Root>
  );
};

export default App;
