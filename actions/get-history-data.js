const url = process.env.NEXT_PUBLIC_BASE_URL

// export async function getHistoryData() {
export const getHistoryData = async () => {
  try {
    const response = await fetch(`${url}/chat/Agent-Tests`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    const result = await response.json()
    const grouped = result.sessions.reduce((groups, session) => {
      const sessionDate = new Date(session.time).getTime()
      const today = new Date().setHours(0, 0, 0, 0)
      const yesterday = new Date(today).setDate(new Date(today).getDate() - 1)
      const oneWeekAgo = new Date(today).setDate(new Date(today).getDate() - 7)
      const oneMonthAgo = new Date(today).setMonth(
        new Date(today).getMonth() - 1
      )
      const oneYearAgo = new Date(today).setFullYear(
        new Date(today).getFullYear() - 1
      )

      let groupKey
      if (sessionDate >= today) {
        groupKey = "Today"
      } else if (sessionDate >= yesterday) {
        groupKey = "Yesterday"
      } else if (sessionDate > oneWeekAgo) {
        groupKey = "Past 7 Days"
      } else if (sessionDate > oneMonthAgo) {
        groupKey = "Past Month"
      } else if (sessionDate > oneYearAgo) {
        groupKey = "Past Year"
      } else {
        groupKey = "Older"
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(session)
      return groups
    }, {})

    const orderedGroupNames = [
      "Today",
      "Yesterday",
      "Past 7 Days",
      "Past Month",
      "Past Year",
      "Older",
    ]
    const orderedData = orderedGroupNames.reduce((obj, groupName) => {
      if (grouped[groupName]) {
        obj[groupName] = grouped[groupName]
      }
      return obj
    }, {})
    return orderedData
  } catch (error) {
    throw new Error(`${error}`)
  }
}
