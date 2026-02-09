import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { AlertCircle, ArrowLeft, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import BASE_URL from "@/config/base-url";

const CreateDriver = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [driver, setDriver] = useState({
    UUID: "",
    name: "",
    surname: "",
    email: "",
    mobile: "",
  });

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

  const checkDuplicateDriver = async () => {
    if (driver.name && driver.mobile?.length === 10) {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/check-driver-duplicate`,
          {
            name: driver.name,
            mobile: driver.mobile,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.code === 422) {
          toast.error(response.data.message);
          return false;
        }
        return true;
      } catch (error) {
        console.error(
          "Error checking duplicate driver",
          error.response?.data?.message
        );
        return true;
      }
    }
    return true;
  };

  useEffect(() => {
    if (driver.name && driver.mobile?.length === 10) {
      const timer = setTimeout(async () => {
        const isNotDuplicate = await checkDuplicateDriver();
        setIsDuplicate(!isNotDuplicate);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsDuplicate(false);
    }
  }, [driver.name, driver.mobile]);

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

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  };

  const createDriverMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${BASE_URL}/api/driver`,
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
        toast.success(data.message || "Driver Created Successfully");

        setDriver({
          UUID: "",
          name: "",
          surname: "",
          email: "",
          mobile: "",
        });

        navigate("/driver");
      } else {
        toast.error(data.message || "Driver Creation Error");
      }
    },
    onError: (error) => {
      console.error("Driver Creation Error:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Driver Creation Error");
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

    try {
      const isNotDuplicate = await checkDuplicateDriver();
      if (!isNotDuplicate) {
        return;
      }

      const formData = new FormData();
      formData.append("UUID", driver.UUID || "");
      formData.append("name", driver.name || "");
      formData.append("surname", driver.surname || "");
      formData.append("email", driver.email || "");
      formData.append("mobile", driver.mobile || "");

      setIsButtonDisabled(true);
      createDriverMutation.mutate(formData);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission");
      setIsButtonDisabled(false);
    }
  };

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
                    Add Driver
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Create a new driver record
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
                    className={isDuplicate ? "border-red-500" : ""}
                    placeholder="Enter driver name"
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                  {isDuplicate && (
                    <div className="flex items-center gap-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      Duplicate driver: Name already exists
                    </div>
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
                    className={isDuplicate ? "border-red-500" : ""}
                  />
                  {errors?.mobile && (
                    <p className="text-red-500 text-xs">{errors.mobile}</p>
                  )}
                  {isDuplicate && (
                    <div className="flex items-center gap-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      Duplicate driver: Mobile already exists
                    </div>
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
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="submit"
                disabled={isButtonDisabled || createDriverMutation.isPending}
                className="flex items-center gap-2"
              >
                {createDriverMutation.isPending ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    Create Driver
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

export default CreateDriver;