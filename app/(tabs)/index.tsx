import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Avatar } from "@/components/avatar";
import { WeeklyCalendar } from "@/components/weeklyCalendar";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clockify</Text>
        <Avatar />
      </View>

      <WeeklyCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 12,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
});
