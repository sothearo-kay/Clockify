import { useCallback, useState } from "react";
import { View, LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";
import { AnimatePresence, MotiView, useDynamicAnimation } from "moti";

interface ResizablePanelProps extends React.PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  duration?: number;
  contentKey: string | number;
}

export function ResizablePanel({
  children,
  style,
  duration = 100,
  contentKey,
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
      style={[style, { overflow: "hidden", position: "relative" }]}
    >
      <AnimatePresence>
        <MotiView
          key={contentKey}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "timing",
            duration: duration / 2,
            delay: duration / 2,
          }}
          exitTransition={{ type: "timing", duration: duration / 2 }}
        >
          <View
            onLayout={onLayout}
            style={{
              position: measured ? "absolute" : "relative",
              insetInline: 0,
            }}
          >
            {children}
          </View>
        </MotiView>
      </AnimatePresence>
    </MotiView>
  );
}
