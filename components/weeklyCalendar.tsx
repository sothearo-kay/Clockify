import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isPast,
  isFuture,
  isWeekend,
} from "date-fns";
import { Colors } from "@/constants/colors";

interface WeeklyCalendarProps {
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date;
}

export function WeeklyCalendar({
  onSelectDate,
  selectedDate = new Date(),
}: WeeklyCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);

  useEffect(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 }); // Sunday
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
    setCurrentWeek(weekDays);
  }, []);

  const handleDateClick = (day: Date) => {
    if ((isPast(day) || isToday(day)) && !isWeekend(day)) {
      onSelectDate?.(day);
    }
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Week Days</Text>
        <Text style={styles.dateRange}>
          {format(currentWeek[0] || new Date(), "MMM d")} -{" "}
          {format(currentWeek[6] || new Date(), "MMM d")}
        </Text>
      </View>

      <View style={styles.weekRow}>
        {currentWeek.map((day, index) => {
          const isSelected = isSameDay(day, selectedDate);
          const isFutureDay = isFuture(day);
          const isWeekendDay = isWeekend(day);
          const isDisabled = isFutureDay || isWeekendDay;

          const dayNumber = format(day, "d");

          return (
            <TouchableOpacity
              key={index}
              style={styles.dayContainer}
              onPress={() => !isDisabled && handleDateClick(day)}
              activeOpacity={isDisabled ? 1 : 0.7}
              disabled={isDisabled}
            >
              <View
                style={[
                  styles.indicator,
                  { backgroundColor: isSelected ? "#000" : "#D1D5DB" },
                ]}
              ></View>
              <View
                style={[
                  styles.dayCircle,
                  isDisabled && styles.disabledCircle,
                  isSelected && styles.selectedDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    isDisabled && styles.disabledText,
                    isSelected && styles.selectedDayText,
                  ]}
                >
                  {dayNumber}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937", // gray-800
  },
  dateRange: {
    fontSize: 12,
    color: "#6B7280", // gray-500
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayContainer: {
    backgroundColor: "#f3f4f6",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 2,
    borderRadius: 999,
  },
  dayName: {
    fontSize: 12,
    color: "#9CA3AF", // gray-400
    marginBottom: 4,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  dayNumber: {
    fontSize: 14,
    color: "#374151", // gray-700
  },
  disabledText: {
    color: "#D1D5DB", // gray-300
  },
  disabledCircle: {
    backgroundColor: "#F3F4F6", // gray-100
  },
  selectedDay: {
    backgroundColor: "#3B82F6", // blue-500
  },
  selectedDayText: {
    color: "white",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
