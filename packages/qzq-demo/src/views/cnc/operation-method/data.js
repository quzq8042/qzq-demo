const images = import.meta.glob('./images/*.{svg,png,jpg,jpeg,webp}', { eager: true })

const imageMap = {}
for (const [path, mod] of Object.entries(images)) {
  const fileName = path.match(/\/([^/]+)\.\w+$/)?.[1]
  if (fileName) imageMap[fileName] = mod.default
}

export const operationMethods = [
  {
    key: 'vise-3axis',
    title: '3 轴虎钳',
    subtitle: '一夹、二夹翻面装夹｜分中取数 + Z 落差补偿',
    icon: '🔧',
    image: imageMap['vise-3axis'],
    summary: '翻面装夹工艺，一夹铣基准、二夹打表取 Z 落差补偿，保证正反面深度尺寸一致',
    steps: [
      {
        phase: '一夹（第一面加工）',
        color: '#667eea',
        items: [
          {
            title: '虎钳装夹、校平校直',
            content: '虎钳夹紧毛坯，百分表拉工件顶面与侧边，校平校直，保证装夹基准与机床坐标系平行。',
          },
          {
            title: '寻边器分中，设定 G54 XY',
            content: '寻边器 X、Y 双向碰边分中，取中点录入 G54 坐标系 XY 原点。',
          },
          {
            title: 'Z 向对刀，顶面设 Z0',
            content: 'Z 向对刀仪或块规对刀，工件顶面设为 Z0，完成第一面加工。',
          },
          {
            title: '铣出基准侧面 / 台阶',
            content: '第一面必须铣出一个基准侧面或基准台阶，作为翻面二夹时的定位基准。',
          },
        ],
      },
      {
        phase: '二夹（翻面二次装夹）',
        color: '#764ba2',
        items: [
          {
            title: '翻面夹持已加工余量位',
            content: '工件翻面，虎钳夹持已加工余量位（避开成品面），留出第二次加工余量。',
          },
          {
            title: '百分表拉基准面校正',
            content: '百分表吸主轴，拉已加工基准侧面，轻敲工件调整，校正平行度 ≤ 0.01 mm。',
          },
        ],
      },
      {
        phase: 'XY 分中取数',
        color: '#11998e',
        items: [
          {
            title: '单边取数 / 双边分中',
            content: '寻边器触碰已加工基准边，单边取数；若两侧均保留余量，双边碰数取中点，录入 G54 XY。',
          },
        ],
      },
      {
        phase: 'Z 向打表取落差（核心）',
        color: '#eb3349',
        highlight: true,
        items: [
          {
            title: '打表基准面，相对 Z 清零',
            content: '主轴装百分表，先碰【一夹加工出来的基准面】，压表到一定读数，将相对 Z 清零。',
          },
          {
            title: '移到二夹顶面，压表读落差 H',
            content: '快速移动表针到【二夹新夹持后的工件顶面】，压到相同表针读数，读取相对 Z 差值 = 落差 H。',
          },
          {
            title: 'Z 原点计算（重点）',
            content: 'G54 Z = 基准面 Z0 ± H（正负号看表针移动方向）。翻面落差用来补偿两次装夹 Z 方向偏差，保证正反面深度尺寸一致。',
            formula: 'G54 Z = Z0 ± H',
          },
        ],
      },
      {
        phase: '校验确认',
        color: '#f7971e',
        items: [
          {
            title: '手轮慢速复测',
            content: '手轮慢速复测基准面，确认 XY、Z 坐标无跑位，再开粗加工。',
          },
        ],
      },
    ],
  },
  {
    key: 'chuck-4axis',
    title: '4 轴三爪夹圆柱料',
    subtitle: '分中 + 找 A 轴旋转中心',
    icon: '🌀',
    image: imageMap['chuck-4axis'],
    summary: '三爪夹持圆柱料，校同轴 → 铣基准面 → 两向碰数算 A 轴旋转中心 Y → 打表算 Z 落差',
    steps: [
      {
        phase: '千分表校平，夹紧找正',
        color: '#667eea',
        items: [
          {
            title: '打外圆圆跳动',
            content: '千分表吸主轴，打圆柱外圆，手动转动 A 轴 360°，把圆柱圆跳动校到 0，保证圆柱轴线与 A 轴旋转中心同轴。',
          },
          {
            title: '三爪夹紧',
            content: '三爪均匀受力夹紧，复查圆跳动，确认无跑表。',
          },
        ],
      },
      {
        phase: '铣刀拉平一个基准面',
        color: '#764ba2',
        items: [
          {
            title: '铣出平整基准平面',
            content: '铣刀在圆柱侧面径向进给，铣出一个平整基准平面（用来后面打高度、取数）。',
          },
        ],
      },
      {
        phase: 'A 轴 90° / 270°，Y 向两点分中',
        color: '#11998e',
        highlight: true,
        items: [
          {
            title: 'A=90°，碰基准面得 Y₁',
            content: 'A 轴转到 90°，此时铣出来的基准面朝向 +Y 方向；寻边器碰这个平面，记下机床 Y 机械坐标 Y₁。',
          },
          {
            title: 'A=270°，碰对面外圆得 Y₂',
            content: 'A 轴再转 180° 到 A=270°，圆柱另外一侧朝外；寻边器碰对面外圆，记下机床 Y 机械坐标 Y₂。',
          },
          {
            title: '✅ Y 轴中点 = A 轴旋转中心 Y',
            content: '两点坐标的算术平均值就是 A 轴旋转中心在机床坐标系下的 Y 值。',
            formula: 'Y_center = (Y₁ + Y₂) ÷ 2',
          },
        ],
      },
      {
        phase: 'X 轴单边靠取数',
        color: '#f7971e',
        items: [
          {
            title: 'X 原点设定',
            content: 'X 方向：寻边器碰工件端面，单边取数，设定 X 原点。X 原点一般设在工件端面或者工件中心，按你的编程坐标系来。',
          },
        ],
      },
      {
        phase: '对刀点 + 拉平面打表，取 Z 旋转中心',
        color: '#eb3349',
        highlight: true,
        items: [
          {
            title: '打基准面读高度差 H',
            content: '主轴装百分表，碰刚才铣出来的基准平面，读出这个平面相对主轴基准的高度差值 H。',
          },
          {
            title: '算出半径 R',
            content: '两点 Y 方向距离 = |Y₁ - Y₂|，一半就是半径 R。',
            formula: 'R = |Y₁ - Y₂| ÷ 2',
          },
          {
            title: '基准面到 A 轴旋转中心的 Z 落差',
            content: '高度差 H ± R（看表读数正负方向，重点注意正负号！）。',
            formula: 'Z_center_from_surface = H ± R',
          },
        ],
      },
    ],
  },
  {
    key: 'bridge-plate-4axis',
    title: '4 轴桥板装夹',
    subtitle: '分中取数 + 找回转中心 + Z 落差',
    icon: '🧱',
    image: imageMap['bridge-plate-4axis'],
    summary: '桥板锁 A 轴法兰 → 两端碰基准面算 Y 回转中心 → 90° 打表算 Z 落差',
    steps: [
      {
        phase: '桥板预装校平',
        color: '#667eea',
        items: [
          {
            title: '桥板锁四轴法兰',
            content: '桥板锁紧在四轴 A 轴法兰，先不要完全锁死，留微调余量。',
          },
          {
            title: '百分表校端面跳动',
            content: '百分表打桥板基准面（端面），缓慢转动 A 轴 360°，校正桥板端面跳动 ≤ 0.01 mm，全部锁死螺丝。',
          },
          {
            title: '工件锁紧',
            content: '工件用压板或螺丝锁紧固定在桥板上，注意不遮挡基准面。',
          },
        ],
      },
      {
        phase: 'A=0° / A=180°，两端碰数算 Y 回转中心',
        color: '#11998e',
        highlight: true,
        items: [
          {
            title: 'A=0°，寻边器碰基准面得 Y₁',
            content: 'A 轴转到 0°，寻边器碰工件基准侧面，记录机床 Y 机械坐标 Y₁。',
          },
          {
            title: 'A=180°，同一基准面转到对面，得 Y₂',
            content: 'A 轴旋转 180°（A=180°），刚才碰的那个基准面现在转到了对面，寻边器再次碰同一个基准面，记录 Y₂。',
          },
          {
            title: '✅ A 轴回转中心 Y 机械坐标',
            content: '两点坐标的平均值就是桥板 A 轴回转中心在机床坐标系下的 Y 值。',
            formula: 'Y_center = (Y₁ + Y₂) ÷ 2',
          },
        ],
      },
      {
        phase: 'X 轴取数',
        color: '#f7971e',
        items: [
          {
            title: '单边 / 双边分中',
            content: '寻边器碰工件端面或侧边，单边或者双边分中，设定 X 原点。',
          },
        ],
      },
      {
        phase: 'Z 向打表测高度差 + 回转中心计算',
        color: '#eb3349',
        highlight: true,
        items: [
          {
            title: 'A=90°，基准面朝上打表读 H',
            content: 'A 轴转到 90°，把基准面朝上；百分表压在工件基准平面，读取相对高度 H。',
          },
          {
            title: '算出半径 R',
            content: '两点 Y 距离差值的一半就是半径 R。',
            formula: 'R = |Y₁ - Y₂| ÷ 2',
          },
          {
            title: '桥板 A 轴回转中心 Z 坐标',
            content: 'Z = H ± R，注意正负方向！桥板工件的正负和三爪圆柱料不一样，需要根据实际表针升降方向判断。',
            formula: 'Z_center = H ± R',
          },
        ],
      },
      {
        phase: '复核确认',
        color: '#00c6ff',
        items: [
          {
            title: 'A 轴多角度复测',
            content: 'A 轴 0° / 90° / 180° 来回转动，复测基准面跳动，确认回转中心无误。',
          },
        ],
      },
    ],
  },
  {
    key: 'l-plate-4axis',
    title: '4 轴 L 板（角板）装夹',
    subtitle: '分中取数 + 找 A 轴旋转中心',
    icon: '⬌',
    image: imageMap['l-plate-4axis'],
    summary: 'L 板锁法兰 → 90°/270° 碰基准边算 Y 回转中心 → 0° 打表算 Z 落差，L 板悬空立装注意正负号！',
    steps: [
      {
        phase: 'L 板固定 + 校表',
        color: '#667eea',
        items: [
          {
            title: 'L 板锁紧四轴法兰',
            content: 'L 板锁紧在四轴法兰，先留微调余量不要完全锁死。',
          },
          {
            title: '百分表拉 L 板立面 + 底面',
            content: '百分表拉 L 板立面与底面，转动 A 轴校正 L 板，保证 L 板基准面旋转跳动合格（≤ 0.01 mm），锁死所有螺丝。',
          },
          {
            title: '工件锁 L 板垂直面',
            content: '工件用螺丝锁紧在 L 板的垂直立面上，工件悬空立装。',
          },
        ],
      },
      {
        phase: 'A=90° / A=270°，两端碰数算 Y 旋转中心',
        color: '#11998e',
        highlight: true,
        items: [
          {
            title: 'A=90°，碰工件基准边得 Y₁',
            content: 'A 轴转到 90°，寻边器触碰工件基准边，记录机床 Y 机械坐标 Y₁。',
          },
          {
            title: 'A=270°（转 180°），碰同一基准面得 Y₂',
            content: 'A 轴再转 180° 到 270°，同一基准边转到了另一侧，寻边器碰同一个基准面，记录 Y₂。',
          },
          {
            title: '✅ A 轴旋转中心 Y 机械坐标',
            content: '两点坐标平均值即为 A 轴旋转中心在机床坐标系下的 Y 值。',
            formula: 'Y_center = (Y₁ + Y₂) ÷ 2',
          },
        ],
      },
      {
        phase: 'X 轴取数',
        color: '#f7971e',
        items: [
          {
            title: '单边取数设定 X 原点',
            content: 'X 方向：寻边器碰工件端面，单边取数设定 X 原点，原点按编程图纸设定。',
          },
        ],
      },
      {
        phase: 'Z 方向打表取落差（⚠️ 重点）',
        color: '#eb3349',
        highlight: true,
        items: [
          {
            title: 'A=0°，打基准平面读高度 H',
            content: 'A 轴转到 0°，百分表吸附主轴，压在工件基准平面上，读取基准面相对主轴基准的高度 H。',
          },
          {
            title: '算出半径 R',
            content: '两点 Y 距离差值的一半就是旋转半径 R。',
            formula: 'R = |Y₁ - Y₂| ÷ 2',
          },
          {
            title: 'L 板工件基准面到 A 回转中心 Z 落差',
            content: 'Z = H ± R。⚠️ L 板工件是悬空立装，Z 正负极易搞反！打表时一定要留意表针升降方向！',
            formula: 'Z_center = H ± R',
          },
        ],
      },
      {
        phase: '复核确认',
        color: '#00c6ff',
        items: [
          {
            title: '全行程旋转 A 轴复测',
            content: '全行程旋转 A 轴，复测基准面，校验 XY、回转 Z 坐标，防止 L 板松动跑数。',
          },
        ],
      },
    ],
  },
]
