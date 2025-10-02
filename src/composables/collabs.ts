import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (ids: string[]) => {
    if (!ids.length) return []

    const { data, error } = await groupedProfilesQuery(ids)

    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length)

    const promises = filteredItems.map((item) => getProfilesByIds(item.collaborators))

    const results = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      if (!results[index]) return
      groupedCollabs.value[item.id] = results[index]
    })
  }

  return { getProfilesByIds, getGroupedCollabs, groupedCollabs }
}
