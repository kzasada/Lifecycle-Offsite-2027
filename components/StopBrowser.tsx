"use client";

import { useMemo, useState } from "react";
import type { Stop } from "@/lib/types";
import StopCard from "./StopCard";
import styles from "./StopBrowser.module.css";

export default function StopBrowser({ stops }: { stops: Stop[] }) {
  const [query, setQuery] = useState("");
  const [day, setDay] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stops.filter((s) => {
      if (day !== "all" && String(s.day) !== day) return false;
      if (!q) return true;
      return [s.name, s.description, s.time, ...s.themes, `day ${s.day}`]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [stops, query, day]);

  return (
    <div>
      <form className={styles.controls} role="search" onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span className={styles.label}>Search stops</span>
          <input
            type="search"
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “pipeline”, “flowers”, or “hike”"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Day</span>
          <select className={styles.input} value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="all">All days</option>
            <option value="1">Day 1</option>
            <option value="2">Day 2</option>
            <option value="3">Day 3</option>
          </select>
        </label>
      </form>

      <p className={styles.count} aria-live="polite">
        {results.length} of {stops.length} stops
      </p>

      {results.length === 0 ? (
        <div className={styles.empty}>
          <h3>No stops found</h3>
          <p>Nothing on the itinerary matches that search. Try a broader term or reset the day filter.</p>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              setQuery("");
              setDay("all");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {results.map((s) => (
            <StopCard key={s.slug} stop={s} />
          ))}
        </div>
      )}
    </div>
  );
}
