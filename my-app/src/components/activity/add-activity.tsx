import { addActivity } from "@/apis/activity.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

type Props = {
  applicationId: string
}

const AddActivityButton: React.FC<Props> = ({ applicationId }) => {
  const createActivityMutation = useMutation({
    mutationFn: () => {
      return addActivity({
        applicationId,
        activityDate: date,
        activityType: type,
        activityDetails: details,
      })
    },
    onSuccess: () => {
      toast.success('Activity added');
    },
    onError: (error) => {
      toast.error('Error adding activity');
      console.warn(error);
    }
  });
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {/* <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>} */}
            Add Activity
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto flex flex-row" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            required
          />

          <div className="flex flex-col gap-2">
            <Input
              placeholder="Activity Type"
              type="text"
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
            <Input
              placeholder="Activity Details"
              type="text"
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
            <Button
              variant={"outline"}
              onClick={() => {
                createActivityMutation.mutate();
              }}
            >
              Add Activity
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default AddActivityButton;
