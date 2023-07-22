import { supabase } from '@/supabase';

export const fetchProjects = async (range: { lower: number; upper: number }) =>
  supabase.from('Projects').select(`id, name, description, image_link, technologies`).order('creation_date', { ascending: false }).range(range.lower, range.upper);

export const fetchBlogPosts = async (range: { lower: number; upper: number }) =>
  supabase.from('BlogPosts').select(`id, title, description, image_link, creation_date`).order('creation_date', { ascending: false }).range(range.lower, range.upper);
