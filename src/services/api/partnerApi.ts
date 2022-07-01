import { baseEmptyAPI } from './baseQuery';

export const partnerAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getPartner: builder.query({
      query: (id: string) => `partners/partner/${id}`,
      keepUnusedDataFor: 0
    }),
    getPartners: builder.query({
      query: () => '/partners'
    }),
    postPartner: builder.mutation({
      query: body => {
        return {
          url: '/partners',
          method: 'POST',
          body
        };
      }
    })
  })
});

export const {
  useGetPartnerQuery,
  useGetPartnersQuery,
  usePostPartnerMutation
} = partnerAPI;
