import { TripData } from "@/pages/Index";

interface Activity {
  name: string;
  desc: string;
  cost: number;
  time: string;
  category: string;
}

const ACTIVITY_DATABASE: Record<string, Activity[]> = {
  culture: [
    { name: 'Local Museum Visit', desc: 'Explore the rich cultural heritage', cost: 1200, time: '10:00 AM', category: 'culture' },
    { name: 'Art Gallery Tour', desc: 'Contemporary and classic art collections', cost: 800, time: '2:00 PM', category: 'culture' },
    { name: 'Cultural Center', desc: 'Interactive cultural experiences', cost: 1000, time: '11:00 AM', category: 'culture' },
    { name: 'Theatre Performance', desc: 'Local performing arts showcase', cost: 1500, time: '7:00 PM', category: 'culture' },
  ],
  food: [
    { name: 'Street Food Tour', desc: 'Authentic local cuisine experience', cost: 1600, time: '12:00 PM', category: 'food' },
    { name: 'Local Market Visit', desc: 'Fresh produce and local specialties', cost: 1200, time: '9:00 AM', category: 'food' },
    { name: 'Cooking Class', desc: 'Learn to cook traditional dishes', cost: 2800, time: '3:00 PM', category: 'food' },
    { name: 'Food Festival', desc: 'Sample diverse regional cuisines', cost: 2000, time: '6:00 PM', category: 'food' },
  ],
  nature: [
    { name: 'City Park Walk', desc: 'Relaxing nature trails', cost: 0, time: '8:00 AM', category: 'nature' },
    { name: 'Botanical Gardens', desc: 'Diverse plant species and landscapes', cost: 650, time: '10:00 AM', category: 'nature' },
    { name: 'Scenic Viewpoint', desc: 'Panoramic city views', cost: 400, time: '5:00 PM', category: 'nature' },
    { name: 'Nature Reserve', desc: 'Wildlife spotting and hiking', cost: 800, time: '7:00 AM', category: 'nature' },
  ],
  adventure: [
    { name: 'Bike Tour', desc: 'Explore the city on two wheels', cost: 2000, time: '9:00 AM', category: 'adventure' },
    { name: 'Water Sports', desc: 'Kayaking or paddleboarding', cost: 2400, time: '1:00 PM', category: 'adventure' },
    { name: 'Hiking Trail', desc: 'Moderate difficulty scenic hike', cost: 800, time: '7:00 AM', category: 'adventure' },
    { name: 'Rock Climbing', desc: 'Indoor or outdoor climbing experience', cost: 1800, time: '10:00 AM', category: 'adventure' },
  ],
  nightlife: [
    { name: 'Local Music Venue', desc: 'Live performances and local bands', cost: 1200, time: '8:00 PM', category: 'nightlife' },
    { name: 'Night Market', desc: 'Shopping and street food', cost: 1600, time: '7:00 PM', category: 'nightlife' },
    { name: 'Rooftop Bar', desc: 'Drinks with a view', cost: 2000, time: '9:00 PM', category: 'nightlife' },
    { name: 'Cultural Show', desc: 'Evening entertainment and performances', cost: 1500, time: '8:30 PM', category: 'nightlife' },
  ],
  history: [
    { name: 'Historical Walking Tour', desc: 'Guided tour of historic sites', cost: 1450, time: '10:00 AM', category: 'history' },
    { name: 'Ancient Monument', desc: 'UNESCO World Heritage Site', cost: 1600, time: '11:00 AM', category: 'history' },
    { name: 'Heritage Building', desc: 'Architectural masterpiece', cost: 1000, time: '2:00 PM', category: 'history' },
    { name: 'Archaeological Site', desc: 'Ancient ruins and artifacts', cost: 1300, time: '9:00 AM', category: 'history' },
  ],
  shopping: [
    { name: 'Local Flea Market', desc: 'Vintage finds and souvenirs', cost: 800, time: '11:00 AM', category: 'shopping' },
    { name: 'Artisan Quarter', desc: 'Handmade crafts and gifts', cost: 1200, time: '1:00 PM', category: 'shopping' },
    { name: 'Shopping District', desc: 'Modern shops and boutiques', cost: 2000, time: '3:00 PM', category: 'shopping' },
    { name: 'Antique Stores', desc: 'Unique vintage collectibles', cost: 1500, time: '10:00 AM', category: 'shopping' },
  ],
  photography: [
    { name: 'Sunrise Spot', desc: 'Perfect lighting for photos', cost: 0, time: '6:00 AM', category: 'photography' },
    { name: 'Instagram-worthy Cafe', desc: 'Aesthetic coffee and photos', cost: 1000, time: '10:00 AM', category: 'photography' },
    { name: 'Architecture Tour', desc: 'Photogenic buildings', cost: 1200, time: '2:00 PM', category: 'photography' },
    { name: 'Street Art District', desc: 'Colorful murals and graffiti', cost: 0, time: '3:00 PM', category: 'photography' },
  ],
};

export const generateItinerary = async (tripData: TripData) => {
  const { duration, startDate, interests, budget } = tripData;
  const dailyBudget = Math.round(budget / duration);
  const date = new Date(startDate);

  // Use selected interests or default to popular ones
  const selectedInterests = interests.length > 0 ? interests : ['culture', 'food', 'nature'];

  const days = [];
  for (let i = 0; i < duration; i++) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + i);

    const dayActivities: Activity[] = [];

    // Morning activity
    const morningInterest = selectedInterests[Math.floor(Math.random() * selectedInterests.length)];
    const morningOptions = ACTIVITY_DATABASE[morningInterest] || ACTIVITY_DATABASE.culture;
    dayActivities.push(morningOptions[Math.floor(Math.random() * morningOptions.length)]);

    // Afternoon activity
    const afternoonInterest = selectedInterests[Math.floor(Math.random() * selectedInterests.length)];
    const afternoonOptions = ACTIVITY_DATABASE[afternoonInterest] || ACTIVITY_DATABASE.food;
    dayActivities.push(afternoonOptions[Math.floor(Math.random() * afternoonOptions.length)]);

    // Evening activity
    const eveningInterest = selectedInterests[Math.floor(Math.random() * selectedInterests.length)];
    const eveningOptions = ACTIVITY_DATABASE[eveningInterest] || ACTIVITY_DATABASE.nightlife;
    dayActivities.push(eveningOptions[Math.floor(Math.random() * eveningOptions.length)]);

    days.push({
      date: currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      activities: dayActivities,
    });
  }

  const tips = [
    `Use student discount apps like UNiDAYS or StudentBeans for additional savings in ${tripData.destination}`,
    'Book accommodations with free breakfast to save on food costs',
    'Use public transportation or rent bikes instead of taxis',
    'Visit attractions during off-peak hours for potential discounts',
    'Pack snacks and a reusable water bottle to reduce daily expenses',
    'Look for free walking tours - tip your guide what you can afford',
    'Consider a city pass if visiting multiple paid attractions',
    'Download offline maps to save on data roaming charges',
  ];

  return {
    days,
    tips: tips.slice(0, 5),
    destination: tripData.destination,
    dailyBudget,
  };
};
