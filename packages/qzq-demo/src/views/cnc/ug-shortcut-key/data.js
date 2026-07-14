// UG 快捷键数据
// ============ 草图 ============
const ctData = [
  {
    command: 'Z',
    function: '轮廓',
    description: '以线串模式创建一系列连接的直线和/或圆弧:也就是说，上一条曲线的终点变成下一条曲线的起点。',
  },
  {
    command: 'L',
    function: '直线',
    description: '用约束自动判断创建直线。',
  },
  {
    command: 'O',
    function: '圆',
    description: '通过三点或通过指定其中心和直径创建圆。',
  },
  {
    command: 'P',
    function: '多边形',
    description: '创建具有指定边数的多边形。',
  },
  {
    command: 'R',
    function: '矩形',
    description: '用三种方法中的一种创建矩形。',
  },
  {
    command: 'A',
    function: '圆弧',
    description: '通过三点或通过指定其中心和端点创建圆弧。',
  },
  {
    command: 'F',
    function: '圆角',
    description: '在二或三条曲线之间创建圆角。',
  },
  {
    command: 'E',
    function: '快速延伸',
    description: '将曲线延伸至另一邻近曲线或选定的曲线。',
  },
  {
    command: 'T',
    function: '快速修剪',
    description: '以任一方向将曲线修剪至最近的交点或选定的曲线。',
  },
  {
    command: 'C',
    function: '几何约束',
    description: '将几何约束添加到草图几何图形中。这些约束指定并保持用于草图几何图形或草图几何图形之间的条件。',
  },
  {
    command: 'D',
    function: '快速尺寸',
    description: '通过基于选定的对象和光标的位置自动判断尺寸类型来创建尺寸约束。',
  },
]
// ============ 文件 ============
const fileData = [
  { command: 'Ctrl+N', function: '新建', description: '文件' },
  { command: 'Ctrl+O', function: '打开', description: '文件' },
  { command: 'Ctrl+S', function: '保存', description: '文件' },
  { command: 'Ctrl+Shift+A', function: '另存为', description: '文件' },
  { command: 'Ctrl+1', function: '输入部件', description: '文件--输入' },
  { command: 'Ctrl+2', function: '输入Parasolid', description: '文件--输入' },
  { command: 'Ctrl+8', function: '输入NX-2D', description: '文件--输入' },
  { command: 'Ctrl+9', function: '输入CGM', description: '文件--输入' },
  { command: 'Ctrl+0', function: '输入STL', description: '文件--输入' },
  { command: 'Ctrl+3', function: '输入IGES', description: '文件--输入' },
  { command: 'Ctrl+4', function: '输入STEP214', description: '文件--输入' },
  { command: 'Ctrl+5', function: '输入DXF/DWG', description: '文件--输入' },
  { command: 'Shift+1', function: '输出部件', description: '文件--输出' },
  { command: 'Shift+2', function: '输出Parasolid', description: '文件--输出' },
  { command: 'Shift+9', function: '输出CGM', description: '文件--输出' },
  { command: 'Shift+8', function: '输出JPEG', description: '文件--输出' },
  { command: 'Shift+7', function: '输出TIFF', description: '文件--输出' },
  { command: 'Shift+3', function: '输出IGES', description: '文件--输出' },
  { command: 'Shift+4', function: '输出STEP214', description: '文件--输出' },
  { command: 'Shift+5', function: '输出DXF/DWG', description: '文件--输出' },
  { command: 'Shift+6', function: '输出2D转换', description: '文件--输出' },
  { command: 'Ctrl+G', function: '图形交互编程', description: '文件' },
  { command: 'Ctrl+Shift+G', function: 'Grip排错', description: '文件' },
  { command: 'Ctrl+U', function: '用户函数', description: '文件' },
]

// ============ 编辑 ============
const editData = [
  { command: 'Ctrl+Z', function: '返回上一步', description: '编辑' },
  { command: 'Ctrl+X', function: '裁剪', description: '编辑' },
  { command: 'Ctrl+C', function: '复制', description: '编辑' },
  { command: 'Ctrl+V', function: '粘贴', description: '编辑' },
  { command: 'Ctrl+D', function: '删除', description: '编辑' },
  { command: 'Ctrl+B', function: '隐藏', description: '编辑' },
  { command: 'Ctrl+Shift+B', function: '反隐藏', description: '编辑' },
  { command: 'Ctrl+Shift+K', function: '不隐藏所选的', description: '编辑' },
  { command: 'Ctrl+Shift+U', function: '显示部件中所有的', description: '编辑' },
  { command: 'Ctrl+T', function: '变换', description: '编辑' },
  { command: 'Ctrl+J', function: '对象显示', description: '编辑' },
  { command: 'Shift+E', function: '编辑曲线', description: '编辑--曲线' },
  { command: 'Shift+T', function: '裁剪曲线', description: '编辑--曲线' },
  { command: 'Shift+C', function: '裁剪角', description: '编辑--曲线' },
  { command: 'Shift+D', function: '分割曲线', description: '编辑--曲线' },
  { command: 'Shift+L', function: '弧长', description: '编辑--曲线' },
  { command: 'Shift+Alt+L', function: '曲面扩大', description: '编辑' },
  { command: 'Shift+V', function: '去除参数', description: '编辑' },
]

// ============ 视图 ============
const viewData = [
  { command: 'F5', function: '刷新', description: '视图' },
  { command: 'Ctrl+F', function: '拟合', description: '视图' },
  { command: 'Ctrl+Shift+Z', function: '缩放', description: '视图' },
  { command: 'Ctrl+R', function: '旋转', description: '视图' },
  { command: 'F3', function: '截面', description: '视图' },
  { command: 'Ctrl+Shift+Q', function: '生成快速图片', description: '视图' },
  { command: 'Ctrl+Shift+H', function: '高质量图片', description: '视图' },
]

// ============ 格式 ============
const formatData = [
  { command: 'Ctrl+L', function: '层的设置', description: '格式' },
  { command: 'Ctrl+Shift+V', function: '在制图可见', description: '格式' },
  { command: 'Ctrl+Shift+L', function: '移到层', description: '格式' },
  { command: 'Ctrl+Alt+L', function: '复制至层', description: '格式' },
  { command: 'Ctrl+E', function: '表达式', description: '格式' },
  { command: 'Ctrl+Shift+R', function: '开始记录宏', description: '格式--宏' },
  { command: 'Ctrl+Shift+P', function: '回放宏', description: '格式--宏' },
  { command: 'Ctrl+Shift+S', function: '步长宏', description: '格式--宏' },
  { command: 'Ctrl+C', function: '弧/圆', description: '格式' },
  { command: 'Shift+Q', function: '缠绕/展开', description: '格式' },
  { command: 'C', function: '分析点', description: '格式' },
  { command: 'G', function: '删除面', description: '格式' },
  { command: 'F', function: '替换面', description: '格式' },
]

// ============ 工作坐标系 ============
const wcsData = [
  { command: 'Alt+0', function: '原点', description: '工作坐标系' },
  { command: 'Alt+9', function: '旋转', description: '工作坐标系' },
  { command: 'Alt+8', function: '方位', description: '工作坐标系' },
  { command: 'Alt+7', function: '显示', description: '工作坐标系' },
  { command: 'Alt+6', function: '保存', description: '工作坐标系' },
]

// ============ 插入曲线 ============
const insertData = [
  { command: 'S', function: '在任务环境中绘制草图', description: '插入' },
  { command: 'B', function: '基本曲线', description: '插入--曲线' },
  // { command: 'S', function: '', description: '插入--曲线' },
  { command: 'P', function: '点', description: '插入--曲线' },
  // { command: 'Q', function: '点集', description: '插入--曲线' },
  // { command: 'Shift+R', function: '矩形', description: '插入--曲线' },
  // { command: 'Shift+Y', function: '多边形', description: '插入--曲线' },
  // { command: 'Shift+H', function: '螺旋', description: '插入--曲线' },
  // { command: 'Shift+W', function: '规律曲线', description: '插入--曲线' },
  { command: 'Shift+O', function: '偏置曲线', description: '插入--曲线操作' },
  { command: 'Shift+J', function: '合并曲线', description: '插入--曲线操作' },
  { command: 'Shift+M', function: '简化曲线', description: '插入--曲线操作' },
  { command: 'Shift+B', function: '桥接曲线', description: '插入--曲线操作' },
  { command: 'Shift+P', function: '投影曲线', description: '插入--曲线操作' },
  // { command: 'Shift+N', function: '组合投影', description: '插入--曲线操作' },
  { command: 'Shift+I', function: '相交曲线', description: '插入--曲线操作' },
  // { command: 'Shift+S', function: '截面', description: '插入--曲线操作' },
  { command: 'Shift+X', function: '抽取曲线', description: '插入--曲线操作' },
  // { command: 'Shift+F', function: '在曲面上偏置', description: '插入--曲线操作' },
]

// ============ 成型特征 ============
const featureData = [
  { command: 'X', function: '拉伸', description: '成型特征' },
  { command: 'V', function: '回转', description: '成型特征' },
  { command: 'Alt+D', function: '基准平面', description: '成型特征' },
  { command: 'Alt+W', function: '扫掠向导', description: '成型特征' },
  { command: 'Alt+H', function: '孔', description: '成型特征' },
  { command: 'Alt+B', function: '圆台', description: '成型特征' },
  { command: 'Alt+K', function: '腔体', description: '成型特征' },
  { command: 'Alt+L', function: '键槽', description: '成型特征' },
  { command: 'Alt+G', function: '沟槽', description: '成型特征' },
  { command: 'Alt+X', function: '提取', description: '成型特征' },
  { command: 'K', function: '长方体', description: '成型特征' },
  { command: 'Y', function: '圆柱', description: '成型特征' },
  { command: 'O', function: '圆锥', description: '成型特征' },
  { command: 'R', function: '球', description: '成型特征' },
]

// ============ 特征操作 ============
const featureOpData = [
  { command: 'Alt+A', function: '缩放体', description: '特征操作' },
  { command: 'H', function: '抽壳', description: '特征操作' },
  { command: 'Alt+U', function: '合并', description: '特征操作' },
  { command: 'Alt+S', function: '减去', description: '特征操作' },
  { command: 'Alt+I', function: '相交', description: '特征操作' },
  { command: 'Alt+T', function: '拔锥', description: '特征操作' },
  { command: 'Alt+Y', function: '体拔模', description: '特征操作' },
  { command: 'Alt+E', function: '边圆角', description: '特征操作' },
  { command: 'Alt+F', function: '面圆角', description: '特征操作' },
  { command: 'Shift+Alt+F', function: '软圆角', description: '特征操作' },
  { command: 'Alt+C', function: '倒角', description: '特征操作' },
  { command: 'I', function: '引用', description: '特征操作' },
  { command: 'E', function: '缝合', description: '特征操作' },
  { command: 'Alt+M', function: '简化', description: '特征操作' },
  { command: 'Alt+O', function: '偏置表面', description: '特征操作' },
  { command: 'T', function: '裁剪', description: '特征操作' },
  { command: 'Alt+P', function: '分割', description: '特征操作' },
]

// ============ 自由形式特征 ============
const freeFormData = [
  { command: 'Shift+Alt+P', function: '通过点', description: '自由形式特征' },
  { command: 'L', function: '直纹面', description: '自由形式特征' },
  { command: 'U', function: '通过曲线', description: '自由形式特征' },
  { command: 'M', function: '过曲线网格', description: '自由形式特征' },
  { command: 'W', function: '扫掠', description: '自由形式特征' },
  { command: 'Shift+Alt+S', function: '截面', description: '自由形式特征' },
  { command: 'Shift+Alt+B', function: '桥接', description: '自由形式特征' },
  { command: 'Shift+Alt+N', function: 'N-边表面', description: '自由形式特征' },
  { command: 'Shift+Alt+X', function: '延伸', description: '自由形式特征' },
  { command: 'Shift+Alt+W', function: '按规律延伸', description: '自由形式特征' },
  { command: 'Shift+Alt+O', function: '偏置', description: '自由形式特征' },
  { command: 'Shift+Alt+R', function: '大致偏置', description: '自由形式特征' },
  { command: 'Shift+Alt+Q', function: '合并', description: '自由形式特征' },
  { command: 'Shift+Alt+P', function: '下扑', description: '自由形式特征' },
  { command: 'Shift+Alt+4', function: '由四点决定的曲面', description: '自由形式特征' },
  { command: 'Ctrl+Alt+F', function: '样式过度', description: '自由形式特征' },
  { command: 'Shift+Alt+G', function: '一般变形', description: '自由形式特征' },
  { command: 'Shift+Alt+T', function: '裁剪的片体', description: '自由形式特征' },
  { command: 'Ctrl+Alt+F', function: '圆角', description: '自由形式特征' },
  { command: 'Shift+Alt+M', function: '中性面', description: '自由形式特征' },
  { command: 'Alt+1', function: '1×1表面', description: '自由形式特征--工业设计表面' },
  { command: 'Alt+2', function: '1×2表面', description: '自由形式特征--工业设计表面' },
  { command: 'Alt+3', function: '2×0表面', description: '自由形式特征--工业设计表面' },
  { command: 'Alt+4', function: '2×2表面', description: '自由形式特征--工业设计表面' },
  { command: 'Alt+5', function: 'n×n表面', description: '自由形式特征--工业设计表面' },
]

// ============ 显示/视图方向 ============
const displayData = [
  { command: '1', function: '静态线框', description: '显示' },
  { command: '2', function: '带边着色', description: '显示' },
  { command: '3', function: '等轴侧视图', description: '视图方向' },
  { command: '4', function: '俯视图', description: '视图方向' },
  { command: '5', function: '前视图', description: '视图方向' },
  { command: '6', function: '侧视图', description: '视图方向' },
  { command: '7', function: '后视图', description: '视图方向' },
  { command: '8', function: '仰视图', description: '视图方向' },
]

// ============ 信息 ============
const infoData = [{ command: 'Ctrl+I', function: '对象', description: '信息' }]

// ============ 分析 ============
const analysisData = [
  { command: 'N', function: '距离', description: '分析' },
  { command: 'A', function: '角度', description: '分析' },
]

// ============ 预设置 ============
const prefsData = [
  { command: 'Ctrl+Shift+J', function: '对象预设置', description: '预设置' },
  { command: 'Ctrl+Shift+T', function: '选择预设置', description: '预设置' },
]

// ============ 应用 ============
const appData = [
  { command: 'Ctrl+M', function: '建模', description: '应用' },
  { command: 'Ctrl+Shift+D', function: '制图', description: '应用' },
  { command: 'Ctrl+Alt+M', function: '加工', description: '应用' },
]

const columns = [
  { prop: 'command', label: '快捷命令', width: 150 },
  { prop: 'function', label: '功能', width: 250 },
  { prop: 'description', label: '详细描述' },
]

export const tabs = [
  {
    name: 'ct',
    label: '草图',
    data: ctData,
    columns,
  },
  {
    name: 'file',
    label: '文件',
    data: fileData,
    columns,
  },
  {
    name: 'edit',
    label: '编辑',
    data: editData,
    columns,
  },
  {
    name: 'view',
    label: '视图',
    data: viewData,
    columns,
  },
  {
    name: 'format',
    label: '格式',
    data: formatData,
    columns,
  },
  {
    name: 'wcs',
    label: '工作坐标系',
    data: wcsData,
    columns,
  },
  {
    name: 'insert',
    label: '插入-曲线',
    data: insertData,
    columns,
  },
  {
    name: 'feature',
    label: '成型特征',
    data: featureData,
    columns,
  },
  {
    name: 'featureOp',
    label: '特征操作',
    data: featureOpData,
    columns,
  },
  {
    name: 'freeForm',
    label: '自由形式特征',
    data: freeFormData,
    columns,
  },
  {
    name: 'display',
    label: '显示/视图方向',
    data: displayData,
    columns,
  },
  {
    name: 'info',
    label: '信息',
    data: infoData,
    columns,
  },
  {
    name: 'analysis',
    label: '分析',
    data: analysisData,
    columns,
  },
  {
    name: 'prefs',
    label: '预设置',
    data: prefsData,
    columns,
  },
  {
    name: 'app',
    label: '应用',
    data: appData,
    columns,
  },
]
