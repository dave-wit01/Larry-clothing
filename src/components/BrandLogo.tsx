import logo from '../assets/logog.jpg'

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className = 'h-6 w-6' }: BrandLogoProps) {
  return (
    <img
      className={`${className} rounded-full object-cover`}
      src={logo}
      alt=""
    />
  )
}
