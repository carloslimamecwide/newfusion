"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "@/components/Icon";

export type CapabilityItem = {
  image: string;
  alt: string;
  title: string;
  label: string;
};

export function CapabilityRail({
  items,
  previousLabel,
  nextLabel,
  regionLabel,
}: {
  items: CapabilityItem[];
  previousLabel: string;
  nextLabel: string;
  regionLabel: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function move(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-capability-card]");
    const step = (card?.offsetWidth ?? rail.clientWidth * 0.75) + 14;
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  function updateActive() {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-capability-card]"));
    const closest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setActive(closest.index);
  }

  return (
    <div className="capability-rail-shell" role="region" aria-label={regionLabel}>
      <div ref={railRef} className="capability-rail" onScroll={updateActive}>
        {items.map((item, index) => (
          <figure key={item.image} className="capability-card" data-capability-card data-reveal="media" data-reveal-index={index}>
            <div className="capability-image">
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 24vw" className="object-cover" />
            </div>
            <figcaption>
              <span>{item.title}</span>
              <small>{item.label}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="capability-controls">
        <div className="capability-dots" aria-hidden="true">
          {items.map((item, index) => <span key={item.image} data-active={index === active} />)}
        </div>
        <div className="capability-buttons">
          <button type="button" onClick={() => move(-1)} aria-label={previousLabel}><Icon name="arrow-left" size={17} /></button>
          <button type="button" onClick={() => move(1)} aria-label={nextLabel}><Icon name="arrow" size={17} /></button>
        </div>
      </div>
    </div>
  );
}
