import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowLeft, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BASE_URL from "@/config/base-url";

const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [initialDriver, setInitialDriver] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);

  const [driver, setDriver] = useState({
    UUID: "",
    name: "",
    surname: "",
    email: "",
    mobile: "",
    status: "",
  });

  const { data: driverData, isLoading } = useQuery({
    queryKey: ["driver", id],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/driver/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const driverData = response.data?.data;
      const cleanedData = {};

      Object.keys(driverData).forEach((key) => {
        cleanedData[key] = driverData[key] === null ? "" : driverData[key];
      });

      setDriver(cleanedData);
      setInitialDriver(cleanedData);
      return response.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const isDirty = JSON.stringify(driver) !== JSON.stringify(initialDriver);
    setIsFormDirty(isDirty);
  }, [driver, initialDriver]);

  const validateOnlyDigits = (inputtxt) => {
    const phoneno = /^\d+$/;
    return inputtxt.match(phoneno) || inputtxt.length === 0;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (validateOnlyDigits(value)) {
        setDriver((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setDriver((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!driver.name?.trim()) {
      newErrors.name = "Driver Name is required";
      isValid = false;
    }

    if (!driver.UUID?.trim()) {
      newErrors.UUID = "UUID is required";
      isValid = false;
    }

    if (!driver.mobile || !/^\d{10}$/.test(driver.mobile)) {
      newErrors.mobile = "Valid 10-digit Mobile Number is required";
      isValid = false;
    }

    if (driver.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(driver.email)) {
      newErrors.email = "Valid Email is required";
      isValid = false;
    }

    if (!driver.status) {
      newErrors.status = "Status is required";
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  };

  const updateDriverMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.put(
        `${BASE_URL}/api/driver/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.code === 201) {
        queryClient.invalidateQueries(["drivers"]);
        toast.success(data.message || "Driver Updated Successfully");
        navigate("/driver");
      } else {
        toast.error(data.message || "Driver Update Error");
      }
    },
    onError: (error) => {
      console.error("Driver Update Error:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Driver Update Error");
    },
    onSettled: () => {
      setIsButtonDisabled(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateForm();

    if (!isValid) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    const formData = new FormData();
    formData.append("UUID", driver.UUID || "");
    formData.append("name", driver.name || "");
    formData.append("surname", driver.surname || "");
    formData.append("email", driver.email || "");
    formData.append("mobile", driver.mobile || "");
    formData.append("status", driver.status || "");

    setIsButtonDisabled(true);
    updateDriverMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-1 p-4">
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <User className="text-muted-foreground w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h1 className="text-md font-semibold text-gray-900">
                    Edit Driver
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Update driver information and details
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate("/driver")}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 flex-shrink-0 mt-2 sm:mt-0"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </Button>
        </div>
      </Card>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center p-1 gap-2 text-sm rounded-md px-1 font-medium bg-[var(--team-color)] text-white">
                <User className="w-4 h-4" />
                Driver Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="">
                  <Label htmlFor="UUID" className="text-xs font-medium">
                    UUID *
                  </Label>
                  <Input
                    id="UUID"
                    name="UUID"
                    value={driver.UUID}
                    onChange={onInputChange}
                    placeholder="Enter UUID"
                  />
                  {errors?.UUID && (
                    <p className="text-red-500 text-xs">{errors.UUID}</p>
                  )}
                </div>

                <div className="">
                  <Label htmlFor="name" className="text-xs font-medium">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={driver.name}
                    onChange={onInputChange}
                    placeholder="Enter driver name"
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>

                <div className="">
                  <Label htmlFor="surname" className="text-xs font-medium">
                    Surname
                  </Label>
                  <Input
                    id="surname"
                    name="surname"
                    value={driver.surname}
                    onChange={onInputChange}
                    placeholder="Enter surname"
                  />
                </div>

                <div className="">
                  <Label htmlFor="mobile" className="text-xs font-medium">
                    Mobile *
                  </Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={driver.mobile}
                    onChange={onInputChange}
                    maxLength={10}
                    placeholder="Enter mobile number"
                  />
                  {errors?.mobile && (
                    <p className="text-red-500 text-xs">{errors.mobile}</p>
                  )}
                </div>

                <div className="">
                  <Label htmlFor="email" className="text-xs font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={driver.email}
                    onChange={onInputChange}
                    placeholder="Enter email address"
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                <div className="">
                  <Label htmlFor="status" className="text-xs font-medium">
                    Status *
                  </Label>
                  <Select
                    value={driver.status}
                    onValueChange={(value) =>
                      setDriver((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors?.status && (
                    <p className="text-red-500 text-xs">{errors.status}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="submit"
                disabled={
                  isButtonDisabled || 
                  updateDriverMutation.isPending || 
                  !isFormDirty
                }
                className="flex items-center gap-2"
              >
                {updateDriverMutation.isPending ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    Update Driver
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/driver")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDriver;