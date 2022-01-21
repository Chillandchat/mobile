// Importing packages
import reducers from "./redux/reducers/index";
import * as reactRedux from "react-redux";
import Router from "./Router";
import * as redux from "redux";
import React from "react";
import { useFonts } from "expo-font";

// App
const App: React.FC = () => {
  // Use effect
  React.useEffect((): void => {
    // Get font function
    const getFonts = async (): Promise<void> => {
      // Fonts
      const [loaded, error]: [boolean, Error | null] = await useFonts({
        poppinsBlack: require("./assets/fonts/Poppins-Black.ttf"),
        poppinsBlackItalic: require("./assets/fonts/Poppins-BlackItalic.ttf"),
        poppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
        poppinsBoldItalic: require("./assets/fonts/Poppins-BoldItalic.ttf"),
        poppinsExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
        poppinsExtraBoldItalic: require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
        poppinsExtraLight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
        poppinsExtraLightItalic: require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
        poppinsItalic: require("./assets/fonts/Poppins-Italic.ttf"),
        poppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
        poppinsLightItalic: require("./assets/fonts/Poppins-LightItalic.ttf"),
      });

      // Check font errors
      if (!loaded && error !== null) console.error("error");
    };

    // Get fonts
    getFonts();
  }, []);

  // Redux store
  const store: any = redux.createStore(reducers);

  //Render app
  return (
    <reactRedux.Provider store={store}>
      {/* Router */}
      <Router />
    </reactRedux.Provider>
  );
};

//Export app
export default App;
