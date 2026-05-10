interface Props {
  message: string
}

export function ErrorBanner({ message }: Props) {
  return (
    <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg border border-[#f5c97a] bg-[#fffbeb] text-[#92530c]">
      <span className="text-[14px] shrink-0 mt-px">⚠</span>
      <div className="text-[12.5px] leading-relaxed">
        <span className="font-semibold">Live data unavailable</span>
        {' — '}
        {message}
      </div>
    </div>
  )
}
