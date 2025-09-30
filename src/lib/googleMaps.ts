export async function calculateDistance(
  origin: string,
  destination: string
): Promise<number> {
  try {
    // Wywołanie przez API route zamiast bezpośrednio
    const response = await fetch('/api/distance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, destination }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.distance;
  } catch (error) {
    console.error('Error calculating distance:', error);
    // Zwróć wartość domyślną zamiast rzucać błędem
    return 0;
  }
}