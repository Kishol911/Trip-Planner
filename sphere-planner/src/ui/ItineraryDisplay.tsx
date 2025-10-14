import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TripData } from "@/pages/Index";
import { Loader2 } from "lucide-react";
import { DayCard } from "./itinerary/DayCard";
import { TipsSection } from "./itinerary/TipsSection";
import { DestinationInfo } from "./itinerary/DestinationInfo";
import { WeatherInfo } from "./itinerary/WeatherInfo";
import { generateItinerary } from "@/lib/itineraryGenerator";

interface ItineraryDisplayProps {
  tripData: TripData;
}

export const ItineraryDisplay = ({ tripData }: ItineraryDisplayProps) => {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<any>(null);

  useEffect(() => {
    const loadItinerary = async () => {
      setLoading(true);
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generated = await generateItinerary(tripData);
      setItinerary(generated);
      setLoading(false);
    };

    loadItinerary();
  }, [tripData]);

  if (loading) {
    return (
      <Card className="p-12 backdrop-blur-sm bg-card/95 shadow-lg text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">Creating your personalized itinerary...</p>
      </Card>
    );
  }

  if (!itinerary) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-card/95 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Trip to {tripData.destination}
          </h2>
          <p className="text-muted-foreground">
            Estimated daily budget: ₹{itinerary.dailyBudget.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DestinationInfo destination={tripData.destination} />
          <WeatherInfo destination={tripData.destination} />
        </div>
      </Card>

      {itinerary.days.map((day: any, index: number) => (
        <DayCard key={index} day={day} dayNumber={index + 1} />
      ))}

      <TipsSection tips={itinerary.tips} destination={tripData.destination} />
    </div>
  );
};
