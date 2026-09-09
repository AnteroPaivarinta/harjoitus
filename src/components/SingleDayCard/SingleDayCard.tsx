import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import type { ISingleDayCardCataProps } from '../../types/types';
import { Box } from '@mui/material';

export const SingleDayCard = (props: ISingleDayCardCataProps) => {
  
  // Extract the calculated values from the data received through props. 
  // // The optional chaining fallback prevents errors if data is undefined.
  const {
    totalConsumption,
    averagePrice,
    totalProduction,
    longestNegativePriceHours
  } = props.data ?? {};

  return (
<Card
  sx={{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <CardActionArea>
    <CardContent>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ textAlign: "center" }}
      >
        Day Data
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: 2,
          rowGap: 1,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Total Consumption:
        </Typography>
        <Typography variant="body2">
          {totalConsumption}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Average Price:
        </Typography>
        <Typography variant="body2">
          {averagePrice?.toFixed(2)}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Total Production:
        </Typography>
        <Typography variant="body2">
          {totalProduction}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Longest Negative Price: 
        </Typography>
        <Typography variant="body2">
          {longestNegativePriceHours} h
        </Typography>
      </Box>
    </CardContent>
  </CardActionArea>
</Card>

  );
};

export default SingleDayCard;