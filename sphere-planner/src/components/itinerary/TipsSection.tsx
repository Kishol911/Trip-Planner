import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface TipsSectionProps {
  tips: string[];
  destination: string;
}

export const TipsSection = ({ tips, destination }: TipsSectionProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-bold text-amber-900">
          💡 Money-Saving Tips for Students
        </h3>
      </div>
      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors"
          >
            <span className="text-amber-600 font-bold">•</span>
            <p className="text-sm text-amber-900">{tip}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
