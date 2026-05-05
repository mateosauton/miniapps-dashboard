import type { MiniKitCommand } from '@/types'

export const COMMANDS: MiniKitCommand[] = [
  // ── MiniKit ──────────────────────────────────────────────────────────────────
  {
    slug: 'wallet-auth',
    name: 'walletAuth',
    sdk: 'minikit',
    category: 'auth',
    description: 'Sign-In with Ethereum (SIWE) via World App wallet.',
    longDescription:
      'Initiates SIWE flow. Returns a signed message and proof that the World App wallet signed the nonce. Backend must verify the signature and issue a session.',
    prereqs: ['MiniKit installed', 'NEXTAUTH_SECRET set', 'Backend /api/complete-siwe endpoint'],
    params: [
      { name: 'nonce', type: 'string', required: true, description: 'Unique per-request nonce generated on server' },
      { name: 'expirationTime', type: 'Date', required: false, description: 'When the SIWE message expires' },
      { name: 'statement', type: 'string', required: false, description: 'Human-readable statement shown to user' },
      { name: 'requestId', type: 'string', required: false, description: 'App-specific request identifier' },
    ],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Result status' },
      { field: 'message', type: 'string', description: 'Signed SIWE message' },
      { field: 'signature', type: 'string', description: 'Wallet signature over the message' },
      { field: 'address', type: 'string', description: 'Signer wallet address' },
    ],
    codeExample: `import { MiniKit } from '@worldcoin/minikit-js'

// 1. Get nonce from your backend
const res = await fetch('/api/nonce')
const { nonce } = await res.json()

// 2. Trigger SIWE
const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
  nonce,
  expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  statement: 'Sign in to MiniApp Dashboard',
})

if (finalPayload.status === 'error') return

// 3. Verify on backend
const verifyRes = await fetch('/api/complete-siwe', {
  method: 'POST',
  body: JSON.stringify({ payload: finalPayload, nonce }),
})`,
    llmPrompt: `Generate a complete walletAuth (SIWE) implementation for a Next.js 15 App Router project using @worldcoin/minikit-js.

Create these files:

1. app/api/nonce/route.ts
   - GET handler
   - Generate nonce: const nonce = crypto.randomUUID()
   - Store in a server-side Map or your DB with 5-minute expiry
   - Return: NextResponse.json({ nonce })

2. app/api/complete-siwe/route.ts
   - POST handler
   - Body type: { payload: MiniAppWalletAuthSuccessPayload; nonce: string }
   - Import: import { MiniKit, verifySiweMessage } from '@worldcoin/minikit-js'
   - Call: const { isValid, siweMessageData } = await verifySiweMessage(payload, nonce)
   - If !isValid: return NextResponse.json({ ok: false }, { status: 400 })
   - On success: set an httpOnly session cookie with siweMessageData.address, return { ok: true, address }

3. components/WalletAuthButton.tsx (Client Component — 'use client')
   - Import: import { MiniKit, MiniAppWalletAuthSuccessPayload } from '@worldcoin/minikit-js'
   - Check MiniKit.isInstalled() before calling; show a disabled button if false
   - Flow:
     a. const { nonce } = await fetch('/api/nonce').then(r => r.json())
     b. const { finalPayload } = await MiniKit.commandsAsync.walletAuth({ nonce, expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), statement: 'Sign in to MyApp' })
     c. if (finalPayload.status === 'error') { showError(); return }
     d. const res = await fetch('/api/complete-siwe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload: finalPayload as MiniAppWalletAuthSuccessPayload, nonce }) })
     e. if (res.ok) router.push('/dashboard')

TypeScript strict. No 'any'. Use MiniAppWalletAuthSuccessPayload from @worldcoin/minikit-js for the payload type.`,
    errorCodes: ['user_rejected', 'connection_failed', 'invalid_nonce'],
    relatedCommands: ['verify'],
    backendRequired: true,
  },
  {
    slug: 'pay',
    name: 'pay',
    sdk: 'minikit',
    category: 'payments',
    description: 'Request WLD or USDC payment from the user.',
    longDescription:
      'Opens the World App payment sheet. User approves the transaction. Backend must verify via /api/v2/minikit/transaction/{id}/confirmation before fulfilling the order.',
    prereqs: ['MiniKit installed', 'App registered in Developer Portal', 'Backend payment verification endpoint'],
    params: [
      { name: 'reference', type: 'string', required: true, description: 'Unique payment reference ID (UUID)' },
      { name: 'to', type: 'string', required: true, description: 'Recipient wallet address' },
      { name: 'tokens', type: 'TokensPayload[]', required: true, description: 'Array of { symbol, token_amount } objects' },
      { name: 'description', type: 'string', required: true, description: 'Human-readable payment description' },
    ],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Payment status' },
      { field: 'transaction_id', type: 'string', description: 'On-chain transaction ID' },
      { field: 'transaction_hash', type: 'string', description: 'On-chain transaction hash' },
      { field: 'reference', type: 'string', description: 'The reference you passed in' },
    ],
    codeExample: `import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

const payload: PayCommandInput = {
  reference: crypto.randomUUID(),
  to: '0xRecipientAddress',
  tokens: [
    { symbol: Tokens.WLD, token_amount: tokenToDecimals(0.5, Tokens.WLD).toString() },
  ],
  description: 'Premium access — 1 month',
}

const { finalPayload } = await MiniKit.commandsAsync.pay(payload)

if (finalPayload.status === 'success') {
  // Verify on your backend before fulfilling
  const confirm = await fetch(\`/api/confirm-payment/\${finalPayload.transaction_id}\`)
}`,
    llmPrompt: `Generate a complete MiniKit pay command integration for WLD/USDC payments in Next.js 15 App Router.

Env vars required: NEXT_PUBLIC_APP_ID, NEXT_PUBLIC_RECIPIENT_ADDRESS, WORLD_APP_API_KEY

Create these files:

1. app/api/initiate-payment/route.ts (POST)
   - Body: { amount: number; token: 'WLD' | 'USDCE'; description: string }
   - Generate: const reference = crypto.randomUUID()
   - Store in DB: { reference, amount, token, description, status: 'pending', createdAt: new Date() }
   - Return: NextResponse.json({ reference })

2. app/api/confirm-payment/[reference]/route.ts (GET)
   - Fetch: https://developer.worldcoin.org/api/v2/minikit/transaction/\${reference}/confirmation
   - Header: Authorization: Bearer \${process.env.WORLD_APP_API_KEY}
   - Check: data.transaction_status === 'mined'
   - Verify amount matches DB record (prevent tampering)
   - Update DB: status → 'confirmed'
   - NEVER fulfill order before this check returns confirmed

3. components/PayButton.tsx (Client Component — 'use client')
   - Imports: import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'
   - Flow:
     a. POST /api/initiate-payment → get reference
     b. const payload: PayCommandInput = { reference, to: process.env.NEXT_PUBLIC_RECIPIENT_ADDRESS, tokens: [{ symbol: Tokens.WLD, token_amount: tokenToDecimals(amount, Tokens.WLD).toString() }], description }
     c. const { finalPayload } = await MiniKit.commandsAsync.pay(payload)
     d. if (finalPayload.status === 'error') { setError('Payment cancelled'); return }
     e. GET /api/confirm-payment/\${finalPayload.transaction_id}
     f. if confirmed → fulfill order, show success toast

For USDC: use Tokens.USDCE instead of Tokens.WLD.`,
    errorCodes: ['user_rejected', 'transaction_failed', 'invalid_token'],
    relatedCommands: ['send-transaction'],
    backendRequired: true,
  },
  {
    slug: 'send-transaction',
    name: 'sendTransaction',
    sdk: 'minikit',
    category: 'payments',
    description: 'Call arbitrary smart contracts via World App.',
    longDescription:
      'Submits an EVM transaction through the user\'s World App wallet. Supports Permit2 for gasless ERC-20 approvals. Ideal for DeFi interactions.',
    prereqs: ['MiniKit installed', 'Contract ABI', 'Contract whitelisted in Developer Portal'],
    params: [
      { name: 'transaction', type: 'Transaction[]', required: true, description: 'Array of { address, abi, functionName, args }' },
      { name: 'permit2', type: 'Permit2[]', required: false, description: 'Array of Permit2 token approval objects' },
    ],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Submission status' },
      { field: 'transaction_id', type: 'string', description: 'World App transaction ID' },
    ],
    codeExample: `import { MiniKit } from '@worldcoin/minikit-js'

const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
  transaction: [
    {
      address: '0xContractAddress',
      abi: contractAbi,
      functionName: 'stake',
      args: [amount],
    },
  ],
})`,
    llmPrompt: `Generate a complete MiniKit sendTransaction integration for smart contract calls in Next.js 15 App Router.

Env vars: NEXT_PUBLIC_CONTRACT_ADDRESS, WORLD_APP_API_KEY

1. constants/abi.ts
   - Export the contract ABI as a TypeScript const with 'as const' suffix for type inference
   - Example: export const MY_CONTRACT_ABI = [...] as const

2. app/api/verify-tx/[id]/route.ts (GET)
   - Fetch: https://developer.worldcoin.org/api/v2/minikit/transaction/\${id}/confirmation
   - Header: Authorization: Bearer \${process.env.WORLD_APP_API_KEY}
   - Return the transaction status to client
   - Only trigger fulfillment when transaction_status === 'mined'

3. components/ContractButton.tsx (Client Component — 'use client')
   - Imports: import { MiniKit } from '@worldcoin/minikit-js'
   - Import ABI: import { MY_CONTRACT_ABI } from '@/constants/abi'
   - Basic transaction (no Permit2):
     const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
       transaction: [{ address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, abi: MY_CONTRACT_ABI, functionName: 'stake', args: [amountBigInt] }]
     })

   - With Permit2 (for ERC-20 approvals):
     import { generatePermit2Nonce } from '@worldcoin/minikit-js'
     const permit2 = [{
       permitted: { token: TOKEN_ADDRESS, amount: amountBigInt },
       nonce: generatePermit2Nonce(),
       deadline: BigInt(Math.floor(Date.now() / 1000) + 1800), // 30 min
       spender: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
     }]
     Then include permit2 array in sendTransaction call alongside transaction array.

   - After success: GET /api/verify-tx/\${finalPayload.transaction_id} before triggering any state change

IMPORTANT: Whitelist the contract address in the World Developer Portal before shipping.`,
    errorCodes: ['user_rejected', 'transaction_failed', 'contract_not_whitelisted'],
    relatedCommands: ['pay'],
    backendRequired: true,
  },
  {
    slug: 'sign-message',
    name: 'signMessage',
    sdk: 'minikit',
    category: 'signing',
    description: 'EIP-191 personal message signing.',
    longDescription:
      'Signs an arbitrary string message with the user\'s wallet private key (EIP-191). Returns a recoverable signature. Useful for proving ownership without a transaction.',
    prereqs: ['MiniKit installed'],
    params: [
      { name: 'message', type: 'string', required: true, description: 'The message to sign' },
    ],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Signing status' },
      { field: 'signature', type: 'string', description: 'EIP-191 signature hex string' },
    ],
    codeExample: `const { finalPayload } = await MiniKit.commandsAsync.signMessage({
  message: 'Verify ownership of this address',
})

// Recover address on backend with viem:
// const address = await recoverMessageAddress({ message, signature })`,
    llmPrompt: `Generate a complete EIP-191 message signing flow using MiniKit signMessage in Next.js 15 App Router.

1. app/api/verify-signature/route.ts (POST)
   - Install viem: npm install viem
   - Imports: import { recoverMessageAddress } from 'viem'
   - Body: { message: string; signature: string; expectedAddress: string }
   - const recovered = await recoverMessageAddress({ message, signature: signature as \`0x\${string}\` })
   - if (recovered.toLowerCase() !== expectedAddress.toLowerCase()) return 400
   - Issue session or return { verified: true }
   - NEVER trust a client-supplied "recoveredAddress" — always recover server-side

2. components/SignButton.tsx (Client Component — 'use client')
   - Import: import { MiniKit } from '@worldcoin/minikit-js'
   - Build message on server (fetch /api/build-message) to prevent client manipulation
   - const { finalPayload } = await MiniKit.commandsAsync.signMessage({ message })
   - if (finalPayload.status === 'error') return
   - POST /api/verify-signature with { message, signature: finalPayload.signature, expectedAddress: userAddress }

Use case: prove wallet ownership without an on-chain transaction. No gas cost.`,
    errorCodes: ['user_rejected'],
    relatedCommands: ['sign-typed-data'],
    backendRequired: false,
  },
  {
    slug: 'sign-typed-data',
    name: 'signTypedData',
    sdk: 'minikit',
    category: 'signing',
    description: 'EIP-712 structured data signing.',
    longDescription:
      'Signs EIP-712 typed structured data. Provides a human-readable signature request with domain, types, and primary type. Used for gasless approvals, off-chain orders, and more.',
    prereqs: ['MiniKit installed'],
    params: [
      { name: 'types', type: 'Record<string, TypedDataParameter[]>', required: true, description: 'EIP-712 type definitions' },
      { name: 'primaryType', type: 'string', required: true, description: 'The primary type to sign' },
      { name: 'message', type: 'Record<string, unknown>', required: true, description: 'The structured data to sign' },
    ],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Signing status' },
      { field: 'signature', type: 'string', description: 'EIP-712 signature' },
    ],
    codeExample: `const { finalPayload } = await MiniKit.commandsAsync.signTypedData({
  types: {
    Order: [
      { name: 'buyer', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
  },
  primaryType: 'Order',
  message: { buyer: userAddress, amount: BigInt(100) },
})`,
    llmPrompt: `Generate a complete EIP-712 typed data signing flow using MiniKit signTypedData in Next.js 15 App Router.

1. constants/typed-data.ts
   - Install viem: npm install viem
   - Import: import type { TypedData } from 'viem'
   - Export your type definition and domain:
     export const ORDER_TYPES = { Order: [{ name: 'buyer', type: 'address' }, { name: 'amount', type: 'uint256' }, { name: 'nonce', type: 'uint256' }] } satisfies TypedData
     export const DOMAIN = { name: 'MyApp', version: '1', chainId: 480, verifyingContract: '0xYourContract' as \`0x\${string}\` }

2. app/api/verify-typed-signature/route.ts (POST)
   - Imports: import { recoverTypedDataAddress } from 'viem'
   - Import ORDER_TYPES and DOMAIN from constants
   - Body: { message: Record<string, unknown>; signature: string; expectedAddress: string }
   - const recovered = await recoverTypedDataAddress({ domain: DOMAIN, types: ORDER_TYPES, primaryType: 'Order', message, signature: signature as \`0x\${string}\` })
   - Verify recovered === expectedAddress (case-insensitive)
   - Check nonce in DB — mark as used to prevent replay attacks
   - Return { verified: true } or 400

3. components/SignOrderButton.tsx (Client Component — 'use client')
   - Import: import { MiniKit } from '@worldcoin/minikit-js'
   - Fetch a fresh nonce from server before each signing request
   - const { finalPayload } = await MiniKit.commandsAsync.signTypedData({ types: ORDER_TYPES, primaryType: 'Order', message: { buyer: address, amount: BigInt(100), nonce } })
   - POST to /api/verify-typed-signature

chainId 480 = World Chain mainnet. Include verifyingContract in domain to prevent cross-contract replay.`,
    errorCodes: ['user_rejected', 'invalid_typed_data'],
    relatedCommands: ['sign-message'],
    backendRequired: false,
  },
  {
    slug: 'send-haptic-feedback',
    name: 'sendHapticFeedback',
    sdk: 'minikit',
    category: 'ux',
    description: 'Trigger native haptic feedback on the device.',
    longDescription:
      'Fires a haptic pulse via the World App native layer. Three types: impact (physical collision feel), notification (success/warning/error), selection (picker feedback).',
    prereqs: ['MiniKit installed'],
    params: [
      {
        name: 'type',
        type: "'impact' | 'notification' | 'selection'",
        required: true,
        description: 'Haptic feedback type',
      },
      {
        name: 'style',
        type: 'string',
        required: false,
        description: "For 'impact': 'light'|'medium'|'heavy'. For 'notification': 'success'|'warning'|'error'",
      },
    ],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Command result' },
    ],
    codeExample: `// Success confirmation
await MiniKit.commandsAsync.sendHapticFeedback({
  type: 'notification',
  style: 'success',
})

// Button press
await MiniKit.commandsAsync.sendHapticFeedback({
  type: 'impact',
  style: 'light',
})`,
    llmPrompt: `Add haptic feedback to UI interactions using MiniKit sendHapticFeedback in a React component.

Import: import { MiniKit } from '@worldcoin/minikit-js'

Create a reusable hook:

\`\`\`ts
// hooks/useHaptic.ts
import { MiniKit } from '@worldcoin/minikit-js'

export function useHaptic() {
  const trigger = async (type: 'impact' | 'notification' | 'selection', style?: string) => {
    if (!MiniKit.isInstalled()) return
    try {
      await MiniKit.commandsAsync.sendHapticFeedback({ type, style } as never)
    } catch { /* non-critical, never block UI */ }
  }
  return {
    tap: () => trigger('impact', 'light'),
    success: () => trigger('notification', 'success'),
    error: () => trigger('notification', 'error'),
    select: () => trigger('selection'),
  }
}
\`\`\`

Usage in components:
- Button press → haptic.tap()
- Payment confirmed → haptic.success()
- Transaction failed → haptic.error()
- Picker/tab change → haptic.select()

Always wrap in try/catch. Haptics are enhancement-only — never await them before showing UI feedback.`,
    relatedCommands: ['share', 'close-mini-app'],
    backendRequired: false,
  },
  {
    slug: 'share',
    name: 'share',
    sdk: 'minikit',
    category: 'ux',
    description: 'Trigger the native share sheet.',
    longDescription:
      'Opens the device native share sheet with a title and URL. Users can share to any app installed on their device.',
    prereqs: ['MiniKit installed'],
    params: [
      { name: 'title', type: 'string', required: true, description: 'Share dialog title' },
      { name: 'url', type: 'string', required: false, description: 'URL to share' },
      { name: 'text', type: 'string', required: false, description: 'Text body to share' },
    ],
    returns: [
      { field: 'status', type: "'success' | 'dismissed' | 'error'", description: 'Share result' },
    ],
    codeExample: `await MiniKit.commandsAsync.share({
  title: 'Check out my score!',
  url: 'https://yourapp.com/score/123',
  text: 'I just earned 500 points on World App 🌍',
})`,
    llmPrompt: `Implement native share with MiniKit share command in a React component.

Import: import { MiniKit } from '@worldcoin/minikit-js'

\`\`\`ts
// components/ShareButton.tsx — 'use client'
async function handleShare(scoreOrReferralCode: string) {
  if (!MiniKit.isInstalled()) return

  // Add UTM params for attribution tracking
  const url = new URL('https://yourapp.com/join')
  url.searchParams.set('ref', scoreOrReferralCode)
  url.searchParams.set('utm_source', 'world_app')
  url.searchParams.set('utm_medium', 'share')

  const { finalPayload } = await MiniKit.commandsAsync.share({
    title: 'Join me on MyApp',
    url: url.toString(),
    text: \`I scored \${scoreOrReferralCode} points! Can you beat me?\`,
  })

  // 'dismissed' is NOT an error — user cancelled the share sheet
  if (finalPayload.status === 'success') {
    // Optional: track share event in analytics
    await fetch('/api/track', { method: 'POST', body: JSON.stringify({ event: 'share', ref: scoreOrReferralCode }) })
  }
}
\`\`\`

Do NOT show an error toast when status === 'dismissed'. Only log/track on 'success'.`,
    relatedCommands: ['send-haptic-feedback', 'close-mini-app'],
    backendRequired: false,
  },
  {
    slug: 'close-mini-app',
    name: 'closeMiniApp',
    sdk: 'minikit',
    category: 'ux',
    description: 'Programmatically close the mini app.',
    longDescription:
      'Closes the World App mini app drawer. Use after completing a critical flow (e.g., payment confirmed, signup done) to return user to the World App home screen.',
    prereqs: ['MiniKit installed'],
    params: [],
    returns: [],
    codeExample: `// After payment success
await confirmPayment(txId)
await MiniKit.commandsAsync.closeMiniApp()`,
    llmPrompt: `Use MiniKit closeMiniApp to programmatically close the World App mini app drawer.

Import: import { MiniKit } from '@worldcoin/minikit-js'

\`\`\`ts
// Correct pattern — pair with haptic + delay so user sees confirmation
async function handleDone() {
  if (!MiniKit.isInstalled()) return
  await MiniKit.commandsAsync.sendHapticFeedback({ type: 'notification', style: 'success' } as never)
  await new Promise(r => setTimeout(r, 300)) // let haptic register
  await MiniKit.commandsAsync.closeMiniApp()
}
\`\`\`

When to call:
- After a one-time action completes (e.g., airdrop claimed, vote cast)
- After an explicit "Done" or "Close" button tap
- After a fatal error where the user must restart the app

When NOT to call:
- Mid-flow without user confirmation
- Automatically after every transaction (disruptive UX)
- During loading states`,
    relatedCommands: ['send-haptic-feedback'],
    backendRequired: false,
  },
  {
    slug: 'request-permission',
    name: 'requestPermission',
    sdk: 'minikit',
    category: 'permissions',
    description: 'Request push notifications, contacts, or microphone access.',
    longDescription:
      'Requests a device permission from the user. Must be called in response to a user gesture. Returns granted/denied. Use getPermissions to check before requesting.',
    prereqs: ['MiniKit installed'],
    params: [
      {
        name: 'permission',
        type: "'notifications' | 'contacts' | 'microphone'",
        required: true,
        description: 'The permission to request',
      },
    ],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Request result' },
      { field: 'granted', type: 'boolean', description: 'Whether permission was granted' },
    ],
    codeExample: `const { finalPayload } = await MiniKit.commandsAsync.requestPermission({
  permission: 'notifications',
})

if (finalPayload.granted) {
  // Register push token on backend
}`,
    llmPrompt: `Generate a permission request flow using MiniKit requestPermission in Next.js App Router.

Import: import { MiniKit } from '@worldcoin/minikit-js'

\`\`\`ts
// components/EnableNotificationsButton.tsx — 'use client'
async function requestNotifications() {
  if (!MiniKit.isInstalled()) return

  // Step 1: Check current state first — never request if already granted
  const { finalPayload: permState } = await MiniKit.commandsAsync.getPermissions()
  if (permState.permissions?.notifications) {
    console.log('Already granted')
    return
  }

  // Step 2: Must be triggered by a user gesture (button click)
  const { finalPayload } = await MiniKit.commandsAsync.requestPermission({
    permission: 'notifications',
  })

  if (finalPayload.granted) {
    // Step 3: Register wallet address for notifications on your backend
    await fetch('/api/register-notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress: MiniKit.walletAddress }),
    })
    setNotificationsEnabled(true)
  } else {
    // Offer graceful fallback — don't show an error, offer email instead
    setShowEmailFallback(true)
  }
}
\`\`\`

For 'contacts' or 'microphone': replace 'notifications' with the desired permission string.`,
    relatedCommands: ['get-permissions', 'send-notifications'],
    backendRequired: false,
  },
  {
    slug: 'get-permissions',
    name: 'getPermissions',
    sdk: 'minikit',
    category: 'permissions',
    description: 'Read current permission state without prompting.',
    longDescription:
      'Returns the current grant status for all permissions. Use on app startup to conditionally enable features without triggering a permission prompt.',
    prereqs: ['MiniKit installed'],
    params: [],
    returns: [
      { field: 'status', type: "'success' | 'error'", description: 'Query result' },
      { field: 'permissions', type: 'Record<string, boolean>', description: 'Map of permission → granted boolean' },
    ],
    codeExample: `const { finalPayload } = await MiniKit.commandsAsync.getPermissions()

const hasNotifications = finalPayload.permissions?.notifications ?? false
if (!hasNotifications) {
  showNotificationPromptBanner()
}`,
    llmPrompt: `Use MiniKit getPermissions to gate features by permission state in Next.js App Router.

Import: import { MiniKit } from '@worldcoin/minikit-js'

\`\`\`ts
// hooks/usePermissions.ts — call on app mount
import { useState, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

interface Permissions { notifications: boolean; contacts: boolean; microphone: boolean }

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permissions>({ notifications: false, contacts: false, microphone: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!MiniKit.isInstalled()) { setLoading(false); return }
    MiniKit.commandsAsync.getPermissions().then(({ finalPayload }) => {
      if (finalPayload.status === 'success') {
        setPermissions({
          notifications: finalPayload.permissions?.notifications ?? false,
          contacts: finalPayload.permissions?.contacts ?? false,
          microphone: finalPayload.permissions?.microphone ?? false,
        })
      }
      setLoading(false)
    })
  }, [])

  return { permissions, loading }
}
\`\`\`

Use in components:
- { permissions.notifications ? <BellIcon /> : <BellOffIcon className="opacity-40" /> }
- Gate contact import feature: if (!permissions.contacts) return <UpgradePrompt />
- Re-call after requestPermission to refresh state`,
    relatedCommands: ['request-permission'],
    backendRequired: false,
  },
  {
    slug: 'send-notifications',
    name: 'sendNotifications',
    sdk: 'minikit',
    category: 'notifications',
    description: 'Send push notifications to users via backend API.',
    longDescription:
      'Server-side API call to World App notification service. Requires user to have granted notification permission. Rate-limited by max_notifications_per_day setting.',
    prereqs: ['App registered in Developer Portal', 'User granted notification permission', 'APP_ID and API key configured'],
    params: [
      { name: 'app_id', type: 'string', required: true, description: 'Your registered World App app_id' },
      { name: 'wallet_addresses', type: 'string[]', required: true, description: 'Target wallet addresses (max 1000)' },
      { name: 'title', type: 'string', required: true, description: 'Notification title (max 50 chars)' },
      { name: 'message', type: 'string', required: true, description: 'Notification body (max 200 chars)' },
      { name: 'mini_app_path', type: 'string', required: false, description: 'Deep link path within your mini app' },
    ],
    returns: [
      { field: 'success', type: 'boolean', description: 'Whether the request was accepted' },
      { field: 'sent_count', type: 'number', description: 'Number of notifications queued' },
    ],
    codeExample: `// Backend only — never expose API key to client
const res = await fetch('https://developer.worldcoin.org/api/v2/minikit/send-notification', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.WORLD_APP_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    app_id: process.env.NEXT_PUBLIC_APP_ID,
    wallet_addresses: [userWalletAddress],
    title: 'Your order is confirmed! ✅',
    message: 'Tap to view your receipt and track delivery.',
    mini_app_path: '/orders/123',
  }),
})`,
    llmPrompt: `Generate a complete push notification system using the World App notification API in Next.js 15 App Router.

Env vars: WORLD_APP_API_KEY, NEXT_PUBLIC_APP_ID

1. app/api/register-notifications/route.ts (POST) — store opt-in
   - Body: { walletAddress: string }
   - Store in DB: { walletAddress, optedInAt: new Date(), active: true }
   - Return: { ok: true }

2. app/api/send-notification/route.ts (POST) — SERVER ONLY, never expose to client
   - Body: { walletAddresses: string[]; title: string; message: string; path?: string }
   - NEVER call from client code — API key must stay server-side
   - const res = await fetch('https://developer.worldcoin.org/api/v2/minikit/send-notification', {
       method: 'POST',
       headers: { 'Authorization': \`Bearer \${process.env.WORLD_APP_API_KEY}\`, 'Content-Type': 'application/json' },
       body: JSON.stringify({ app_id: process.env.NEXT_PUBLIC_APP_ID, wallet_addresses: walletAddresses, title, message, mini_app_path: path })
     })
   - Check rate limit in DB before sending (max_notifications_per_day per user)
   - Return { sent: true, count: walletAddresses.length }

3. Opt-in trigger (in your existing Client Component after permission is granted):
   - After requestPermission returns { granted: true }:
     await fetch('/api/register-notifications', { method: 'POST', body: JSON.stringify({ walletAddress: MiniKit.walletAddress }) })

Notification best practices:
- Title ≤50 chars, message ≤200 chars
- Include mini_app_path for deep linking (e.g., '/orders/123')
- Target open rate ≥15% — use personalized content, not generic blasts`,
    relatedCommands: ['request-permission', 'get-permissions'],
    backendRequired: true,
  },
  // ── IDKit ─────────────────────────────────────────────────────────────────────
  {
    slug: 'verify',
    name: 'verify (IDKit)',
    sdk: 'idkit',
    category: 'auth',
    description: 'World ID ZK proof of unique humanity.',
    longDescription:
      'Generates a zero-knowledge proof that the user is a unique human. Use IDKitWidget or MiniKit verify command. Backend verifies proof with /api/v1/verify. Proof is single-use per action.',
    prereqs: ['@worldcoin/idkit installed', 'APP_ID registered', 'Action created in Developer Portal', 'Backend /api/verify endpoint'],
    params: [
      { name: 'app_id', type: 'string', required: true, description: 'World ID app identifier (app_xxxxxxx)' },
      { name: 'action', type: 'string', required: true, description: 'Action identifier (snake_case)' },
      { name: 'signal', type: 'string', required: false, description: 'User-specific signal to bind proof to (e.g., wallet address)' },
      { name: 'verification_level', type: "'device' | 'orb'", required: false, description: 'Minimum verification level required' },
    ],
    returns: [
      { field: 'proof', type: 'string', description: 'ZK proof (base64-encoded)' },
      { field: 'merkle_root', type: 'string', description: 'Merkle root at time of proof' },
      { field: 'nullifier_hash', type: 'string', description: 'Unique per-user per-action hash (use for dedup)' },
      { field: 'verification_level', type: 'string', description: 'Actual verification level achieved' },
    ],
    codeExample: `import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'

<IDKitWidget
  app_id={process.env.NEXT_PUBLIC_APP_ID as \`app_\${string}\`}
  action="vote_on_proposal"
  signal={userAddress}
  verification_level={VerificationLevel.Orb}
  onSuccess={async (proof) => {
    const res = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify(proof),
    })
    if (res.ok) setVerified(true)
  }}
>
  {({ open }) => <button onClick={open}>Verify with World ID</button>}
</IDKitWidget>`,
    llmPrompt: `Generate a complete World ID verification flow using IDKit in Next.js 15 App Router.

Install: npm install @worldcoin/idkit

Env vars: NEXT_PUBLIC_APP_ID, NEXT_PUBLIC_WLD_ACTION

1. app/api/verify/route.ts (POST) — BACKEND VERIFICATION — never verify client-side
   - Body type: { proof: string; merkle_root: string; nullifier_hash: string; verification_level: string }
   - const res = await fetch(\`https://developer.worldcoin.org/api/v1/verify/\${process.env.NEXT_PUBLIC_APP_ID}\`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ action: process.env.NEXT_PUBLIC_WLD_ACTION, signal: userWalletAddress, ...body })
     })
   - if (!res.ok) return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
   - Store nullifier_hash in DB indexed by (app_id, action) — prevents double-use
   - Check: if already exists in DB → return 400 'already_verified'
   - On success: set verified flag in user session/DB
   - Return { verified: true }

2. components/WorldIDButton.tsx (Client Component — 'use client')
   - Imports: import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
   - const handleVerify = async (proof: ISuccessResult) => {
       const res = await fetch('/api/verify', { method: 'POST', body: JSON.stringify(proof) })
       if (!res.ok) throw new Error('Verification failed') // IDKit shows retry UI
       router.push('/verified')
     }
   - <IDKitWidget app_id={process.env.NEXT_PUBLIC_APP_ID as \`app_\${string}\`} action={process.env.NEXT_PUBLIC_WLD_ACTION!} signal={walletAddress} verification_level={VerificationLevel.Orb} onSuccess={handleVerify}>
       {({ open }) => <button onClick={open}>Verify with World ID</button>}
     </IDKitWidget>

Use VerificationLevel.Orb for high-stakes (airdrops, voting). VerificationLevel.Device for low-stakes (content creation).`,
    errorCodes: ['proof_invalid', 'proof_already_used', 'max_verifications_reached'],
    relatedCommands: ['wallet-auth'],
    backendRequired: true,
  },
  // ── AgentKit ──────────────────────────────────────────────────────────────────
  {
    slug: 'agent-auth',
    name: 'agentAuth',
    sdk: 'agentkit',
    category: 'auth',
    description: 'Human-backed agent authentication via x402 protocol.',
    longDescription:
      'Authenticates an AI agent on behalf of a verified human. Uses World ID proof to mint an AgentBook credential. Agent can then call payment rails and APIs without human approval per-request.',
    prereqs: ['@worldcoin/agentkit installed', 'World ID verification complete', 'AgentBook registration'],
    params: [
      { name: 'worldIdProof', type: 'IDKitProof', required: true, description: 'Valid World ID proof from IDKit' },
      { name: 'agentAddress', type: 'string', required: true, description: 'Agent wallet address to authorize' },
      { name: 'permissions', type: 'AgentPermission[]', required: true, description: 'Scoped permissions for the agent' },
    ],
    returns: [
      { field: 'credential', type: 'AgentCredential', description: 'JWT credential for agent API calls' },
      { field: 'agentId', type: 'string', description: 'Unique agent identifier in AgentBook' },
    ],
    codeExample: `import { AgentKit } from '@worldcoin/agentkit'

const agentKit = new AgentKit({
  worldIdProof,
  agentAddress: wallet.address,
  permissions: ['payments:send', 'data:read'],
})

const { credential } = await agentKit.authenticate()
// Use credential for subsequent agent API calls`,
    llmPrompt: `Generate a human-backed AI agent authentication flow using @worldcoin/agentkit with World ID in Next.js 15 App Router.

Install: npm install @worldcoin/agentkit @worldcoin/idkit

Prerequisites: The user must complete World ID Orb verification first (see IDKit verify command).

1. app/api/agent-auth/route.ts (POST) — SERVER ONLY
   - Env vars: WORLD_APP_API_KEY
   - Body: { worldIdProof: ISuccessResult; agentAddress: string; permissions: string[] }
   - Step 1: Re-verify the World ID proof server-side (same as /api/verify endpoint)
   - Step 2: import { AgentKit } from '@worldcoin/agentkit'
   - Step 3: const agentKit = new AgentKit({ worldIdProof, agentAddress, permissions })
   - Step 4: const { credential } = await agentKit.authenticate()
   - Store credential server-side only — NEVER send to client
   - Store in encrypted form at rest (use crypto.createCipheriv or a KMS)
   - Return: { agentId: credential.agentId, expiresAt: credential.expiresAt }

2. Agent action pattern (server-side only):
   - Load credential from secure storage
   - Check expiry — if within 1 hour of expiry, refresh: credential = await agentKit.refresh(credential)
   - Log every agent action: { agentId, action, timestamp, result } to audit log
   - Scope permissions to minimum required: ['payments:send'] not ['*']

3. Principle of least privilege for permissions array:
   - payments:send — agent can send payments
   - data:read — agent can read app data
   - Never grant permissions the agent doesn't need for its task

SECURITY: AgentCredential grants autonomous action on behalf of a human. Store server-side only, audit all actions, implement rate limits.`,
    relatedCommands: ['verify', 'wallet-auth'],
    backendRequired: true,
  },
]

export function getCommandBySlug(slug: string): MiniKitCommand | undefined {
  return COMMANDS.find((c) => c.slug === slug)
}

export function getCommandsBySDK(sdk: MiniKitCommand['sdk']): MiniKitCommand[] {
  return COMMANDS.filter((c) => c.sdk === sdk)
}
