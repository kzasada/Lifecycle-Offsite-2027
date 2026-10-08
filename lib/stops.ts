import daysData from "@/data/days.json";
import stopsData from "@/data/stops.json";
import type { Day, Stop } from "./types";

export const days = daysData.days as Day[];
export const stops = stopsData.stops as Stop[];

export const getStop = (slug: string) => stops.find((s) => s.slug === slug);
export const getDay = (day: number) => days.find((d) => d.day === day);
