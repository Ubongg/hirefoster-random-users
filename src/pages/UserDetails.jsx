import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../index.css";

const UserDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);

  const user = users.results.find((u) => u.login.uuid === id);

  const originalDate = user && user.dob.date;
  const date = new Date(originalDate);

  // Format date as YYYY-MM-DD
  const formattedDate = date.toISOString().split("T")[0];

  const breadcrumbs = [
    <Link
      to={`/`}
      underline="hover"
      key="1"
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      Home
    </Link>,
    <Typography key="2" color="#0066b2">
      Breadcrumb
    </Typography>,
  ];

  return (
    <Box className="user-details">
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      {user ? (
        <Box
          sx={{
            display: "flex",
            // flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            mt: "3rem",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              // gap: "1rem",
            },
          }}
        >
          <Box
            sx={{
              width: "40%",
              height: "50%",
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            }}
          >
            <img
              src={user.picture.large}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              [theme.breakpoints.down("sm")]: {
                mb: "2rem",
                textAlign: "center",
              },
            }}
          >
            <Typography variant="p">
              <span
                style={{
                  color: "#0066b2",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Full Name:{" "}
              </span>
              {`${user.name.first} ${user.name.last}`}
            </Typography>
            <Typography
              variant="p"
              sx={{
                pl: "10px",
                [theme.breakpoints.down("sm")]: {
                  pl: 0,
                },
              }}
            >
              <span
                style={{
                  color: "#0066b2",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Country:{" "}
              </span>
              {user.location.country}
            </Typography>
            <Typography
              variant="p"
              sx={{
                pl: "20px",
                [theme.breakpoints.down("sm")]: {
                  pl: 0,
                },
              }}
            >
              <span
                style={{
                  color: "#0066b2",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Phone Number:{" "}
              </span>
              {user.phone}
            </Typography>
            <Typography
              variant="p"
              sx={{
                pl: "30px",
                [theme.breakpoints.down("sm")]: {
                  pl: 0,
                },
              }}
            >
              <span
                style={{
                  color: "#0066b2",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Email Address:{" "}
              </span>
              {user.email}
            </Typography>
            <Typography
              variant="p"
              sx={{
                pl: "20px",
                [theme.breakpoints.down("sm")]: {
                  pl: 0,
                },
              }}
            >
              <span
                style={{
                  color: "#0066b2",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                City:{" "}
              </span>
              {user.location.city}
            </Typography>
            <Typography
              variant="p"
              sx={{
                pl: "10px",
                [theme.breakpoints.down("sm")]: {
                  pl: 0,
                },
              }}
            >
              <span
                style={{
                  color: "#0066b2",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Date of Birth:{" "}
              </span>
              {formattedDate}
            </Typography>
            <p>
              <span
                style={{
                  color: "#0066b2",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Nationality:{" "}
              </span>
              {user.nat}
            </p>
          </Box>
        </Box>
      ) : (
        <p>User not found</p>
      )}
    </Box>
  );
};

export default UserDetails;
