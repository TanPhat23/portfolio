export type StoryPosition = "left" | "right" | "center";

export function storyPositionForIndex(index: number, count: number): StoryPosition {
  if (index === 0 || index === count - 1) return "center";
  return index % 2 === 0 ? "left" : "right";
}

export function storyPoseForStep(id: string, index: number, count: number) {
  const position = storyPositionForIndex(index, count);

  return {
    side: position,
    pose: id,
  };
}