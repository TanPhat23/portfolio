import React from "react";

export type StoryPosition = "left" | "right" | "center";

type StoryCardProps = {
  position: StoryPosition;
  content?: React.ReactNode;
  contentClassName?: string;
};

function StoryBadge() {
  return (
    <div
      className="mb-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3 py-2 shadow-sm backdrop-blur-sm"
      aria-hidden="true"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_color-mix(in_oklab,var(--primary)_50%,transparent)]" />
      <span className="h-1 w-1 rounded-full bg-foreground/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_14px_color-mix(in_oklab,var(--primary)_50%,transparent)]" />
    </div>
  );
}

export default function StoryCard({ position, content, contentClassName }: StoryCardProps) {
  const cardClass =
    position === "center"
      ? "justify-self-center"
      : position === "left"
        ? "justify-self-end mr-4"
        : "justify-self-start ml-4";

  return (
    <div
      className={`w-full min-w-0 max-w-[min(100%,72rem)] overflow-hidden rounded-[1.9rem] border border-border/100 bg-gradient-to-b from-card/95 to-card/80 shadow-[0_26px_70px_-34px_rgba(0,0,0,0.5)] backdrop-blur-[18px] ${cardClass}`}
    >
      <div className="min-w-0 p-4 sm:p-6">
        <StoryBadge />
        {content ? <div className={`min-w-0 mt-4 ${contentClassName ?? ""}`}>{content}</div> : null}
      </div>
    </div>
  );
}