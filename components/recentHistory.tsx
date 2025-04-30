import { Link } from "expo-router";
import { View, Text } from "react-native";
import { IconSymbol } from "./ui/iconSymbol";
import { Badge } from "./badge";
import { Button } from "./button";
import { AttendanceStatus } from "@/constants/attendance";
import { format } from "date-fns";

export interface AttendanceRecord {
  date: string;
  morning: { status: AttendanceStatus };
  afternoon: { status: AttendanceStatus };
}

interface RecentHistoryProps {
  history?: AttendanceRecord[];
  limit?: number;
}

const mockAttendanceHistory: AttendanceRecord[] = [
  {
    date: "2025-04-29",
    morning: { status: AttendanceStatus.PRESENT },
    afternoon: { status: AttendanceStatus.PRESENT },
  },
  {
    date: "2025-04-28",
    morning: { status: AttendanceStatus.LATE },
    afternoon: { status: AttendanceStatus.PRESENT },
  },
  {
    date: "2025-04-27",
    morning: { status: AttendanceStatus.PRESENT },
    afternoon: { status: AttendanceStatus.ABSENT },
  },
];

export function RecentHistory({
  history = mockAttendanceHistory,
  limit = 5,
}: RecentHistoryProps) {
  const displayedHistory = history.slice(0, limit);

  return (
    <>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <IconSymbol size={24} name="clock.arrow.circlepath" color="#4B5563" />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "600",
            color: "#1F2937",
            fontSize: 16,
          }}
        >
          Recent Check-ins
        </Text>
      </View>

      <View>
        {displayedHistory.map((day, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 12,
              marginBottom: 12,
              borderBottomWidth: index !== displayedHistory.length - 1 ? 1 : 0,
              borderBottomColor: "#F3F4F6",
            }}
          >
            <Text style={{ color: "#374151", fontSize: 14 }}>
              {format(new Date(day.date), "EEEE, MMMM d")}
            </Text>
            <View style={{ flexDirection: "row" }}>
              {day.morning.status !== AttendanceStatus.ABSENT && (
                <Badge
                  variant="outline"
                  label="AM"
                  status={day.morning.status}
                />
              )}
              {day.afternoon.status !== AttendanceStatus.ABSENT && (
                <Badge
                  variant="outline"
                  label="PM"
                  status={day.afternoon.status}
                  style={{ marginLeft: 8 }}
                />
              )}
            </View>
          </View>
        ))}
      </View>

      <Link href="/history" asChild>
        <Button variant="outline">View All History</Button>
      </Link>
    </>
  );
}
