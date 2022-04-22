import { baseEmptyAPI } from './baseQuery';

export const ibkAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getOrganizations: builder.query({
      query: (token: string) => {
        return {
          url: '/services-ui/api/get-organizations',
          headers: {
            token
          }
        };
      }
    })
  })
});

export const { useGetOrganizationsQuery } = ibkAPI;
