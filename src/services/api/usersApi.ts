import { baseEmptyAPI } from './baseQuery';

export const usersAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => `users/user`
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
