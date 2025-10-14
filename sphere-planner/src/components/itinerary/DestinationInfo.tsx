import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Loader2, Globe } from "lucide-react";

interface DestinationInfoProps {
  destination: string;
}

export const DestinationInfo = ({ destination }: DestinationInfoProps) => {
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinationInfo = async () => {
      setLoading(true);
      try {
        // Wikipedia API - completely free, no key needed
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(destination)}`
        );
        const data = await response.json();
        setInfo(data.extract || "No information available for this destination.");
      } catch (error) {
        console.error("Error fetching destination info:", error);
        setInfo("Unable to load destination information at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationInfo();
  }, [destination]);

  return (
    <Card className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-blue-900">About {destination}</h3>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        </div>
      ) : (
        <p className="text-sm text-blue-900/80 leading-relaxed">{info}</p>
      )}
    </Card>
  );
};
