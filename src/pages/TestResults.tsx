
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { intelligenceTypes, intelligenceDescriptions, IntelligenceType } from "@/data/testQuestions";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
    return <div className="flex justify-center items-center min-h-screen">Loading results...</div>;
  }
  
  // Prepare data for radar chart using Chart.js format
  const chartData = {
    labels: Object.keys(result.results).map(key => 
      intelligenceTypes[key as IntelligenceType].split(" ")[0] // Just take first word for chart
    ),
    datasets: [
      {
        label: 'Intelligence Score',
        data: Object.values(result.results),
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        borderColor: 'rgba(136, 132, 216, 1)',
        pointBackgroundColor: 'rgba(136, 132, 216, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(136, 132, 216, 1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };
  
  // Sort intelligences by score (highest first)
  const sortedScores = Object.entries(result.results)
    .sort(([, a], [, b]) => b - a)
    .map(([type, score]) => ({
      type: type as IntelligenceType,
      score,
    }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Your Multiple Intelligences Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">Thank you, {result.name}!</h3>
              <p className="text-gray-600">
                Below are the results of your multiple intelligences assessment.
              </p>
            </div>
            
            <div className="h-72 mx-auto">
              <Radar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Your Dominant Intelligence: {intelligenceTypes[result.dominantType]}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{intelligenceDescriptions[result.dominantType]}</p>
            
            <h3 className="font-bold text-lg mb-2">Your Intelligence Scores</h3>
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
          <Button onClick={handleReturnHome} className="px-8">Return to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
