let options = [
  { id: 'opt-beach', name: 'Beach 🏖️', baseId: 'beach-vote' },
  { id: 'opt-mountain', name: 'Mountain 🏞️', baseId: 'mountain-vote' },
  { id: 'opt-snow', name: 'Ski 🏂', baseId: 'snow-vote' },
  { id: 'opt-desert', name: 'Desert 🌵', baseId: 'desert-vote' }
].map(option => ({
  ...option,
  counterId: `${option.baseId}-${Math.random().toString(36).substring(2, 7)}`
}));
