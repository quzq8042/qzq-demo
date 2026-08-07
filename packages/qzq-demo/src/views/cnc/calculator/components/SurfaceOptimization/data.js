export const millingStrategy = [
  {
    name: '平行铣削',
    description: '刀具沿给定方向平行走刀，适用于平缓曲面',
    formula: 'step = 2 × √(2R×h - h²)',
    parameters: ['球刀半径 R', '残余高度 h'],
    advantages: ['计算简单', '加工效率高', '表面质量稳定'],
    disadvantages: ['复杂曲面适应性差', '可能产生振纹'],
  },
  {
    name: '等高铣削',
    description: '沿曲面等距高度走刀，适用于陡峭曲面',
    formula: 'step = R × arccos(1 - h/R)',
    parameters: ['球刀半径 R', '残余高度 h'],
    advantages: ['适用于陡峭曲面', '切削载荷均匀', '表面质量好'],
    disadvantages: ['计算较复杂', '加工效率略低'],
  },
  {
    name: '螺旋铣削',
    description: '刀具沿螺旋线走刀，适用于圆形曲面',
    formula: 'step = P (螺距)',
    parameters: ['螺旋半径 r', '螺距 P'],
    advantages: ['无空刀', '表面质量好', '适用于回转体'],
    disadvantages: ['适用范围有限', '编程复杂'],
  },
  {
    name: '流线铣削',
    description: '沿曲面流线方向走刀，适用于复杂曲面',
    formula: 'step = h / tan(α/2)',
    parameters: ['残余高度 h', '流线下倾角 α'],
    advantages: ['表面质量最佳', '无刀痕', '适用于复杂曲面'],
    disadvantages: ['计算复杂', '对机床要求高'],
  },
]

export const curvatureCalculations = {
  convex: {
    name: '凸曲面',
    formula: 'step = 2 × √(2×R×h - h²)',
    description: '球刀加工凸曲面时，有效切削半径减小',
    correction: '实际步距约为理论值的 0.7~0.85',
  },
  concave: {
    name: '凹曲面',
    formula: 'step = 2 × √(2×R×h - h²) / √(1 + R/Rc)',
    description: '球刀加工凹曲面时，有效切削半径增大',
    correction: '实际步距约为理论值的 1.0~1.2',
  },
}

export const recommendedParameters = {
  aluminum: {
    material: '铝合金',
    tool: '球头铣刀硬质合金',
    spindleSpeed: '8000~15000 RPM',
    feedRate: '2000~5000 mm/min',
    depth: '0.1~0.5 mm',
    stepToToolDiameter: '15%~25%',
    residualHeight: '0.005~0.02 mm',
  },
  steel: {
    material: '钢材',
    tool: '球头铣刀硬质合金涂层',
    spindleSpeed: '3000~6000 RPM',
    feedRate: '800~2000 mm/min',
    depth: '0.1~0.3 mm',
    stepToToolDiameter: '10%~20%',
    residualHeight: '0.005~0.015 mm',
  },
  stainless: {
    material: '不锈钢',
    tool: '球头铣刀涂层硬质合金',
    spindleSpeed: '2000~4000 RPM',
    feedRate: '500~1500 mm/min',
    depth: '0.05~0.2 mm',
    stepToToolDiameter: '8%~15%',
    residualHeight: '0.003~0.01 mm',
  },
}
