import React from "react";
import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";
import { usFetcheActivityStudentCode } from "../hook/useFetchActivitySummary";
import HeadSummary from "../components/page/HeadSummary";
import HeadCarde from "../components/page/HeadCard";
import DetailSummary from "../components/page/DetailSummary";

export interface IStudentSummaryPageProps { }

const StudentSummaryPage: React.FC<IStudentSummaryPageProps> = () => {
  const mastercontroller = usFetcheActivityStudentCode();

  return (
    <>
      {mastercontroller.dashboard_Loading ? (
        <SummarySkeleton />
      ) : (
        <>
          <HeadSummary mastercontroller={mastercontroller} />
          <HeadCarde mastercontroller={mastercontroller} />
          <DetailSummary mastercontroller={mastercontroller} />
        </>
      )}
    </>
  );
};

export default StudentSummaryPage;

const SummarySkeleton: React.FC = () => {
  return (
    <Box>
      <Stack spacing={0.8} sx={{ mb: 3 }}>
        <Skeleton variant="text" width={260} height={36} />
        <Skeleton variant="text" width={140} height={22} />
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack spacing={1}>
                  <Skeleton variant="text" width={110} height={22} />
                  <Skeleton variant="text" width={45} height={42} />
                </Stack>

                <Skeleton variant="circular" width={54} height={54} />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Skeleton variant="text" width={300} height={36} sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
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
            <Skeleton variant="rectangular" height={160} />

            <CardContent>
              <Stack spacing={1.2}>
                <Skeleton variant="rounded" width={100} height={26} />
                <Skeleton variant="text" width="80%" height={32} />
                <Skeleton variant="text" width="55%" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="45%" />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};