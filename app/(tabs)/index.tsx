import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Avatar } from "@/components/avatar";
import { WeeklyCalendar } from "@/components/weeklyCalendar";
import { Card } from "@/components/card";
import { ResizablePanel } from "@/components/resizablePanel";
import { CheckInSection } from "@/components/checkInSection";
import { CheckInCardHeader } from "@/components/checkInCardHeader";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { isPast, isToday } from "date-fns";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [morningCheckedIn, setMorningCheckedIn] = useState(false);
  const [afternoonCheckedIn, setAfternoonCheckedIn] = useState(false);
  const currentTime = useCurrentTime();

  const selectedIsToday = isToday(selectedDate);
  const isMorning = currentTime.getHours() < 12;
  const isPastDate = isPast(selectedDate) && !isToday(selectedDate);

  const handleCheckIn = () => {
    if (isMorning && !morningCheckedIn) {
      setMorningCheckedIn(true);
    } else if (!isMorning && !afternoonCheckedIn) {
      setAfternoonCheckedIn(true);
    }
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clockify</Text>
        <Link href="/profile" asChild>
          <Avatar />
        </Link>
      </View>

      <WeeklyCalendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />

      <Card style={{ marginBlock: 24 }}>
        <ResizablePanel duration={400} contentKey={`check-in-${isPastDate}`}>
          <CheckInCardHeader
            date={selectedDate}
            currentTime={currentTime}
            isPastDate={isPastDate}
          />
          <CheckInSection
            morningCheckedIn={morningCheckedIn}
            afternoonCheckedIn={afternoonCheckedIn}
            isMorning={isMorning}
            isPastDate={isPastDate}
            handleCheckIn={handleCheckIn}
          />
        </ResizablePanel>
      </Card>
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
