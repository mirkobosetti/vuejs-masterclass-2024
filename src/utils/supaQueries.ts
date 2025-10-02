import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    )
  `)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select('*')
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select('*, tasks (id, name, status, due_date)')
    .eq('slug', slug)
    .single()
export type Project = QueryData<ReturnType<typeof projectQuery>>

export const taskQuery = (id: number) =>
  supabase.from('tasks').select('*, projects (id, name, slug)').eq('id', id).single()
export type Task = QueryData<ReturnType<typeof taskQuery>>

export const profileQuery = ({ column, value }: { column: string; value: string }) =>
  supabase.from('profiles').select('*').eq(column, value).single()

export const groupedProfilesQuery = (ids: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', ids)
export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

export const updateProjectQuery = (updatedProject: {}, id: number) =>
  supabase.from('projects').update(updatedProject).eq('id', id).select()
