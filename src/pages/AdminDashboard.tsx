
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// Types for our test data
type TestResult = {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  occupation: string;
  date: string;
  results: {
    linguistic: number;
    logical: number;
    musical: number;
    bodily: number;
    spatial: number;
    interpersonal: number;
    intrapersonal: number;
    naturalistic: number;
  };
  dominantType: string;
};

// Mock data for demonstration
const mockTestResults: TestResult[] = [
  {
    id: "1",
    name: "John Doe",
    age: 28,
    gender: "Male",
    email: "john@example.com",
    occupation: "Teacher",
    date: "2025-05-10",
    results: {
      linguistic: 85,
      logical: 70,
      musical: 60,
      bodily: 45,
      spatial: 65,
      interpersonal: 90,
      intrapersonal: 75,
      naturalistic: 50
    },
    dominantType: "Interpersonal"
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 35,
    gender: "Female",
    email: "jane@example.com",
    occupation: "Engineer",
    date: "2025-05-12",
    results: {
      linguistic: 65,
      logical: 95,
      musical: 40,
      bodily: 55,
      spatial: 85,
      interpersonal: 60,
      intrapersonal: 70,
      naturalistic: 45
    },
    dominantType: "Logical"
  },
  {
    id: "3",
    name: "Alex Johnson",
    age: 22,
    gender: "Non-binary",
    email: "alex@example.com",
    occupation: "Musician",
    date: "2025-05-14",
    results: {
      linguistic: 70,
      logical: 60,
      musical: 95,
      bodily: 75,
      spatial: 65,
      interpersonal: 80,
      intrapersonal: 85,
      naturalistic: 50
    },
    dominantType: "Musical"
  }
];

// Transform data for visualization
const getChartData = (testResults: TestResult[]) => {
  // For bar chart - count occurrences of dominant types
  const dominantTypeCounts: Record<string, number> = {};
  testResults.forEach(result => {
    const type = result.dominantType;
    dominantTypeCounts[type] = (dominantTypeCounts[type] || 0) + 1;
  });
  
  const barChartData = Object.keys(dominantTypeCounts).map(type => ({
    name: type,
    count: dominantTypeCounts[type]
  }));

  // For radar chart - average scores across all participants
  const totalScores = {
    linguistic: 0,
    logical: 0,
    musical: 0,
    bodily: 0,
    spatial: 0,
    interpersonal: 0,
    intrapersonal: 0,
    naturalistic: 0
  };

  testResults.forEach(result => {
    totalScores.linguistic += result.results.linguistic;
    totalScores.logical += result.results.logical;
    totalScores.musical += result.results.musical;
    totalScores.bodily += result.results.bodily;
    totalScores.spatial += result.results.spatial;
    totalScores.interpersonal += result.results.interpersonal;
    totalScores.intrapersonal += result.results.intrapersonal;
    totalScores.naturalistic += result.results.naturalistic;
  });

  const radarData = [
    {
      subject: "Linguistic",
      A: testResults.length > 0 ? totalScores.linguistic / testResults.length : 0,
    },
    {
      subject: "Logical",
      A: testResults.length > 0 ? totalScores.logical / testResults.length : 0,
    },
    {
      subject: "Musical",
      A: testResults.length > 0 ? totalScores.musical / testResults.length : 0,
    },
    {
      subject: "Bodily",
      A: testResults.length > 0 ? totalScores.bodily / testResults.length : 0,
    },
    {
      subject: "Spatial",
      A: testResults.length > 0 ? totalScores.spatial / testResults.length : 0,
    },
    {
      subject: "Interpersonal",
      A: testResults.length > 0 ? totalScores.interpersonal / testResults.length : 0,
    },
    {
      subject: "Intrapersonal",
      A: testResults.length > 0 ? totalScores.intrapersonal / testResults.length : 0,
    },
    {
      subject: "Naturalistic",
      A: testResults.length > 0 ? totalScores.naturalistic / testResults.length : 0,
    }
  ];

  return { barChartData, radarData };
};

const AdminDashboard = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      navigate("/admin");
      return;
    }
    
    // Load test results (from localStorage in this case)
    const storedResults = localStorage.getItem("testResults");
    if (storedResults) {
      setTestResults(JSON.parse(storedResults));
    } else {
      // Use mock data if no stored results
      setTestResults(mockTestResults);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  // Prepare chart data
  const { barChartData, radarData } = getChartData(testResults);

  const chartConfig = {
    A: {
      label: "Average Score",
      color: "#8884d8"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Chart 1: Average Intelligence Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Average Intelligence Scores</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer className="h-full" config={chartConfig}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <ChartTooltip />
                  <Radar name="Average Score" dataKey="A" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          {/* Chart 2: Dominant Intelligence Types */}
          <Card>
            <CardHeader>
              <CardTitle>Dominant Intelligence Types</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Test Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Occupation</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Dominant Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.name}</TableCell>
                      <TableCell>{result.age}</TableCell>
                      <TableCell>{result.gender}</TableCell>
                      <TableCell>{result.email}</TableCell>
                      <TableCell>{result.occupation}</TableCell>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>{result.dominantType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
