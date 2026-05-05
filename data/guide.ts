import type { GuideSection } from '@/types'

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'prerequisites',
    title: 'Prerequisites & Environment Setup',
    steps: [
      {
        n: 1,
        title: 'Node.js & Package Manager',
        text: 'Node.js ≥18.18 (recommended: 20 LTS). Use npm, yarn, or pnpm.',
        code: `node --version   # ≥18.18.0
npm --version    # ≥10.0.0`,
      },
      {
        n: 2,
        title: 'Register your app',
        text: 'Create an app in the World Developer Portal to get your APP_ID and API keys.',
        code: `# developer.worldcoin.org → New App
# Copy: app_id, api_key, action names`,
      },
      {
        n: 3,
        title: 'Environment variables',
        code: `# .env.local
NEXT_PUBLIC_APP_ID=app_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_ACTION=your_action_name
WORLD_APP_API_KEY=your_backend_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000`,
      },
      {
        n: 4,
        title: 'Tunnel for local dev',
        text: 'World App requires HTTPS. Use ngrok or Cloudflare Tunnel during development.',
        code: `npx ngrok http 3000
# Set NEXTAUTH_URL to the ngrok URL`,
      },
    ],
  },
  {
    id: 'minikit-install',
    title: 'MiniKit Installation',
    steps: [
      {
        n: 1,
        title: 'Install packages',
        code: `npm install @worldcoin/minikit-js @worldcoin/idkit`,
      },
      {
        n: 2,
        title: 'Add MiniKit Provider',
        text: 'Wrap your app with MiniKitProvider in app/layout.tsx.',
        code: `// app/providers.tsx
'use client'
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MiniKitProvider appId={process.env.NEXT_PUBLIC_APP_ID}>
      {children}
    </MiniKitProvider>
  )
}`,
      },
      {
        n: 3,
        title: 'Check MiniKit availability',
        text: 'MiniKit only works inside World App. Check before calling commands.',
        code: `import { MiniKit } from '@worldcoin/minikit-js'

if (!MiniKit.isInstalled()) {
  // Show "Open in World App" button or fallback UI
  return
}`,
      },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication (walletAuth + World ID)',
    steps: [
      {
        n: 1,
        title: 'Generate nonce endpoint',
        code: `// app/api/nonce/route.ts
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

export async function GET() {
  const nonce = randomUUID().replace(/-/g, '')
  // Store nonce with 5-min expiry in your session store
  return NextResponse.json({ nonce })
}`,
      },
      {
        n: 2,
        title: 'SIWE verification endpoint',
        code: `// app/api/complete-siwe/route.ts
import { MiniKit, verifySiweMessage } from '@worldcoin/minikit-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { payload, nonce } = await req.json()
  const { isValid, siweMessageData } = await verifySiweMessage(payload, nonce)
  if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })

  // Issue session / JWT here
  return NextResponse.json({ address: siweMessageData.address })
}`,
      },
      {
        n: 3,
        title: 'Client: trigger wallet auth',
        code: `const signIn = async () => {
  if (!MiniKit.isInstalled()) return
  const { nonce } = await fetch('/api/nonce').then(r => r.json())
  const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
    nonce,
    statement: 'Sign in to Dashboard',
    expirationTime: new Date(Date.now() + 86400_000),
  })
  if (finalPayload.status === 'error') return
  await fetch('/api/complete-siwe', {
    method: 'POST',
    body: JSON.stringify({ payload: finalPayload, nonce }),
  })
}`,
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments (pay + sendTransaction)',
    steps: [
      {
        n: 1,
        title: 'WLD / USDC payment',
        code: `import { MiniKit, Tokens, tokenToDecimals } from '@worldcoin/minikit-js'

const initiatePayment = async () => {
  const ref = crypto.randomUUID()
  // Store ref in DB as 'pending'

  const { finalPayload } = await MiniKit.commandsAsync.pay({
    reference: ref,
    to: RECIPIENT_ADDRESS,
    tokens: [{ symbol: Tokens.WLD, token_amount: tokenToDecimals(1, Tokens.WLD).toString() }],
    description: 'Unlock premium feature',
  })

  if (finalPayload.status === 'success') {
    // Backend confirms before fulfilling
    await fetch(\`/api/confirm/\${finalPayload.transaction_id}\`)
  }
}`,
      },
      {
        n: 2,
        title: 'Smart contract interaction with Permit2',
        code: `const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
  transaction: [{
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: 'deposit',
    args: [amount],
  }],
  permit2: [{
    permitted: { token: USDC_ADDRESS, amount: BigInt(amount) },
    spender: CONTRACT_ADDRESS,
    nonce: generatePermit2Nonce(),
    deadline: Math.floor(Date.now() / 1000) + 1800,
  }],
})`,
      },
    ],
  },
  {
    id: 'user-features',
    title: 'User Features (notifications, haptics, share)',
    steps: [
      {
        n: 1,
        title: 'Request notification permission',
        code: `const enableNotifications = async () => {
  const { finalPayload: perms } = await MiniKit.commandsAsync.getPermissions()
  if (perms.permissions?.notifications) return // already granted

  const { finalPayload } = await MiniKit.commandsAsync.requestPermission({
    permission: 'notifications',
  })
  if (finalPayload.granted) {
    await fetch('/api/register-push', {
      method: 'POST',
      body: JSON.stringify({ wallet: MiniKit.user.walletAddress }),
    })
  }
}`,
      },
      {
        n: 2,
        title: 'Send notification from backend',
        code: `// app/api/notify/route.ts
export async function POST(req: Request) {
  const { wallets, title, message, path } = await req.json()
  const res = await fetch('https://developer.worldcoin.org/api/v2/minikit/send-notification', {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${process.env.WORLD_APP_API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_APP_ID,
      wallet_addresses: wallets,
      title, message,
      mini_app_path: path,
    }),
  })
  return Response.json(await res.json())
}`,
      },
      {
        n: 3,
        title: 'Haptics + share',
        code: `// Confirm action with haptic
await MiniKit.commandsAsync.sendHapticFeedback({ type: 'notification', style: 'success' })

// Share achievement
await MiniKit.commandsAsync.share({
  title: 'I just earned 500 points!',
  url: \`https://app.com/share?ref=\${userId}&utm_source=world_app\`,
})`,
      },
    ],
  },
  {
    id: 'security',
    title: 'Security Best Practices',
    items: [
      {
        sev: 'critical',
        title: 'Verify payments server-side before fulfilling',
        text: 'Call /api/v2/minikit/transaction/{id}/confirmation before granting access or shipping goods. Never trust client-reported success.',
      },
      {
        sev: 'critical',
        title: 'Store nullifier_hash to prevent proof replay',
        text: 'World ID proofs are single-use per action. Store nullifier_hash in DB and reject duplicates with 400.',
      },
      {
        sev: 'critical',
        title: 'Keep WORLD_APP_API_KEY server-side only',
        text: 'Never expose API keys in client code or NEXT_PUBLIC_ env vars. Use Route Handlers or Server Actions for all API calls.',
      },
      {
        sev: 'important',
        title: 'Validate SIWE nonce expiry',
        text: 'Nonces should expire after 5 minutes. Store with TTL in Redis or check timestamp on verification.',
      },
      {
        sev: 'important',
        title: 'Bind World ID proof signal to wallet address',
        text: 'Set signal=walletAddress in IDKit to bind the ZK proof to the user\'s specific wallet, preventing proof transfer.',
      },
      {
        sev: 'important',
        title: 'Whitelist contract addresses in Developer Portal',
        text: 'Only whitelisted contract addresses can be called via sendTransaction. Verify before going live.',
      },
      {
        sev: 'recommended',
        title: 'Check MiniKit.isInstalled() before all commands',
        text: 'Always guard with isInstalled() check. Show "Open in World App" fallback for direct browser access.',
      },
      {
        sev: 'recommended',
        title: 'Implement idempotent payment references',
        text: 'Generate payment reference on server, not client. Store with status. Handle duplicate callbacks gracefully.',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance Targets',
    metrics: [
      { val: '<3s', label: 'First Contentful Paint', note: 'Target for mini app initial load' },
      { val: '≥15%', label: 'Notification Open Rate', note: 'Industry benchmark for push CTR' },
      { val: '≥40%', label: 'Signup Conversion', note: 'walletAuth completion rate' },
      { val: '<500ms', label: 'API Response Time', note: 'Backend endpoint P95 latency' },
      { val: '1hr', label: 'Data Revalidation', note: 'Server Component cache TTL' },
      { val: '0', label: 'TypeScript Errors', note: 'Strict mode, no any' },
    ],
  },
]
