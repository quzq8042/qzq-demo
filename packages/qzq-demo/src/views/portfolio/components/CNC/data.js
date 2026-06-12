// CNC 代码注解表数据
const cncData = [
  { code: 'G00', description: '快速定位（快速移动）' },
  { code: 'G01', description: '直线插补 / 直线切削' },
  { code: 'G02', description: '顺时针圆弧（CW）' },
  { code: 'G03', description: '逆时针圆弧（CCW）' },
  { code: 'G04', description: '暂停（Dwell）' },
  { code: 'G05.1', description: '预读控制' },
  { code: 'G09', description: '停于精确的位置' },
  { code: 'G10', description: '可编程数据输入' },
  { code: 'G11', description: '可编程数据输入方式取消' },
  { code: 'G15', description: '极坐标指令取消' },
  { code: 'G16', description: '极坐标指令' },
  { code: 'G17', description: '选择XY平面 / XY面赋值' },
  { code: 'G18', description: '选择ZX平面 / XZ面赋值' },
  { code: 'G19', description: '选择YZ平面 / YZ面赋值' },
  { code: 'G20', description: '英制输入' },
  { code: 'G21', description: '公制输入' },
  { code: 'G22', description: '内部行程限位有效' },
  { code: 'G23', description: '内部行程限位无效' },
  { code: 'G27', description: '检查参考点返回' },
  { code: 'G28', description: '参考点复位 / 参考点返回' },
  { code: 'G29', description: '从参考点返回' },
  { code: 'G30', description: '回到第二参考点（换刀点）' },
  { code: 'G32', description: '切螺纹' },
  { code: 'G37', description: '自动刀具长度测量' },
  { code: 'G40', description: '取消半径补偿 / 取消刀尖半径偏置' },
  { code: 'G41', description: '刀具半径左补偿 / 刀尖半径偏置（左侧）' },
  { code: 'G42', description: '刀具半径右补偿 / 刀尖半径偏置（右侧）' },
  { code: 'G43', description: '刀具长度正补偿 / 刀具长度+方向偏移' },
  { code: 'G44', description: '刀具长度负补偿 / 刀具长度-方向偏移' },
  { code: 'G49', description: '刀具长度补偿取消 / 取消刀具长度偏移' },
  { code: 'G50', description: '取消比例缩放 / 修改工件坐标设置主轴最大RPM' },
  { code: 'G50.1', description: '镜像功能取消' },
  { code: 'G51', description: '比例缩放' },
  { code: 'G51.1', description: '镜像功能开启' },
  { code: 'G52', description: '局部坐标系（局部坐标偏移）' },
  { code: 'G53', description: '机床坐标系选择' },
  { code: 'G54', description: '工件坐标系1选择' },
  { code: 'G54.1', description: '扩展坐标系P1-P48' },
  { code: 'G55', description: '工件坐标系2选择' },
  { code: 'G56', description: '工件坐标系3选择' },
  { code: 'G57', description: '工件坐标系4选择' },
  { code: 'G58', description: '工件坐标系5选择' },
  { code: 'G59', description: '工件坐标系6选择' },
  { code: 'G65', description: '宏程序调用' },
  { code: 'G66', description: '宏程序模态调用' },
  { code: 'G67', description: '宏程序模态调用取消' },
  { code: 'G68', description: '坐标系旋转' },
  { code: 'G69', description: '坐标系旋转取消' },
  { code: 'G70', description: '精加工循环' },
  { code: 'G71', description: '内外径粗切循环' },
  { code: 'G72', description: '台阶粗切循环' },
  { code: 'G73', description: '高速深孔钻削循环' },
  { code: 'G74', description: '左螺旋切削循环 / 左旋螺纹攻丝' },
  { code: 'G76', description: '精镗孔循环' },
  { code: 'G80', description: '取消固定循环' },
  { code: 'G81', description: '中心钻循环' },
  { code: 'G82', description: '钻孔固定循环底部暂停 / 反镗孔循环' },
  { code: 'G83', description: '深孔钻削循环' },
  { code: 'G84', description: '右螺旋切削循环 / 右旋螺纹攻丝' },
  { code: 'G85', description: '镗孔循环 / 粗镗孔' },
  { code: 'G86', description: '镗孔循环 / 精镗孔' },
  { code: 'G87', description: '反向镗孔循环' },
  { code: 'G88', description: '镗孔循环' },
  { code: 'G89', description: '镗孔循环' },
  { code: 'G90', description: '使用绝对值命令编程' },
  { code: 'G91', description: '使用增量值命令编程' },
  { code: 'G92', description: '设置工件坐标系' },
  { code: 'G94', description: '每分钟进给' },
  { code: 'G95', description: '每转进给' },
  { code: 'G98', description: '固定循环返回初始点 / 返回起始点' },
  { code: 'G99', description: '固定循环返回R点' },
  { code: 'M00', description: '程序暂停（强制暂停）' },
  { code: 'M01', description: '程序选择暂停 / 选择停止' },
  { code: 'M02', description: '程序结束' },
  { code: 'M03', description: '主轴正转（CW）' },
  { code: 'M04', description: '主轴反转（CCW）' },
  { code: 'M05', description: '主轴停止' },
  { code: 'M06', description: '换刀指令' },
  { code: 'M07', description: '吹气' },
  { code: 'M08', description: '切削液开' },
  { code: 'M09', description: '切削液关' },
  { code: 'M30', description: '程序结束并返回程序头' },
  { code: 'M98', description: '子程序调用' },
  { code: 'M99', description: '子程序结束并返回子程序头' },
  { code: 'F', description: '进给功能或者螺距' },
  { code: 'S', description: '每分钟转速 / 主轴转速' },
  { code: 'T', description: '刀具号' },
  { code: 'D', description: '半径补偿号' },
  { code: 'H', description: '长度补偿号' },
  { code: 'P', description: '调用子程序号或者暂停时间' },
  { code: 'L', description: '循环次数' },
  { code: 'Q', description: '钻孔参数' },
  { code: 'O', description: '程序名' },
  { code: 'R', description: '钻孔起始平面' },
  { code: 'N', description: '程序段号/行号' },
  { code: 'XYZ-ABC', description: '机床工作轴' },
]

// 数控26个英文代表含义数据
const code2Data = [
  { code: 'A', description: '绕X轴旋转' },
  { code: 'B', description: '绕Y轴旋转' },
  { code: 'C', description: '绕Z轴旋转' },
  { code: 'D', description: '补偿号刀偏半径补偿指令' },
  { code: 'E', description: '第2进给功能' },
  { code: 'F', description: '进给速度指令' },
  { code: 'G', description: '指令动作方式' },
  { code: 'H', description: '补偿号的指定' },
  { code: 'I', description: '圆弧中芯X轴坐标' },
  { code: 'J', description: '圆弧中芯Y轴坐标' },
  { code: 'K', description: '圆弧中芯Z轴坐标' },
  { code: 'L', description: '固定循环/子程序重复次数' },
  { code: 'M', description: '辅助功能机床开关指令' },
  { code: 'N', description: '顺序号顺序段序号' },
  { code: 'O', description: '子程序顺序号指定' },
  { code: 'P', description: '暂停/程序号' },
  { code: 'Q', description: '固定循环中的定距' },
  { code: 'R', description: '坐标字圆弧半径的指定' },
  { code: 'S', description: '主轴功能主轴转速指令' },
  { code: 'T', description: '刀偏功能刀偏编号指令' },
  { code: 'U', description: '与X轴平行增量坐标值' },
  { code: 'V', description: '与Y轴平行增量坐标值' },
  { code: 'W', description: '与Z轴平行增量坐标值' },
  { code: 'X', description: '主轴坐标值' },
  { code: 'Y', description: '轴坐标值' },
  { code: 'Z', description: '轴坐标值' },
]

const columns = [
  { prop: 'code', label: '代码', width: 250 },
  { prop: 'description', label: '注解' },
]

// 创建一个上下文，获取指定目录下的所有图片文件
const images = import.meta.glob('./images/*.{jpg,jpeg,png,gif,svg}', { eager: true })

// 处理图片对象，提取文件名作为 key，并按第一个小数点前的数字排序
const imageMap = {}

// 将图片对象转换为数组并按文件名中的数字排序
const sortedEntries = Object.entries(images)
  .map(([path, module]) => {
    // 提取文件名（去掉路径和扩展名）
    const fileName = path.match(/\/([^/]+)\.\w+$/)[1]
    return { fileName, module: module.default }
  })
  .sort((a, b) => {
    // 提取第一个小数点前面的数字进行比较
    const numA = parseInt(a.fileName.split('.')[0]) || 0
    const numB = parseInt(b.fileName.split('.')[0]) || 0
    return numA - numB
  })

// 将排序后的结果存入对象
for (const item of sortedEntries) {
  imageMap[item.fileName] = item.module
}
export const tabs = [
  {
    name: 'code1',
    label: '代码注解表',
    data: cncData,
    columns,
    isTable: true,
  },
  {
    name: 'code2',
    label: '数控26个英文代表含义',
    data: code2Data,
    columns,
    isTable: true,
  },
  {
    name: 'code3',
    label: '图例及刀具',
    data: imageMap,
    isTable: false,
  },
]
