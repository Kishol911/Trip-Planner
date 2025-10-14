import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface BudgetPlannerProps {
  budget: number;
  onBudgetChange: (value: number) => void;
}

export const BudgetPlanner = ({ budget, onBudgetChange }: BudgetPlannerProps) => {
  const accommodation = Math.round(budget * 0.40);
  const food = Math.round(budget * 0.30);
  const activities = Math.round(budget * 0.20);
  const transport = Math.round(budget * 0.10);

  const budgetBreakdown = [
    { label: "Accommodation", amount: accommodation, color: "bg-purple-500" },
    { label: "Food", amount: food, color: "bg-pink-500" },
    { label: "Activities", amount: activities, color: "bg-blue-500" },
    { label: "Transport", amount: transport, color: "bg-green-500" },
  ];

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/95 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-primary mb-6">Budget Planning</h2>
      
      <div className="gradient-primary rounded-xl p-6 text-center mb-6 shadow-lg">
        <h3 className="text-white/90 text-sm font-medium mb-2">Total Budget</h3>
        <div className="text-4xl font-bold text-white">
          ₹{budget.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <Label htmlFor="budget">Set Your Budget (₹)</Label>
        <Slider
          id="budget"
          min={5000}
          max={400000}
          step={1000}
          value={[budget]}
          onValueChange={(values) => onBudgetChange(values[0])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹5,000</span>
          <span>₹4,00,000</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {budgetBreakdown.map((item) => (
          <div
            key={item.label}
            className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg text-center hover:scale-105 transition-transform duration-200"
          >
            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
            <div className="text-xl font-bold text-primary">
              ₹{item.amount.toLocaleString('en-IN')}
            </div>
            <div className={`h-1 ${item.color} rounded-full mt-2 opacity-60`}></div>
          </div>
        ))}
      </div>
    </Card>
  );
};
