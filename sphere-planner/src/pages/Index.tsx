import { useState } from "react";
import { TripForm } from "@/components/TripForm";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { ItineraryDisplay } from "@/components/ItineraryDisplay";
import { Toaster } from "@/components/ui/toaster";

export interface TripData {
  destination: string;
  duration: number;
  startDate: string;
  interests: string[];
  preferences: string;
  budget: number;
}

const Index = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [budget, setBudget] = useState(40000);

  return (
    <div className="min-h-screen pb-20">
      <Toaster />
      
      {/* Header */}
      <header className="text-center pt-12 pb-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          🌐 SPHERE PLANER
        </h1>
        <p className="text-lg md:text-xl text-white/90 drop-shadow">
          AI-Powered Budget-Friendly Trip Planning for Students
        </p>
      </header>

      <main className="container mx-auto px-4 max-w-7xl">
        {/* Main Planning Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TripForm 
            budget={budget}
            onGenerate={(data) => setTripData(data)}
          />
          <BudgetPlanner 
            budget={budget}
            onBudgetChange={setBudget}
          />
        </div>

        {/* Itinerary Section */}
        {tripData && (
          <ItineraryDisplay tripData={tripData} />
        )}
      </main>
    </div>
  );
};

export default Index;
