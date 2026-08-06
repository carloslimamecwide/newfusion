---
name: WebFusionLab
description: Monochrome kinetic identity for a boutique digital studio
colors:
  paper: "oklch(0.985 0.004 85)"
  paper-soft: "oklch(0.962 0.004 85)"
  ink: "oklch(0.145 0.006 255)"
  ink-soft: "oklch(0.245 0.006 255)"
  graphite: "oklch(0.48 0.006 255)"
  line: "oklch(0.865 0.005 255)"
  line-dark: "oklch(0.28 0.006 255)"
typography:
  family: "Manrope, system-ui, sans-serif"
  displaySize: "clamp(4rem, 6.1vw, 7.25rem)"
  displayWeight: 400
  displayLineHeight: 0.88
  headlineSize: "clamp(2.5rem, 4.8vw, 5rem)"
  bodySize: "clamp(1rem, 1.15vw, 1.125rem)"
rounded:
  control: "999px"
  media: "4px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4.5rem)"
  section: "clamp(5.5rem, 9.5vw, 9rem)"
---

# Design System: WebFusionLab

## Creative North Star: “The Living Object”

A página parece um estúdio impresso que ganhou movimento. A grelha e a tipografia são muito silenciosas; a escultura 3D, as imagens monocromáticas e os contrastes de secção dão-lhe presença. A referência visual é seguida na composição e no ritmo, adaptando a linguagem e o conteúdo à WebFusionLab sem copiar nomes, pessoas ou projetos.

Três palavras físicas orientam decisões: **precisa, escultural, silenciosa**.

## Foundations

- **Canvas:** branco neutro ligeiramente quente (`paper`), nunca branco puro clínico.
- **Contrast bands:** preto suave (`ink`) com texto `paper` para serviços e processo.
- **Grid:** 12 colunas, largura útil máxima de 1480 px, gutters fluidos.
- **Rhythm:** cada secção tem uma ideia dominante; grandes intervalos separam capítulos.
- **Lines:** 1 px, cinza frio e baixa opacidade. A estrutura é desenhada com regras e alinhamentos.
- **Corners:** 0–4 px em imagens e superfícies; pills apenas em ações e marcadores circulares.
- **Shadows:** reservadas à escultura e à fotografia do CTA; nunca em contentores de texto.

## Color

- **Paper:** `oklch(0.985 0.004 85)` para fundo principal.
- **Paper soft:** `oklch(0.962 0.004 85)` para transições e estúdio.
- **Ink:** `oklch(0.145 0.006 255)` para texto, botões e bandas.
- **Ink soft:** `oklch(0.245 0.006 255)` para hover e superfícies escuras secundárias.
- **Graphite:** `oklch(0.48 0.006 255)` para texto de suporte.
- **Lines:** `oklch(0.865 0.005 255)` em claro e `oklch(0.28 0.006 255)` em escuro.

Não existem cores de destaque decorativas. Estado, foco e erro usam contraste, contorno e texto; o erro mantém uma tonalidade funcional discreta apenas onde é necessário.

## Typography

Manrope é a única família, carregada por `next/font`. A voz nasce da diferença entre escala, peso e espaço, não de múltiplas famílias.

- **Hero:** 400, `clamp(4rem, 6.1vw, 7.25rem)`, line-height 0.88, tracking `-0.065em`, lowercase.
- **Page title:** 400, `clamp(3.4rem, 6vw, 6.8rem)`, line-height 0.9.
- **Section title:** 400, `clamp(2.5rem, 4.8vw, 5rem)`, line-height 0.94.
- **Row title:** 450–550, 1.1–1.35rem.
- **Body:** 400, `clamp(1rem, 1.15vw, 1.125rem)`, line-height 1.65, máximo 68ch.
- **Labels:** 600, 0.68–0.75rem, maiúsculas e tracking moderado apenas em metadados curtos.

## Navigation

Header sticky sobre `paper`, 76 px em desktop e 68 px em mobile. O wordmark é empilhado em três linhas. A navegação fica visualmente centrada e o CTA preto em pill fecha a grelha. O seletor PT/EN permanece explícito.

No mobile, um botão de 48 px abre um painel monocromático. O painel preserva a ordem de tabulação, fecha com `Escape`, devolve foco ao trigger, usa `aria-expanded` e torna o fundo `inert` enquanto está aberto.

## Buttons and Links

- **Primary:** pill preta, texto `paper`, mínimo 48 px, seta dentro de um círculo subtil.
- **Inverse:** pill `paper` numa banda preta, texto `ink`.
- **Text link:** sem caixa, pequena seta ou ponto que se desloca no hover.
- Feedback dura 160–220 ms e move no máximo 2 px.

## Homepage

### Hero

Ocupa quase um viewport. O texto vive nas colunas 2–6 e a escultura nas 6–12. O H1 quebra em três linhas; a última termina em underscore. Um marcador vertical de scroll fixa o eixo esquerdo. O círculo orbital e a assinatura circular são linhas de interface, nunca controlos.

### Services

Banda preta com introdução à esquerda e quatro disciplinas numa grelha aberta. Cada disciplina tem ícone real do sistema, número, título e texto breve; não existem cartões.

### Capabilities

Galeria horizontal com scroll-snap. Quatro imagens editoriais verticais, monocromáticas, com legenda sobreposta. Representam capacidades e não trabalho concluído. Botões anterior/seguinte são acessíveis e o scroll nativo continua disponível.

### Studio

Fundo `paper-soft`, manifesto curto à esquerda e duas imagens conceptuais lado a lado. As legendas “Design & estratégia” e “Engenharia & produto” descrevem disciplinas, não pessoas.

### Process

Banda preta com quatro passos ligados por regras e setas. Em mobile, a linha horizontal torna-se sequência vertical.

### Final CTA

Texto grande à esquerda, apoio no centro e fotografia horizontal de portátil sobre pedestal à direita. O botão principal repete “Vamos falar”.

## Hero 3D

- Three.js é importado dinamicamente dentro de um Client Component isolado.
- A escultura representa um fluxo de dados: 68 linhas tubulares, ligações transversais e nós, fundidos numa única geometria.
- Material branco mate, iluminação ampla e sombra de contacto; sem textura, brilho cromado ou cor.
- Rotação lenta, flutuação máxima de 0.04 unidades, resposta amortecida ao cursor e progressão de scroll discreta.
- A escala responde à largura do contentor entre 0.76 e 1, preservando espaço negativo entre a escultura e o título em ecrãs largos.
- DPR limitado a 1.5 e reduzido em mobile; resize via `ResizeObserver`.
- O render loop pausa fora do viewport e com a página oculta.
- `saveData` e `prefers-reduced-motion` mostram imediatamente o WebP estático exportado da mesma direção artística.
- Perda de contexto ou ausência de WebGL mostra um WebP local da mesma direção artística.

## Motion

- **Feedback:** 160 ms.
- **Interaction:** 220 ms.
- **Entrance:** 620–760 ms.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
- Hero: eyebrow, linhas do título, parágrafo, ações e escultura entram numa única sequência de até 1.4 s.
- O H1 revela linhas/palavras com máscara; não existe escrita letra a letra nem cursor.
- As máscaras de linha reservam uma margem mínima de `0.36em` abaixo e `0.28em` nas laterais. As palavras animadas mantêm `overflow: visible` para nunca cortar descendentes ou o overhang de glifos.
- Secções abaixo da dobra revelam título, regras e media uma vez através do `MotionObserver`.
- Hover de imagem escala no máximo 1.018; setas avançam 3 px.
- View Transition usa crossfade curto e deslocamento máximo de 6 px.
- `prefers-reduced-motion: reduce` remove máscaras, scroll suave, rotação, escala e transições de página, mantendo tudo imediatamente visível.

## Forms and FAQ

Campos de 48 px, labels reais e radios visíveis. Foco usa contorno de 2 px com offset. Erros combinam texto e `aria-describedby`; o estado global usa `aria-live`. FAQ fica no Contacto e usa linhas abertas, não cards.

## Responsive Rules

- **390 px:** header compacto, hero numa coluna com escultura atrás/abaixo sem tapar o texto, galeria com cartão de 82vw, bandas empilhadas e processo vertical.
- **768 px:** grelha de seis colunas equivalente, escultura mantém presença mas não invade o H1, galeria mostra 2.2 cartões.
- **1440 px:** grelha completa, hero quase full-screen com relação texto/escultura próxima da referência e uma faixa da secção seguinte visível.
- A 200% de zoom, conteúdo reflow sem scroll horizontal; pills podem quebrar texto mas nunca cortar.

## Non-negotiables

- Não inventar casos, clientes, equipa, testemunhos, prémios ou métricas.
- Não usar gradientes de texto, glassmorphism, neon, raios excessivos ou grids de cards SaaS.
- Não usar emojis, ASCII art, SVGs decorativos improvisados ou placeholders visuais.
- Não usar imagens conceptuais como prova de trabalho.
- Todos os visuais editoriais devem representar interfaces, dados, software, pagamentos ou infraestrutura digital; evitar cerâmica, mobiliário e objetos sem relação tecnológica.
- Não depender de WebGL, motion, hover ou JavaScript para comunicar ou navegar.
- Não alterar API, rotas, deployment ou pipeline.
