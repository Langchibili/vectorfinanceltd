import type { Schema, Attribute } from '@strapi/strapi';

export interface ClientDetailsBusiness extends Schema.Component {
  collectionName: 'components_client_details_businesses';
  info: {
    displayName: 'business';
    description: '';
  };
  attributes: {
    businessName: Attribute.String;
    businessType: Attribute.Enumeration<
      [
        'sole-proprietorship',
        'partnership',
        'limited-company',
        'corporation',
        'non-profit'
      ]
    >;
    ownershipType: Attribute.Enumeration<['sole-owner', 'co-owner', 'neither']>;
    isBusinessRegistered: Attribute.Enumeration<['yes', 'no']>;
    yearsInBusiness: Attribute.Integer;
    annualRevenue: Attribute.Decimal;
    percentageOfOwnership: Attribute.Integer;
    netProfit: Attribute.Decimal;
    existingLoanDetails: Attribute.Text;
    isClientAShareHolder: Attribute.Enumeration<['yes', 'no']>;
    businessHasDebt: Attribute.Enumeration<['yes', 'no']>;
    companyRegistrationNumber: Attribute.Integer;
    pacraPrintOut: Attribute.Media;
  };
}

export interface ClientDetailsInvestmentProfile extends Schema.Component {
  collectionName: 'components_client_details_investment_profiles';
  info: {
    displayName: 'InvestmentProfile';
  };
  attributes: {
    clientType: Attribute.Enumeration<['individual', 'company']> &
      Attribute.DefaultTo<'individual'>;
    country: Attribute.String;
    certificateOfIncorperation: Attribute.Media;
  };
}

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

export interface FormsApplicationForms extends Schema.Component {
  collectionName: 'components_forms_application_forms';
  info: {
    displayName: 'application-forms';
  };
  attributes: {
    formName: Attribute.String;
    signedForm: Attribute.Media;
    form: Attribute.Relation<
      'forms.application-forms',
      'oneToOne',
      'api::form.form'
    >;
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
    description: '';
  };
  attributes: {
    titleDeed: Attribute.Media;
    dimensions: Attribute.String;
    location: Attribute.String;
    plotNumber: Attribute.String;
  };
}

export interface MediaAndDocumentsLand extends Schema.Component {
  collectionName: 'components_media_and_documents_lands';
  info: {
    displayName: 'land';
    description: '';
  };
  attributes: {
    titleDeed: Attribute.Media;
    hectors: Attribute.String;
    location: Attribute.String;
    plotNumber: Attribute.String;
  };
}

export interface MediaAndDocumentsVehicle extends Schema.Component {
  collectionName: 'components_media_and_documents_vehicles';
  info: {
    displayName: 'vehicle';
    description: '';
  };
  attributes: {
    whitebook: Attribute.Media;
    packingFeePaid: Attribute.Decimal;
    numberPlate: Attribute.String;
    packed: Attribute.Enumeration<['yes', 'no']>;
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
    KYCverificationStatus: Attribute.Boolean & Attribute.DefaultTo<false>;
    outstandingLoansBalance: Attribute.Decimal;
    IDfront: Attribute.Media;
    IDback: Attribute.Media;
    idType: Attribute.Enumeration<['nrc', 'passport', 'driving-license']>;
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
      'client-details.business': ClientDetailsBusiness;
      'client-details.investment-profile': ClientDetailsInvestmentProfile;
      'client-details.salary': ClientDetailsSalary;
      'forms.application-forms': FormsApplicationForms;
      'media-and-documents.collateral': MediaAndDocumentsCollateral;
      'media-and-documents.house': MediaAndDocumentsHouse;
      'media-and-documents.land': MediaAndDocumentsLand;
      'media-and-documents.vehicle': MediaAndDocumentsVehicle;
      'user-profile.client-details': UserProfileClientDetails;
      'user-profile.details': UserProfileDetails;
    }
  }
}
