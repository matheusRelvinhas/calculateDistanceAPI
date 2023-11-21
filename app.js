require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  const { origin, destiny } = req.query;

  if (!origin || !destiny || origin == '' || destiny == '') {
    return res
      .status(400)
      .json({ error: 'Origin and destiny parameters are required' });
  }

  try {
    const distance = await calculateDistance(origin, destiny);
    res.json({ distance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error calculate distance' });
  }
});

async function calculateDistance(origin, destiny) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';

  const response = await axios.get(apiUrl, {
    params: {
      origins: origin,
      destinations: destiny,
      mode: 'driving', // or 'walking'
      key: apiKey,
    },
  });

  const distanceText = response.data.rows[0].elements[0].distance.text;
  const distanceValue = response.data.rows[0].elements[0].distance.value;

  console.log({
    text: distanceText,
    value: distanceValue,
  });

  return {
    text: distanceText,
    value: distanceValue,
  };
}

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
