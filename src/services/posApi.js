const PROXY_URL = '/Retail_Suite_API/Api/GET_POS_DATA'
const DIRECT_URL = 'http://172.20.204.118/Retail_Suite_API/Api/GET_POS_DATA'

export async function fetchItemByEPC(epc) {
  const cleanEpc = (epc || '').trim()
  if (!cleanEpc) {
    throw new Error('EPC cannot be empty')
  }

  const payload = JSON.stringify({ EPC: cleanEpc })
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  // First try the Vite proxy endpoint (avoids browser CORS restrictions in dev)
  try {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers,
      body: payload,
    })

    if (res.ok) {
      return await res.json()
    }
  } catch {
    // If proxy failed, fall back to direct URL
  }

  // Fallback to direct URL
  const directRes = await fetch(DIRECT_URL, {
    method: 'POST',
    headers,
    body: payload,
  })

  if (!directRes.ok) {
    throw new Error(`POS Server error: ${directRes.status} ${directRes.statusText}`)
  }

  return await directRes.json()
}

const RESET_PROXY_URL = '/Retail_Suite_API/Api/RESET_POS_DATA'
const RESET_DIRECT_URL = 'http://172.20.204.118/Retail_Suite_API/Api/RESET_POS_DATA'

export async function resetPosData() {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  try {
    const res = await fetch(RESET_PROXY_URL, {
      method: 'POST',
      headers,
    })

    if (res.ok) {
      return await res.json()
    }
  } catch {
    // Fall back to direct URL if proxy fails
  }

  try {
    const directRes = await fetch(RESET_DIRECT_URL, {
      method: 'POST',
      headers,
    })

    if (directRes.ok) {
      return await directRes.json()
    }
  } catch (err) {
    console.error('Failed to reset POS data on server:', err)
  }
}

