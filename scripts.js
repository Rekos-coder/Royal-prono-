const API_KEY = '5c60d62f214d5007981e2aef4702ea65';
const BASE_URL = 'https://v3.football.api-sports.io';

async function fetchMatches(dateType) {
  let date = new Date();
  if (dateType === 'yesterday') date.setDate(date.getDate() - 1);
  if (dateType === 'tomorrow') date.setDate(date.getDate() + 1);
  const formatted = date.toISOString().split('T')[0];

  const res = await fetch(`${BASE_URL}/fixtures?date=${formatted}`, {
    headers: { 'x-apisports-key': API_KEY }
  });
  const data = await res.json();
  const matches = data.response;

  let html = '';
  matches.forEach(match => {
    const teams = match.teams.home.name + ' vs ' + match.teams.away.name;
    const score = match.goals.home + ' - ' + match.goals.away;
    const time = match.fixture.status.short;
    html += `<p>${teams} | ${score} | ${time}</p>`;
  });
  document.getElementById('matches-list').innerHTML = html || 'Aucun match trouvé.';
}

async function fetchLiveScores() {
  const res = await fetch(`${BASE_URL}/fixtures?live=all`, {
    headers: { 'x-apisports-key': API_KEY }
  });
  const data = await res.json();
  const matches = data.response;

  let html = '';
  matches.forEach(match => {
    const teams = match.teams.home.name + ' vs ' + match.teams.away.name;
    const score = match.goals.home + ' - ' + match.goals.away;
    html += `<p>⚽ ${teams} | ${score}</p>`;
  });
  document.getElementById('scores').innerHTML = html || 'Pas de match en direct.';
}

function loadMatches(type) {
  fetchMatches(type);
}

fetchLiveScores();