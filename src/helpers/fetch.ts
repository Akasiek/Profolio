import { supabase } from '@/supabase';

export const fetchProjects = async (range: { lower: number; upper: number }) =>
  supabase.from('Projects').select(`id, name, description, image_link, technologies`).order('creation_date', { ascending: false }).range(range.lower, range.upper);

export const fetchBlogPosts = async (range: { lower: number; upper: number }, sort: 'newest' | 'oldest' = 'newest') => {
  const sortOptions = {
    newest: { column: 'creation_date', order: 'desc' },
    oldest: { column: 'creation_date', order: 'asc' },
  };

  return supabase
    .from('BlogPosts')
    .select(`id, title, description, image_link, creation_date`)
    .order(sortOptions[sort].column, { ascending: sortOptions[sort].order === 'asc' })
    .range(range.lower, range.upper);
};

export const fetchBlogPost = async (id: string) => supabase.from('BlogPosts').select(`id, title, description, image_link, creation_date, content`).eq('id', id);
