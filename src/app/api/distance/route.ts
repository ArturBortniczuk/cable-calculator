import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { origin, destination } = await request.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    // Najpierw próbuj zmiennej serwerowej, potem publicznej
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.warn('Google Maps API key not configured, using mock distance');
      // Mock dla development - zwraca losową wartość
      const mockDistance = Math.floor(Math.random() * 200) + 50;
      console.log(`Using mock distance: ${mockDistance} km`);
      return NextResponse.json({ distance: mockDistance });
    }

    console.log('Using Google Maps API to calculate distance');

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.rows[0]?.elements[0]?.distance) {
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      const distanceInKm = Math.round(distanceInMeters / 1000);
      
      return NextResponse.json({ distance: distanceInKm });
    }

    if (data.status === 'REQUEST_DENIED') {
      console.error('Google Maps API request denied:', data.error_message);
      return NextResponse.json(
        { error: 'Invalid API key or API not enabled' },
        { status: 403 }
      );
    }

    throw new Error(`Google Maps API error: ${data.status}`);
  } catch (error) {
    console.error('Distance calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate distance' },
      { status: 500 }
    );
  }
}