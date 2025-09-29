export async function calculateDistance(
  origin: string,
  destination: string
): Promise<number> {
  // TODO: Implementacja Google Distance Matrix API
  // Wymagany klucz API w .env.local: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  try {
    // Mock dla development
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return Math.floor(Math.random() * 200) + 50;
    }

    // Prawdziwa implementacja
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.rows[0]?.elements[0]?.distance) {
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      return Math.round(distanceInMeters / 1000); // Convert to km
    }
    
    throw new Error('Unable to calculate distance');
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
}