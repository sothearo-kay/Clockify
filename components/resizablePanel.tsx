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
        key={String(Date.now())}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <View onLayout={onLayout}>{children}</View>
      </MotiView>
    </MotiView>
  );
}
