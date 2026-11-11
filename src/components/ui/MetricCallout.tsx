import type { Metric } from "@/lib/types";

export function MetricCallout({ metric }: { metric: Metric }) {
  return (
    <div className="bg-surface/70 flex h-full flex-col rounded-2xl border p-5 sm:p-6">
      <p className="text-gradient text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none font-semibold tracking-[-0.03em]">
        {metric.value}
      </p>
      <p className="mt-3 text-base leading-snug font-medium">{metric.label}</p>
      {metric.note && (
        <p className="text-muted mt-2 text-sm leading-relaxed">{metric.note}</p>
      )}
    </div>
  );
}
