"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

export function MobileCalendar({ selected, onSelect, disabled }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSelectingYear, setIsSelectingYear] = useState(false);
  const [isSelectingMonth, setIsSelectingMonth] = useState(false);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i
  );
  const months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1));

  const isDateDisabled = (date) => {
    if (!disabled) return false;
    return disabled(date);
  };

  return (
    <div className="p-4 bg-background border rounded-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={previousMonth}
          disabled={disabled && disabled(subMonths(currentDate, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1">
          <Select
            value={currentDate.getMonth().toString()}
            onValueChange={(value) => {
              setCurrentDate(
                new Date(currentDate.getFullYear(), parseInt(value), 1)
              );
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue>{format(currentDate, "MMMM")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {format(month, "MMMM")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={currentDate.getFullYear().toString()}
            onValueChange={(value) => {
              setCurrentDate(
                new Date(parseInt(value), currentDate.getMonth(), 1)
              );
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue>{currentDate.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          disabled={disabled && disabled(addMonths(currentDate, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-muted-foreground font-medium py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOfMonth(currentDate).getDay() }).map(
          (_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          )
        )}
        {days.map((day, dayIdx) => {
          const isSelected = selected && isSameDay(day, selected);
          const isDisabled = isDateDisabled(day);
          const isCurrent = isToday(day);

          return (
            <Button
              key={dayIdx}
              size="icon"
              variant="ghost"
              className={cn(
                "h-9 w-9",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                !isSelected && isCurrent && "bg-accent text-accent-foreground",
                isDisabled && "opacity-50 cursor-not-allowed",
                !isSelected &&
                  !isDisabled &&
                  "hover:bg-accent hover:text-accent-foreground"
              )}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(day)}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
