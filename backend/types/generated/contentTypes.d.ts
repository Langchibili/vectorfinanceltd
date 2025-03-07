import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    profilePicture: Attribute.Media;
    details: Attribute.Component<'user-profile.details'>;
    clientDetails: Attribute.Component<'user-profile.client-details'>;
    currentLoan: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::loan.loan'
    >;
    fulfilledLoans: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::loan.loan'
    >;
    repayment: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::repayment.repayment'
    >;
    loans: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::loan.loan'
    >;
    approvals: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::approval.approval'
    >;
    transactionHistories: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::transaction-history.transaction-history'
    >;
    fullnames: Attribute.String;
    salary: Attribute.Component<'client-details.salary'>;
    applicationForms: Attribute.Component<'forms.application-forms', true>;
    formsToFill: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::form.form'
    >;
    activities: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::notification.notification'
    >;
    notifications: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::notification.notification'
    >;
    business: Attribute.Component<'client-details.business'>;
    investments: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::investment.investment'
    >;
    signature: Attribute.Media;
    signingMethod: Attribute.Enumeration<['e-signing', 'manual']> &
      Attribute.DefaultTo<'e-signing'>;
    witnessSignature: Attribute.Media;
    InvestmentProfile: Attribute.Component<'client-details.investment-profile'>;
    investmentDrafts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::investment-draft.investment-draft'
    >;
    investmentDeposits: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::investment-deposit.investment-deposit'
    >;
    investmentWithdraws: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::investment-withdraw.investment-withdraw'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdminNotificationAdminNotification
  extends Schema.CollectionType {
  collectionName: 'admin_notifications';
  info: {
    singularName: 'admin-notification';
    pluralName: 'admin-notifications';
    displayName: 'adminNotification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    loan: Attribute.Relation<
      'api::admin-notification.admin-notification',
      'oneToOne',
      'api::loan.loan'
    >;
    notification: Attribute.Relation<
      'api::admin-notification.admin-notification',
      'oneToOne',
      'api::notification.notification'
    >;
    investment: Attribute.Relation<
      'api::admin-notification.admin-notification',
      'oneToOne',
      'api::investment.investment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::admin-notification.admin-notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::admin-notification.admin-notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppFeatureAppFeature extends Schema.CollectionType {
  collectionName: 'app_features';
  info: {
    singularName: 'app-feature';
    pluralName: 'app-features';
    displayName: 'AppFeature';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    about_feature: Attribute.Blocks & Attribute.Private;
    status: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-feature.app-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::app-feature.app-feature',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiApprovalApproval extends Schema.CollectionType {
  collectionName: 'approvals';
  info: {
    singularName: 'approval';
    pluralName: 'approvals';
    displayName: 'Approval';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    approvalDate: Attribute.DateTime;
    approvalStatus: Attribute.Enumeration<['Approved', 'Rejected', 'Pending']> &
      Attribute.DefaultTo<'Pending'>;
    comments: Attribute.Blocks;
    approvalDocuments: Attribute.Media;
    client: Attribute.Relation<
      'api::approval.approval',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    loan: Attribute.Relation<
      'api::approval.approval',
      'oneToOne',
      'api::loan.loan'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::approval.approval',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::approval.approval',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAuthAuth extends Schema.CollectionType {
  collectionName: 'auths';
  info: {
    singularName: 'auth';
    pluralName: 'auths';
    displayName: 'auth';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    identifier: Attribute.String & Attribute.Unique;
    identifierType: Attribute.Enumeration<['phoneNumber', 'email']>;
    otp: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::auth.auth', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::auth.auth', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiEmailAddressesListEmailAddressesList
  extends Schema.SingleType {
  collectionName: 'email_addresses_lists';
  info: {
    singularName: 'email-addresses-list';
    pluralName: 'email-addresses-lists';
    displayName: 'emailAddressesList';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clientEmailAddresses: Attribute.JSON;
    adminEmailAddresses: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::email-addresses-list.email-addresses-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::email-addresses-list.email-addresses-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFinanceFinance extends Schema.SingleType {
  collectionName: 'finances';
  info: {
    singularName: 'finance';
    pluralName: 'finances';
    displayName: 'finance';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    totalAmountLoanedOut: Attribute.Decimal;
    totalAmountPaid: Attribute.Decimal;
    netProfitLoss: Attribute.Decimal;
    totalAmountUnpaid: Attribute.Decimal;
    totalAmountInvestedIn: Attribute.Decimal;
    TotalInvestedInterestMade: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::finance.finance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::finance.finance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFormForm extends Schema.CollectionType {
  collectionName: 'forms';
  info: {
    singularName: 'form';
    pluralName: 'forms';
    displayName: 'form';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    formName: Attribute.String;
    form: Attribute.Media;
    requiredForSalaryClients: Attribute.Boolean & Attribute.DefaultTo<false>;
    requiredForVehicleClients: Attribute.Boolean & Attribute.DefaultTo<false>;
    requiredForHouseClients: Attribute.Boolean & Attribute.DefaultTo<false>;
    requiredForLandClients: Attribute.Boolean & Attribute.DefaultTo<false>;
    requiredForBussinessClients: Attribute.Boolean & Attribute.DefaultTo<false>;
    requiredForCompanyClients: Attribute.Boolean & Attribute.DefaultTo<false>;
    formSigningDemo: Attribute.Media;
    formSigningGuidelines: Attribute.Blocks;
    clientsWhoCanFill: Attribute.Relation<
      'api::form.form',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::form.form', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::form.form', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiInvestmentInvestment extends Schema.CollectionType {
  collectionName: 'investments';
  info: {
    singularName: 'investment';
    pluralName: 'investments';
    displayName: 'Investments';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amountInvested: Attribute.Decimal;
    periodInMonths: Attribute.Decimal;
    paymentMethod: Attribute.Enumeration<
      ['airtel-money', 'mtn-money', 'card', 'bank', 'cash']
    >;
    dateInvested: Attribute.DateTime;
    investmentInterestRate: Attribute.Decimal;
    client: Attribute.Relation<
      'api::investment.investment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    investment_deposit: Attribute.Relation<
      'api::investment.investment',
      'oneToOne',
      'api::investment-deposit.investment-deposit'
    >;
    investment_withdraw: Attribute.Relation<
      'api::investment.investment',
      'oneToOne',
      'api::investment-withdraw.investment-withdraw'
    >;
    projectedReturns: Attribute.Decimal;
    currency: Attribute.Enumeration<['kwacha', 'dollar']>;
    country: Attribute.String;
    transactionHistories: Attribute.Relation<
      'api::investment.investment',
      'oneToMany',
      'api::transaction-history.transaction-history'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::investment.investment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::investment.investment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvestmentClientInvestmentClient
  extends Schema.CollectionType {
  collectionName: 'investment_clients';
  info: {
    singularName: 'investment-client';
    pluralName: 'investment-clients';
    displayName: 'InvestmentClients';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fullnames: Attribute.String;
    phoneNumber: Attribute.String;
    client: Attribute.Relation<
      'api::investment-client.investment-client',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::investment-client.investment-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::investment-client.investment-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvestmentDepositInvestmentDeposit
  extends Schema.CollectionType {
  collectionName: 'investment_deposits';
  info: {
    singularName: 'investment-deposit';
    pluralName: 'investment-deposits';
    displayName: 'investment-deposits';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    payload: Attribute.JSON;
    investment: Attribute.Relation<
      'api::investment-deposit.investment-deposit',
      'oneToOne',
      'api::investment.investment'
    >;
    transactionID: Attribute.String;
    transactionReference: Attribute.String;
    client: Attribute.Relation<
      'api::investment-deposit.investment-deposit',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::investment-deposit.investment-deposit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::investment-deposit.investment-deposit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvestmentDraftInvestmentDraft
  extends Schema.CollectionType {
  collectionName: 'investment_drafts';
  info: {
    singularName: 'investment-draft';
    pluralName: 'investment-drafts';
    displayName: 'InvestmentDrafts';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amountInvested: Attribute.Decimal;
    periodInMonths: Attribute.Integer;
    investmentInterestRate: Attribute.Decimal;
    clientType: Attribute.Enumeration<['individual', 'company']> &
      Attribute.DefaultTo<'individual'>;
    country: Attribute.String;
    projectedReturns: Attribute.Decimal;
    currency: Attribute.Enumeration<['kwacha', 'dollar']>;
    client: Attribute.Relation<
      'api::investment-draft.investment-draft',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::investment-draft.investment-draft',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::investment-draft.investment-draft',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvestmentWithdrawInvestmentWithdraw
  extends Schema.CollectionType {
  collectionName: 'investment_withdraws';
  info: {
    singularName: 'investment-withdraw';
    pluralName: 'investment-withdraws';
    displayName: 'investment-withdraws';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    payload: Attribute.JSON;
    investment: Attribute.Relation<
      'api::investment-withdraw.investment-withdraw',
      'oneToOne',
      'api::investment.investment'
    >;
    transactionID: Attribute.String;
    transactionReference: Attribute.String;
    client: Attribute.Relation<
      'api::investment-withdraw.investment-withdraw',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::investment-withdraw.investment-withdraw',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::investment-withdraw.investment-withdraw',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiListList extends Schema.SingleType {
  collectionName: 'lists';
  info: {
    singularName: 'list';
    pluralName: 'lists';
    displayName: 'lists';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    governmentMinistries: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::list.list', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::list.list', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiLoanLoan extends Schema.CollectionType {
  collectionName: 'loans';
  info: {
    singularName: 'loan';
    pluralName: 'loans';
    displayName: 'Loans';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    loanAmount: Attribute.Decimal;
    interestRate: Attribute.Decimal;
    loanStatus: Attribute.Enumeration<
      [
        'initiated',
        'pending-collateral-addition',
        'pending-collateral-inspection',
        'accepted',
        'pending-approval',
        'approved',
        'rejected',
        'disbursed',
        'completed',
        'defaulted'
      ]
    > &
      Attribute.DefaultTo<'initiated'>;
    repaymentSchedule: Attribute.JSON;
    loanTerm: Attribute.Integer;
    applicationDate: Attribute.DateTime;
    approvalDate: Attribute.DateTime;
    disbursementDate: Attribute.DateTime;
    dueDate: Attribute.DateTime;
    outstandingAmount: Attribute.Decimal;
    collateral: Attribute.Component<'media-and-documents.collateral'>;
    latePaymentPenalty: Attribute.Decimal;
    loanAgreementDocuments: Attribute.Media;
    client: Attribute.Relation<
      'api::loan.loan',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    repayments: Attribute.Relation<
      'api::loan.loan',
      'oneToMany',
      'api::repayment.repayment'
    >;
    approval: Attribute.Relation<
      'api::loan.loan',
      'oneToOne',
      'api::approval.approval'
    >;
    loanType: Attribute.Relation<
      'api::loan.loan',
      'manyToOne',
      'api::type.type'
    >;
    transactionHstories: Attribute.Relation<
      'api::loan.loan',
      'oneToMany',
      'api::transaction-history.transaction-history'
    >;
    loanCategory: Attribute.Relation<
      'api::loan.loan',
      'manyToOne',
      'api::loan-category.loan-category'
    >;
    clientAskingAmount: Attribute.Decimal;
    loanPurpose: Attribute.Enumeration<
      [
        'Business Expansion',
        'Home Renovation',
        'Education',
        'Medical Expenses',
        'Debt Consolidation',
        'Vehicle Purchase',
        'Equipment Purchase',
        'Inventory Purchase',
        'Working Capital',
        'Marketing and Advertising',
        'Product Development',
        'Debt Refinancing',
        'Hiring and Training',
        'Property Acquisition or Lease',
        'Emergency Funds',
        'Technology Upgrades',
        'Project Funding',
        'Seasonal Demand Preparation',
        'Legal and Regulatory Compliance',
        'Research and Development',
        'Others'
      ]
    >;
    loanPurposeDetails: Attribute.Text;
    salaryPercentage: Attribute.Decimal;
    disbursedAmount: Attribute.Decimal;
    repaymentAmount: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::loan.loan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::loan.loan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiLoanCategoryLoanCategory extends Schema.CollectionType {
  collectionName: 'loan_categories';
  info: {
    singularName: 'loan-category';
    pluralName: 'loan-categories';
    displayName: 'loanCategory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    categoryName: Attribute.String;
    description: Attribute.Blocks;
    loanTypes: Attribute.Relation<
      'api::loan-category.loan-category',
      'oneToMany',
      'api::type.type'
    >;
    loans: Attribute.Relation<
      'api::loan-category.loan-category',
      'oneToMany',
      'api::loan.loan'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::loan-category.loan-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::loan-category.loan-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLoanClientLoanClient extends Schema.CollectionType {
  collectionName: 'loans_clients';
  info: {
    singularName: 'loan-client';
    pluralName: 'loans-clients';
    displayName: 'loansClients';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fullnames: Attribute.String;
    phoneNumber: Attribute.String;
    client: Attribute.Relation<
      'api::loan-client.loan-client',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::loan-client.loan-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::loan-client.loan-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLoansInformationLoansInformation extends Schema.SingleType {
  collectionName: 'loans_informations';
  info: {
    singularName: 'loans-information';
    pluralName: 'loans-informations';
    displayName: 'loansInformation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    defaultSalaryLoanInterestRate: Attribute.Decimal;
    defaultCollaterallLoanInterestRate: Attribute.Decimal;
    defaultCollaterallLoanTerm: Attribute.Decimal;
    defaultSalaryLoanTerm: Attribute.Decimal;
    defaultInvestMentInterestRate: Attribute.Decimal;
    threeMonthsMaximumInvestmentAmount: Attribute.Decimal;
    sixMonthsMaximumInvestmentAmount: Attribute.Decimal;
    twelveMonthsMaximumInvestmentAmount: Attribute.Decimal;
    minimumInvestMentAmount: Attribute.Decimal;
    minimumInvestMentAmountInUSD: Attribute.Decimal;
    defaultUSDInvestMentInterestRate: Attribute.Decimal;
    threeMonthsMaximumInvestmentAmountInUSD: Attribute.Decimal;
    sixMonthsMaximumInvestmentAmountInUSD: Attribute.Decimal;
    twelveMonthsMaximumInvestmentAmountInUSD: Attribute.Decimal;
    lateLoanPaymentPenalty: Attribute.Decimal;
    earlyInvestmentWithdrawPenalty: Attribute.Decimal;
    nineMonthsMaximumInvestmentAmount: Attribute.Decimal;
    nineMonthsMaximumInvestmentAmountInUSD: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::loans-information.loans-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::loans-information.loans-information',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNotificationNotification extends Schema.CollectionType {
  collectionName: 'notifications';
  info: {
    singularName: 'notification';
    pluralName: 'notifications';
    displayName: 'notification';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    type: Attribute.Enumeration<['message', 'alert']> &
      Attribute.DefaultTo<'message'>;
    notifier: Attribute.Relation<
      'api::notification.notification',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    notifiedUsers: Attribute.Relation<
      'api::notification.notification',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNotificationTemplateNotificationTemplate
  extends Schema.CollectionType {
  collectionName: 'notification_templates';
  info: {
    singularName: 'notification-template';
    pluralName: 'notification-templates';
    displayName: 'notificationTemplate';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    body: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notification-template.notification-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notification-template.notification-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentPayment extends Schema.CollectionType {
  collectionName: 'payments';
  info: {
    singularName: 'payment';
    pluralName: 'payments';
    displayName: 'payment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    payload: Attribute.JSON;
    repayment: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'api::repayment.repayment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPhoneNumbersListPhoneNumbersList extends Schema.SingleType {
  collectionName: 'phone_numbers_lists';
  info: {
    singularName: 'phone-numbers-list';
    pluralName: 'phone-numbers-lists';
    displayName: 'phoneNumbersList';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clientNumbers: Attribute.JSON;
    adminNumbers: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::phone-numbers-list.phone-numbers-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::phone-numbers-list.phone-numbers-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRepaymentRepayment extends Schema.CollectionType {
  collectionName: 'repayments';
  info: {
    singularName: 'repayment';
    pluralName: 'repayments';
    displayName: 'Repayment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    repaymentAmount: Attribute.Decimal;
    paymentDate: Attribute.DateTime;
    paymentMethod: Attribute.Enumeration<
      ['cash', 'bank', 'airtel-money', 'mtn-money', 'card', 'mobile-money']
    >;
    latePaymentPenalty: Attribute.Decimal;
    transactionID: Attribute.String;
    receipt: Attribute.Media;
    repaymentType: Attribute.Enumeration<
      ['partial-payment', 'full-payment', 'late-payment']
    >;
    paymentStatus: Attribute.Enumeration<['Paid', 'Failed', 'Pending']> &
      Attribute.DefaultTo<'Pending'>;
    loan: Attribute.Relation<
      'api::repayment.repayment',
      'manyToOne',
      'api::loan.loan'
    >;
    client: Attribute.Relation<
      'api::repayment.repayment',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    proofOfpayment: Attribute.Media;
    payment: Attribute.Relation<
      'api::repayment.repayment',
      'oneToOne',
      'api::payment.payment'
    >;
    transactionReference: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::repayment.repayment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::repayment.repayment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSendNotificationSendNotification
  extends Schema.CollectionType {
  collectionName: 'send_notifications';
  info: {
    singularName: 'send-notification';
    pluralName: 'send-notifications';
    displayName: 'sendNotification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clientsToNotify: Attribute.Relation<
      'api::send-notification.send-notification',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    customNotificationBody: Attribute.Text;
    sendVia: Attribute.Enumeration<['sms', 'email', 'both']> &
      Attribute.DefaultTo<'both'>;
    notificationTemplate: Attribute.Relation<
      'api::send-notification.send-notification',
      'oneToOne',
      'api::notification-template.notification-template'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::send-notification.send-notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::send-notification.send-notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTransactionHistoryTransactionHistory
  extends Schema.CollectionType {
  collectionName: 'transaction_histories';
  info: {
    singularName: 'transaction-history';
    pluralName: 'transaction-histories';
    displayName: 'TransactionHistory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    transactionType: Attribute.Enumeration<
      [
        'loan-application',
        'loan-approval',
        'loan-disbursement',
        'repayment',
        'investment-deposit'
      ]
    >;
    transactionDate: Attribute.DateTime;
    amount: Attribute.Decimal;
    documents: Attribute.Media;
    client: Attribute.Relation<
      'api::transaction-history.transaction-history',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    loan: Attribute.Relation<
      'api::transaction-history.transaction-history',
      'manyToOne',
      'api::loan.loan'
    >;
    description: Attribute.Text;
    investment: Attribute.Relation<
      'api::transaction-history.transaction-history',
      'manyToOne',
      'api::investment.investment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::transaction-history.transaction-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::transaction-history.transaction-history',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTypeType extends Schema.CollectionType {
  collectionName: 'types';
  info: {
    singularName: 'type';
    pluralName: 'types';
    displayName: 'Type';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeName: Attribute.String;
    description: Attribute.Blocks;
    minimumAmount: Attribute.Decimal;
    maximumAmount: Attribute.Decimal;
    defaultInterestRate: Attribute.Decimal;
    loanTermOptions: Attribute.JSON;
    category: Attribute.Relation<
      'api::type.type',
      'manyToOne',
      'api::loan-category.loan-category'
    >;
    loans: Attribute.Relation<'api::type.type', 'oneToMany', 'api::loan.loan'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::type.type', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::type.type', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiVehicleTrackingFeeVehicleTrackingFee
  extends Schema.SingleType {
  collectionName: 'vehicle_tracking_fees';
  info: {
    singularName: 'vehicle-tracking-fee';
    pluralName: 'vehicle-tracking-fees';
    displayName: 'vehicleTrackingFee';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    upfrontTrackingFee: Attribute.Decimal;
    monthlyTrackingFee: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vehicle-tracking-fee.vehicle-tracking-fee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vehicle-tracking-fee.vehicle-tracking-fee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::admin-notification.admin-notification': ApiAdminNotificationAdminNotification;
      'api::app-feature.app-feature': ApiAppFeatureAppFeature;
      'api::approval.approval': ApiApprovalApproval;
      'api::auth.auth': ApiAuthAuth;
      'api::email-addresses-list.email-addresses-list': ApiEmailAddressesListEmailAddressesList;
      'api::finance.finance': ApiFinanceFinance;
      'api::form.form': ApiFormForm;
      'api::investment.investment': ApiInvestmentInvestment;
      'api::investment-client.investment-client': ApiInvestmentClientInvestmentClient;
      'api::investment-deposit.investment-deposit': ApiInvestmentDepositInvestmentDeposit;
      'api::investment-draft.investment-draft': ApiInvestmentDraftInvestmentDraft;
      'api::investment-withdraw.investment-withdraw': ApiInvestmentWithdrawInvestmentWithdraw;
      'api::list.list': ApiListList;
      'api::loan.loan': ApiLoanLoan;
      'api::loan-category.loan-category': ApiLoanCategoryLoanCategory;
      'api::loan-client.loan-client': ApiLoanClientLoanClient;
      'api::loans-information.loans-information': ApiLoansInformationLoansInformation;
      'api::notification.notification': ApiNotificationNotification;
      'api::notification-template.notification-template': ApiNotificationTemplateNotificationTemplate;
      'api::payment.payment': ApiPaymentPayment;
      'api::phone-numbers-list.phone-numbers-list': ApiPhoneNumbersListPhoneNumbersList;
      'api::repayment.repayment': ApiRepaymentRepayment;
      'api::send-notification.send-notification': ApiSendNotificationSendNotification;
      'api::transaction-history.transaction-history': ApiTransactionHistoryTransactionHistory;
      'api::type.type': ApiTypeType;
      'api::vehicle-tracking-fee.vehicle-tracking-fee': ApiVehicleTrackingFeeVehicleTrackingFee;
    }
  }
}
