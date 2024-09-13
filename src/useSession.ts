import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './lib/hooks/QueryConstants'
import { SessionData } from './lib/session-utils'

export default function useSession() {
  return useQuery<SessionData, Error>({
    queryKey: [QueryNames.GetSession],
    queryFn: async () => {
      try {
        const response = await fetch('/api/abp/application-configuration')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        
        // Extract relevant session data from the ABP application configuration
        const sessionData: SessionData = {
          tenantId: data.currentTenant?.id,
          isLoggedIn: false,
          // Add any other relevant fields from the ABP configuration
        }
        return sessionData
      } catch (error) {
        console.error('Error fetching application configuration:', error)
        throw error
      }
    },
    refetchOnWindowFocus: true
  })
}