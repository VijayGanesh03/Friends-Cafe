export function FriendsLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "vj-logo compact" : "vj-logo"}>
      <span className="vj-logo-symbol friends-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <rect x="4" y="4" width="56" height="56" rx="18" stroke="currentColor" strokeWidth="2" />
          <path d="M20 44V19h17M20 30h14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M47 24.5a11 11 0 1 0 0 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M44 13c-3-3 2-5 0-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="vj-logo-type"><b>Friends <em>Cafe</em></b><small>CAFE &amp; KITCHEN</small></span>
    </span>
  );
}
