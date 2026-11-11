import { nowItems } from "@/lib/data";
import { revealDelay } from "@/components/ui/reveal";

export function Now() {
  return (
    <section aria-labelledby="now-title" className="relative py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div
          className="reveal gradient-border bg-surface/60 rounded-[2rem] p-6 sm:p-9 lg:p-11"
          style={revealDelay(0)}
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow flex items-center gap-2.5">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="bg-cyan node-pulse absolute inline-flex h-full w-full rounded-full" />
                  <span className="bg-cyan relative inline-flex h-2 w-2 rounded-full" />
                </span>
                Now
              </p>
              <h2
                id="now-title"
                className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-3xl"
              >
                Currently exploring.
              </h2>
            </div>
            <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-8">
              {nowItems.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold tracking-tight">{item.title}</p>
                  <p className="text-muted mt-2 text-[0.95rem] leading-relaxed">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
