export interface CitySearchResult {
  display_name: string;
  place_id: string;
  lat?: string;
  lon?: string;
}

const COMMON_CITIES = [
  "Muzaffarpur, Bihar, India",
  "Patna, Bihar, India",
  "Gaya, Bihar, India",
  "Bhagalpur, Bihar, India",
  "Darbhanga, Bihar, India",
  "Purnia, Bihar, India",
  "Munger, Bihar, India",
  "Begusarai, Bihar, India",
  "Samastipur, Bihar, India",
  "Ranchi, Jharkhand, India",
  "Jamshedpur, Jharkhand, India",
  "Dhanbad, Jharkhand, India",
  "Bokaro, Jharkhand, India",
  "Varanasi, Uttar Pradesh, India",
  "Lucknow, Uttar Pradesh, India",
  "Kanpur, Uttar Pradesh, India",
  "Agra, Uttar Pradesh, India",
  "Gorakhpur, Uttar Pradesh, India",
  "Prayagraj, Uttar Pradesh, India",
  "Noida, Uttar Pradesh, India",
  "Ghaziabad, Uttar Pradesh, India",
  "Mathura, Uttar Pradesh, India",
  "Ayodhya, Uttar Pradesh, India",
  "Delhi, India",
  "New Delhi, India",
  "Delhi Cantt, India",
  "Mumbai, Maharashtra, India",
  "Pune, Maharashtra, India",
  "Nagpur, Maharashtra, India",
  "Thane, Maharashtra, India",
  "Nashik, Maharashtra, India",
  "Bangalore, Karnataka, India",
  "Mysore, Karnataka, India",
  "Hubli, Karnataka, India",
  "Hyderabad, Telangana, India",
  "Warangal, Telangana, India",
  "Chennai, Tamil Nadu, India",
  "Coimbatore, Tamil Nadu, India",
  "Madurai, Tamil Nadu, India",
  "Kolkata, West Bengal, India",
  "Howrah, West Bengal, India",
  "Siliguri, West Bengal, India",
  "Ahmedabad, Gujarat, India",
  "Surat, Gujarat, India",
  "Vadodara, Gujarat, India",
  "Rajkot, Gujarat, India",
  "Jaipur, Rajasthan, India",
  "Jodhpur, Rajasthan, India",
  "Udaipur, Rajasthan, India",
  "Kota, Rajasthan, India",
  "Chandigarh, India",
  "Ludhiana, Punjab, India",
  "Amritsar, Punjab, India",
  "Jalandhar, Punjab, India",
  "Bhopal, Madhya Pradesh, India",
  "Indore, Madhya Pradesh, India",
  "Gwalior, Madhya Pradesh, India",
  "Ujjain, Madhya Pradesh, India",
  "Bhubaneswar, Odisha, India",
  "Cuttack, Odisha, India",
  "Guwahati, Assam, India",
  "Dehradun, Uttarakhand, India",
  "Haridwar, Uttarakhand, India",
  "Rishikesh, Uttarakhand, India",
  "Shimla, Himachal Pradesh, India",
  "Jammu, Jammu & Kashmir, India",
  "Srinagar, Jammu & Kashmir, India",
  "Kathmandu, Nepal",
  "Dhaka, Bangladesh",
  "Colombo, Sri Lanka",
  "London, United Kingdom",
  "New York, NY, USA",
  "Los Angeles, CA, USA",
  "Chicago, IL, USA",
  "San Francisco, CA, USA",
  "Toronto, Canada",
  "Dubai, United Arab Emirates",
  "Abu Dhabi, United Arab Emirates",
  "Singapore",
  "Sydney, Australia",
  "Melbourne, Australia",
];

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const results: CitySearchResult[] = [];
  const seen = new Set<string>();

  const addResult = (displayName: string, id?: string, lat?: string, lon?: string) => {
    const key = displayName.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      results.push({
        display_name: displayName,
        place_id: id || `local-${results.length}`,
        lat,
        lon,
      });
    }
  };

  // 1. Query Photon API (komoot) - fast, open-source OpenStreetMap geocoder with CORS enabled
  try {
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(trimmed)}&limit=6`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.features)) {
        for (const f of data.features) {
          const props = f.properties || {};
          const name = props.name || props.city;
          if (!name) continue;

          const parts = [
            name,
            props.state || props.county,
            props.country,
          ].filter(Boolean);

          const formatted = parts.join(', ');
          const lat = f.geometry?.coordinates ? String(f.geometry.coordinates[1]) : undefined;
          const lon = f.geometry?.coordinates ? String(f.geometry.coordinates[0]) : undefined;
          addResult(formatted, `photon-${props.osm_id || Math.random()}`, lat, lon);
        }
      }
    }
  } catch (e) {
    console.warn('Photon API fetch failed:', e);
  }

  // 2. Query Nominatim API as secondary online service if needed
  if (results.length < 3) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmed)}&limit=6`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          for (const item of data) {
            addResult(item.display_name, `nominatim-${item.place_id}`, item.lat, item.lon);
          }
        }
      }
    } catch (e) {
      console.warn('Nominatim API fetch failed:', e);
    }
  }

  // 3. Fallback/Supplement with matching cities from local database
  const queryLower = trimmed.toLowerCase();
  const matchedLocal = COMMON_CITIES.filter(city => city.toLowerCase().includes(queryLower));
  for (const city of matchedLocal) {
    addResult(city);
  }

  return results;
}
