export type MenuCategory = 'Women' | 'Men'

export type MenCollection = {
  label: string
  status: 'available' | 'coming-soon'
  navigationLabel?: string
}

export const menCollections: MenCollection[] = [
  { label: 'Casual wear', status: 'available', navigationLabel: 'Casual wear' },
  { label: 'Streetwear', status: 'available', navigationLabel: 'Street wear' },
  { label: 'Jersey', status: 'available', navigationLabel: 'Street wear' },
  { label: 'Outerwear', status: 'coming-soon' },
  { label: "Men’s boxer briefs", status: 'coming-soon' },
  { label: 'Tank tops', status: 'coming-soon' },
  { label: 'Swimwear', status: 'coming-soon' },
  { label: 'Hoodies', status: 'coming-soon' },
  { label: 'T-shirt', status: 'coming-soon' },
  { label: 'Long sleeves', status: 'coming-soon' },
  { label: 'Polo shirts', status: 'coming-soon' },
  { label: 'Pants & sweatpants', status: 'coming-soon' },
  { label: 'African print', status: 'coming-soon' },
  { label: 'Button-up shirts', status: 'coming-soon' },
  { label: 'Dress pants', status: 'coming-soon' },
]

export const menuLinks: Record<MenuCategory, string[]> = {
  Women: [
    'Monogram Anniversary',
    'Gifts and Personalization',
    'Bags and Small Leather Goods',
    'Perfumes and Small Leather Goods',
    'Jewelry',
    'Watches',
    'About CosLaary',
  ],
  Men: [
    'Casual wear',
    'Streetwear',
    'Jersey',
  ],

}
