import { WorkTypeValues, type WorkType } from "../../models/work-type.enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Props {
  onSelectWorkType: (workType: WorkType) => void;
}

const WorkTypeSelector: React.FC<Props> = ({ onSelectWorkType }) => {
  const handleWorkTypeSelect = (wt: string) => {
    onSelectWorkType(wt as WorkType);
  }

  return (
    <Select onValueChange={handleWorkTypeSelect}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select work type" />
      </SelectTrigger>
      <SelectContent>
        {
          WorkTypeValues.map((workType) => (
            <SelectItem
              key={workType}
              value={workType}
            >
              {workType}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
    // <select onChange={(event) => onSelectWorkType(event.target.value as WorkType)}>
    //   <option value="Office">Office</option>
    //   <option value="Remote">Remote</option>
    //   <option value="Hybrid">Hybrid</option>
    //   <option value="Hybrid (4 in, 1 out)">Hybrid (4 in, 1 out)</option>
    //   <option value="Hybrid (3 in, 2 out)">Hybrid (3 in, 2 out)</option>
    //   <option value="Hybrid (2 in, 3 out)">Hybrid (2 in, 3 out)</option>
    //   <option value="Hybrid (1 in, 4 out)">Hybrid (1 in, 4 out)</option>
    // </select>
  );
}

export default WorkTypeSelector;
