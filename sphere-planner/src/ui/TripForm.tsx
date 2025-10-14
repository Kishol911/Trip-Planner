import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TripData } from "@/pages/Index";
import { toast } from "sonner";

interface TripFormProps {
  budget: number;
  onGenerate: (data: TripData) => void;
}

const INTERESTS = [
  { value: "culture", label: "Culture & Museums" },
  { value: "food", label: "Food & Cuisine" },
  { value: "nature", label: "Nature & Outdoors" },
  { value: "adventure", label: "Adventure Sports" },
  { value: "nightlife", label: "Nightlife" },
  { value: "history", label: "Historical Sites" },
  { value: "shopping", label: "Shopping" },
  { value: "photography", label: "Photography" },
];

export const TripForm = ({ budget, onGenerate }: TripFormProps) => {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("");

  const today = new Date().toISOString().split('T')[0];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination.trim()) {
      toast.error("Please enter a destination");
      return;
    }
    
    if (!startDate) {
      toast.error("Please select a start date");
      return;
    }

    toast.success("Generating your personalized itinerary...");
    
    onGenerate({
      destination,
      duration,
      startDate,
      interests: selectedInterests,
      preferences,
      budget,
    });
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/95 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-primary mb-6">Trip Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="e.g., Paris, Tokyo, New York"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              min={today}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Interests</Label>
          <div className="grid grid-cols-2 gap-2">
            {INTERESTS.map((interest) => (
              <button
                key={interest.value}
                type="button"
                onClick={() => toggleInterest(interest.value)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedInterests.includes(interest.value)
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }
                `}
              >
                {interest.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferences">Special Preferences</Label>
          <Textarea
            id="preferences"
            placeholder="e.g., vegetarian food, avoid crowded places, prefer public transport..."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="min-h-[80px] transition-all duration-200 resize-none"
          />
        </div>

        <Button 
          type="submit"
          className="w-full gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
        >
          Generate Itinerary
        </Button>
      </form>
    </Card>
  );
};
