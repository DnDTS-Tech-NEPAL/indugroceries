"use client";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

interface CountdownTimerProps {
  startDate: string;
  endDate: string;
  onProgressUpdate?: (progress: number) => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  startDate,
  endDate,
  onProgressUpdate,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function getTimeRemaining(startDate: string, endDate: string) {
    const now = Date.now();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // Check for invalid dates
    if (isNaN(start) || isNaN(end)) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const total = Math.max(end - now, 0);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    // Calculate progress percentage
    const totalDuration = end - start;
    const remaining = end - now;
    const progress = Math.min(
      Math.max((remaining / totalDuration) * 100, 0),
      100
    );

    if (onProgressUpdate) onProgressUpdate(progress);

    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    if (!startDate || !endDate) return;

    const interval = setInterval(() => {
      const updated = getTimeRemaining(startDate, endDate);
      setTimeLeft(updated);
      if (updated.total <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const hasStarted = Date.now() >= new Date(startDate).getTime();
  if (!hasStarted) return null;

  if (timeLeft.total <= 0) {
    return null;
  }

  return (
    <Text
      color="#FF6996"
      fontSize={{ base: "sm", md: "md" }}
      fontWeight="500"
      ml={4}
    >
      {timeLeft.days}d {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
    </Text>
  );
};

export default CountdownTimer;
