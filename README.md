# The Premier Pulse

Build a Premier League stats and player explorer web app called "The Table."

CORE FEATURES (3 main views, tab navigation):

1. LEAGUE TABLE

- Full 20-team standings: rank, club name + crest, played, wins, draws, losses, points

- Sort ascending by rank by default

- Highlight top 4 (Champions League zone) and bottom 3 (relegation zone) with different accent colors

- Clicking a team row navigates to that team's squad page

2. FIXTURES & RESULTS

- Two sub-tabs: "Results" (completed matches with final scores) and "Upcoming" (scheduled matches, no score yet, shows kickoff date)

- Each match shown as a card: date, home team (crest + name), away team (crest + name), score or "–" if not played

3. SQUADS

- Grid of all 20 clubs (crest, name, current rank + points) — clicking opens that club's squad

- Squad view: back button, club header (crest, name, record), then players grouped into sections: Goalkeepers, Defenders, Midfielders, Forwards

- Each player shown as a small card: shirt number, avatar (initials in a colored circle), name, nationality flag emoji, age

- Clicking a player opens a detail modal with: large avatar, name, nationality, club, shirt number, stat strip (appearances, goals, assists — or clean sheets instead of assists for goalkeepers), info grid (position, age, height, preferred foot, nationality, club), and a short bio paragraph

DATA MODEL

- Teams: name, abbreviation (3-letter code), primary color (real or plausible club colors), rank, wins, draws, losses, points

- Matches: home team, away team, home score, away score, status (final/scheduled), date

- Players: name, position (GK/DF/MF/FW), shirt number, nationality, age, height, preferred foot, appearances, goals, assists, clean sheets (GK only), bio

- Structure this as a proper backend/database (Supabase) so data can be updated live rather than hardcoded, with tables for teams, matches, and players (players linked to teams via foreign key)

VISUAL DESIGN

- Dark, premium "night match" theme: near-black navy background (#050810 to #0D1622 gradient)

- Background has a floodlit stadium atmosphere: 4 soft bright vertical light beams falling from the top corners of the viewport through haze, fading into a dark vignette at the edges — built with layered radial gradients, not a photo

- Accent color: warm gold (#C6A15B / #F0CB84) for highlights, active states, points column, key stats

- Text: off-white chalk color (#F4F2EC)

- Typography: bold condensed display font for headings/numbers (e.g. Archivo Expanded or similar), clean sans-serif for body text (Archivo or Inter)

- Club crests: shield-shaped badges (not circles/squares) rendered as SVG, gradient-filled in each club's color with a thin sash line and the club's 3-letter code in the display font

- Cards (match cards, club cards, player cards): dark gradient background, subtle border, soft drop shadow for depth, slight lift + gold border on hover

- Fully responsive, mobile-first grid layouts for club grid and player grid

Keep the tone premium/editorial like a sports broadcast graphics package, not a generic dashboard.
i need a website based on this

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0f8f89bf-70bc-430c-8cb1-b300f544da42).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
