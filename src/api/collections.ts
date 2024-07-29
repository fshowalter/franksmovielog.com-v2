import {
  allCollectionsJson,
  type CollectionJson,
} from "./data/collectionsJson";

export interface Collection extends CollectionJson {}

export async function allCollections(): Promise<{
  collections: Collection[];
  distinctReleaseYears: string[];
}> {
  const collections = await allCollectionsJson();
  const releaseYears = new Set<string>();

  collections.forEach((collection) => {
    collection.titles.forEach((title) => {
      releaseYears.add(title.year);
    });
  });

  return {
    collections: collections,
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };
}

export async function collectionDetails(slug: string): Promise<{
  collection: Collection;
  distinctReleaseYears: string[];
}> {
  const collections = await allCollectionsJson();
  const collection = collections.find((value) => value.slug === slug)!;

  const releaseYears = new Set<string>();

  collection.titles.forEach((title) => {
    releaseYears.add(title.year);
  });

  return {
    collection,
    distinctReleaseYears: Array.from(releaseYears).toSorted(),
  };
}
