import { SafeAreaView, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing" }}
      >
        <Text>Hello, world!</Text>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
});
