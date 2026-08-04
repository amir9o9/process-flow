function Header() {
  return (
    <header className="flex items-center justify-between bg-linear-to-r from-[#842BD2] to-[#CA93FF] px-4 py-0.5 text-black shadow-lg">
      <div className="flex items-center gap-3">

        <svg width="80" height="80" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <rect x="12" y="2" width="48" height="48" rx="12" fill="black" />
          <path d="M39 35V32H35V22H33V25H26V17H33V20H39V17H46V25H39V22H37V30H39V27H46V35H39V35M28 19V19V23V23V19V19M41 29V29V33V33V29V29M41 19V19V23V23V19V19M41 23H44V19H41V23V23M41 33H44V29H41V33V33M28 23H31V19H28V23V23" fill="white" />
        </svg>

        <div>
          <h1 className="text-2xl font-bold ">ProcessFlow</h1>
          <p className="text-sm text-slate-300">v 0.0.1</p>
        </div>
      </div>

    </header>
  )
}

export default Header
