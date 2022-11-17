import { ConfigContext, ExpoConfig } from "@expo/config";
import { ConfigPlugin } from "@expo/config-plugins";
import { withBuildProperties } from "expo-build-properties";

const baseConfig: ExpoConfig = {
  "name": "multiple-withBuildProperties",
  "slug": "multiple-withBuildProperties",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "bundleIdentifier": "com.drangies.multiple.withbuildproperties",
    "supportsTablet": true
  },
  "android": {
    "package": "com.drangies.multiple.withbuildproperties",
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#FFFFFF"
    }
  },
  "web": {
    "favicon": "./assets/favicon.png"
  }
};

const extraProguardRules = `
# custom rule to keep our code
-keep class com.mycompany.** { *; }
`;

const withMyProguardRules: ConfigPlugin = (config) => {
  config = withBuildProperties(config, {
    android: {
      enableProguardInReleaseBuilds: true,
      extraProguardRules,
    },
  });
  return config;
};

export default (ctx: ConfigContext): ExpoConfig => {
  let config = withBuildProperties(baseConfig, {
    android: {
      kotlinVersion: "1.6.10",
    },
  });
  config = withMyProguardRules(baseConfig);
  return config;
}