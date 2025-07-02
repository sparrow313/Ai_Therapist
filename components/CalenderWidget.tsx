import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

const CalenderWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();

    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Calculate remaining cells to fill complete weeks (multiples of 7)
    const remainingCells = 7 - (days.length % 7);
    if (remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        days.push(null);
      }
    }
    console.log(days);
    return days;
  };

  const handleDatePress = (day: number | null) => {
    if (day !== null) {
      setSelectedDate(day);
    }
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();

  return (
    <View className="p-6 ">
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-row items-center">
          <View className="mr-2 bg-blue-100 dark:bg-blue-900/30 w-8 h-8 rounded-md items-center justify-center">
            <ThemedText className="text-blue-600 dark:text-blue-400">
              📅
            </ThemedText>
          </View>
          <ThemedText
            type="subtitle"
            className="text-gray-500 dark:text-gray-400"
          >
            Calendar
          </ThemedText>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={() => navigateMonth(-1)}>
          <ThemedText className="text-lg">←</ThemedText>
        </TouchableOpacity>

        <ThemedText type="title" className="text-xl">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </ThemedText>

        <TouchableOpacity onPress={() => navigateMonth(1)}>
          <ThemedText className="text-lg">→</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Days of week header - explicitly showing all 7 days */}
      <View className="flex-row mb-2">
        {days.map((day, index) => (
          <View
            key={index}
            style={styles.dayHeaderCell}
            className="items-center justify-center"
          >
            <ThemedText className="text-gray-500 dark:text-gray-400 text-xs font-medium">
              {day}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Calendar grid - rows of exactly 7 cells each */}
      <View className="flex-row flex-wrap">
        {daysInMonth.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayCell}
            className="items-center justify-center py-1"
            onPress={() => handleDatePress(day)}
            disabled={day === null}
          >
            {day && (
              <View
                className={`w-8 h-8 items-center justify-center rounded-full
                  ${
                    isCurrentMonth && day === today.getDate()
                      ? "bg-blue-500"
                      : ""
                  }
                  ${
                    day === selectedDate
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : ""
                  }
                `}
              >
                <ThemedText
                  className={`
                    ${
                      isCurrentMonth && day === today.getDate()
                        ? "text-white"
                        : ""
                    }
                    ${
                      day === selectedDate
                        ? "text-blue-600 dark:text-blue-400"
                        : ""
                    }
                  `}
                >
                  {day}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayHeaderCell: {
    width: "14.28%", // Exactly 1/7 of the width (100% ÷ 7)
  },
  dayCell: {
    width: "14.28%", // Exactly 1/7 of the width (100% ÷ 7)
  },
});

export default CalenderWidget;
