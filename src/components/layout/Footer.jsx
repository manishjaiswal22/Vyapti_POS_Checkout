import markssLogo from '../../assets/markss-logo.png'

export default function Footer({ version = 'v1.0.0' }) {
  return (
    <footer className="w-full bg-transparent px-0 py-1.5 flex items-center justify-between text-[11px] text-[#6B7280] shrink-0">
      {/* Left Branding */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-[#6B7280]">Designed & Developed By</span>
        <img
          src={markssLogo}
          alt="MARKSS INFOTECH LIMITED"
          className="h-5 md:h-6 w-auto object-contain"
        />
      </div>

      {/* Right Version Info */}
      <div className="flex items-center gap-1.5 text-[#64748B] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] text-[#64748B] tracking-wide">Version {version}</span>
      </div>
    </footer>
  )
}
