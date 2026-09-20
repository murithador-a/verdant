const ITEMS = [
  "Home Cleaning",
  "Office Cleaning",
  "Short-Stay Turnover",
  "Commercial",
  "Deep Cleaning",
  "Available 7 Days a Week",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-7 font-display text-[13px] font-extrabold uppercase tracking-[0.2em] text-forest">
            {item}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest/50" />
        </span>
      ))}
    </div>
  );
}

/** A slim lime ticker bridging the hero and the transformation story. */
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-forest/10 bg-lime py-3.5">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
