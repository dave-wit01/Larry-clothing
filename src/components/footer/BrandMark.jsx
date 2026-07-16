import logo from '../../assets/logo.png';

export default function BrandMark() {
  return (
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black flex items-center justify-center mb-8">
      <img src={logo} alt="Larry logo" className="w-full h-full rounded-full object-cover" />
    </div>
  );
}
