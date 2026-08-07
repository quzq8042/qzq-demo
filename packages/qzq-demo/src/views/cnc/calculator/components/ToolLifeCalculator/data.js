export const toolMaterials = [
  { code: 'YG8', name: 'YG8 硬质合金', n: 0.25, c: 200, description: '适用于铸铁、有色金属的粗加工' },
  { code: 'YG15', name: 'YG15 硬质合金', n: 0.3, c: 250, description: '适用于硬质合金、大理石加工' },
  { code: 'YT15', name: 'YT15 硬质合金', n: 0.25, c: 300, description: '适用于钢料的半精加工' },
  { code: 'YT30', name: 'YT30 硬质合金', n: 0.28, c: 400, description: '适用于钢料的精加工' },
  { code: 'YW1', name: 'YW1 硬质合金', n: 0.25, c: 300, description: '通用型，适用于多种材料' },
  { code: 'YW2', name: 'YW2 硬质合金', n: 0.22, c: 350, description: '通用型，适用于钢、铸铁' },
  { code: 'W18Cr4V', name: 'W18Cr4V 高速钢', n: 0.1, c: 60, description: '通用高速钢，切削速度较低' },
  { code: 'M2', name: 'M2 高速钢', n: 0.12, c: 80, description: '钼系高速钢，综合性能好' },
  { code: 'T15', name: 'T15 高速钢', n: 0.15, c: 100, description: '高钴高速钢，耐磨性好' },
  { code: 'P20', name: 'P20 涂层硬质合金', n: 0.3, c: 350, description: 'TiC涂层，适用于钢料精加工' },
  { code: 'P30', name: 'P30 涂层硬质合金', n: 0.35, c: 280, description: 'TiN涂层，适用于钢料粗加工' },
  { code: 'K10', name: 'K10 涂层硬质合金', n: 0.32, c: 300, description: '适用于铸铁粗加工' },
  { code: 'K20', name: 'K20 涂层硬质合金', n: 0.28, c: 250, description: '适用于铸铁精加工' },
  { code: 'CBN', name: 'CBN 立方氮化硼', n: 0.4, c: 800, description: '适用于淬硬钢的高速切削' },
  { code: 'PCD', name: 'PCD 聚晶金刚石', n: 0.5, c: 1200, description: '适用于有色金属、硅材料' },
]

export const workpieceMaterials = [
  { code: '45#', name: '45号钢', recommendedSpeed: 120 },
  { code: '40Cr', name: '40Cr合金钢', recommendedSpeed: 100 },
  { code: '20CrMnTi', name: '20CrMnTi渗碳', recommendedSpeed: 80 },
  { code: '304', name: '304不锈钢', recommendedSpeed: 60 },
  { code: '316L', name: '316L不锈钢', recommendedSpeed: 50 },
  { code: 'HT200', name: 'HT200灰铸铁', recommendedSpeed: 80 },
  { code: 'QT600', name: 'QT600球墨铸铁', recommendedSpeed: 100 },
  { code: '6061', name: '6061铝合金', recommendedSpeed: 200 },
  { code: '7075', name: '7075铝合金', recommendedSpeed: 180 },
  { code: 'T2', name: 'T2紫铜', recommendedSpeed: 150 },
  { code: 'H62', name: 'H62黄铜', recommendedSpeed: 180 },
  { code: 'TC4', name: 'TC4钛合金', recommendedSpeed: 40 },
  { code: '淬火钢HRC50', name: '淬火钢(HRC50)', recommendedSpeed: 40 },
  { code: '淬火钢HRC60', name: '淬火钢(HRC60)', recommendedSpeed: 30 },
]

export const toolLifeFormulas = {
  taylor: {
    name: 'Taylor 刀具寿命公式',
    formula: 'V × Tⁿ = C',
    description: 'V = 切削速度 (m/min)\nT = 刀具寿命 (min)\nn = 刀具寿命指数\nC = 工件材料系数',
    params: ['切削速度 V', '刀具寿命指数 n', '材料系数 C'],
  },
}
