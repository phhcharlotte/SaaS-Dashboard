import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Court } from "../../types/Courts/courts";

interface Props {
  court: Court;
}

const CourtCard: React.FC<Props> = ({ court }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{court.name}</Typography>
        <Typography>{court.price} VND/h</Typography>
        <Button variant="contained" sx={{ mt: 1 }}>
          Book
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourtCard;
