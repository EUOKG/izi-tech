# IZI TECH

Landing page institucional desenvolvida para a **IZI TECH**, com foco em apresentação profissional, clareza comercial e conversão por meio de um fluxo de agendamento integrado à própria página.

O projeto foi construído com React, Vite, TypeScript, Tailwind CSS e animações modernas para entregar uma experiência rápida, responsiva e visualmente refinada.

---

## Preview

![IZI TECH Hero Desktop](./docs/screenshots/izi-tech-hero-desktop.png)

---

## Visão geral

A aplicação apresenta a marca IZI TECH de forma objetiva e profissional, destacando serviços técnicos, diferenciais, prova social e um fluxo direto de agendamento.

O objetivo da landing page é transformar visitantes em potenciais clientes, reduzindo atrito e concentrando as principais informações em uma experiência de navegação fluida.

Principais pontos do projeto:

* Interface moderna construída em React
* Estrutura escalável com Vite e TypeScript
* Estilização responsiva com Tailwind CSS
* Animações com Framer Motion
* Scroll suave com Lenis
* Ícones com Lucide React
* Formulário de agendamento integrado ao Formspree
* Deploy preparado para Netlify

---

## Screenshots

### Hero desktop

Primeira dobra da página, focada em impacto visual, apresentação da marca e chamada para ação.

![IZI TECH Hero Desktop](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0baa122c-a5b7-47c6-ad24-72068df0d6d9" />)

### Serviços

Seção criada para apresentar os principais serviços da IZI TECH de forma clara, organizada e fácil de entender.

![IZI TECH Services](./docs/screenshots/izi-tech-services.png)

### Fluxo de agendamento

Área de conversão da landing page, permitindo que o usuário solicite atendimento diretamente pela página.

![IZI TECH Booking Form](./docs/screenshots/izi-tech-booking.png)

### Versão mobile

Layout responsivo adaptado para dispositivos móveis, mantendo legibilidade, hierarquia visual e facilidade de navegação.

![IZI TECH Mobile](./docs/screenshots/izi-tech-mobile.png)

---

## Stack utilizada

* React 19
* Vite 7
* TypeScript 5
* Tailwind CSS 4
* Framer Motion
* Lenis
* Lucide React
* Formspree
* Netlify

---

## Estrutura principal

```text
.
|-- public/              assets estáticos
|-- src/
|   |-- components/      seções e componentes da landing page
|   |-- main.tsx         bootstrap da aplicação
|   `-- App.tsx          composição principal da página
|-- docs/
|   `-- screenshots/     imagens usadas na documentação do README
|-- package.json         scripts e dependências
|-- package-lock.json    lockfile das dependências
|-- netlify.toml         configuração de build/deploy no Netlify
`-- README.md            documentação do projeto
```

---

## Requisitos

* Node.js 20.19 ou superior
* npm 10 ou superior

O campo `engines` no `package.json` documenta a versão mínima recomendada para build, inclusive em ambientes de CI e deploy no Netlify.

---

## Como rodar o projeto

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/izi-tech.git
```

Acesse a pasta do projeto:

```bash
cd izi-tech
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

---

## Scripts disponíveis

```bash
npm run dev      # inicia o ambiente local
npm run build    # gera a build de produção em dist/
npm run preview  # executa a build localmente
npm run lint     # valida o código com ESLint
```

---

## Formulário e integrações

O formulário de agendamento envia os dados para um endpoint do Formspree configurado no código.

Antes de publicar ou transferir o projeto para produção definitiva, é recomendado revisar se o endpoint configurado continua correto para a conta da IZI TECH.

---

## Deploy

O projeto está preparado para deploy no Netlify por meio do arquivo `netlify.toml`.

Build command:

```bash
npm run build
```

Publish directory:

```bash
dist
```

---

## Estado atual da entrega

* Dependências descritas em `package.json`
* Versões travadas em `package-lock.json`
* Configuração de deploy no Netlify adicionada
* README estruturado com instruções de uso, preview e screenshots
* Build de produção validada
* Lint validado

---

## Comandos de verificação utilizados

```bash
npm run build
npm run lint
```

---

## Objetivo do projeto

Este projeto foi desenvolvido para apresentar a IZI TECH com uma presença digital mais profissional, moderna e confiável, destacando seus serviços técnicos e facilitando o contato com potenciais clientes por meio de uma landing page objetiva, responsiva e orientada à conversão.
