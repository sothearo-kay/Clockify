import { Text, View, StyleSheet, ViewProps } from "react-native";

interface BadgeProps extends React.PropsWithChildren<ViewProps> {
  variant?: "default" | "outline";
  label?: string;
}

export function Badge({
  variant = "default",
  label,
  style,
  children,
  ...props
}: BadgeProps) {
  const hasCustomContent = !!children;

  return (
    <View
      style={[
        styles.base,
        variant === "default" ? styles.default : styles.outline,
        style,
      ]}
      {...props}
    >
      {hasCustomContent ? (
        children
      ) : (
        <Text
          style={[
            styles.text,
            variant === "default" ? styles.defaultText : styles.outlineText,
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  default: {
    backgroundColor: "#3B82F6",
    borderWidth: 1,
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
  defaultText: {
    color: "#ffffff",
  },
  outlineText: {
    color: "#374151",
  },
});
