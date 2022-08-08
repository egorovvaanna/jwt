import { fetchBaseQuery , BaseQueryFn , FetchBaseQueryError, FetchArgs} from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie'


 const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost/',
    prepareHeaders: (headers, { getState }) => {
        const user = localStorage.getItem('jwtToken')
  
        if (user) {
            headers.set('Authorization', `Bearer ${user}`)
        }
        return headers
    },
    credentials: 'include', 
  })
  
  export const baseQueryWithReauth: BaseQueryFn<any | FetchArgs, any, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const user = Cookies.get('refresh_token')
        const refreshResult = await baseQuery(
            { url: 'auth/jwt/refresh/', method: 'POST', body: {refresh : user}},
            api,
            extraOptions
        )
      
        const response = refreshResult.data as any
        if (response) {
            Cookies.set('access_token', response.access)
            localStorage.setItem("jwtToken", response.access)
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log('не рефрешится')
        }
    }
    return result
  }