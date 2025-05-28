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

const votePanels = {};

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

function generateUniqueId(base) {
  return `${base}-${Math.random().toString(36).substring(2, 7)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  options.forEach(option => {
    const panel = document.querySelector(`#${option.id}`);
    const voteText = panel.querySelector('.votes-text');
    const voteBtn = panel.querySelector('button');

    votePanels[option.id] = { voteText, voteBtn };

    getVotes(option.counterId).then(value => {
      voteText.textContent = `Votes: ${value}`;
    });

    voteBtn.addEventListener('click', async () => {
      voteBtn.disabled = true;
      const value = await getVotes(option.counterId, true);
      voteText.textContent = `Votes: ${value}`;
      voteBtn.disabled = false;
    });
  });

  const resetBtn = document.querySelector('#reset-votes-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      options = options.map(option => {
        const newCounterId = generateUniqueId(option.baseId);
        const { voteText, voteBtn } = votePanels[option.id];

        voteText.textContent = 'Votes: 0';

        voteBtn.replaceWith(voteBtn.cloneNode(true));
        const newBtn = document.querySelector(`#${option.id} button`);

        newBtn.addEventListener('click', async () => {
          newBtn.disabled = true;
          const value = await getVotes(newCounterId, true);
          votePanels[option.id].voteText.textContent = `Votes: ${value}`;
          newBtn.disabled = false;
        });

        votePanels[option.id].voteBtn = newBtn;

        return {
          ...option,
          counterId: newCounterId
        };
      });
    });
  }
});