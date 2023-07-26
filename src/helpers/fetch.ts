import { supabase } from "@/supabase";

export const fetchProjects = async (range: { lower: number; upper: number }, technologies?: string[]) =>
  technologies && technologies.length > 0
    ? supabase
        .from("projects")
        .select(`id, name, description, image_link, technologies!inner (name)`)
        .order("creation_date", { ascending: false })
        .range(range.lower, range.upper)
        .in("technologies.name", technologies)
    : supabase
        .from("projects")
        .select(`id, name, description, image_link, technologies (name)`)
        .order("creation_date", { ascending: false })
        .range(range.lower, range.upper);

export const fetchProject = async (id: string) =>
  supabase.from("projects").select(`id, name, description, image_link, content, github_link, technologies (name)`).eq("id", id);

export const fetchBlogPosts = async (range: { lower: number; upper: number }, sort: "newest" | "oldest" = "newest") => {
  const sortOptions = {
    newest: { column: "creation_date", order: "desc" },
    oldest: { column: "creation_date", order: "asc" }
  };

  return supabase
    .from("blog_posts")
    .select(`id, title, description, image_link, creation_date`)
    .order(sortOptions[sort].column, { ascending: sortOptions[sort].order === "asc" })
    .range(range.lower, range.upper);
};

export const fetchBlogPost = async (id: string) =>
  supabase.from("blog_posts").select(`id, title, description, image_link, creation_date, content`).eq("id", id);

export const fetchTechnologies = async () => supabase.from("technologies").select(`id, name`);
