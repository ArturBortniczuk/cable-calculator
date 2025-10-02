import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// GET /api/cables - pobierz listę wszystkich kabli
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const cableType = searchParams.get('type') || '';

    // Wczytaj plik JSON
    const filePath = path.join(process.cwd(), 'public', 'data', 'cables.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Jeśli zapytanie o konkretny typ kabla - zwróć przekroje
    if (cableType) {
      const sections = data.cables[cableType] || [];
      return NextResponse.json({
        cableType,
        sections,
        total: sections.length,
      });
    }

    // Jeśli wyszukiwanie - filtruj typy
    let cableTypes = data.cableTypes;
    if (search) {
      cableTypes = cableTypes.filter((type: string) =>
        type.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      version: data.version,
      cableTypes,
      total: cableTypes.length,
      totalVariants: data.totalVariants,
    });
  } catch (error) {
    console.error('Error loading cables:', error);
    return NextResponse.json(
      { error: 'Failed to load cables data' },
      { status: 500 }
    );
  }
}