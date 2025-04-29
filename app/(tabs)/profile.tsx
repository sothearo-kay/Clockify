import { SafeAreaView, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Colors } from "@/constants/colors";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing" }}
      >
        <Text>Profile</Text>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
