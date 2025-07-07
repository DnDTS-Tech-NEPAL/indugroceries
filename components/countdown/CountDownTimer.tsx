"use client";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

interface CountdownTimerProps {
  endDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

  function getTimeRemaining(endDate: string) {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const difference = end - now;

    const total = Math.max(difference, 0);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeRemaining(endDate);
      setTimeLeft(updated);

      if (updated.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  // Optionally hide timer if current date is before startDate
  //   const hasStarted = new Date().getTime() >= new Date().getTime();
  //   if (!hasStarted) return null;

  if (timeLeft.total <= 0) {
    return <Text color="red.500"></Text>;
  }

  return (
    <Text
      color="#FF6996"
      fontSize={{ base: "sm", md: "md" }}
      fontWeight="500"
      ml={4}
    >
      {timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m:{timeLeft.seconds}s
    </Text>
  );
};

export default CountdownTimer;
