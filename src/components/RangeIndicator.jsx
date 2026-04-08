import { X } from "lucide-react";

function formatDate(d) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysBetween(a, b) {
  return Math.round(Math.abs(b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export default function RangeIndicator({ range, selectionStep, onClear }) {
  if (!range.start && selectionStep === 0) return null;

  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-accent text-accent-foreground text-sm animate-fade-in-scale">
      <div className="flex items-center gap-2">
        {selectionStep === 1 && (
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
        )}
        {range.start && range.end ? (
          <span>
            <strong>{formatDate(range.start)}</strong> → <strong>{formatDate(range.end)}</strong>
            <span className="ml-2 text-muted-foreground">
              ({daysBetween(range.start, range.end)} days)
            </span>
          </span>
        ) : range.start ? (
          <span>
            <strong>{formatDate(range.start)}</strong>
            <span className="ml-2 text-muted-foreground">Select end date</span>
          </span>
        ) : null}
      </div>
      {(range.start || range.end) && (
        <button
          onClick={onClear}
          className="p-1 rounded-lg hover:bg-secondary transition-colors duration-150
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
