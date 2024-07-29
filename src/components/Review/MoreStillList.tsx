import { StillList } from "src/components/StillList";
import { StillListHeading } from "src/components/StillListHeading";
import type { StillListItemValue } from "src/components/StillListItem";
import { StillListNav } from "src/components/StillListNav";

export function MoreStillList({
  values,
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
  values: StillListItemValue[];
}) {
  return (
    <StillListNav>
      <StillListHeading
        leadText={leadText}
        linkText={linkText}
        linkTarget={linkTarget}
      />
      <StillList
        values={values}
        seeAllLinkTarget={linkTarget}
        seeAllLinkText={linkText}
      />
    </StillListNav>
  );
}
