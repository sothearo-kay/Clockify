import { View, Text, StyleSheet } from "react-native";
import { Badge } from "./badge";
import { Button } from "./button";
import { IconSymbol } from "./ui/iconSymbol";

type CheckInSectionProps = {
  morningCheckedIn: boolean;
  afternoonCheckedIn: boolean;
  isMorning: boolean;
  isPastDate: boolean;
  handleCheckIn: () => void;
};

export function CheckInSection({
  morningCheckedIn,
  afternoonCheckedIn,
  isMorning,
  isPastDate,
  handleCheckIn,
}: CheckInSectionProps) {
  if (isPastDate) {
    const pastData = [
      { period: "Morning", time: "09:10 AM" },
      { period: "Afternoon", time: "01:05 PM" },
    ];

    return (
      <View style={styles.grid}>
        {pastData.map(({ period, time }, i) => (
          <View key={i} style={[styles.card, styles.stretch]}>
            <View style={styles.rowBetween}>
              <Text style={styles.timeText}>{period}</Text>
              <Badge variant="default" label="Present" />
            </View>
            <Text style={styles.checkInTime}>{time}</Text>
          </View>
        ))}
      </View>
    );
  }

  const todayData = [
    { period: "Morning", checkedIn: morningCheckedIn },
    { period: "Afternoon", checkedIn: afternoonCheckedIn },
  ];

  return (
    <>
      <View style={styles.grid}>
        {todayData.map(({ period, checkedIn }, i) => (
          <View key={i} style={styles.card}>
            <Text style={[styles.timeText, styles.marginBottom8]}>
              {period}
            </Text>
            {checkedIn ? (
              <Badge variant="default" style={styles.badgePrimary}>
                <View style={styles.badgeContent}>
                  <IconSymbol
                    size={12}
                    name="checkmark.circle.fill"
                    color="#fff"
                    style={styles.badgeIcon}
                  />
                  <Text style={styles.badgePrimaryText}>Checked In</Text>
                </View>
              </Badge>
            ) : (
              <Badge variant="outline" style={styles.badgeOutline}>
                <Text style={styles.badgeOutlineText}>Not Checked In</Text>
              </Badge>
            )}
          </View>
        ))}
      </View>
      <Button
        variant="primary"
        disabled={
          (isMorning && morningCheckedIn) || (!isMorning && afternoonCheckedIn)
        }
        onPress={handleCheckIn}
        style={styles.checkInButton}
      >
        {isMorning
          ? morningCheckedIn
            ? "Checked In for Morning"
            : "Check In for Morning"
          : afternoonCheckedIn
            ? "Checked In for Afternoon"
            : "Check In for Afternoon"}
      </Button>
    </>
  );
}

const sharedBadge = {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 999,
};
const sharedText = {
  fontSize: 12,
  fontWeight: "600" as const,
};
const styles = StyleSheet.create({
  grid: { flexDirection: "row", gap: 12 },
  card: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
  },
  stretch: { alignItems: "stretch" },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: { fontSize: 14, fontWeight: "500", color: "#374151" },
  checkInTime: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  badgePrimary: { ...sharedBadge, backgroundColor: "#3B82F6" },
  badgeOutline: { ...sharedBadge, borderColor: "#D1D5DB", borderWidth: 1 },
  badgePrimaryText: { ...sharedText, color: "#fff" },
  badgeOutlineText: { ...sharedText, color: "#374151" },
  badgeContent: { flexDirection: "row", alignItems: "center" },
  badgeIcon: { marginRight: 4 },
  checkInButton: { marginTop: 16 },
  marginBottom8: { marginBottom: 8 },
});
