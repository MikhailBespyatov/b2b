import { baseEmptyAPI } from './baseQuery';

export const ibkAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getOrganizations: builder.query({
      query: (token: string) => {
        console.log('/services-ui/api/get-organizations', { token });
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
