export default {
  route: {
    dashboard: 'Dashboard',
    fieldManagement: 'Field Management',
    exclusiveTableManagement: 'Exclusive Table Management',
    dataSourceManagement: 'DataSource Management',
    dataSecure: 'Data Security',
    dataAnalysis: 'Data Analysis',
    configManagement: 'Config Management',
    commonConfig: 'Common Config',
    businessDomain: 'Business Domain',
    dataQueryConfig: 'Data Query Config',
    dataSecureConfig: 'Data Security Config',
    cascadingQuery: 'Union Query',
    merchantTradeAnalysis: 'Merchant Trade Analysis',
    orderTypeConfig: 'Order Type Config',
    orderDependenceConfig: 'Order Dependence Config',
    querySourceConfig: 'Query Source Config',
    queryTemplateConfig: 'Query Template Config',
    dataLevelDefine: 'Data Level Define',
    scanSourceConfig: 'Scan Source Config',
    exclusiveTableConfig: 'Exclusive Table Config',
    domainManager: 'Domain Manager',
    serviceManage: 'Service Manage',
    queryOrderConfig: 'Query Config',
    queryOrderRelevance: 'Query Relevance',
    querySourceManage: 'DataSource Manage',
    queryTemplateManage: 'Template Manage',
    queryTemplateAuth: 'Template Auth'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    theme: 'theme'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    shareitId: 'shareit Id',
    shareitPwd: 'shareit Pwd',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips:
      'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description:
      'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips:
      'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips:
      'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips:
      'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1:
      'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2:
      'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips:
      'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description:
      'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export selected items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Theme change',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  errorCodeList: {
    error502: {
      title: 'Logout',
      content:
        'You have logged out. You could stay on this page by clicking "Cancel", or relogin by clicking "Click to Sign in".',
      okStr: 'Relogin',
      cancelStr: 'Cancel'
    }
  },
  common: {
    label: {
      merchantId: 'Merchant ID',
      merchantType: 'Merchant Type',
      merchantName: 'Merchant Name',
      innerName: 'Nickname',
      simpleName: 'Display Name',
      bdContacter: 'BD',
      country: 'Country',
      currency: 'Currency',
      actionAccount: 'Operator',
      actionTime: 'Operated Time',
      actionDesc: 'Operation',
      notes: 'Remark'
    },
    action: 'Action',
    search: 'Search',
    clear: 'Clear',
    status: 'Status',
    requestFailed: 'Request failed: ',
    required: 'Required',
    totalSize: 'Total Number: ',
    totalAmount: 'Total Amount：',
    errorSearchTime: 'The end time must equal and bigger then the start time.',
    save: 'Save',
    cancel: 'Cancel',
    select: 'Select',
    uploadImgFaildDes:
      'The supported image formates are png, jpg, jpeg. The size cannot exceed 5M.',
    sendSuccessDes: 'Successfully!',
    notEmptyTip: "Can't be empty.",
    checkReqParam: ' is empty or invalid, please check.',
    checkPositiveInteger: 'Please enter an integer greater than or equal to 0.',
    checkNotEmpty: 'Mandatory',
    delete: 'Delete',
    add: 'Add',
    all: 'All',

    statusUploading: 'uploading...',
    statusUploadFailed: 'upload failed',
    statusUploadSuccess: 'upload successfully',
    to: '-',
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    placeholderStartDate: 'Start Date',
    placeholderEndDate: 'End Date',

    downloadEmail: {
      title: 'Data processing',
      message:
        'We will send the export to <span class="text-pending">%{email}</span> when it\'s completed, please check it later.'
    },

    actions: {
      back: 'Back',
      backToList: 'Back',
      sure: 'Confirm',
      confirm: 'Confirm',
      cancel: 'Cancel',
      modify: 'Modify',
      search: 'Search',
      seek: 'Search',
      reset: 'Reset',
      details: 'Details',
      check: 'View',
      checkDetails: 'Details',
      previous: 'Previous',
      next: 'Next',
      submit: 'Submit',
      resubmit: 'Resubmit',
      submitResult: 'Submit Result',
      retry: 'Retry',
      upload: 'Upload',
      reupload: 'Reupload',
      selectFile: 'Select File',
      download: 'Download',
      config: 'Config',
      delete: 'Delete',
      close: 'Close',
      reject: 'Reject',
      updateStatus: 'Status Update',
      headConfig: 'Header Setting',
      checkAll: 'Select All',
      edit: 'Modify',
      ok: 'Ok',
      gotIt: 'Got it',
      others: 'Others',
      export: 'Export',
      copy: 'Copy',
      selectTimezone: 'Timezone'
    },

    hint: {
      input: 'please enter',
      select: 'please select'
    }
  },
  countryList: [
    // NOTE keep this for default value [];
  ],
  currencyList: [
    // NOTE keep this for default value [];
  ],
  countryTimezone: [
    // NOTE keep this for default value [];
  ],
  timezoneList: [
    { value: 'UTC', label: 'Coordinated Universal Time' },
    { value: 'IST', label: 'India Standard Time' },
    { value: 'WIB', label: 'Western Indonesian Time' },
    { value: 'SGT', label: 'Singapore Time' },
    { value: 'CST', label: 'China Standard Time' }
  ],
  timezoneOffset: {
    UTC: '0',
    IST: '330',
    WIB: '420',
    SGT: '480',
    CST: '480'
  },
  roleList: [
    { value: 'APD_ROLE', label: '财务' },
    { value: '2C_ROLE', label: '2C客服' },
    { value: 'PO_ROLE', label: '支付运营' },
    { value: 'ITD_ROLE', label: '产品技术' },
    { value: 'BM_ROLE', label: '经营管理' },
    { value: 'VC_ROLE', label: '币运营' },
    { value: 'CT_ROLE', label: '券运营' },
    { value: 'AC_ROLE', label: '清结算' },
    { value: 'MS_ROLE', label: '商户支持' },
    { value: 'ME_ROLE', label: '商务拓展' },
    { value: 'BD_MANAGE', label: '商务管理' },
    { value: 'AD_ADMIN', label: '广告管理员' },
    { value: 'AD_SALE', label: '广告销售' },
    { value: 'AD_OPERATION', label: '广告运营' },
    { value: 'AD_FINANCE', label: '广告财务' },
    { value: 'AD_PRODUCTION', label: '广告产品' },
    { value: 'AD_MEDIA', label: '广告媒体' },
    { value: 'APD_ROLE_REVIEW', label: '财务复核' }
  ],
  uploadImg: {
    exceeds: 'Failed: Upload file size exceeds limit',
    format: 'Failure：Incorrect File Format',
    error: 'Failure：Server internal error',
    see: 'View'
  },
  companyEntityOption: [
    { value: '1', label: 'Cybershell' },
    { value: '2', label: 'FunTech' },
    { value: '3', label: 'PMmax' }
  ],
  companyEntityList: []
}
