import { baseEmptyAPI } from './baseQuery';

export const partnerAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getPartner: builder.query({
      query: (id: string) => `partners/partner/${id}`,
      keepUnusedDataFor: 0,
      providesTags: (result, error, arg) => [{ type: 'Partners', id: arg }]
    }),
    getPartners: builder.query({
      query: () => '/partners',
      providesTags: [{ type: 'Partners', id: 'LIST' }]
    }),
    postPartner: builder.mutation({
      query: body => {
        return {
          url: '/partners',
          method: 'POST',
          body
        };
      },
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }]
    }),
    updatePartner: builder.mutation({
      query: body => {
        return {
          url: `/partners/${body.merchantId}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Partners', id: arg.merchantId }
      ]
    })
  })
});

export const {
  useGetPartnerQuery,
  useGetPartnersQuery,
  useUpdatePartnerMutation,
  usePostPartnerMutation
} = partnerAPI;
