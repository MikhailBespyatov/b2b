import { baseEmptyAPI } from './baseQuery';

export const partnerAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getPartner: builder.query({
      query: (id: string) => `partners/partner/${id}`,
      keepUnusedDataFor: 0
    })
  })
});

export const { useGetPartnerQuery } = partnerAPI;
