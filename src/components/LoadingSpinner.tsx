import React from "react";
import { AppState, AppStateStatus, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

/**
 * This is the loading spinner component, as the name suggests, is a spinner of a loading icon!
 * This component will render a loading spinner on the user's screen to show the app is loading.
 *
 * @note This component has no props to be passed, this component will work find without.
 */

const LoadingSpinner: React.FC = () => {
  const [animationFrame, setAnimationFrame]: any = React.useState(0);
  const [stopped, setStopped]: any = React.useState(false);

  let interval: NodeJS.Timer;

  React.useEffect((): (() => void) => {
    interval = setInterval((): void => {
      setAnimationFrame((frame: number): number =>
        frame === 360 ? 0 : frame + 5
      );
    }, 10);

    AppState.addEventListener("change", (newAppState: AppStateStatus): void => {
      setStopped(newAppState === "background");
    });

    return (): void => {
      clearInterval(interval);
      setAnimationFrame(0);
    };
  }, []);

  return (
    <View
      style={{ transform: [{ rotate: `${animationFrame.toString()}deg` }] }}
    >
      {!stopped ? (
        <AntDesign name="loading2" size={50} color="#00ad98" />
      ) : null}
    </View>
  );
};

export default LoadingSpinner;
