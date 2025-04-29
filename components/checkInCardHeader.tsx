import { View, Text, StyleSheet } from "react-native";
import { IconSymbol } from "./ui/iconSymbol";
import { format } from "date-fns";

export function CheckInCardHeader({
  date,
  currentTime,
  isPastDate,
}: {
  date: Date;
  currentTime: Date;
  isPastDate: boolean;
}) {
  const formattedDate = format(date, "EEEE, MMMM dd, yyyy");
  const formattedTime = format(currentTime, "hh:mm a");

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <IconSymbol size={24} name="calendar" color="#6B7280" />
        <Text style={styles.text}>{formattedDate}</Text>
      </View>

      {!isPastDate && (
        <View style={styles.row}>
          <IconSymbol size={24} name="clock" color="#6B7280" />
          <Text style={styles.text}>{formattedTime}</Text>
        </View>
      )}

      <Text style={styles.title}>
        {isPastDate ? "Attendance Record" : "Today's Attendance"}
      </Text>

      <Text style={styles.description}>
        {isPastDate
          ? "Check-in details for selected date"
          : "Check in for morning arrival and after lunch break"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#6B7280", // text-gray-500
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937", // text-gray-800
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
});
