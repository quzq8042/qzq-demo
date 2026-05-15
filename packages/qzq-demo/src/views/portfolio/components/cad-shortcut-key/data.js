// CAD 快捷命令数据

// 绘制命令数据
const drawData = [
  { command: 'L', function: '直线', description: '创建直线段' },
  { command: 'XL', function: '构造线', description: '创建无限长的线' },
  { command: 'PL', function: '多线段', description: '创建二维多段线' },
  { command: 'POL', function: '多边形', description: '创建等边闭合多段线' },
  { command: 'REC', function: '矩形', description: '创建矩形多段线' },
  { command: 'ARC', function: '圆弧', description: '用三点创建圆弧' },
  { command: 'C', function: '圆', description: '用圆心和半径创建圆' },
  { command: 'DON', function: '圆环', description: '创建圆对象' },
  { command: 'REVC', function: '修订云线', description: '通过绘制自由形状的多段线创建修订云线' },
  { command: 'SPL', function: '样式曲线', description: '创建通过或接近指定点的平滑曲线' },
  { command: 'EL', function: '椭圆', description: '创建椭圆或椭圆弧' },
  { command: 'B', function: '块', description: '从选定对象创建块定义' },
  { command: 'PO', function: '点', description: '创建多个点对象' },
  { command: 'DDPT', function: '点样式', description: '修改点样式' },
  { command: 'DIV', function: '定数等分', description: '沿对象的长度或周长创建等间隔排列的点对象或块' },
  { command: 'ME', function: '定距等分', description: '沿对象的长度或周长按指定间隔创建点对象或块' },
  { command: 'H', function: '图案填充/渐变色', description: '使用填充图案或填充对封闭区域或选定对象进行填充' },
  { command: 'HE', function: '修改填充/渐变色', description: '修改已填充的样式' },
  { command: 'MT', function: '多行文字', description: '创建多行文字对象' },
  { command: 'TEXT', function: '单行文字', description: '创建单行文字对象' },
  { command: 'REG', function: '面域', description: '将包含封闭区域的对象转换为面域对象' },
  { command: 'WIP', function: '区域覆盖/遮罩', description: '创建区域覆盖对象' },
  { command: 'MA', function: '特性匹配/格式刷', description: '将选定对象的特性应用到其他对象' },
  { command: 'G', function: '组', description: '创建对象组' },
]

// 标注命令数据
const dimensionData = [
  { command: 'D', function: '标注样式管理器', description: '修改标注样式' },
  { command: 'DIM', function: '标注', description: '在单个命令会话中创建多种类型的标注' },
  { command: 'DLI', function: '线性', description: '创建线性标注 水平/垂直' },
  { command: 'DAL', function: '对齐', description: '创建对齐线性标注' },
  { command: 'DAR', function: '弧长', description: '创建弧长标注' },
  { command: 'DRA', function: '半径', description: '创建圆或圆弧的半径标注' },
  { command: 'DDI', function: '直径', description: '创建圆或圆弧的直径标注' },
  { command: 'DAN', function: '角度', description: '创建角度标注' },
  { command: 'LE', function: '快速引线', description: '创建快速引线' },
  { command: 'MLE', function: '多重引线', description: '创建多重引线' },
]

// 修改命令数据
const modifyData = [
  { command: 'E', function: '删除', description: '从图形删除对象' },
  { command: 'CO', function: '复制', description: '将对象复制到指定方向上的指定距离处' },
  { command: 'MI', function: '镜像', description: '创建选定对象的镜像副本' },
  { command: 'O', function: '偏移', description: '创建同心圆、平行线和等距曲线' },
  { command: 'AR', function: '矩形阵列', description: '按任意行、列和层级组合分布对象副本' },
  { command: 'M', function: '移动', description: '将对象在指定方向上移动指定距离' },
  { command: 'RO', function: '旋转', description: '绕基点旋转对象' },
  { command: 'SC', function: '缩放', description: '放大或缩小选定对象，缩放后保持对象的比例不变' },
  { command: 'S', function: '拉伸', description: '通过向左绿色窗选或多边形框选的方式拉伸对象' },
  { command: 'TR', function: '修剪', description: '修剪对象以适合其他对象的边' },
  { command: 'EX', function: '延伸', description: '延伸对象以适合其他对象的边' },
  { command: 'LEN', function: '拉长', description: '修改对象的长度和圆弧的包含角' },
  { command: 'J', function: '合并', description: '合并相似对象以形成一个完整的对象' },
  { command: 'X', function: '分解', description: '将复合对象分解为其部件对象' },
  { command: 'F', function: '圆角', description: '给对象加圆角' },
  { command: 'CHA', function: '倒角', description: '给对象加倒角' },
  { command: 'BLE', function: '光顺曲线', description: '在两条开放曲线的端点之间创建相切或平滑的样条曲线' },
  { command: 'AL', function: '对齐', description: '在二维和三维空间中将对象与其他对象对齐' },
  { command: 'BR', function: '打断', description: '在两点之间打断选定的对象' },
  { command: 'BREAKATPOINT', function: '打断于点', description: '在一点打断选定的对象' },
  { command: 'DR', function: '绘图顺序', description: '修改绘制顺序' },
  { command: 'RE', function: '重生成', description: '重新生成当前视图' },
]

// 常用快捷键数据
const shortcutData = [
  { command: 'ESC', function: '放弃选择，取消命令', description: '放弃选择，取消命令' },
  { command: 'Enter', function: '确定/重复上次', description: '确定/重复上次' },
  { command: '空格', function: '某些时刻等同于回车', description: '某些时刻等同于回车' },
  { command: 'Shift + 左键', function: '减选', description: '减选' },
  { command: 'Ctrl + N', function: '新建', description: '新建' },
  { command: 'Ctrl + O', function: '打开', description: '打开' },
  { command: 'Ctrl + S', function: '保存', description: '保存' },
  { command: 'Ctrl + P', function: '打印', description: '打印' },
  { command: 'Ctrl + A', function: '全选', description: '全选' },
  { command: 'Ctrl + C', function: '复制', description: '复制' },
  { command: 'Ctrl + X', function: '剪切', description: '剪切' },
  { command: 'Ctrl + V', function: '粘贴', description: '粘贴' },
  { command: 'Ctrl + Z', function: '撤销', description: '撤销' },
  { command: 'Ctrl + Y', function: '重做', description: '重做' },
  { command: 'Ctrl + 1', function: '特性', description: '特性' },
  { command: 'OP', function: '选项', description: '选项' },
  { command: 'DS', function: '草图设置', description: '草图设置' },
  { command: 'MV', function: '插入视图', description: '将包含命名视图的视口放到当前布局上。视口将自动指定标准比例和锁定。' },
  { command: 'V', function: '视图管理器', description: '视图管理器' },
]

const columns = [
  { prop: 'command', label: '快捷命令', width: 150 },
  { prop: 'function', label: '功能', width: 250 },
  { prop: 'description', label: '详细描述' },
]

export const tabs = [
  {
    name: 'draw',
    label: '绘制命令',
    data: drawData,
    columns,
  },
  {
    name: 'modify',
    label: '修改命令',
    data: modifyData,
    columns,
  },
  {
    name: 'dimension',
    label: '标注命令',
    data: dimensionData,
    columns,
  },
  {
    name: 'command',
    label: '常用快捷键',
    data: shortcutData,
    columns,
  },
]
