const images = import.meta.glob('./icons/*.{jpg,jpeg,png,gif,svg}', { eager: true })
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

export const strategyCategories = [
  {
    name: 'mill_planar',
    chinese: '平面铣削',
    icon: '🔹',
    tips: '平面铣削适用于工件的粗加工和半精加工，可高效去除大量材料',
    features: [
      {
        icon: imageMap['2'],
        name: '底壁铣',
        description: '切削底面和壁。选择底面和/或壁几何体。要移除的材料由切削区域底面和毛坯厚度确定。',
        params: [
          {
            icon: '📐',
            name: '切削模式',
            description: '控制刀具路径生成方式',
            value: '跟随周边 / 跟随部件 / 单向 / 往复 / 轮廓',
            tip: '粗加工推荐跟随周边，精加工推荐轮廓',
          },
          {
            icon: '📏',
            name: '步距',
            description: '相邻切削路径之间的距离',
            value: '刀具直径的60-75%',
            tip: '粗加工取70-75%，精加工取60-65%',
          },
          {
            icon: '⬇️',
            name: '毛坯厚度',
            description: '底面待切削总厚度',
            value: '根据实际尺寸附加余量',
            tip: '粗加工留0.15mm精加工余量',
          },
          {
            icon: '⬇️',
            name: '每刀切削深度',
            description: '每层最大切削深度',
            value: '0.3-1.5mm',
            tip: '精加工0.1-0.3mm，粗加工0.5-1.5mm',
          },
          {
            icon: '⬇️',
            name: 'Z向深度偏置',
            description: '底部切削深度偏移量',
            value: '0（默认）或负值',
            tip: '负值表示过切，正值表示留余量',
          },
          { icon: '⚡', name: '进给率', description: '刀具进给速度', value: '800-2000 mm/min', tip: '铝合金取2000，钢件取800-1200' },
          { icon: '🔄', name: '主轴转速', description: '主轴旋转速度', value: '3000-8000 rpm', tip: '硬质合金刀具可提高转速' },

          {
            icon: '⚙️',
            name: '切削参数',
            description: '包含策略、余量、拐角等核心切削设置',
            value: '策略→深度优先；余量→开粗0.15,精光先精底再精壁；拐角→光顺0.5-1mm',
            tip: '深度优先减少抬刀，拐角光顺保护刀具',
          },
          {
            icon: '🚶',
            name: '非切削移动',
            description: '包含进刀、退刀、起点/钻点、转移/快速等核心非切削移动设置',
            value: '进刀→螺旋/斜线（φ≤30°）；退刀→抬刀；转移→前一平面3-5mm',
            tip: '封闭区域用螺旋进刀，开放区域用线性进刀',
          },
        ],
        scenarios: ['型腔粗加工', '平面精加工', '台阶面加工', '薄壁零件加工'],
        steps: ['打开UG加工模块', '创建底壁铣操作', '选择几何体（部件、毛坯、检查体）', '选择刀具', '设置切削参数', '生成刀路', '仿真验证'],
      },
      {
        icon: imageMap['3'],
        name: '带边界面铣',
        description: '垂直于平面边界定义区域内的固定刀轴进行切削。选择面、曲线或点来定义与要切削层的刀轴垂直的平面边界。建议用于线框模型。',
        params: [
          {
            icon: '📐',
            name: '切削模式',
            description: '控制刀具路径生成方式',
            value: '跟随周边 / 轮廓 / 单向 / 往复',
            tip: '精加工用轮廓，粗加工用跟随周边',
          },
          {
            icon: '📏',
            name: '步距',
            description: '相邻切削路径之间的距离',
            value: '刀具直径的60-75%',
            tip: '粗加工取70-75%，精加工取60-65%',
          },
          {
            icon: '⬇️',
            name: '毛坯距离',
            description: '底面待切削总厚度',
            value: '根据实际尺寸附加余量',
            tip: '粗加工留0.15mm精加工余量',
          },
          {
            icon: '⬇️',
            name: '每刀切削深度',
            description: '每层最大切削深度',
            value: '0.3-1.5mm',
            tip: '精加工0.1-0.3mm，粗加工0.5-1.5mm',
          },
          {
            icon: '⬇️',
            name: '最终底面余量',
            description: '底部最终留量',
            value: '0（默认）或负值',
            tip: '负值表示过切，正值表示留余量',
          },
          { icon: '⚡', name: '进给率', description: '刀具进给速度', value: '800-2000 mm/min', tip: '铝合金取2000，钢件取800-1200' },
          { icon: '🔄', name: '主轴转速', description: '主轴旋转速度', value: '3000-8000 rpm', tip: '硬质合金刀具可提高转速' },

          {
            icon: '⚙️',
            name: '切削参数',
            description: '包含策略、余量、拐角等核心切削设置',
            value: '策略→深度优先；余量→开粗0.15,精光先精底再精壁；拐角→光顺0.5-1mm',
            tip: '深度优先减少抬刀，拐角光顺保护刀具',
          },
          {
            icon: '🚶',
            name: '非切削移动',
            description: '包含进刀、退刀、起点/钻点、转移/快速等核心非切削移动设置',
            value: '进刀→螺旋/斜线（φ≤30°）；退刀→抬刀；转移→前一平面3-5mm',
            tip: '封闭区域用螺旋进刀，开放区域用线性进刀',
          },
        ],
        scenarios: ['模具型腔精加工', '高精度平面加工', '侧壁要求严格的零件'],
        steps: ['创建带边界面铣操作', '指定底面和边界', '设置加工参数', '生成刀路', '验证加工效果'],
      },
      {
        icon: imageMap['4'],
        name: '平面铣',
        description:
          '移除垂直于固定刀轴的平面切削层中的材料。定义平行于底面的部件边界。部件边界确定关键切削层。选择毛坯边界。选择底面来定义底部切削层。建议通常用于粗加工带直壁的棱柱部件上的大量材料。',
        params: [
          {
            icon: '📐',
            name: '切削模式',
            description: '控制刀具路径生成方式',
            value: '跟随周边 / 跟随部件 / 单向 / 往复 / 轮廓',
            tip: '粗加工推荐跟随周边，精加工推荐轮廓',
          },
          {
            icon: '📏',
            name: '步距',
            description: '相邻切削路径之间的距离',
            value: '刀具直径的60-75%',
            tip: '粗加工取70-75%，精加工取60-65%',
          },
          {
            icon: '⬇️',
            name: '切削层',
            description: '每层最大切削深度',
            value: '0.3-1.5mm',
            tip: '精加工0.1-0.3mm，粗加工0.5-1.5mm',
          },
          { icon: '⚡', name: '进给率', description: '刀具进给速度', value: '800-2000 mm/min', tip: '铝合金取2000，钢件取800-1200' },
          { icon: '🔄', name: '主轴转速', description: '主轴旋转速度', value: '3000-8000 rpm', tip: '硬质合金刀具可提高转速' },

          {
            icon: '⚙️',
            name: '切削参数',
            description: '包含策略、余量、拐角等核心切削设置',
            value: '策略→深度优先；余量→开粗0.15,精光先精底再精壁；拐角→光顺0.5-1mm',
            tip: '深度优先减少抬刀，拐角光顺保护刀具',
          },
          {
            icon: '🚶',
            name: '非切削移动',
            description: '包含进刀、退刀、起点/钻点、转移/快速等核心非切削移动设置',
            value: '进刀→螺旋/斜线（φ≤30°）；退刀→抬刀；转移→前一平面3-5mm',
            tip: '封闭区域用螺旋进刀，开放区域用线性进刀',
          },
        ],
        scenarios: ['简单平面加工', '槽加工', '外形轮廓加工', '2.5轴零件加工'],
        steps: ['创建平面铣操作', '定义边界', '选择刀具', '设置参数', '生成刀路'],
      },
      {
        icon: imageMap['5'],
        name: '平面轮廓铣',
        description:
          '使用"轮廓"切削模式来生成单刀路和沿部件边界描绘轮廓的多层平面刀路。定义平行于底面的部件边界。选择底面以定义底部切削层。可以使用带跟踪点的用户定义铣刀。建议用于以下平面壁或边。切削方向-混合',
        params: [
          {
            icon: '⬇️',
            name: '部件余量',
            description: '底部最终留量',
            value: '根据实际附加余量',
            tip: '粗加工留0.15mm精加工余量',
          },
          { icon: '⚡', name: '进给率', description: '刀具进给速度', value: '800-2000 mm/min', tip: '铝合金取2000，钢件取800-1200' },
          {
            icon: '⬇️',
            name: '公共',
            description: '每层最大切削深度',
            value: '0.3-1.5mm',
            tip: '精加工0.1-0.3mm，粗加工0.5-1.5mm',
          },
          { icon: '🔄', name: '主轴转速', description: '主轴旋转速度', value: '3000-8000 rpm', tip: '硬质合金刀具可提高转速' },

          {
            icon: '⚙️',
            name: '切削参数',
            description: '包含策略、余量、拐角等核心切削设置',
            value: '策略→深度优先；余量→开粗0.15,精光先精底再精壁；拐角→光顺0.5-1mm',
            tip: '深度优先减少抬刀，拐角光顺保护刀具',
          },
          {
            icon: '🚶',
            name: '非切削移动',
            description: '包含进刀、退刀、起点/钻点、转移/快速等核心非切削移动设置',
            value: '进刀→螺旋/斜线（φ≤30°）；退刀→抬刀；转移→前一平面3-5mm',
            tip: '封闭区域用螺旋进刀，开放区域用线性进刀',
          },
        ],
        scenarios: ['外形精加工', '内腔精加工', '轮廓清根'],
        steps: ['创建平面轮廓铣', '选择轮廓曲线', '设置参数', '生成刀路'],
      },
      {
        icon: imageMap['6'],
        name: '孔铣',
        description:
          '使用平面螺旋和/或螺旋切削模式来加工盲孔和通孔。选择孔几何体或使用已识别的孔特征。过程特征的体积确定待除料量。推荐用于加工太大而无法钻削的孔。',
        params: [
          {
            icon: '📏',
            name: '切削模式',
            description: '控制刀具路径生成方式',
            value: '螺旋、螺旋-平面螺旋、圆形、平面螺旋',
            tip: '螺旋适用于大孔，螺旋-平面螺旋适用于扩孔，圆形适用于精加工',
          },
          { icon: '🔧', name: '轴向', description: '铣孔的轴向方向', value: '螺距按照实际需求;刀路数1', tip: '控制轴向' },
          { icon: '🔧', name: '经向', description: '铣孔的经向方向', value: '按照实际需求', tip: '控制经向' },
          { icon: '⚡', name: '进给率', description: '进给速度', value: '200-500 mm/min', tip: '根据孔径：大孔500，小孔200' },
          { icon: '🔄', name: '主轴转速', description: '转速', value: '3000-6000 rpm', tip: '硬质合金取5000-6000' },
          {
            icon: '🚶',
            name: '非切削移动',
            description: '包含进刀、退刀、起点/钻点、转移/快速等核心非切削移动设置',
            value: '进刀→圆形；',
            tip: '圆形进刀',
          },
        ],
        scenarios: ['大直径孔加工', '非标孔加工', '螺纹底孔加工'],
        steps: ['创建孔铣操作', '选择孔位置', '设置参数', '生成刀路'],
      },
      {
        icon: imageMap['7'],
        name: '平面文本',
        description:
          '平的面上的机床文本。将制图文本选做几何体来定义刀路。选择底面来定义要加工的面。编辑文本深度来确定切削的深度。文本将投影到沿固定刀轴的面上。建议用于加工简单文本，如标识号。',
        params: [
          { icon: '🔤', name: '字体样式', description: '文字字体', value: '单线字体（如mono）', tip: '必须使用单线字体，否则无法生成刀路' },
          { icon: '📏', name: '字高', description: '文字高度', value: '3-10mm', tip: '小零件取3-5mm，大零件取8-10mm' },
          { icon: '⬇️', name: '雕刻深度', description: '文字深度', value: '0.2-0.8mm', tip: '硬材料取0.2-0.3，软材料取0.5-0.8' },
          { icon: '🔧', name: '刀具', description: '雕刻刀具', value: '平底刀（0.5-2mm）', tip: '字宽2mm以下用0.5-1mm刀具' },
          { icon: '⚡', name: '进给率', description: '进给速度', value: '150-300 mm/min', tip: '小字取150，大字取300' },
          { icon: '🔄', name: '主轴转速', description: '转速', value: '8000-15000 rpm', tip: '小刀取15000，大刀取8000' },
        ],
        scenarios: ['零件编号雕刻', '商标标识', '日期批次标记'],
        steps: ['创建平面文本操作', '输入文字内容', '设置参数', '生成刀路'],
      },
      {
        icon: imageMap['8'],
        name: '铣削控制',
        description:
          '仅包含机床控制用户定义事件。生成后处理命令并将信息直接提供给后处理器。建议用于加工功能，如开关冷却液以及显示操作员消息。',
        params: [
          { icon: '🔄', name: '切削顺序', description: '多层加工顺序', value: '深度优先', tip: '深度优先减少抬刀，提高效率' },
          {
            icon: '⏭️',
            name: '进刀类型',
            description: '切入方式',
            value: '螺旋进刀（封闭区域）/ 线性进刀（开放区域）',
            tip: '封闭区域必须用螺旋或斜线，禁止直接下刀',
          },
          { icon: '⏮️', name: '退刀类型', description: '退出方式', value: '抬刀至安全平面', tip: '退刀高度大于工件最高面5mm以上' },
          { icon: '🛡️', name: '安全平面', description: '安全高度', value: '工件最高面+10mm', tip: '至少高于夹具最高点5mm' },
          { icon: '📐', name: '螺旋角度', description: '螺旋进刀角度', value: '3°-5°', tip: '硬材料取3°，软材料取5°' },
          { icon: '📏', name: '螺旋直径', description: '螺旋进刀直径', value: '刀具直径的80-100%', tip: '取刀具直径的90%最常用' },
        ],
        scenarios: ['复杂零件加工', '多型腔加工', '需要优化刀路的场景'],
        steps: ['进入切削参数设置', '调整各项控制参数', '生成优化后的刀路'],
      },
    ],
  },
  {
    name: 'mill_contour',
    chinese: '轮廓铣削',
    icon: '🔸',
    tips: '轮廓铣削适用于模具型腔、复杂曲面的精加工',
    features: [],
  },
  {
    name: 'hole_making',
    chinese: '孔加工',
    icon: '🔴',
    tips: '孔加工需根据孔径和材料选择合适的加工方式和切削参数',
    features: [],
  },
  {
    name: 'turning',
    chinese: '车削加工',
    icon: '🟡',
    tips: '车削加工适用于轴类、盘类等回转体零件的加工',
    features: [],
  },
]
