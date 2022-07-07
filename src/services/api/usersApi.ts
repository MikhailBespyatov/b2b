import { baseEmptyAPI } from './baseQuery';

export const usersAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: ({ merchantId }) => {
        return {
          url: `users/user`,
          params: {
            merchantId
          }
        };
      }
    }),
    getUser: builder.query({
      query: (login: string) => `users/user/${login}`,
      providesTags: (result, error, arg) => [{ type: 'User', id: arg }]
    }),
    addNewUser: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/users/add',
          method: 'POST',
          body
        };
      }
    }),
    updateUser: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/users/users',
          method: 'PUT',
          body
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.body.login }
      ]
    })
  })
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useGetUserQuery,
  useUpdateUserMutation
} = usersAPI;
