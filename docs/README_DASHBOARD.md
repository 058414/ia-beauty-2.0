# 🎨 Sistema de Projetos - Guia Rápido

## ✨ O que você acaba de ganhar

Um **sistema centralizado** para gerenciar todos seus projetos em um único lugar. Nunca mais perder contexto!

---

## 🚀 Como Usar

### 1️⃣ **Abrir o Dashboard**
```
Duplo clique em: PROJETOS_DASHBOARD.html
```
Ou abra no navegador: `file:///C:/Users/Usuário/PROJETOS_DASHBOARD.html`

### 2️⃣ **Selecione um Projeto**
- Veja todos seus 6 projetos organizados
- Prioridades coloridas (🔴 1 = mais urgente)
- Status de sincronização (verde = sincronizado)
- Clique em qualquer projeto para ver detalhes

### 3️⃣ **Comece a Trabalhar**
- Clique no botão **"Abrir Projeto"**
- Uma mensagem mostra o caminho
- **Diga na conversa:** "trabalha em [NOME DO PROJETO]"
- Pronto! Começamos a trabalhar nele

### 4️⃣ **Sincronize ao Terminar**
Abra PowerShell na pasta:
```powershell
.\sync-all-projects.ps1
```

---

## 📁 Arquivos do Sistema

| Arquivo | Função |
|---------|--------|
| `PROJETOS_DASHBOARD.html` | Dashboard visual (abra no navegador) |
| `projetos-config.json` | Configuração centralizada de todos os projetos |
| `sync-all-projects.ps1` | Script para sincronizar tudo com GitHub |
| `README_DASHBOARD.md` | Este arquivo (instruções) |

---

## 🎯 Seus Projetos

### 🔴 **Prioridade 1** (Trabalhar AGORA)
1. **IA BEAUTY 2.0** - Análise facial & corte de cabelo
   - Status: Phase 4 (PDF Generation)
   - Local: `C:\Users\Usuário\ia-beauty-2.0`
   - GitHub: `058414/magicface`

2. **MagicFace (GitHub)** - Camera detection + quiz
   - Status: Phase 4 (Active)
   - Local: `C:\Users\Usuário\magicface`
   - URL: https://magicface-sand.vercel.app

### 🟢 **Prioridade 2** (Próximo)
3. **EstoqueBeauty** - Controle de estoque para colorações
   - Status: Phase 1 (Dashboard)
   - Local: `C:\Users\Usuário\Desktop\estoquebeauty`

### 🟡 **Prioridade 3** (Depois)
4. **Dieta Visual v2** - Skill modular de análise facial
   - Status: Phase 1 (Setup)
   - Local: `C:\Users\Usuário\Desktop\dieta-visual-v2`

### 🟣 **Prioridade 4+** (Baixa)
5. **Dieta Visual Original** - Versão anterior (produção)
6. **MagicFace Desktop** - Backup local

---

## 🔄 Rotina Recomendada

### Ao COMEÇAR uma sessão:
1. Abra `PROJETOS_DASHBOARD.html`
2. Clique no projeto que quer trabalhar
3. Diga: "trabalha em [NOME]"
4. ✅ Claude já sabe onde procurar!

### Ao TERMINAR uma sessão:
1. Abra PowerShell
2. Execute: `.\sync-all-projects.ps1`
3. Espere terminar
4. ✅ Tudo sincronizado com GitHub!

---

## 💡 Por que Funciona

**Antes:** Você trabalhava → código local → esquecia de fazer push → próxima sessão Claude não achava nada

**Agora:**
- Dashboard = centralizador visual
- Config JSON = máquina legível
- Sync script = 1 comando = tudo sincronizado
- Claude memória = próxima sessão já sabe

---

## ⚙️ Configurações Avançadas

### Adicionar um novo projeto:
1. Abra `projetos-config.json`
2. Copie um projeto existente
3. Preencha os dados do novo projeto
4. Salve
5. Atualize o dashboard no navegador (F5)

### Testar sincronização sem aplicar:
```powershell
.\sync-all-projects.ps1 -DryRun
```

### Ver mais detalhes:
```powershell
.\sync-all-projects.ps1 -Verbose
```

---

## 🆘 Troubleshooting

**Q: Dashboard não abre?**
- Verifique que `projetos-config.json` está no mesmo diretório
- Tente abrir direto no navegador (copie o path no endereço)

**Q: Sync não funciona?**
- Abra PowerShell como administrador
- Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

**Q: Não consigo fazer push?**
- Verifique credenciais Git: `git config --global --list`
- Tente: `git remote -v` no projeto

---

## 📝 Próximos Passos

1. ✅ Sistema criado (25 de maio, 2026)
2. **🔄 AGORA:** Sincronize todos os projetos
   ```powershell
   .\sync-all-projects.ps1
   ```
3. **🔄 Depois:** Use o dashboard sempre para navegar projetos
4. **🔄 Final:** Diga "trabalha em [NOME]" e comece!

---

## 📞 Precisa de Help?

- Leia o arquivo na memória: `projects_dashboard_system.md`
- Consulte `PROJETOS_DASHBOARD.html` (tem tooltips)
- Fale com Claude: "como funciona o dashboard?"

---

**Criado em:** 2026-05-25  
**Versão:** 1.0  
**Responsável:** Sistema de Organização Automática
