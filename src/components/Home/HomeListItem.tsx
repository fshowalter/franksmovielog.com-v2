import type { ReviewWithExcerpt } from "src/api/reviews";
import type { StillImageProps } from "src/api/stills";
import { Grade } from "src/components/Grade";
import { RenderedMarkdown } from "src/components/RenderedMarkdown";
import { Still } from "src/components/Still";
import { toSentence } from "src/utils/toSentence";

export const StillImageConfig = {
  width: 480,
  height: 270,
  sizes: "(min-width: 512px) 512px, 100vw",
};

function formatDate(reviewDate: Date) {
  return reviewDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export interface ListItemValue
  extends Pick<
    ReviewWithExcerpt,
    | "imdbId"
    | "sequence"
    | "title"
    | "year"
    | "date"
    | "slug"
    | "grade"
    | "principalCastNames"
    | "directorNames"
    | "excerpt"
  > {}

export function HomeListItem({
  value,
  eagerLoadImage,
  stillImageProps: stillImageData,
}: {
  value: ListItemValue;
  eagerLoadImage: boolean;
  stillImageProps: StillImageProps | undefined;
}) {
  return (
    <li className="flex even:bg-subtle">
      <article className="mx-auto flex flex-col items-center px-pageMargin py-10 desktop:grid desktop:w-full desktop:grid-cols-2 desktop:gap-x-[calc(2_*_var(--gutter-width))] max:grid-cols-7">
        <div className="col-span-full mb-6 text-center text-sm font-light uppercase leading-4 tracking-0.75px text-subtle desktop:mb-0 desktop:pb-6 desktop:text-left desktop:leading-8 max:col-span-1 max:self-start">
          {formatDate(value.date)}
        </div>
        <a
          rel="canonical"
          href={`/reviews/${value.slug}/`}
          className="still-border block max-w-prose desktop:col-start-2 desktop:col-end-2 desktop:row-span-2 desktop:row-start-2 desktop:self-start desktop:justify-self-end max:col-start-4 max:col-end-9 max:row-start-1 max:mt-0"
        >
          {stillImageData && (
            <Still
              title={value.title}
              year={value.year}
              width={StillImageConfig.width}
              height={StillImageConfig.height}
              sizes={StillImageConfig.sizes}
              imageProps={stillImageData}
              loading={eagerLoadImage ? "eager" : "lazy"}
              className="h-auto rounded-xl"
              decoding={eagerLoadImage ? "sync" : "async"}
            />
          )}
        </a>
        <div className="flex max-w-lg flex-col items-center pt-4 desktop:col-span-1 desktop:col-start-1 desktop:row-start-2 desktop:items-start desktop:place-self-start desktop:pt-0 max:col-span-3 max:col-start-2 max:row-start-1 max:max-w-unset">
          <h2 className="text-2.5xl font-bold leading-8">
            <a
              href={`/reviews/${value.slug}/`}
              rel="canonical"
              className="inline-block text-default"
            >
              {value.title}{" "}
              <span className="inline-block text-base font-light leading-none text-subtle">
                {value.year}
              </span>
            </a>
          </h2>
          <div className="spacer-y-4" />
          <Grade value={value.grade} height={32} />
          <div className="spacer-y-6" />
          <p className="text-base font-normal leading-normal tracking-0.25px text-subtle">
            Directed by {toSentence(value.directorNames)}. Starring{" "}
            {toSentence(value.principalCastNames)}.
          </p>
          <div className="spacer-y-6" />
          <RenderedMarkdown
            text={value.excerpt}
            className="self-start text-lg leading-normal tracking-0.3px text-muted"
          />
        </div>
      </article>
    </li>
  );
}
