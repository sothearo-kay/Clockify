import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends React.PropsWithChildren<TouchableOpacityProps> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({
  variant = "primary",
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        props.disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#3B82F6",
  },
  secondary: {
    backgroundColor: "#F3F4F6",
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#374151",
  },
});
