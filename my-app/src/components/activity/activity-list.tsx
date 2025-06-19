import type { Activity } from "@/models/activity.model";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type Props = {
  activities: Activity[] | undefined;
}

const ActivityList: React.FC<Props> = ({ activities }) => {
  if (!activities) {
    return <div className="w-full h-full p-8 mb-4 flex justify-center items-center border">
      <p>No activities</p>
    </div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Activity Type</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>{activity.activityType}</TableCell>
            <TableCell>{activity.activityDate.toISOString()}</TableCell>
            <TableCell>{activity.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ActivityList;
