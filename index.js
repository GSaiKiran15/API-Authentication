import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "saikiran1542";
const yourPassword = "Saikiran@15";
const yourAPIKey = "2f2e3c95-54d4-4f9d-b54b-81df1da435f5";
const yourBearerToken = "b87c5b49-d17a-45bc-9f82-f4511d06b3ee";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all?page=1", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      API_URL + `filter?score=5&apiKey=${yourAPIKey}`,
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "secrets/1", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
