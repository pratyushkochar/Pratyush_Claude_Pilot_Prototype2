const BASE_URL = '/api';

export async function fetchSummary() {
  const res = await fetch(`${BASE_URL}/summary`);
  return res.json();
}

export async function fetchPayments(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/payments${query ? '?' + query : ''}`);
  return res.json();
}

export async function fetchRiskTrend() {
  const res = await fetch(`${BASE_URL}/risk/trend`);
  return res.json();
}

export async function fetchRiskCategories() {
  const res = await fetch(`${BASE_URL}/risk/categories`);
  return res.json();
}

export async function fetchAlerts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/alerts${query ? '?' + query : ''}`);
  return res.json();
}
