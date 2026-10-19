const DEFAULT_API_BASE = 'http://172.20.204.118/Retail_Suite_API/Api'

// Reads from .env (VITE_API_BASE_URL), falls back to default API URL
const configuredBase = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE).replace(/\/+$/, '')

/**
 * Returns candidate endpoints.
 * 1. Configured base URL from .env
 * 2. Relative endpoint for Vite proxy or IIS Reverse Proxy
 */
function getCandidateEndpoints(endpointName) {
  const direct = `${configuredBase}/${endpointName}`
  const relative = `/Retail_Suite_API/Api/${endpointName}`
  return Array.from(new Set([direct, relative]))
}

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

  const candidateEndpoints = getCandidateEndpoints('GET_POS_DATA')
  let lastError = null

  for (const url of candidateEndpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: payload,
      })

      if (res.ok) {
        return await res.json()
      }
    } catch (err) {
      lastError = err
    }
  }

  throw lastError || new Error(`Unable to reach POS server at ${configuredBase}`)
}

export async function resetPosData() {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const candidateEndpoints = getCandidateEndpoints('RESET_POS_DATA')

  for (const url of candidateEndpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
      })

      if (res.ok) {
        return await res.json()
      }
    } catch {
      // try next candidate endpoint
    }
  }
}


