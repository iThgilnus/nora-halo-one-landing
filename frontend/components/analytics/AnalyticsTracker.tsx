"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import type { AnalyticsEventName } from "@/lib/validations/event";

const milestones = [
  { pct: 25, event: "scroll_25" },
  { pct: 50, event: "scroll_50" },
  { pct: 75, event: "scroll_75" },
  { pct: 100, event: "scroll_100" },
] as const;

export function AnalyticsTracker() {
  const trackedScroll = useRef(new Set<AnalyticsEventName>());
  const trackedSections = useRef(new Set<AnalyticsEventName>());

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const element = target.closest<HTMLElement>("[data-track-event]");
      const eventName = element?.dataset.trackEvent as
        | AnalyticsEventName
        | undefined;

      if (!eventName) {
        return;
      }

      trackEvent(eventName, element?.dataset.trackSection);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        return;
      }

      const progress = Math.min(
        100,
        Math.round((window.scrollY / scrollable) * 100),
      );

      milestones.forEach(({ pct, event }) => {
        if (progress >= pct && !trackedScroll.current.has(event)) {
          trackedScroll.current.add(event);
          trackEvent(event, "page");
        }
      });

      const story = document.querySelector("#story");

      if (story && !trackedSections.current.has("story_completed")) {
        const rect = story.getBoundingClientRect();
        const storyScrollable = Math.max(1, rect.height - window.innerHeight);
        const storyProgress = Math.min(1, Math.max(0, -rect.top / storyScrollable));

        if (storyProgress >= 0.92) {
          trackedSections.current.add("story_completed");
          trackEvent("story_completed", "product-story");
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const specs = document.querySelector("#specifications");

    if (!specs) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          if (
            entry.target.id === "specifications" &&
            !trackedSections.current.has("specs_viewed")
          ) {
            trackedSections.current.add("specs_viewed");
            trackEvent("specs_viewed", "specifications");
          }
        });
      },
      { threshold: 0.7 },
    );

    if (specs) {
      observer.observe(specs);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
