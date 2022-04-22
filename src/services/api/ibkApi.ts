import { baseEmptyAPI } from './baseQuery';

export const ibkAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getOrganizations: builder.query({
      query: (token: string) => {
        return {
          url: '/ibk/services-ui/api/get-organizations',
          headers: {
            token
          }
        };
      }
    }),
    getOrganizationsIBK: builder.query({
      query: (token: string) => {
        return {
          url: 'https://rancher-test.alfa-bank.kz:30001/services-ui/api/get-organizations',
          headers: {
            token
          }
        };
      }
    })
  })
});

export const { useGetOrganizationsQuery } = ibkAPI;
