import casual1 from '../assets/CasualMonogram1.jpg'
import casual2 from '../assets/CasualLVMurakami.jpg'
import office1 from '../assets/Officewear1.jpg'
import office2 from '../assets/Officewear2.jpg'
import suit1 from '../assets/Suitwear.jpg'
import street1 from '../assets/Streetwear1.jpg'
import street2 from '../assets/Streetwear2.jpg'
import street3 from '../assets/Streetwear3.jpg'
import traditional1 from '../assets/traditional 1.jpg'
import traditional2 from '../assets/traditional 2.jpg'
import traditional3 from '../assets/traditional 3.jpg'
import socks1 from '../assets/socks1.jpg'
import type { CatalogProduct } from '../components/ProductCatalog'

const make = (prefix: string, names: string[], images: string[]): CatalogProduct[] => names.map((name, index) => ({ id: `${prefix}-${index}`, name, price: 35 + index * 8, image: images[index % images.length] }))
export const casualProducts = make('casual', ['Monogram T-Shirt', 'Weekend Overshirt', 'Relaxed Cotton Trouser', 'Signature Casual Jacket'], [casual1, casual2])
export const officeProducts = make('office', ['Executive Blazer', 'Tailored Office Trouser', 'Classic Work Shirt', 'Professional Vest'], [office1, office2])
export const suitProducts = make('suit', ['Modern Two-Piece Suit', 'Double Breasted Suit', 'Evening Tailored Jacket', 'Formal Suit Trouser'], [suit1])
export const streetProducts = make('street', ['Graphic Street Jacket', 'Relaxed Cargo Trouser', 'Streetwear Overshirt', 'Urban Layered Set'], [street1, street2, street3])
export const traditionalProducts = make('traditional', ['Traditional Kaftan Set', 'Heritage Tunic', 'Classic Traditional Set', 'Tailored Native Wear'], [traditional1, traditional2, traditional3])
export const socksProducts = make('socks', ['Everyday Cotton Socks', 'Ribbed Comfort Socks', 'Classic Logo Socks', 'Premium Dress Socks'], [socks1])
