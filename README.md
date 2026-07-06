<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/aeab33d7-b26a-4eda-800d-e2356e9293a4" /># IZI TECH

Site institucional da IZI TECH construida como landing page de alta conversao comercial.

**https://iziitech.com.br/**

## Visao geral

Esta aplicacao apresenta a marca da empresa, destaca servicos tecnicos, exibe prova social do trabalho e oferece um fluxo de agendamento dentro da propria pagina.

Principais pontos do projeto:

- interface em React com Vite e TypeScript
- animacoes com Framer Motion
- estilos com Tailwind CSS
- scroll suave com Lenis Scroll
- formulario de agendamento integrado ao Formspree

## Stack

- React 19
- Vite 7
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Estrutura principal do projeto:

```text
.
|-- public/          assets estaticos
|-- src/
|   |-- components/  secoes e componentes da landing page
|   |-- main.tsx     bootstrap da aplicacao
|   `-- App.tsx      composicao principal da pagina
|-- package.json     scripts e dependencias
|-- netlify.toml     configuracao de build/deploy no Netlify
`-- README.md        guia do projeto
```

## Requisitos do projeto:

- Node.js 20.19 ou superior
- npm 10 ou superior

O campo `engines` no `package.json` ja documenta a versao minima recomendada para build, inclusive em ambientes de CI e no Netlify.

## Scripts disponiveis:

```bash
npm run dev      # sobe o ambiente local
npm run build    # gera a build de producao em dist/
npm run preview  # serve a build localmente
npm run lint     # valida o codigo com ESLint
```


## Formulario e integracoes

O formulario de agendamento envia dados para o endpoint do Formspree configurado no codigo direto.

## Comandos de verificacao usados

```bash
npm run build
npm run lint
```
