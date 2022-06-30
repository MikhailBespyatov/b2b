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
    addNewUser: builder.mutation({
      query: ({ body }) => {
        return {
          url: '/users/add',
          method: 'POST',
          body
        };
      }
    })
  })
});

export const { useGetUsersQuery, useAddNewUserMutation } = usersAPI;
