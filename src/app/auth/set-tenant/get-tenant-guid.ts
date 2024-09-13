import { OpenAPI } from "@/client";

export async function tenantGetTenantGuid({ host }: { host: string; }): Promise<string | null> {
  try {
    const response = await fetch(`${OpenAPI.BASE}/api/tenant/guid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ host }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tenant GUID');
    }

    const data = await response.json();
    return data.tenantGuid || null;
  } catch (error) {
    console.error('Error fetching tenant GUID:', error);
    return null;
  }
}
