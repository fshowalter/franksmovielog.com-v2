import type { ReviewWithContent } from "src/api/reviews";

import { ViewingHistoryListItem } from "./ViewingHistoryListItem";

export interface ViewingHistoryValueProps
  extends Pick<ReviewWithContent, "viewings"> {}

interface Props extends ViewingHistoryValueProps {
  className?: string;
}

export function ViewingHistory({ viewings, className }: Props) {
  return (
    <div className={className}>
      <h3 className="px-gutter text-md font-normal text-subtle shadow-bottom">
        Viewing History
        <div className="h-2 min-h-2" />
      </h3>
      <ul>
        {viewings.map((viewing) => (
          <ViewingHistoryListItem key={viewing.sequence} value={viewing} />
        ))}
      </ul>
    </div>
  );
}
