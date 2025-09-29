# Kalkulator Kabli

Profesjonalna aplikacja Next.js do obliczania rentownosci transakcji kablowych.

## Szybki start (lokalnie)

```bash
# Zainstaluj zaleznosci (tylko lokalnie, Vercel zrobi to automatycznie)
npm install

# Skonfiguruj Google Maps API
# Skopiuj .env.local.example do .env.local
# Edytuj .env.local i dodaj swoj klucz API

# Uruchom serwer deweloperski
npm run dev
```

Otworz http://localhost:3000

## Deploy na Vercel (ZALECANE)

### Automatyczny deploy:

1. Push kodu na GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/twoj-username/cable-calculator.git
git push -u origin main
```

2. Polacz z Vercel:
   - Wejdz na vercel.com
   - Kliknij "Import Project"
   - Wybierz swoje repozytorium GitHub
   - Vercel automatycznie wykryje Next.js i zainstaluje zaleznosci

3. Dodaj zmienna srodowiskowa:
   - W panelu Vercel -> Settings -> Environment Variables
   - Dodaj: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = twoj_klucz

4. Deploy!

### Wazne:
- NIE uruchamiaj npm install przed pushem na GitHub
- Vercel sam zainstaluje wszystkie zaleznosci
- Wystarczy tylko kod zrodlowy + package.json

## Struktura projektu

```
src/
â”śâ”€â”€ app/              # Next.js App Router
â”śâ”€â”€ components/       # Komponenty React
â”‚   â”śâ”€â”€ calculator/   # Komponenty kalkulatora
â”‚   â”śâ”€â”€ ui/          # Komponenty UI
â”‚   â””â”€â”€ layout/      # Header, Footer
â”śâ”€â”€ hooks/           # Custom React hooks
â”śâ”€â”€ lib/             # Logika biznesowa
â””â”€â”€ types/           # TypeScript types
```

## Konfiguracja Google Maps API

1. Google Cloud Console - https://console.cloud.google.com/
2. Utworz projekt
3. Wlacz Distance Matrix API
4. Utworz klucz API
5. Dodaj klucz w Vercel Environment Variables

## Rozwoj aplikacji

### Zmiana cen

Edytuj src/lib/constants.ts

### Dodawanie pol

1. src/types/calculator.ts - dodaj typ
2. src/components/calculator/CalculatorForm.tsx - dodaj Input
3. src/lib/calculations.ts - uzyj w obliczeniach

## Licencja

Projekt prywatny.
