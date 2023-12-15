import * as React from "react";

import Card from "@mui/material/Card";
import FormGrid from "./FormGrid";
import CardContent from "@mui/material/CardContent";

export default function FormCard() {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <FormGrid />
      </CardContent>
    </Card>
  );
}
