import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BASE_URL from "@/config/base-url";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AllThreeReport = () => {
  const [evPayoutReport, setEvPayoutReport] = useState(null);
  const [paymentReport, setPaymentReport] = useState(null);
  const [tripReport, setTripReport] = useState(null);
  const [isLoading, setIsLoading] = useState({
    ev: false,
    payment: false,
    trip: false,
  });
  const [dates, setDates] = useState({
    evFromDate: "2025-01-01",
    evToDate: "",
    paymentFromDate: "2025-01-01",
    paymentToDate: "",
    tripFromDate: "2025-01-01",
    tripToDate: "",
  });

  const token = Cookies.get("token");

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDates(prev => ({
      ...prev,
      evToDate: today,
      paymentToDate: today,
      tripToDate: today,
    }));
  }, []);

  const handleInputChange = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEvDriverPartnersPayoutReport = async () => {
    if (!dates.evFromDate || !dates.evToDate) {
      toast.error("Please select both from and to dates for EV Driver Partners Payout Report");
      return;
    }

    const formData = new FormData();
    formData.append("from_date", dates.evFromDate);
    formData.append("to_date", dates.evToDate);

    try {
      setIsLoading((prev) => ({ ...prev, ev: true }));
      const response = await axios.post(
        `${BASE_URL}/api/ev-driver-partners-payout-report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.data) {
        setEvPayoutReport(response.data.data);
        toast.success("EV Driver Partners Payout Report fetched successfully");
      } else {
        setEvPayoutReport([]);
        toast.error("No data found for the selected date range");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch EV Driver Partners Payout Report");
      setEvPayoutReport([]);
    } finally {
      setIsLoading((prev) => ({ ...prev, ev: false }));
    }
  };

  const fetchPaymentReport = async () => {
    if (!dates.paymentFromDate || !dates.paymentToDate) {
      toast.error("Please select both from and to dates for Payment Report");
      return;
    }

    const formData = new FormData();
    formData.append("from_date", dates.paymentFromDate);
    formData.append("to_date", dates.paymentToDate);

    try {
      setIsLoading((prev) => ({ ...prev, payment: true }));
      const response = await axios.post(
        `${BASE_URL}/api/payment-report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.data) {
        setPaymentReport(response.data.data);
        toast.success("Payment Report fetched successfully");
      } else {
        setPaymentReport([]);
        toast.error("No data found for the selected date range");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Payment Report");
      setPaymentReport([]);
    } finally {
      setIsLoading((prev) => ({ ...prev, payment: false }));
    }
  };

  const fetchTripReport = async () => {
    if (!dates.tripFromDate || !dates.tripToDate) {
      toast.error("Please select both from and to dates for Trip Report");
      return;
    }

    const formData = new FormData();
    formData.append("from_date", dates.tripFromDate);
    formData.append("to_date", dates.tripToDate);

    try {
      setIsLoading((prev) => ({ ...prev, trip: true }));
      const response = await axios.post(
        `${BASE_URL}/api/trip-report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.data) {
        setTripReport(response.data.data);
        toast.success("Trip Report fetched successfully");
      } else {
        setTripReport([]);
        toast.error("No data found for the selected date range");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Trip Report");
      setTripReport([]);
    } finally {
      setIsLoading((prev) => ({ ...prev, trip: false }));
    }
  };

  const getTableHeaders = (data) => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  };

  const formatHeader = (header) => {
    return header
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderTable = (data, reportType) => {
    if (isLoading[reportType]) {
      return (
        <div className="flex justify-center items-center py-8">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <p className="text-center text-muted-foreground py-8">
          No data available for the selected date range
        </p>
      );
    }

    const headers = getTableHeaders(data);
    
    return (
      <div className="overflow-x-auto border rounded-lg max-w-7xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {headers.map((header) => (
                <TableHead key={header} className="whitespace-nowrap font-semibold">
                  {formatHeader(header)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                {headers.map((header) => (
                  <TableCell key={header} className="whitespace-nowrap">
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="w-full">
      
        <CardContent className="mt-2">
          <Tabs defaultValue="ev-payout" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="ev-payout">EV Driver Payout</TabsTrigger>
              <TabsTrigger value="payment">Payment Report</TabsTrigger>
              <TabsTrigger value="trip">Trip Report</TabsTrigger>
            </TabsList>

            <TabsContent value="ev-payout" className="space-y-4">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="text-sm font-medium">From Date</label>
                  <Input
                    type="date"
                    name="evFromDate"
                    value={dates.evFromDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">To Date</label>
                  <Input
                    type="date"
                    name="evToDate"
                    value={dates.evToDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={fetchEvDriverPartnersPayoutReport} 
                    disabled={isLoading.ev}
                    size="lg"
                  >
                    {isLoading.ev ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Fetching...
                      </>
                    ) : (
                      "Generate Report"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4">EV Driver Partners Payout Report</h3>
                {renderTable(evPayoutReport, 'ev')}
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="text-sm font-medium">From Date</label>
                  <Input
                    type="date"
                    name="paymentFromDate"
                    value={dates.paymentFromDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">To Date</label>
                  <Input
                    type="date"
                    name="paymentToDate"
                    value={dates.paymentToDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={fetchPaymentReport} 
                    disabled={isLoading.payment}
                    size="lg"
                  >
                    {isLoading.payment ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Fetching...
                      </>
                    ) : (
                      "Generate Report"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4">Payment Report</h3>
                {renderTable(paymentReport, 'payment')}
              </div>
            </TabsContent>

            <TabsContent value="trip" className="space-y-4">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="text-sm font-medium">From Date</label>
                  <Input
                    type="date"
                    name="tripFromDate"
                    value={dates.tripFromDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">To Date</label>
                  <Input
                    type="date"
                    name="tripToDate"
                    value={dates.tripToDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={fetchTripReport} 
                    disabled={isLoading.trip}
                    size="lg"
                  >
                    {isLoading.trip ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Fetching...
                      </>
                    ) : (
                      "Generate Report"
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4">Trip Report</h3>
                {renderTable(tripReport, 'trip')}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllThreeReport;