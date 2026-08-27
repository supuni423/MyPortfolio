import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Project } from '~/types';

const toProject = (entry: CollectionEntry<'projects'>): Project => ({
  id: entry.id,
  ...entry.data,
});

/** Non-draft projects, sorted by their manual `order` field. */
export const getProjects = async (): Promise<Project[]> => {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return entries.map(toProject).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
};
