# 🚀 Guia Rápido de Deploy na Vercel

## Passo 1: Prepare seu Git

```bash
git init
git add .
git commit -m "feat: Landing page Luminaris AI"
```

## Passo 2: Crie Repositório no GitHub

1. Acesse https://github.com/new
2. Crie um novo repositório (ex: `luminaris-ai`)
3. **NÃO** inicialize com README

## Passo 3: Conecte e Envie

```bash
git remote add origin https://github.com/SEU-USUARIO/luminaris-ai.git
git branch -M main
git push -u origin main
```

## Passo 4: Deploy na Vercel

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Selecione o repositório `luminaris-ai`
5. Configurações detectadas automaticamente:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Clique em **"Deploy"**

## ✅ Pronto!

Sua landing page estará no ar em poucos minutos!

URL: `https://luminaris-ai.vercel.app` (ou personalizada)

---

## 🔧 Atualizações Futuras

Qualquer push para o branch `main` fará deploy automático!

```bash
git add .
git commit -m "Suas alterações"
git push
```
