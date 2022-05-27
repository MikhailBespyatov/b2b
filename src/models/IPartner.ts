export interface IPartnerPoint {
  partnerEmail: string;
  partnerWebsite: string;
}

export interface IPartner {
  billingNumber: string;
  bin: string;
  partnerCode: string;
  partnerEmail: string;
  partnerLegalName: string;
  partnerWebsite: string;
  transitBill: string;
  partnerPoints: IPartnerPoint[];
}
