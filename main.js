import { API_KEY } from './config.js';

const API_URL = 'https://api.api-ninjas.com/v1/counter';

let options = [
    { id: 'opt-beach', name: 'Beach 🏖️', baseId: 'beach-vote' },
    { id: 'opt-mountain', name: 'Mountain 🏞️', baseId: 'mountain-vote' },
    { id: 'opt-snow', name: 'Ski 🏂', baseId: 'snow-vote' },
    { id: 'opt-desert', name: 'Desert 🌵', baseId: 'desert-vote' }
].map(option => ({
    ...option,
    counterId: `${option.baseId}-${Math.random().toString(36).substring(2, 7)}`
}));

async function getVotes(counterId, addVote = false) {
  let url = `${API_URL}?id=${counterId}`;
  if (addVote) url += '&hit=true';

  const response = await fetch(url, {
    headers: {
      'X-Api-Key': API_KEY,
      'Accept': 'application/json'
    }
  });

  const data = await response.json();
  return data.value;
}
