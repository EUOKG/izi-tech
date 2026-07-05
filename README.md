# IZI TECH

Site institucional da IZI TECH construida como landing page de alta conversao.

## Visao geral

Esta aplicacao apresenta a marca, destaca servicos tecnicos, exibe prova social e oferece um fluxo de agendamento dentro da propria pagina.

Principais pontos do projeto:

- interface em React com Vite e TypeScript
- animacoes com Framer Motion
- estilos com Tailwind CSS
- scroll suave com Lenis
- formulario de agendamento integrado ao Formspree

## Stack

- React 19
- Vite 7
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Estrutura principal

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

## Requisitos

- Node.js 20.19 ou superior
- npm 10 ou superior

O campo `engines` no `package.json` ja documenta a versao minima recomendada para build, inclusive em ambientes de CI e no Netlify.

## Scripts disponiveis

```bash
npm run dev      # sobe o ambiente local
npm run build    # gera a build de producao em dist/
npm run preview  # serve a build localmente
npm run lint     # valida o codigo com ESLint
```


## Formulario e integracoes

O formulario de agendamento envia dados para o endpoint do Formspree configurado no codigo. Antes de colocar em producao, vale revisar se esse endpoint continua sendo o correto para a conta da IZI TECH.

## Estado atual da entrega

- dependencias descritas em `package.json` e travadas em `package-lock.json`
- configuracao de deploy no Netlify adicionada
- README refeito com instrucoes de uso e publicacao
- build de producao validada
- lint validado

## Comandos de verificacao usados

```bash
npm run build
npm run lint
```
