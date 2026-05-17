import React from "react";
import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";
import Header_Activity from "../components/page/Header_Activity";
import DetailActivity from "../components/page/DetailActivity";
import { useFetcheActivityStudentCode } from "../hook/useActivityFetch";

export interface IActivityPageProps {}

const StudentActivityPage: React.FC<IActivityPageProps> = () => {
  const mastercontroller = useFetcheActivityStudentCode();

  return (
    <>
      <Header_Activity />

      {mastercontroller.activity_Loading ? (
        <ActivitySkeleton />
      ) : (
        <DetailActivity mastercontroller={mastercontroller} />
      )}
    </>
  );
};

export default StudentActivityPage;

const ActivitySkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        mt: 3,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Skeleton variant="rectangular" height={170} />

          <CardContent>
            <Stack spacing={1.2}>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                }}
              >
                <Skeleton variant="rounded" width={90} height={28} />
                <Skeleton variant="rounded" width={110} height={28} />
              </Stack>

              <Skeleton variant="text" width="80%" height={34} />
              <Skeleton variant="text" width="55%" />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="45%" />

              <Skeleton
                variant="rounded"
                width="100%"
                height={42}
                sx={{ mt: 2, borderRadius: 999 }}
              />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};