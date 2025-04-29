import { View, StyleSheet, ViewProps } from "react-native";

interface CardProps extends React.PropsWithChildren<ViewProps> {}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginInline: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 10,
    boxShadow: `rgba(0, 0, 0, 0.05) 0px 4px 8px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`,
  },
});
