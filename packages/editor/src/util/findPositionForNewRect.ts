import { Rect, Vec2 } from "paintvec";
import { Quadtree, Rectangle } from "@timohausmann/quadtree-ts";
import { minBy } from "lodash-es";

export function findPositionForNewRect(
  areaRect: Rect,
  rects: readonly Rect[],
  size: Vec2,
  margin = 40
): Vec2 {
  const candidates: Vec2[] = [];

  const quadTree = new Quadtree({
    x: areaRect.left,
    y: areaRect.top,
    width: areaRect.width,
    height: areaRect.height,
  });
  for (const rect of rects) {
    quadTree.insert(
      new Rectangle({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        data: rect,
      })
    );
  }

  for (const rect of rects) {
    const leftPos = new Vec2(rect.left - margin - size.x, rect.top);
    const rightPos = new Vec2(rect.right + margin, rect.top);
    const topPos = new Vec2(rect.left, rect.top - margin - size.y);
    const bottomPos = new Vec2(rect.left, rect.bottom + margin);

    for (const pos of [leftPos, rightPos, topPos, bottomPos]) {
      const candidate = Rect.from({ topLeft: pos, size });
      const mayOverlap = quadTree.retrieve(
        new Rectangle({
          x: candidate.left,
          y: candidate.top,
          width: candidate.width,
          height: candidate.height,
        })
      );

      if (
        mayOverlap.every(
          (rect) =>
            !Rect.intersection((rect as Rectangle<Rect>).data!, candidate)
        )
      ) {
        candidates.push(pos);
      }
    }
  }

  return (
    minBy(candidates, (p) => p.sub(areaRect.center).length) ?? areaRect.center
  );
}
