import { useState, useEffect } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box, Card, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
moment.locale("ar");

export default function App() {
  const [wather, setWather] = useState({
    temp: 0,
    min: 0,
    max: 0,
    description: "",
    icon: "https://openweathermap.org/img/wn/50n@2x.png",
  });
  const [dateAndTime, setDateAndTime] = useState();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("ar");
  let cancelRquest;

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.963158&lon=35.930359&appid=ed0d800b7fa4697b981f33907d312672",
        {
          cancelToken: new axios.CancelToken((cancel) => {
            cancelRquest = cancel;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const watherInfo = response.data.main;
        console.log(response.data.weather[0].icon);
        const icon = response.data.weather[0].icon;
        const temp = Math.round(watherInfo.temp - 272.15);
        const min = Math.round(watherInfo.temp_min - 272.15);
        const max = Math.round(watherInfo.temp_max - 272.15);
        const description = response.data.weather[0].description;
        setWather({
          temp,
          min,
          max,
          description,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      console.log("UnMountiong ...........");
      cancelRquest();
    };
  }, []);
  useEffect(() => {
    i18n.changeLanguage(lang);
    moment.locale(lang);
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, [lang]);

  const handleChangeLanguage = () => {
    setLang((prevLang) => (prevLang === "ar" ? "en" : "ar"));
  };
  return (
    <div dir={lang==="ar"?"rtl":"ltr"}>
      <Card
     
        sx={{
          backgroundColor: "rgb(28 53 91 /36%)",
          // direction: "rtl",
          minWidth: "33vw",
          padding: "0 2vw",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            padding: "0.5em 2vw",
            gap: "1vw",
          }}
        >
          <Typography
            variant="h2"
            color="initial"
            sx={{ fontWeight: "600", alignSelf: "end" }}
          >
            {t("Amman")}
          </Typography>
          <Typography
            variant="h7"
            color="initial"
            sx={{ fontWeight: "100", alignSelf: "end" }}
          >
            {dateAndTime}
          </Typography>
        </Box>
        <Divider
          sx={{ margin: "0", backgroundColor: "white", width: "100%" }}
        />
        <Box
          sx={{
            display: "flex",
            padding: "0.5em 2vw",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                color="initial"
                sx={{ fontWeight: "100" }}
              >
                {wather.temp}
              </Typography>
              <img src={wather.icon} alt="" />
            </Box>
            <Box>
              <Typography variant="subtitle1" color="initial">
                {t(wather.description)}
              </Typography>{" "}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2" color="initial">
                {t("min")} : {wather.min}
              </Typography>
              <Divider
                sx={{
                  margin: " 0.5em",
                  backgroundColor: "white",
                  width: "0.1em",
                  height: "0.7em",
                }}
              />
              <Typography variant="subtitle2" color="initial">
                {t("max")} : {wather.max}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloudIcon sx={{ fontSize: "13vw", color: "white" }} />
          </Box>
        </Box>
      </Card>
      <Button
        sx={{ color: "white", marginTop: "1em", padding: "0" }}
        onClick={handleChangeLanguage}
      >
        {lang === "ar" ? "انجليزي" : "Arabic"}
      </Button>
    </div>
  );
}
