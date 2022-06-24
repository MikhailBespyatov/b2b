import { baseEmptyAPI } from './baseQuery';

export const usersAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => `users/user`
    })
  })
});

export const { useGetUsersQuery } = usersAPI;
