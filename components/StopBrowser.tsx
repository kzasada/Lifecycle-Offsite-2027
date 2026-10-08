"use client";

import { useMemo, useRef, useState } from "react";
import type { Day, Stop } from "@/lib/types";
import StopCard from "./StopCard";
import styles from "./StopBrowser.module.css";

type TabValue = "1" | "2" | "3";

export default function StopBrowser({ stops, days }: { stops: Stop[]; days: Day[] }) {
  const [query, setQuery] = useState("");
  const [day, setDay] = useState<TabValue>("1");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const tabs = days.map((d) => ({
    value: String(d.day) as TabValue,
    label: `Day ${d.day}`,
    title: d.title,
    summary: d.summary,
  }));
  const activeTab = tabs.find((t) => t.value === day) ?? tabs[0];
  const searching = query.trim() !== "";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    // A search looks across every day; otherwise show the selected day.
    return stops.filter((s) => {
      if (!q) return String(s.day) === day;
      return [s.name, s.description, s.time, ...s.themes, `day ${s.day}`]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [stops, query, day]);

  function selectTab(value: TabValue) {
    setDay(value);
    tabRefs.current[value]?.focus();
  }

  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (index + 1) % tabs.length
      : e.key === "ArrowLeft" ? (index - 1 + tabs.length) % tabs.length
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    selectTab(tabs[next].value);
  }

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
      </form>

      <div role="tablist" aria-label="Itinerary days" className={styles.tabs}>
        {tabs.map((t, i) => (
          <button
            key={t.value}
            ref={(el) => {
              tabRefs.current[t.value] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.value}`}
            aria-selected={day === t.value}
            aria-controls="stops-panel"
            tabIndex={day === t.value ? 0 : -1}
            className={styles.tab}
            data-day={t.value}
            onClick={() => setDay(t.value)}
            onKeyDown={(e) => onTabKeyDown(e, i)}
          >
            <span className={styles.tabLabel}>{t.label}</span>
            <span className={styles.tabTitle}>{t.title}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id="stops-panel" aria-labelledby={`tab-${day}`} className={styles.panel}>
        {!searching && activeTab.summary && <p className={styles.summary}>{activeTab.summary}</p>}

        <p className={styles.count} aria-live="polite">
          {searching
            ? `${results.length} of ${stops.length} stops across all days`
            : `${results.length} stops on Day ${day}`}
        </p>

        {results.length === 0 ? (
          <div className={styles.empty}>
            <h3>No stops found</h3>
            <p>Nothing on the itinerary matches that search. Try a broader term.</p>
            <button
              type="button"
              className={styles.reset}
              onClick={() => {
                setQuery("");
              }}
            >
              Clear search
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
    </div>
  );
}
