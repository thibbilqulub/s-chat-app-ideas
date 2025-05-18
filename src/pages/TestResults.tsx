
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { intelligenceTypes, intelligenceDescriptions, IntelligenceType } from "@/data/testQuestions";

type TestResult = {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  occupation: string;
  date: string;
  results: Record<IntelligenceType, number>;
  dominantType: IntelligenceType;
};

const TestResults = () => {
  const [result, setResult] = useState<TestResult | null>(null);
  const [selectedType, setSelectedType] = useState<IntelligenceType | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get test result from session storage
    const resultData = sessionStorage.getItem("testResult");
    
    if (!resultData) {
      navigate("/test");
      return;
    }
    
    setResult(JSON.parse(resultData));
  }, [navigate]);
  
  const handleReturnHome = () => {
    // Clear session data
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("testResult");
    
    // Return to home page
    navigate("/");
  };

  if (!result) {
    return <div className="flex justify-center items-center min-h-screen">Memuat hasil...</div>;
  }
  
  // Prepare data for radar chart
  const radarData = Object.entries(result.results).map(([key, value]) => ({
    subject: intelligenceTypes[key as IntelligenceType].split(" ")[0], // Just take first word for chart
    value: value,
    fullName: intelligenceTypes[key as IntelligenceType],
    type: key,
  }));
  
  // Sort intelligences by score (highest first)
  const sortedScores = Object.entries(result.results)
    .sort(([, a], [, b]) => b - a)
    .map(([type, score]) => ({
      type: type as IntelligenceType,
      score,
    }));
    
  const chartConfig = {
    value: {
      label: "Skor",
      color: "#8884d8"
    }
  };

  const handleTypeClick = (type: IntelligenceType) => {
    setSelectedType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Profil Kecerdasan Majemuk Anda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">Terima kasih, {result.name}!</h3>
              <p className="text-gray-600">
                Berikut adalah hasil dari penilaian kecerdasan majemuk Anda.
              </p>
            </div>
            
            <div className="h-80 mx-auto">
              <ChartContainer config={chartConfig}>
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Skor" dataKey="value" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Kecerdasan Dominan Anda: {intelligenceTypes[result.dominantType]}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{intelligenceDescriptions[result.dominantType]}</p>
            
            <h3 className="font-bold text-lg mb-2">Skor Kecerdasan Anda</h3>
            <div className="space-y-4">
              {sortedScores.map(({ type, score }) => (
                <div 
                  key={type}
                  onClick={() => handleTypeClick(type)}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{intelligenceTypes[type]}</span>
                    <span>{score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button onClick={handleReturnHome} className="px-8">Kembali ke Beranda</Button>
        </div>
      </div>
      
      <Dialog open={!!selectedType} onOpenChange={(open) => !open && setSelectedType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl mb-2">
              {selectedType ? intelligenceTypes[selectedType] : ''}
            </DialogTitle>
            <DialogDescription>
              {selectedType && (
                <div className="space-y-4 py-2">
                  <p className="text-gray-700">{intelligenceDescriptions[selectedType]}</p>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Skor Anda:</span>
                      <span className="font-bold">{selectedType ? result.results[selectedType] : 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${selectedType ? result.results[selectedType] : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Tutup</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestResults;
