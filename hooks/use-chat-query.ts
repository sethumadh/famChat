import qs from "query-string"
import { useInfiniteQuery } from "@tanstack/react-query"

import { useSocket } from "@/components/providers/socket-provider"

interface ChatQueryProps {
  queryKey: string
  apiUrl: string
  paramKey: "channelId" | "conversationId"
  paramValue: string
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket()
  // console.log("ran")

  const fetchMessages = async ({ pageParam = undefined }) => {
    // console.log(pageParam, ":pageParam")

    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
          /*
          // this is to add the key dynamically to query params 
          eg https://example.com/api/messages?cursor=someCursorValue&channelId=123
          eg https://example.com/api/messages?cursor=someCursorValue&conversationlId=123
          
          
          
          */
        },
      },
      { skipNull: true }
    )

    const res = await fetch(url)
    return res.json()
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage, page) => {
        // console.log({"lastpage": lastPage})
        // console.log({"page": page})
        return lastPage?.nextCursor
      },
      /*
      here the lastpage is undefined therefore getNextPageParam option return undefined, and react Query will look forward to the default value of the fecthmessages function . There fore fetchNextPage function does not have a 
      pageParam. Therefore typically , it would be the id of the first message. But there is no way
      of knowing the id of the 1st message. Therefore pageParam is passed as undefined. This is
       send as cursor  value . This is checked for a value in the messages route and if undefined 
       sends the 1st 10 messages as response. It also sendsnextCursor value. Which is then 
       accessed by getNextPageParam which is the id of the last post of the of previous page,
       meaning the moment you click on load , the currentpage becomes the lastPage.

    */

      //  when socket connect fails , reqct query makes a refetch every
      // 1 second until socket/polling is connetced again
      refetchInterval: () => {
        // console.log("refetch")
        const val = isConnected ? false : 1000
        return val
      },
    })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  }
}

/*
Initial Render:

When the component is initially rendered, it fetches the first page of data using the useInfiniteQuery hook.
The data object contains an array of pages, where each page corresponds to a set of paginated data.
The hasNextPage property is used to determine if there are more pages of data to fetch.
The "Load More" button is rendered, but initially enabled.
User Clicks "Load More":

When the user clicks the "Load More" button, the fetchNextPage function is called.
This function triggers a new API request to fetch the next page of data.
React Query uses the getNextPageParam function to calculate which page to fetch next. If there are more pages, it returns the page number; otherwise, it returns undefined.
While the new data is being fetched, the "Load More" button is disabled to prevent multiple requests while one is already in progress (isFetching is true).
API Request:

The fetchPosts function is called with the pageParam set to the next page number (e.g., 2, 3, etc.).
This function makes an API request to the specified URL (e.g., https://api.example.com/posts?page=2) to retrieve the next page of data.
Data Fetching:

The API responds with the next page of data, which is then processed by React Query.
The new data is appended to the existing data in the data object.
Rendering:

After the data is fetched and added to the data object, React re-renders the component.
The new page of data is mapped and displayed in the list of posts.
Updated "Load More" Button:

If there are still more pages to fetch (hasNextPage is true), the "Load More" button remains enabled.
If there are no more pages to fetch (hasNextPage is false), the "Load More" button is no longer displayed.
User Interaction Continues:

Users can continue clicking the "Load More" button to fetch additional pages of data, repeating steps 2-6 until there are no more pages (hasNextPage is false).
This flow allows for an infinite scrolling experience where new data is fetched and added to the list as the user scrolls or clicks the "Load More" button. React Query manages the data fetching and pagination
logic, making it easier to implement infinite scrolling in your application.
*/
