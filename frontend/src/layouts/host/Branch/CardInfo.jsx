import { Card, Grid } from "@mui/material";

export default function CardDataBranchInfo({ title, children, data }) {
  return (
    <Card variant="outlined" className="w-full p-3 pt-0">
      <Grid container item sm={12} md={12} spacing={2} className="p-2">
        {data.length > 1 ? (
          data.map((item) => (
            <Grid
              container
              item
              sm={12}
              md={12}
              key={`${item.name}-${JSON.stringify(item.options)}`}
            >
              {children}
            </Grid>
          ))
        ) : (
          <Grid
            container
            item
            sm={12}
            md={12}
            key={`${data.name}-${JSON.stringify(data.options)}`}
          >
            {children}
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
