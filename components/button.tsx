import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends React.PropsWithChildren<TouchableOpacityProps> {
  variant?: "primary" | "secondary" | "outline";
}

const buttonVariantStyles = {
  primary: {
    container: { backgroundColor: "#3B82F6" },
    text: { color: "#ffffff" },
  },
  secondary: {
    container: { backgroundColor: "#F3F4F6" },
    text: { color: "#374151" },
  },
  outline: {
    container: {
      backgroundColor: "transparent",
      borderColor: "#D1D5DB",
      borderWidth: 1,
    },
    text: { color: "#374151" },
  },
};

// @ts-ignore: suppress value-used-as-type error for TouchableOpacity
export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant = "primary", children, style, ...props }, ref) => {
    const stylesForVariant = buttonVariantStyles[variant];

    return (
      <TouchableOpacity
        ref={ref}
        style={[
          baseStyles.container,
          stylesForVariant.container,
          props.disabled && baseStyles.disabled,
          style,
        ]}
        activeOpacity={0.8}
        {...props}
      >
        <Text style={[baseStyles.text, stylesForVariant.text]}>{children}</Text>
      </TouchableOpacity>
    );
  },
);

Button.displayName = "Button";

const baseStyles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
});
