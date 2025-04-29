import { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Avatar } from "@/components/avatar";
import { WeeklyCalendar } from "@/components/weeklyCalendar";
import { isToday } from "date-fns";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const selectedIsToday = isToday(selectedDate);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clockify</Text>
        <Avatar />
      </View>

      <WeeklyCalendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
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
    fontSize: 28,
    fontWeight: 700,
  },
});
