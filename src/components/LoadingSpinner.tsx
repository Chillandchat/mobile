import React from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

/**
 * This is the 
 * @returns
 */

const LoadingSpinner: React.FC<any> = () => {
  const [animationFrame, setAnimationFrame]: any = React.useState(0);
  let interval: any;

  React.useEffect((): (() => void) => {
    interval = setInterval((): void => {
      setAnimationFrame((frame: number): number =>
        frame === 360 ? 0 : frame + 5
      );
    }, 10);

    return (): void => {
      clearInterval(interval);
      setAnimationFrame(0);
    };
  }, []);

  return (
    <View
      style={{ transform: [{ rotate: `${animationFrame.toString()}deg` }] }}
    >
      <AntDesign name="loading2" size={50} color="#00ad98" />
    </View>
  );
};

export default LoadingSpinner;
