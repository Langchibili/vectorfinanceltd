import type { Schema, Attribute } from '@strapi/strapi';

export interface ClientDetailsSalary extends Schema.Component {
  collectionName: 'components_client_details_salaries';
  info: {
    displayName: 'salary';
    description: '';
  };
  attributes: {
    paySlip: Attribute.Media;
    verificationVideo: Attribute.Media;
    employerName: Attribute.String;
    companyName: Attribute.String;
    companyLocation: Attribute.String;
    employementVerificationNumber: Attribute.String;
    salaryAmount: Attribute.Decimal;
  };
}

export interface MediaAndDocumentsCollateral extends Schema.Component {
  collectionName: 'components_media_and_documents_collaterals';
  info: {
    displayName: 'Collateral';
    description: '';
  };
  attributes: {
    collateralType: Attribute.Enumeration<
      ['vehicle', 'land', 'house', 'electronic', 'other']
    >;
    otherCollateralDocuments: Attribute.Media;
    collateralCondition: Attribute.Enumeration<['new', 'used', 'good', 'ok']>;
    vehicle: Attribute.Component<'media-and-documents.vehicle'>;
    land: Attribute.Component<'media-and-documents.land'>;
    collateralStatus: Attribute.Enumeration<
      ['inspected', 'pending-inspection', 'declined', 'accepted']
    >;
    inspectionDate: Attribute.DateTime;
    house: Attribute.Component<'media-and-documents.house'>;
  };
}

export interface MediaAndDocumentsHouse extends Schema.Component {
  collectionName: 'components_media_and_documents_houses';
  info: {
    displayName: 'house';
  };
  attributes: {
    titleDeed: Attribute.Media;
    dimensions: Attribute.String;
    location: Attribute.String;
  };
}

export interface MediaAndDocumentsLand extends Schema.Component {
  collectionName: 'components_media_and_documents_lands';
  info: {
    displayName: 'land';
  };
  attributes: {
    titleDeed: Attribute.Media;
    hectors: Attribute.String;
    location: Attribute.String;
  };
}

export interface MediaAndDocumentsVehicle extends Schema.Component {
  collectionName: 'components_media_and_documents_vehicles';
  info: {
    displayName: 'vehicle';
  };
  attributes: {
    packed: Attribute.Boolean;
    insurance: Attribute.Media;
    packingFeePaid: Attribute.Decimal;
  };
}

export interface UserProfileClientDetails extends Schema.Component {
  collectionName: 'components_user_profile_client_details';
  info: {
    displayName: 'clientDetails';
    description: '';
  };
  attributes: {
    employementStatus: Attribute.Enumeration<
      ['employed', 'self-employed', 'unemployed']
    >;
    monthlyIncome: Attribute.Decimal;
    KYCverificationStatus: Attribute.Boolean & Attribute.DefaultTo<false>;
    outstandingLoansBalance: Attribute.Decimal;
    IDfront: Attribute.Media;
    IDback: Attribute.Media;
  };
}

export interface UserProfileDetails extends Schema.Component {
  collectionName: 'components_user_profile_details';
  info: {
    displayName: 'details';
    icon: 'user';
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    age: Attribute.Integer;
    gender: Attribute.Enumeration<['male', 'female']>;
    dateOfBirth: Attribute.Date;
    address: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'client-details.salary': ClientDetailsSalary;
      'media-and-documents.collateral': MediaAndDocumentsCollateral;
      'media-and-documents.house': MediaAndDocumentsHouse;
      'media-and-documents.land': MediaAndDocumentsLand;
      'media-and-documents.vehicle': MediaAndDocumentsVehicle;
      'user-profile.client-details': UserProfileClientDetails;
      'user-profile.details': UserProfileDetails;
    }
  }
}
