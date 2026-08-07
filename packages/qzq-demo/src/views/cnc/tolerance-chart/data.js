export const toleranceGrades = [
  { grade: 'IT01', range: '0.3', upTo10: '0.3', upTo25: '0.4', upTo50: '0.5', upTo100: '0.6', upTo250: '0.8', upTo500: '1', above500: '1.2' },
  { grade: 'IT0', range: '0.5', upTo10: '0.5', upTo25: '0.6', upTo50: '0.8', upTo100: '1', upTo250: '1.2', upTo500: '1.5', above500: '2' },
  { grade: 'IT1', range: '0.8', upTo10: '0.8', upTo25: '1', upTo50: '1.2', upTo100: '1.5', upTo250: '1.8', upTo500: '2', above500: '2.5' },
  { grade: 'IT2', range: '1.2', upTo10: '1.2', upTo25: '1.5', upTo50: '1.8', upTo100: '2', upTo250: '2.5', upTo500: '3', above500: '4' },
  { grade: 'IT3', range: '2', upTo10: '2', upTo25: '2.5', upTo50: '3', upTo100: '3.5', upTo250: '4', upTo500: '5', above500: '6' },
  { grade: 'IT4', range: '3', upTo10: '3', upTo25: '4', upTo50: '4.5', upTo100: '5', upTo250: '6', upTo500: '7', above500: '8' },
  { grade: 'IT5', range: '4', upTo10: '4', upTo25: '5', upTo50: '6', upTo100: '7', upTo250: '8', upTo500: '9', above500: '10' },
  { grade: 'IT6', range: '6', upTo10: '6', upTo25: '8', upTo50: '9', upTo100: '11', upTo250: '13', upTo500: '15', above500: '16' },
  { grade: 'IT7', range: '10', upTo10: '10', upTo25: '12', upTo50: '15', upTo100: '18', upTo250: '21', upTo500: '25', above500: '30' },
  { grade: 'IT8', range: '14', upTo10: '14', upTo25: '16', upTo50: '19', upTo100: '22', upTo250: '25', upTo500: '30', above500: '35' },
  { grade: 'IT9', range: '25', upTo10: '25', upTo25: '30', upTo50: '36', upTo100: '43', upTo250: '52', upTo500: '62', above500: '74' },
  { grade: 'IT10', range: '40', upTo10: '40', upTo25: '48', upTo50: '58', upTo100: '70', upTo250: '84', upTo500: '100', above500: '120' },
  { grade: 'IT11', range: '60', upTo10: '60', upTo25: '75', upTo50: '90', upTo100: '110', upTo250: '130', upTo500: '160', above500: '190' },
  { grade: 'IT12', range: '100', upTo10: '100', upTo25: '120', upTo50: '140', upTo100: '170', upTo250: '200', upTo500: '240', above500: '280' },
  { grade: 'IT13', range: '140', upTo10: '140', upTo25: '165', upTo50: '200', upTo100: '230', upTo250: '290', upTo500: '370', above500: '450' },
  { grade: 'IT14', range: '250', upTo10: '250', upTo25: '290', upTo50: '360', upTo100: '430', upTo250: '520', upTo500: '630', above500: '720' },
  { grade: 'IT15', range: '400', upTo10: '400', upTo25: '460', upTo50: '570', upTo100: '680', upTo250: '810', upTo500: '970', above500: '1100' },
  { grade: 'IT16', range: '600', upTo10: '600', upTo25: '720', upTo50: '860', upTo100: '1000', upTo250: '1150', upTo500: '1350', above500: '1550' },
  { grade: 'IT17', range: '1000', upTo10: '1000', upTo25: '1150', upTo50: '1350', upTo100: '1550', upTo250: '1800', upTo500: '2100', above500: '2400' },
  { grade: 'IT18', range: '1400', upTo10: '1400', upTo25: '1650', upTo50: '1950', upTo100: '2300', upTo250: '2700', upTo500: '3100', above500: '3500' },
]

export const commonFits = [
  { code: 'H7/g6', hole: 'H7', shaft: 'g6', type: '间隙配合', application: '滑动轴承、导向柱、精密滑动配合' },
  { code: 'H7/h6', hole: 'H7', shaft: 'h6', type: '间隙配合', application: '定位配合、精密配合、滚动轴承外圈' },
  { code: 'H7/f6', hole: 'H7', shaft: 'f6', type: '间隙配合', application: '滑动轴承、活塞与气缸、导向配合' },
  { code: 'H7/g5', hole: 'H7', shaft: 'g5', type: '间隙配合', application: '精密导向、量仪测量头' },
  { code: 'H7/h5', hole: 'H7', shaft: 'h5', type: '间隙配合', application: '精密定位、柱塞与套筒' },
  { code: 'H7/h7', hole: 'H7', shaft: 'h7', type: '过渡配合', application: '一般定位配合、可拆连接件' },
  { code: 'H7/k6', hole: 'H7', shaft: 'k6', type: '过渡配合', application: '轮毂与轴、皮带轮与轴、齿轮与轴' },
  { code: 'H7/m6', hole: 'H7', shaft: 'm6', type: '过渡配合', application: '重型皮带轮、齿轮与轴、需传递扭矩' },
  { code: 'H7/js6', hole: 'H7', shaft: 'js6', type: '过渡配合', application: '一般轴孔配合、可拆定位配合' },
  { code: 'H7/p6', hole: 'H7', shaft: 'p6', type: '过盈配合', application: '不可拆连接、轴与轮毂、销轴' },
  { code: 'H7/n6', hole: 'H7', shaft: 'n6', type: '过盈配合', application: '轻载过盈、需传递小扭矩' },
  { code: 'H7/s6', hole: 'H7', shaft: 's6', type: '过盈配合', application: '重载过盈、传递大扭矩、联轴器' },
  { code: 'H7/u6', hole: 'H7', shaft: 'u6', type: '过盈配合', application: '大过盈、热压配合、重载传递' },
  { code: 'H8/g7', hole: 'H8', shaft: 'g7', type: '间隙配合', application: '一般精度导向配合' },
  { code: 'H8/h7', hole: 'H8', shaft: 'h7', type: '间隙配合', application: '一般定位配合、箱体与轴' },
  { code: 'H8/f7', hole: 'H8', shaft: 'f7', type: '间隙配合', application: '一般滑动轴承、低转速' },
  { code: 'H8/h8', hole: 'H8', shaft: 'h8', type: '间隙配合', application: '一般配合、低精度要求' },
  { code: 'H9/g8', hole: 'H9', shaft: 'g8', type: '间隙配合', application: '低精度导向、一般配合' },
  { code: 'H9/h9', hole: 'H9', shaft: 'h9', type: '间隙配合', application: '一般轴孔配合、粗糙配合' },
  { code: 'H11/c11', hole: 'H11', shaft: 'c11', type: '间隙配合', application: '大间隙配合、自由装配' },
  { code: 'H11/h11', hole: 'H11', shaft: 'h11', type: '间隙配合', application: '一般配合、低精度要求' },
  { code: 'H12/h12', hole: 'H12', shaft: 'h12', type: '间隙配合', application: '粗糙配合、一般装配' },
]

export const toleranceZoneDiagrams = [
  {
    title: '间隙配合 (Clearance Fit)',
    description: '孔的尺寸一定大于轴的尺寸，装配后存在间隙。',
    color: '#10b981',
    zones: [
      { label: '孔 H7', type: 'hole', deviation: '+25', tolerance: '0' },
      { label: '轴 g6', type: 'shaft', deviation: '-7', tolerance: '-20' },
    ],
  },
  {
    title: '过渡配合 (Transition Fit)',
    description: '孔与轴的尺寸公差带相互交叠，可能形成间隙或过盈。',
    color: '#f59e0b',
    zones: [
      { label: '孔 H7', type: 'hole', deviation: '+25', tolerance: '0' },
      { label: '轴 k6', type: 'shaft', deviation: '+2', tolerance: '-11' },
    ],
  },
  {
    title: '过盈配合 (Interference Fit)',
    description: '孔的尺寸一定小于轴的尺寸，装配后产生过盈。',
    color: '#ef4444',
    zones: [
      { label: '孔 H7', type: 'hole', deviation: '+25', tolerance: '0' },
      { label: '轴 p6', type: 'shaft', deviation: '+26', tolerance: '+14' },
    ],
  },
]

export const roughnessComparison = [
  { ra: '0.012', rz: '0.050', rmax: '0.050', grade: 'N1', process: '激光加工、离子束加工' },
  { ra: '0.025', rz: '0.100', rmax: '0.100', grade: 'N2', process: '抛光、精密磨削' },
  { ra: '0.050', rz: '0.200', rmax: '0.200', grade: 'N3', process: '精磨、精镗' },
  { ra: '0.100', rz: '0.400', rmax: '0.400', grade: 'N4', process: '精车、精铣、铰削' },
  { ra: '0.200', rz: '0.800', rmax: '0.800', grade: 'N5', process: '细磨、细镗' },
  { ra: '0.400', rz: '1.600', rmax: '1.600', grade: 'N6', process: '磨削、镗削、精车' },
  { ra: '0.800', rz: '3.200', rmax: '3.200', grade: 'N7', process: '车削、铣削、钻削' },
  { ra: '1.600', rz: '6.300', rmax: '6.300', grade: 'N8', process: '车削、铣削、刨削' },
  { ra: '3.200', rz: '12.500', rmax: '12.500', grade: 'N9', process: '粗车、粗铣、粗刨' },
  { ra: '6.300', rz: '25.000', rmax: '25.000', grade: 'N10', process: '粗车、粗铣、钻孔' },
  { ra: '12.500', rz: '50.000', rmax: '50.000', grade: 'N11', process: '粗加工、气割' },
  { ra: '25.000', rz: '100.000', rmax: '100.000', grade: 'N12', process: '锻造、铸造、粗加工' },
  { ra: '50.000', rz: '200.000', rmax: '200.000', grade: 'N13', process: '锻造、铸造' },
]

export const machiningRoughness = [
  { process: '车削 (Turning)', raRange: '1.6 ~ 6.3', color: '#667eea', description: '普通车削可达 Ra 1.6~6.3 μm，精车可达 Ra 0.8~1.6 μm' },
  { process: '铣削 (Milling)', raRange: '1.6 ~ 12.5', color: '#764ba2', description: '普通铣削可达 Ra 1.6~12.5 μm，精铣可达 Ra 0.8~3.2 μm' },
  { process: '磨削 (Grinding)', raRange: '0.2 ~ 1.6', color: '#10b981', description: '普通磨削可达 Ra 0.4~1.6 μm，精磨可达 Ra 0.1~0.4 μm' },
  { process: '钻孔 (Drilling)', raRange: '1.6 ~ 6.3', color: '#f59e0b', description: '钻孔可达 Ra 1.6~6.3 μm，精度较低' },
  { process: '镗孔 (Boring)', raRange: '0.2 ~ 3.2', color: '#8b5cf6', description: '精镗可达 Ra 0.2~0.8 μm，是孔精加工的主要方法' },
  { process: '铰孔 (Reaming)', raRange: '0.2 ~ 1.6', color: '#3b82f6', description: '铰孔可达 Ra 0.2~1.6 μm，精度高' },
  { process: '刨削 (Shaping)', raRange: '1.6 ~ 6.3', color: '#ef4444', description: '刨削可达 Ra 1.6~6.3 μm，主要用于平面加工' },
  { process: '拉削 (Broaching)', raRange: '0.4 ~ 1.6', color: '#ec4899', description: '拉削可达 Ra 0.4~1.6 μm，适合批量生产' },
  { process: '抛光 (Polishing)', raRange: '0.01 ~ 0.2', color: '#06b6d4', description: '抛光可达 Ra 0.01~0.2 μm，镜面效果' },
  { process: '电火花 (EDM)', raRange: '0.4 ~ 3.2', color: '#f97316', description: '电火花加工可达 Ra 0.4~3.2 μm' },
  { process: '线切割 (Wire EDM)', raRange: '0.4 ~ 1.6', color: '#84cc16', description: '线切割可达 Ra 0.4~1.6 μm' },
  { process: '激光加工 (Laser)', raRange: '0.1 ~ 1.6', color: '#0ea5e9', description: '激光加工可达 Ra 0.1~1.6 μm' },
]

export const roughnessSymbols = [
  {
    name: '基本符号',
    symbol: '基本符号',
    description: '表示表面粗糙度是用任何方法获得的',
    usage: '用于要求不高的表面',
    example: '√',
  },
  {
    name: '去除材料符号',
    symbol: '去除材料符号',
    description: '表示表面粗糙度是用去除材料的方法获得的，如车、铣、钻、磨等',
    usage: '用于需要切削加工的表面',
    example: '带横杠的√',
  },
  {
    name: '不去除材料符号',
    symbol: '不去除材料符号',
    description: '表示表面粗糙度是用不去除材料的方法获得的，如铸、锻、冲压等',
    usage: '用于铸、锻、冲压等非切削加工表面',
    example: '带小圆的√',
  },
  {
    name: '轮廓算术平均偏差 Ra',
    symbol: 'Ra',
    description: '在取样长度内，轮廓偏距绝对值的算术平均值',
    usage: '最常用的粗糙度评定参数',
    example: 'Ra 3.2',
  },
  {
    name: '轮廓最大高度 Rz',
    symbol: 'Rz',
    description: '在取样长度内，最大轮廓峰高和最大轮廓谷深之和',
    usage: '用于对表面功能要求较高的场合',
    example: 'Rz 6.3',
  },
  {
    name: '微观不平度十点高度 Rz(旧)',
    symbol: 'Rz(旧)',
    description: '在取样长度内，五个最大轮廓峰高和五个最大轮廓谷深的平均值之和',
    usage: '旧标准使用，现已被 Rz 取代',
    example: 'Rz 3.2 (旧制)',
  },
  {
    name: '加工纹理方向符号',
    symbol: '加工纹理方向',
    description: '表示加工纹理的方向，如平行、垂直、交叉等',
    usage: '用于对纹理方向有要求的场合',
    example: '= 平行 | 垂直 × 交叉',
  },
  {
    name: '加工方法标注',
    symbol: '加工方法',
    description: '在符号上标注指定的加工方法，如电镀、喷涂、热处理等',
    usage: '用于需要指定特殊加工方法的场合',
    example: '镀镍 Ra 0.8',
  },
]

export const fitTypes = [
  {
    type: '间隙配合',
    color: '#10b981',
    description: '孔的实际尺寸总是大于轴的实际尺寸，装配后存在间隙。',
    features: ['孔的公差带在轴的公差带之上', '装配时不需要加力，一般可以徒手装配', '用于有相对运动或可拆卸的连接', '如：滑动轴承、导向柱、活塞与气缸等'],
  },
  {
    type: '过渡配合',
    color: '#f59e0b',
    description: '孔与轴的公差带相互交叠，装配后可能产生间隙或过盈。',
    features: ['孔的公差带与轴的公差带部分重叠', '装配时可能需要加力，有时需要敲击或压入', '用于定位精度要求高且需要拆卸的连接', '如：齿轮与轴、皮带轮与轴、定位销等'],
  },
  {
    type: '过盈配合',
    color: '#ef4444',
    description: '轴的实际尺寸总是大于孔的实际尺寸，装配后产生过盈。',
    features: ['轴的公差带在孔的公差带之上', '装配时需要加较大的力，一般用压入或热装配', '用于不希望拆卸的连接，可传递扭矩', '如：轴与轮毂、轴承内圈与轴、联轴器等'],
  },
]
