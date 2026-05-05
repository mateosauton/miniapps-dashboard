'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const STORYBOOK_URL = 'https://mini-apps-ui-kit.world.org/'

/* ─── Primitive demo components (pixel-accurate to UIKit specs) ──────────── */

function UKButton({
  variant = 'primary',
  size = 'lg',
  children,
  onClick,
  fullWidth,
}: {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'lg' | 'sm' | 'icon'
  children: React.ReactNode
  onClick?: () => void
  fullWidth?: boolean
}) {
  const base = 'font-semibold rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 select-none'
  const variants = {
    primary: 'bg-[#181818] text-white hover:bg-[#3c424b]',
    secondary: 'bg-[#f3f4f5] text-[#181818] hover:bg-[#ebeced]',
    tertiary: 'bg-transparent text-[#181818] hover:bg-[#f3f4f5]',
  }
  const sizes = {
    lg: 'h-14 px-6 text-[15px]',
    sm: 'h-10 px-4 text-[13px]',
    icon: 'size-10 text-[15px]',
  }
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  )
}

function UKInput({
  label,
  placeholder,
  variant = 'default',
  error,
  isValid,
  startAdornment,
  value,
  onChange,
}: {
  label?: string
  placeholder?: string
  variant?: 'default' | 'floating-label'
  error?: boolean
  isValid?: boolean
  startAdornment?: React.ReactNode
  value?: string
  onChange?: (v: string) => void
}) {
  const borderColor = error ? 'border-[#f2280d]' : isValid ? 'border-[#00c230]' : 'border-[#ebeced] focus-within:border-[#181818]'
  return (
    <div className={`flex items-center border rounded-xl bg-white h-14 px-4 gap-3 transition-colors ${borderColor}`}>
      {startAdornment && (
        <>
          <span className="text-[#9ba3ae] shrink-0">{startAdornment}</span>
          <span className="w-px h-5 bg-[#ebeced]" />
        </>
      )}
      <div className="flex-1 relative">
        {variant === 'floating-label' && label && (
          <label className={`absolute left-0 transition-all pointer-events-none ${value ? 'top-0 text-[10px]' : 'top-2.5 text-[15px]'} text-[#9ba3ae]`}>
            {label}
          </label>
        )}
        <input
          className={`w-full bg-transparent outline-none text-[17px] text-[#181818] placeholder-[#9ba3ae] ${variant === 'floating-label' && value ? 'pt-4' : ''}`}
          placeholder={variant === 'default' ? (placeholder ?? label ?? '') : ''}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
      {isValid && <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c230" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>}
      {error && <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f2280d" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>}
    </div>
  )
}

function UKListItem({
  label,
  description,
  start,
  end,
}: {
  label: string
  description?: string
  start?: React.ReactNode
  end?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 bg-[#f9fafb] rounded-2xl h-[76px] px-4 cursor-pointer hover:bg-[#f3f4f5] transition-colors">
      {start && <div className="shrink-0">{start}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-[17px] font-medium text-[#181818] truncate">{label}</div>
        {description && <div className="text-[13px] text-[#9ba3ae] truncate">{description}</div>}
      </div>
      {end && <div className="shrink-0 text-[#9ba3ae]">{end}</div>}
    </div>
  )
}

function UKCircularIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-11 h-11 rounded-full bg-[#f3f4f5] flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

function UKToken({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[13px]`} style={{ background: color }}>
        {symbol[0]}
      </div>
      <span className="text-[11px] text-[#717680]">{symbol}</span>
    </div>
  )
}

function UKVerificationBadge({ verified }: { verified: boolean }) {
  return (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${verified ? 'bg-[#005cff]' : 'bg-[#d6d9dd]'}`}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  )
}

function UKPill({ variant, children }: { variant: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode }) {
  const colors = {
    success: 'bg-[#00c230]/10 text-[#00c230]',
    warning: 'bg-[#ffae00]/10 text-[#ffae00]',
    error: 'bg-[#f2280d]/10 text-[#f2280d]',
    info: 'bg-[#005cff]/10 text-[#005cff]',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-medium ${colors[variant]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors[variant].split(' ')[0].replace('/10', '')}`} />
      {children}
    </span>
  )
}

function UKSkeleton({ className }: { className: string }) {
  return <div className={`bg-[#ebeced] animate-pulse rounded ${className}`} />
}

function UKProgress({ value }: { value: number }) {
  return (
    <div className="w-full bg-[#f3f4f5] rounded-full h-2 overflow-hidden">
      <div className="bg-[#181818] h-full rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
  )
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#CECDCA] rounded-lg overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[#f9f9f8]">
        <code className="text-[12px] font-mono font-semibold text-[#121212]">{title}</code>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function SectionHeader({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">{label}</span>
      {count !== undefined && (
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#f9f9f8] text-[#9D9B96]">{count}</span>
      )}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function UIKitSection() {
  const [inputVal, setInputVal] = useState('')
  const [floatVal, setFloatVal] = useState('')
  const [feedbackState, setFeedbackState] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle')
  const [activeTab, setActiveTab] = useState('send')

  async function handleFeedbackDemo() {
    setFeedbackState('pending')
    await new Promise((r) => setTimeout(r, 1200))
    setFeedbackState('success')
    setTimeout(() => setFeedbackState('idle'), 2000)
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white border border-[#CECDCA] rounded-lg p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-7 h-7 bg-[#121212] rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <div className="font-semibold text-[14px] text-[#121212]">World Mini Apps UI Kit</div>
            </div>
            <p className="text-[12.5px] text-[#9D9B96] max-w-lg">
              <code className="font-mono bg-[#f9f9f8] px-1.5 py-0.5 rounded text-[11.5px] mr-1">@worldcoin/mini-apps-ui-kit-react</code>
              {`— 40+ components pixel-matched to World App's native UI. All demos below use exact design tokens.`}
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f9f9f8] border border-[#CECDCA] text-[#121212] text-[12px] font-semibold rounded-md hover:bg-[#e1dfda] transition-colors">
              Storybook ↗
            </a>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText('npm install @worldcoin/mini-apps-ui-kit-react')
                toast.success('Copied install command')
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] text-white text-[12px] font-semibold rounded-md hover:bg-[#2D2C2C] transition-colors"
            >
              Copy install
            </button>
          </div>
        </div>

        {/* Install snippet */}
        <div className="mt-4 bg-[#121212] rounded-lg px-4 py-3 font-mono text-[12.5px] text-[#f9f9f8] flex items-center justify-between gap-4">
          <span>
            <span className="text-[#9D9B96]">$</span>{' '}
            <span className="text-[#3fdbec]">npm</span>{' '}
            install @worldcoin/mini-apps-ui-kit-react
          </span>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText("import \"@worldcoin/mini-apps-ui-kit-react/styles.css\"")
              toast.success('Copied CSS import')
            }}
            className="text-[11px] text-[#9D9B96] hover:text-white transition-colors whitespace-nowrap"
          >
            + Copy CSS import
          </button>
        </div>
      </div>

      {/* ── Design Tokens ───────────────────────────────────────── */}
      <div>
        <SectionHeader label="Design Tokens" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Color tokens */}
          <DemoCard title="Colors">
            <div className="space-y-2.5">
              {[
                { name: 'gray-900 (primary)', hex: '#181818' },
                { name: 'gray-500 (muted)', hex: '#717680' },
                { name: 'gray-200 (border)', hex: '#ebeced' },
                { name: 'gray-50 (surface)', hex: '#f9fafb' },
                { name: 'world-blue', hex: '#3fdbec' },
                { name: 'info (links)', hex: '#005cff' },
                { name: 'success', hex: '#00c230' },
                { name: 'error', hex: '#f2280d' },
                { name: 'warning', hex: '#ffae00' },
              ].map(({ name, hex }) => (
                <div key={hex} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border border-[#ebeced] shrink-0" style={{ background: hex }} />
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-[#181818]">{name}</div>
                    <code className="text-[10.5px] text-[#9ba3ae]">{hex}</code>
                  </div>
                </div>
              ))}
            </div>
          </DemoCard>

          {/* Typography tokens */}
          <DemoCard title="Typography (TWK Lausanne)">
            <div className="space-y-2">
              {[
                { name: 'display', size: '56px', cls: 'text-[56px] leading-none font-semibold', sample: 'Aa' },
                { name: 'headline-lg', size: '44px', cls: 'text-[44px] leading-none font-semibold', sample: 'Aa' },
                { name: 'title-sm', size: '21px', cls: 'text-[21px] leading-snug font-semibold', sample: 'Heading' },
                { name: 'body-md', size: '17px', cls: 'text-[17px] leading-relaxed font-normal', sample: 'Body text' },
                { name: 'label-lg', size: '15px', cls: 'text-[15px] font-medium', sample: 'Button / Tab' },
                { name: 'label-md', size: '13px', cls: 'text-[13px] font-medium', sample: 'Badge / Chip' },
                { name: 'label-sm', size: '11px', cls: 'text-[11px] font-medium', sample: 'Caption' },
              ].map(({ name, size, cls, sample }) => (
                <div key={name} className="flex items-baseline justify-between gap-2 border-b border-[#f9f9f8] last:border-0 pb-2 last:pb-0">
                  <span className={`${cls} text-[#181818]`}>{sample}</span>
                  <div className="text-right">
                    <div className="text-[11px] font-mono text-[#9ba3ae]">{name}</div>
                    <div className="text-[10.5px] text-[#d6d9dd]">{size}</div>
                  </div>
                </div>
              ))}
            </div>
          </DemoCard>
        </div>
      </div>

      {/* ── Buttons ─────────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Button" count={3} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DemoCard title="Button — variants">
            <div className="space-y-3">
              <UKButton variant="primary">Primary action</UKButton>
              <UKButton variant="secondary">Secondary action</UKButton>
              <UKButton variant="tertiary">Tertiary / ghost</UKButton>
            </div>
          </DemoCard>
          <DemoCard title="Button — sizes + icon">
            <div className="space-y-3">
              <div className="flex gap-3 items-center flex-wrap">
                <UKButton size="lg">Large (default)</UKButton>
                <UKButton size="sm">Small</UKButton>
                <UKButton size="icon">✕</UKButton>
              </div>
              <UKButton fullWidth>Full width CTA</UKButton>
            </div>
          </DemoCard>
        </div>
        <div className="mt-2 bg-[#f9f9f8] border border-[#e1dfda] rounded-lg px-3 py-2 text-[11.5px] text-[#9D9B96]">
          {'ℹ️ Buttons fire '}
          <code className="font-mono text-[11px]">{'impact("light")'}</code>
          {' haptic automatically — no manual wiring needed. All variants are '}
          <code className="font-mono text-[11px]">rounded-full</code>.
        </div>
      </div>

      {/* ── Inputs ──────────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Form Inputs" count={9} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DemoCard title="Input — default">
            <div className="space-y-3">
              <UKInput placeholder="Enter your email" value={inputVal} onChange={setInputVal} />
              <UKInput
                placeholder="Amount"
                startAdornment={<span className="text-[15px] font-medium text-[#181818]">$</span>}
                value=""
              />
            </div>
          </DemoCard>
          <DemoCard title="Input — floating label + states">
            <div className="space-y-3">
              <UKInput variant="floating-label" label="Email address" value={floatVal} onChange={setFloatVal} />
              <UKInput placeholder="Valid input" isValid value="correct@email.com" />
              <UKInput placeholder="Error input" error value="bad-value" />
            </div>
          </DemoCard>
          <DemoCard title="WalletAddressField">
            <div className="flex items-center border border-[#ebeced] rounded-xl bg-white h-14 px-4 gap-3 focus-within:border-[#181818] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ba3ae" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              <input className="flex-1 bg-transparent outline-none text-[17px] text-[#181818] placeholder-[#9ba3ae]" placeholder="Wallet address" />
              <button className="text-[13px] font-semibold text-[#005cff] hover:text-[#181818] transition-colors">Paste</button>
            </div>
          </DemoCard>
          <DemoCard title="OTPField">
            <div className="flex gap-2 justify-center">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className={`w-10 h-12 border-2 rounded-xl flex items-center justify-center text-[20px] font-semibold text-[#181818] ${i <= 3 ? 'border-[#181818] bg-[#f3f4f5]' : 'border-[#ebeced]'}`}>
                  {i <= 3 ? '•' : ''}
                </div>
              ))}
            </div>
          </DemoCard>
        </div>
      </div>

      {/* ── ListItem ─────────────────────────────────────────────── */}
      <div>
        <SectionHeader label="ListItem" />
        <DemoCard title="ListItem — examples">
          <div className="space-y-2">
            <UKListItem
              label="Send money"
              description="Transfer WLD or USDC"
              start={<UKCircularIcon><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181818" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></UKCircularIcon>}
              end={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>}
            />
            <UKListItem
              label="Worldcoin"
              description="WLD · #181818"
              start={<UKToken symbol="WLD" color="#181818" />}
              end={<div className="text-right"><div className="text-[17px] font-semibold text-[#181818]">12.5</div><div className="text-[13px] text-[#9ba3ae]">$4.20</div></div>}
            />
            <UKListItem
              label="Alex Smith"
              description="World ID verified"
              start={<div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3fdbec] to-[#005cff] border-2 border-[#f3f4f5] p-0.5"><div className="w-full h-full rounded-full bg-[#ebeced]" /></div>}
              end={<UKVerificationBadge verified={true} />}
            />
          </div>
        </DemoCard>
      </div>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Navigation & Layout" count={5} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DemoCard title="TopBar">
            <div className="bg-white border border-[#ebeced] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-6 pb-2 h-[72px]">
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f5]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#181818" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <span className="text-[21px] font-semibold text-[#181818]">Send Payment</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f5]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ba3ae" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          </DemoCard>

          <DemoCard title="BottomBar">
            <div className="bg-white border border-[#ebeced] rounded-xl overflow-hidden px-6 py-3">
              <div className="grid grid-cols-2 gap-3">
                <UKButton variant="secondary">Decline</UKButton>
                <UKButton variant="primary">Accept</UKButton>
              </div>
            </div>
          </DemoCard>

          <DemoCard title="Tabs">
            <div>
              <div className="flex border-b border-[#ebeced] relative">
                {['send', 'receive', 'history'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`flex-1 py-3 text-[15px] font-medium capitalize transition-colors relative ${activeTab === t ? 'text-[#181818]' : 'text-[#9ba3ae]'}`}
                  >
                    {t}
                    {activeTab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#181818] rounded-full" />}
                  </button>
                ))}
              </div>
              <div className="pt-3 text-[13px] text-[#9ba3ae] text-center">
                {activeTab === 'send' && 'Send funds to any address'}
                {activeTab === 'receive' && 'Your receive address & QR code'}
                {activeTab === 'history' && 'Recent transactions'}
              </div>
            </div>
          </DemoCard>

          <DemoCard title="Drawer (preview)">
            <div className="relative bg-black/30 rounded-xl overflow-hidden h-32 flex items-end">
              <div className="w-full bg-white rounded-t-3xl px-4 pt-3 pb-4">
                <div className="w-10 h-1 bg-[#ebeced] rounded-full mx-auto mb-3" />
                <div className="text-[17px] font-semibold text-[#181818]">Confirm payment</div>
                <div className="text-[13px] text-[#9ba3ae] mt-0.5">Review the details below</div>
              </div>
            </div>
            <p className="text-[11.5px] text-[#9D9B96] mt-2">{'Built on vaul. Use '}
              <code className="font-mono">{'height="fit"'}</code>
              {' for confirmations, '}
              <code className="font-mono">{'height="full"'}</code>
              {' for flows.'}
            </p>
          </DemoCard>
        </div>
      </div>

      {/* ── Feedback ─────────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Feedback & Alerts" count={5} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <DemoCard title="LiveFeedback (interactive)">
            <div className="space-y-3">
              <div className={`w-full h-14 rounded-full flex items-center justify-center font-semibold text-[15px] transition-all ${
                feedbackState === 'idle' ? 'bg-[#181818] text-white cursor-pointer hover:bg-[#3c424b]'
                : feedbackState === 'pending' ? 'bg-[#f3f4f5] text-[#717680] cursor-not-allowed'
                : feedbackState === 'success' ? 'bg-[#00c230] text-white'
                : 'bg-[#f2280d] text-white'
              }`}
                onClick={feedbackState === 'idle' ? handleFeedbackDemo : undefined}
              >
                {feedbackState === 'idle' && 'Send Payment ↗ tap to demo'}
                {feedbackState === 'pending' && (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Sending...
                  </span>
                )}
                {feedbackState === 'success' && '✓ Sent!'}
                {feedbackState === 'failed' && '✕ Failed'}
              </div>
              <p className="text-[11.5px] text-[#9D9B96]">{'Fires '}
                <code className="font-mono">{'notification("success")'}</code>
                {' haptic automatically on state change.'}
              </p>
            </div>
          </DemoCard>

          <DemoCard title="CircularState + Pills">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {[
                  { state: 'pending', color: '#f3f4f5', icon: <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717680" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> },
                  { state: 'success', color: '#00c230', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg> },
                  { state: 'failed', color: '#f2280d', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg> },
                ].map(({ state, color, icon }) => (
                  <div key={state} className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: color }}>
                      {icon}
                    </div>
                    <span className="text-[11px] text-[#9ba3ae]">{state}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <UKPill variant="success">Verified</UKPill>
                <UKPill variant="warning">Pending</UKPill>
                <UKPill variant="error">Failed</UKPill>
                <UKPill variant="info">Info</UKPill>
              </div>
            </div>
          </DemoCard>

          <DemoCard title="AlertDialog (structure)">
            <div className="border border-[#ebeced] rounded-2xl p-4 bg-white shadow-sm space-y-3">
              <div className="text-[17px] font-semibold text-[#181818]">Delete account?</div>
              <div className="text-[15px] text-[#717680]">This action cannot be undone. All your data will be permanently removed.</div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <UKButton variant="secondary" size="sm">Cancel</UKButton>
                <UKButton size="sm">Delete</UKButton>
              </div>
            </div>
          </DemoCard>

          <DemoCard title="VerificationBadge">
            <div className="space-y-3">
              {[true, false].map((v) => (
                <div key={String(v)} className="flex items-center gap-3 bg-[#f9fafb] rounded-2xl h-16 px-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3fdbec] to-[#005cff]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] font-medium text-[#181818]">{v ? 'Alex Smith' : 'Anonymous'}</span>
                      <UKVerificationBadge verified={v} />
                    </div>
                    <div className="text-[13px] text-[#9ba3ae]">{v ? 'World ID verified' : 'Unverified'}</div>
                  </div>
                </div>
              ))}
            </div>
          </DemoCard>
        </div>
      </div>

      {/* ── Data Display ─────────────────────────────────────────── */}
      <div>
        <SectionHeader label="Data Display" count={13} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <DemoCard title="Token (crypto logos)">
            <div className="flex gap-5 flex-wrap items-end">
              <UKToken symbol="WLD" color="#181818" />
              <UKToken symbol="USDC" color="#00c230" />
              <UKToken symbol="ETH" color="#3385ff" />
              <UKToken symbol="BTC" color="#ff5a00" />
              <UKToken symbol="DAI" color="#ffae00" />
              <UKToken symbol="SOL" color="#8600ff" />
            </div>
            <p className="text-[11.5px] text-[#9D9B96] mt-3">Supports: WLD, BTC, ETH, USDC, USDT, DAI, SOL, SUI, DOGE, XRP, LINK. Size and monochrome variants available.</p>
          </DemoCard>

          <DemoCard title="Progress + Skeleton">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[12px] text-[#9ba3ae] mb-1.5"><span>Verification progress</span><span>75%</span></div>
                <UKProgress value={75} />
              </div>
              <div>
                <div className="text-[12px] text-[#9ba3ae] mb-2">Loading state (Skeleton)</div>
                <div className="space-y-2">
                  <div className="flex gap-3 items-center">
                    <UKSkeleton className="w-11 h-11 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <UKSkeleton className="h-4 rounded w-3/4" />
                      <UKSkeleton className="h-3 rounded w-1/2" />
                    </div>
                  </div>
                  <UKSkeleton className="h-[76px] rounded-2xl w-full" />
                </div>
              </div>
            </div>
          </DemoCard>

          <DemoCard title="Marble (identity avatar)">
            <div className="flex items-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div
                    className="rounded-full border-2 border-[#f3f4f5] p-[3px] aspect-square overflow-hidden"
                    style={{ width: [48, 60, 40][i] }}
                  >
                    <div className="w-full h-full rounded-full" style={{
                      background: `linear-gradient(${135 + i * 45}deg, ${['#3fdbec','#005cff','#8600ff'][i]}, ${['#00c230','#3fdbec','#f2280d'][i]})`
                    }} />
                  </div>
                  <span className="text-[10.5px] text-[#9ba3ae]">{['w-12','w-16','w-10'][i]}</span>
                </div>
              ))}
              <p className="text-[11.5px] text-[#9D9B96] flex-1">Generative per-user identity image. Size via className. Always <code className="font-mono">rounded-full</code>.</p>
            </div>
          </DemoCard>

          <DemoCard title="Chip + CircularIcon">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {['World ID', 'Verified', 'Human', 'DeFi'].map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 bg-[#f3f4f5] text-[#181818] text-[13px] font-medium px-3 py-1.5 rounded-full">
                    {c}
                    <button className="text-[#9ba3ae] hover:text-[#181818] transition-colors leading-none">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {[
                  { icon: '↑', bg: 'bg-[#f3f4f5]' },
                  { icon: '↓', bg: 'bg-[#EBF5FF]' },
                  { icon: '⊕', bg: 'bg-[#f3f4f5]' },
                  { icon: '⚙', bg: 'bg-[#f3f4f5]' },
                ].map(({ icon, bg }, i) => (
                  <div key={i} className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center text-[18px] text-[#181818] cursor-pointer hover:opacity-80 transition-opacity`}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </DemoCard>
        </div>
      </div>

      {/* ── Common patterns ──────────────────────────────────────── */}
      <div>
        <SectionHeader label="Common Patterns" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <DemoCard title="Payment screen layout">
            <div className="border border-[#ebeced] rounded-2xl overflow-hidden bg-[#f9fafb]">
              {/* TopBar */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2 bg-white border-b border-[#ebeced]">
                <button className="w-7 h-7 flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#181818" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg></button>
                <span className="text-[15px] font-semibold">Send WLD</span>
                <div className="w-7" />
              </div>
              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-center border border-[#ebeced] rounded-xl bg-white h-12 px-3 gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#181818]" />
                  <span className="w-px h-4 bg-[#ebeced]" />
                  <input className="flex-1 outline-none text-[15px] placeholder-[#9ba3ae] bg-transparent" placeholder="Amount" readOnly />
                </div>
                <div className="flex items-center border border-[#ebeced] rounded-xl bg-white h-12 px-3">
                  <input className="flex-1 outline-none text-[15px] placeholder-[#9ba3ae] bg-transparent" placeholder="Wallet address" readOnly />
                  <button className="text-[12px] font-semibold text-[#005cff]">Paste</button>
                </div>
              </div>
              {/* BottomBar */}
              <div className="px-4 py-3 bg-white border-t border-[#ebeced]">
                <div className="h-11 bg-[#181818] rounded-full flex items-center justify-center text-[13px] font-semibold text-white">Send</div>
              </div>
            </div>
          </DemoCard>

          <DemoCard title="Confirmation drawer">
            <div className="border border-[#ebeced] rounded-2xl overflow-hidden">
              <div className="bg-black/20 p-2 text-center text-[11px] text-white/80">← screen behind drawer</div>
              <div className="bg-white rounded-t-3xl p-4 space-y-2">
                <div className="w-8 h-1 bg-[#ebeced] rounded-full mx-auto" />
                <div className="text-[15px] font-semibold text-[#181818]">Confirm payment</div>
                {[['Amount', '10 WLD'], ['Fee', '0.01 WLD'], ['Total', '10.01 WLD']].map(([l, v]) => (
                  <div key={l} className="flex justify-between bg-[#f9fafb] rounded-xl h-12 px-4 items-center">
                    <span className="text-[13px] text-[#717680]">{l}</span>
                    <span className="text-[13px] font-semibold text-[#181818]">{v}</span>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="h-10 bg-[#f3f4f5] rounded-full flex items-center justify-center text-[13px] font-semibold">Cancel</div>
                  <div className="h-10 bg-[#181818] rounded-full flex items-center justify-center text-[13px] font-semibold text-white">Confirm</div>
                </div>
              </div>
            </div>
          </DemoCard>
        </div>
      </div>

    </div>
  )
}
