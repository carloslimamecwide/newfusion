# Rollback — WebFusionLab

## Listar imagens disponíveis no GHCR

```bash
# Usando curl (substituir pelo token GHCR_PAT)
curl -s -H "Authorization: Bearer $GHCR_PAT" \
  https://api.github.com/orgs/carloslimamecwide/packages/container/webfusionlab/versions \
  | jq '.[].metadata.container.tags'
```

## Reverter para versão anterior

```bash
cd /srv/apps/webfusionlab
TAG=<sha-da-versao-anterior> docker compose up -d
```

Exemplo:
```bash
TAG=abc1234 docker compose up -d
```

## Verificar

```bash
docker logs webfusionlab-web --tail 50
curl -f https://webfusionlab.pt
```
