---
name: WebFusionLab
description: Light editorial design system for a boutique digital studio
colors:
  signal-blue: "oklch(0.57616 0.21505 260.45)"
  action-blue-aa: "oklch(0.50529 0.18553 259.78)"
  signal-blue-strong: "oklch(0.54 0.22 255)"
  brand-navy: "oklch(0.26 0.12 280)"
  paper-white: "oklch(1 0 0)"
  cool-band: "oklch(0.975 0.010 255)"
  quiet-surface: "oklch(0.990 0.004 255)"
  primary-ink: "oklch(0.22 0.055 275)"
  body-ink: "oklch(0.43 0.040 270)"
  quiet-ink: "oklch(0.55 0.025 265)"
  hairline: "oklch(0.885 0.018 255)"
  success: "oklch(0.52 0.15 155)"
  danger: "oklch(0.55 0.20 25)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3.6rem, 8vw, 7.4rem)"
    fontWeight: 650
    lineHeight: 0.9
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 5rem)"
    fontWeight: 620
    lineHeight: 0.94
    letterSpacing: "-0.05em"
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 650
    lineHeight: 1.2
rounded:
  sm: "2px"
  md: "4px"
  lg: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "clamp(5.5rem, 10vw, 9.5rem)"
---

# Design System: WebFusionLab

## Creative North Star: “The Working Proof”

O site parece um caderno de projeto transformado numa presença comercial: papel branco verdadeiro, grelha rigorosa, tipografia navy, traço azul e interfaces tratadas como objetos de trabalho. A referência editorial é traduzida para um estúdio digital sem copiar componentes, conteúdo ou marcas.

O sistema é claro e plano. A profundidade aparece apenas nos dispositivos e screenshots; o resto vive de escala, alinhamento, linhas e espaço negativo.

## Foundations

- **Canvas:** branco verdadeiro, sem bege, creme ou tonalidade quente.
- **Bands:** azul-cinza muito claro para prova, preços, FAQ e transições de ritmo.
- **Grid:** 12 colunas, contentor máximo de 1360 px, gutters de 20 px em mobile e 32 px a partir de tablet.
- **Measure:** corpo limitado a 70ch; títulos limitados por caráter, não por caixas artificiais.
- **Corners:** 2–8 px. Círculos apenas para ícones ou marcadores que o conceito exija.
- **Lines:** regras de 1 px organizam filas, tabelas, formulários e rodapés.

## Color

- **Signal Blue** (`oklch(0.57616 0.21505 260.45)`, equivalente a `#1e6ff5`): foco e acentos gráficos.
- **Action Blue AA** (`oklch(0.50529 0.18553 259.78)`): CTAs, links, números e marcadores; mantém contraste AA também sobre as bandas azul-cinza.
- **Signal Blue Strong** (`oklch(0.54 0.22 255)`): hover e active.
- **Brand Navy** (`oklch(0.26 0.12 280)`): títulos, logótipo e texto de maior contraste.
- **Paper White** (`oklch(1 0 0)`): fundo principal e controlos.
- **Cool Band** (`oklch(0.975 0.010 255)`): secções alternadas.
- **Primary Ink** (`oklch(0.22 0.055 275)`): texto principal.
- **Body Ink** (`oklch(0.43 0.040 270)`): parágrafos.
- **Hairline** (`oklch(0.885 0.018 255)`): fronteiras.

O azul deve ocupar menos de 12% de um ecrã normal, exceto no CTA final de largura completa.

## Typography

- **Display:** Bricolage Grotesque 650, `clamp(3.6rem, 8vw, 7.4rem)`, line-height 0.9.
- **Page title:** Bricolage Grotesque 650, `clamp(3.2rem, 7vw, 6.5rem)`, line-height 0.92.
- **Section title:** Bricolage Grotesque 620, `clamp(2.6rem, 5vw, 5rem)`, line-height 0.94.
- **Row title:** Bricolage Grotesque 600, 1.5–2.5rem.
- **Body:** Source Sans 3, 1.05–1.22rem, line-height 1.6.
- **Labels:** Source Sans 3 650, 0.78rem. Usar sentence case; maiúsculas apenas em metadados muito curtos.

Cada viewport recebe uma frase dominante. Eyebrows aparecem nas aberturas de secções, nunca por cima do H1 do hero.

## Components

### Navigation

Header branco sólido de 72 px, sticky, com hairline inferior. Desktop mostra logótipo real, cinco ligações, idioma e CTA. Mobile abre um painel inline branco, preserva a ordem do DOM, fecha após navegação e expõe `aria-expanded`/`aria-controls`.

### Buttons and links

- Primário: azul, texto branco, canto de 2 px e altura mínima de 48 px.
- Secundário: link navy/azul sublinhado por uma regra curta; sem caixa quando o conceito usa ação editorial.
- Ações em banda azul: fundo branco e texto navy.
- Hover move seta ou underline; nunca acrescenta glow.

### Section headings

Eyebrow azul com uma regra curta por baixo, título navy e texto de suporte limitado. A composição pode ocupar 5–7 colunas e deixa o restante espaço respirar.

### Rows and tables

Serviços, preços, FAQ e conteúdo estruturado usam filas abertas entre regras. Evitar cartões. Números tabulares e setas finas reforçam a leitura horizontal.

### Media and mockups

Screenshots reais são o material visual principal. Dispositivos usam fundo neutro e uma sombra ampla, discreta e fria. Só a imagem LCP recebe prioridade. Quando não há casos autorizados, usa-se uma composição neutra da própria WebFusionLab claramente tratada como demonstração, sem clientes ou métricas fictícias.

### Forms

Labels visíveis, campos de linha ou superfícies brancas, 48 px mínimos, radios sempre visíveis para grupos com até cinco opções. Erros combinam cor, texto e `aria-describedby`; o estado global usa `aria-live`. Não adicionar consentimento decorativo.

### Studio blueprint

O poster técnico usa o símbolo real da marca, grelha e regras CSS/SVG. Não representa uma equipa ou escritório e não usa fotografia stock.

## Motion

- **Tokens:** 170 ms para feedback imediato, 260 ms para interação, 700–780 ms para entradas e `cubic-bezier(0.22, 1, 0.36, 1)` como easing principal.
- **Hero:** o H1 é escrito letra a letra em passos de 20 ms, sem cursor em nenhuma fase e com a geometria final reservada desde o primeiro frame. O subtítulo continua a sequência em passos de 9 ms; ações e mockups entram antes dos dois segundos.
- **Texto editorial:** títulos internos revelam palavras mascaradas em passos de 45 ms. O texto real permanece dentro de um único heading semântico, sem versões duplicadas para tecnologias de apoio.
- **Scroll:** títulos, filas e media entram apenas uma vez quando 15% ficam visíveis. Os atrasos de listas avançam em passos de 55 ms e nunca ultrapassam 275 ms.
- **Preview ao vivo:** cada dispositivo contém uma página vertical com três secções. A timeline sincronizada de 16 segundos alterna navegação, scroll suave e pausas legíveis entre Design, Engenharia e Contacto; no tablet e telemóvel, o contador e a posição de scroll acompanham a secção visível. A reprodução pausa fora do viewport, com a aba oculta ou durante hover, e retoma no mesmo ponto.
- **Navegação:** o conteúdo principal usa crossfade sobreposto de 150 ms na saída e 280 ms na entrada. Header e footer permanecem como âncoras estáveis.
- **Links:** underline/arrow de 180–220 ms. Media usa scale máximo de 1.015 e sombra discreta.
- A experiência não depende de motion. Sem JavaScript ou suporte às APIs modernas, o conteúdo permanece visível e as mudanças são instantâneas.
- `prefers-reduced-motion` mostra imediatamente todo o texto, fixa os dispositivos na primeira secção e remove máscaras, deslocação, scale, smooth scroll e View Transitions. A animação tipográfica nunca apresenta cursor.

## Responsive Rules

- **390 px:** tudo numa coluna; H1 entre 3.4–4.4rem; mockup simplificado; menu ocupa a largura; preços empilham sem perder relação entre nome e valor.
- **768 px:** grelha de seis colunas equivalente; casos secundários podem formar duas colunas; formulário continua orientado à leitura.
- **1440 px:** grelha completa de 12 colunas; hero mostra texto à esquerda e dispositivos sobrepostos à direita; a secção seguinte é visível no limite inferior.

## Non-negotiables

- Não usar glassmorphism, gradient text, fundos dark, stock genérico ou grelhas repetidas de cartões.
- Não inventar clientes, marcas, testemunhos, prémios, screenshots ou métricas.
- Não usar emoji como ícone.
- Não adicionar bibliotecas visuais ou de animação.
- Não publicar uma imagem como substituto de texto, navegação, controlos ou formulário.
