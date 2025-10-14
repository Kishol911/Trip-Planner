import { Card } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

interface Activity {
  name: string;
  desc: string;
  cost: number;
  time: string;
  category: string;
}

interface DayCardProps {
  day: {
    date: string;
    activities: Activity[];
  };
  dayNumber: number;
}

export const DayCard = ({ day, dayNumber }: DayCardProps) => {
  const totalCost = day.activities.reduce((sum, act) => sum + act.cost, 0);

  const categoryColors: Record<string, string> = {
    culture: "bg-purple-100 text-purple-700",
    food: "bg-orange-100 text-orange-700",
    nature: "bg-green-100 text-green-700",
    adventure: "bg-red-100 text-red-700",
    nightlife: "bg-indigo-100 text-indigo-700",
    history: "bg-amber-100 text-amber-700",
    shopping: "bg-pink-100 text-pink-700",
    photography: "bg-blue-100 text-blue-700",
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/95 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary">
      <h3 className="text-2xl font-bold text-primary mb-4">
        Day {dayNumber} - {day.date}
      </h3>

      <div className="space-y-4">
        {day.activities.map((activity, idx) => (
          <div
            key={idx}
            className="bg-secondary/30 backdrop-blur-sm p-4 rounded-lg hover:bg-secondary/50 transition-all duration-200 group"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{activity.time}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[activity.category] || 'bg-gray-100 text-gray-700'}`}>
                    {activity.category}
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {activity.name}
                </h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {activity.desc}
                </p>
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg font-bold whitespace-nowrap">
                ₹{activity.cost.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border text-right">
        <span className="text-lg font-bold text-primary">
          Day Total: ₹{totalCost.toLocaleString('en-IN')}
        </span>
      </div>
    </Card>
  );
};
