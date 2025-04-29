import { useCallback, useState } from "react";
import { View, LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";
import { MotiView, useDynamicAnimation } from "moti";

interface ResizablePanelProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  duration?: number;
}

export function ResizablePanel({
  children,
  style,
  duration = 100,
}: ResizablePanelProps) {
  const animation = useDynamicAnimation(() => ({
    height: 0,
  }));

  const [measured, setMeasured] = useState(false);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const newHeight = event.nativeEvent.layout.height;
      if (newHeight > 0) {
        animation.animateTo({ height: newHeight });
        setMeasured(true);
      } else {
        console.warn("Measurement failed. Skipping animation.");
      }
    },
    [animation],
  );

  return (
    <MotiView
      state={measured ? animation : undefined}
      transition={{ type: "timing", duration }}
      style={[style, { overflow: "hidden" }]}
    >
      <MotiView
        key={JSON.stringify(children, ignoreCircularReferences())}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration, delay: duration / 4 }}
      >
        <View onLayout={onLayout}>{children}</View>
      </MotiView>
    </MotiView>
  );
}

/*
   Replacer function to JSON.stringify that ignores
   circular references and internal React properties.
 
   https://github.com/facebook/react/issues/8669#issuecomment-531515508
 */
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
