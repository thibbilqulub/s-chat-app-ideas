
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
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
            
            <div className="h-72 mx-auto">
              <ChartContainer config={chartConfig}>
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
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
                <div key={type}>
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
    </div>
  );
};

export default TestResults;
