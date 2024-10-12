import type { Struct, Schema } from '@strapi/strapi';

export interface UserProfileDetails extends Struct.ComponentSchema {
  collectionName: 'components_user_profile_details';
  info: {
    displayName: 'details';
    icon: 'user';
  };
  attributes: {
    firstname: Schema.Attribute.String;
    lastname: Schema.Attribute.String;
    age: Schema.Attribute.Integer;
    gender: Schema.Attribute.Enumeration<['male', 'female']>;
    dateOfBirth: Schema.Attribute.Date;
    address: Schema.Attribute.String;
  };
}

export interface UserProfileClientDetails extends Struct.ComponentSchema {
  collectionName: 'components_user_profile_client_details';
  info: {
    displayName: 'clientDetails';
  };
  attributes: {
    employementStatus: Schema.Attribute.Enumeration<
      ['employed', 'self-employed', 'unemployed']
    >;
    employerName: Schema.Attribute.String;
    monthlyIncome: Schema.Attribute.Decimal;
    KYCverificationStatus: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    outstandingLoanBalance: Schema.Attribute.Decimal;
    loanLimit: Schema.Attribute.Decimal;
  };
}

export interface MediaAndDocumentsCollateral extends Struct.ComponentSchema {
  collectionName: 'components_media_and_documents_collaterals';
  info: {
    displayName: 'Collateral';
    description: '';
  };
  attributes: {
    collateralType: Schema.Attribute.Enumeration<
      ['vehicle', 'land', 'house', 'electronic', 'other']
    >;
    insurance: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    otherCollateralDocuments: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    titleDeed: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    collateralCondition: Schema.Attribute.Enumeration<
      ['new', 'used', 'good', 'ok']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'user-profile.details': UserProfileDetails;
      'user-profile.client-details': UserProfileClientDetails;
      'media-and-documents.collateral': MediaAndDocumentsCollateral;
    }
  }
}
