export default {
  route: {
    dashboard: '首页',
    fieldManagement: '字段管理',
    exclusiveTableManagement: '排除表管理',
    dataSourceManagement: '数据源管理',
    dataSecure: '数据安全',
    dataAnalysis: '数据分析',
    configManagement: '配置管理',
    commonConfig: '公共配置',
    businessDomain: '业务域配置',
    dataQueryConfig: '数据查询配置',
    dataSecureConfig: '数据安全配置',
    cascadingQuery: '联合查询',
    merchantTradeAnalysis: '商户交易分析',
    orderTypeConfig: '订单号类型配置',
    orderDependenceConfig: '订单号依赖配置',
    querySourceConfig: '查询数据源配置',
    queryTemplateConfig: '查询模板配置',
    dataLevelDefine: '数据级别定义',
    scanSourceConfig: '扫描数据源配置',
    exclusiveTableConfig: '扫描过滤表配置',
    domainManager: '域负责人',
    serviceManage: '服务管理',
    queryOrderConfig: '查询配置',
    queryOrderRelevance: '查询关联配置',
    querySourceManage: '数据源配置',
    queryTemplateManage: '模版管理',
    queryTemplateAuth: '模版授权'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    shareitId: 'shareit域账号',
    shareitPwd: 'shareit域账号密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  guide: {
    description:
      '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips:
      '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips:
      '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2:
      '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips:
      '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description:
      '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  errorCodeList: {
    error502: {
      title: '确定登出',
      content: '你已被登出，可以取消继续留在该页面，或者重新登录',
      okStr: '重新登录',
      cancelStr: '取消'
    }
  },
  common: {
    label: {
      merchantId: '商户号',
      merchantType: '商户类型',
      merchantName: '商户名称',
      innerName: '内部名称',
      simpleName: '显示名称',
      bdContacter: '商务拓展',
      country: '国家',
      currency: '货币',
      actionAccount: '操作账号',
      actionTime: '操作时间',
      actionDesc: '操作行为',
      notes: '备注'
    },
    action: '操作',
    search: '查询',
    clear: '清空查询条件',
    status: '状态',
    requestFailed: '请求失败: ',
    required: '必填',
    totalSize: '总条数: ',
    totalAmount: '总金额：',
    errorSearchTime: '结束时间必须大于等于开始时间',
    save: '保存',
    cancel: '取消',
    select: '选择',
    uploadImgFaildDes: '图片只能上传png、jpg、jpeg,  图片大小不能超过5M.',
    sendSuccessDes: '成功!',
    notEmptyTip: '不能为空',
    checkReqParam: '为空或不正确，请检查.',
    checkPositiveInteger: '请输入大于等于0的整数',
    checkNotEmpty: '必填项',
    delete: '删除',
    add: '添加',
    all: '全部',

    statusUploading: '上传中...',
    statusUploadFailed: '上传失败',
    statusUploadSuccess: '上传成功',
    to: '-',
    today: '今天',
    yesterday: '昨天',
    last7Days: '过去7天',
    last30Days: '过去30天',
    placeholderStartDate: '开始日期',
    placeholderEndDate: '结束日期',
    heavyRunInfo: '请先与技术同学确认可重跑',
    sureRun: '已确认可重跑',
    notYetConfirm: '尚未确认',
    cancelReRun: '已取消重跑',
    downloadEmail: {
      title: '数据处理中',
      message:
        '数据处理完成后，我们会将导出文件发送至您的邮箱 <span class="text-pending">%{email}</span>，请注意查收。'
    },

    actions: {
      back: '返回',
      backToList: '返回列表',
      sure: '确定',
      confirm: '确认',
      cancel: '取消',
      modify: '修改',
      search: '查询',
      seek: '搜索',
      reset: '重置',
      details: '详情',
      check: '查看',
      checkDetails: '查看详情',
      previous: '上一步',
      next: '下一步',
      submit: '提交',
      resubmit: '重新提交',
      submitResult: '提交结果',
      retry: '重试',
      upload: '上传',
      reupload: '重新上传',
      selectFile: '选择文件',
      download: '下载',
      config: '配置',
      delete: '删除',
      close: '关闭',
      reject: '驳回',
      updateStatus: '状态更新',
      headConfig: '表头设置',
      checkAll: '全选',
      edit: '编辑',
      ok: '好的',
      gotIt: '知道了',
      others: '其他',
      export: '导出',
      copy: '复制',
      selectTimezone: '选择时区'
    },

    hint: {
      input: '请输入',
      select: '请选择'
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
    { value: 'UTC', label: '世界标准时间' },
    { value: 'IST', label: '印度标准时间' },
    { value: 'WIB', label: '西印尼标准时间' },
    { value: 'SGT', label: '新加坡标准时间' },
    { value: 'CST', label: '中国标准时间' }
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
    see: '查看'
  },
  companyEntityOption: [
    { value: '1', label: 'Cybershell' },
    { value: '2', label: 'FunTech' },
    { value: '3', label: 'PMmax' }
  ],
  companyEntityList: []
}
