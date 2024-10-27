// netlify/functions/generateEmojiRangoli.js
const axios = require('axios');

exports.handler = async function (event) {
  const { OPENAI_API_KEY } = process.env;
  const { prompt, max_tokens } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt,
        max_tokens,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate emoji rangoli.' }),
    };
  }
};
