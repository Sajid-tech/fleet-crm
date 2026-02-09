import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import BASE_URL from "@/config/base-url";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CreateDriverActivity = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      toast.error("File is required");
      return;
    }

    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("upload_files", file);

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/api/driver-activity`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.code === 201) {
        toast.success(response.data.message || "Driver activity file uploaded successfully");
        if (refetch) refetch();
        setFile(null);
        setOpen(false);
      } else {
        toast.error(response?.data?.message || "Failed to upload driver activity file");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload driver activity file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="inline-block">
          <Button variant="default" size="sm">
            Create Driver Activity
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Upload Driver Activity File</h4>
            <p className="text-sm text-muted-foreground">
              Choose a driver activity file to upload
            </p>
          </div>
          <div className="grid gap-2">
            <div>
              <Input
                id="upload_files"
                type="file"
                accept=".csv, .xls, .xlsx, .json, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json, text/csv"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Driver Activity File"
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreateDriverActivity;