# server-agent — постоянный агент (Claude Agent SDK) с мозгом из этого репо.
FROM node:20-slim

# git + ripgrep — для инструментов агента (поиск по знаниям) и обновления «мозга» (git pull)
RUN apt-get update \
    && apt-get install -y --no-install-recommends git ripgrep ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
# контекст сборки — КОРЕНЬ репо (см. README): копируем весь репо, чтобы были .claude/skills + CLAUDE.md
COPY . /app

# ставим зависимости только агента
WORKDIR /app/server-agent
RUN npm install --omit=dev

# cwd агента = корень репо (чтобы settingSources:['project'] подхватил скиллы и CLAUDE.md)
ENV REPO_ROOT=/app
CMD ["node", "agent.mjs"]
