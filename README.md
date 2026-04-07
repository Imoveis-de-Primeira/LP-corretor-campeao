# 🏆 Programa Corretor Campeão — Landing Page

Landing page completa para mentoria via Hotmart, voltada a corretores imobiliários iniciantes.

---

## ✅ Funcionalidades implementadas

| Recurso | Status |
|---|---|
| Hero com headline, subtítulo e stats animadas | ✅ |
| Seção "Para quem é?" | ✅ |
| Resultado final do aluno (6 transformações) | ✅ |
| Marcos do programa (3 fases / 8 semanas) | ✅ |
| Aula 1 — 15 módulos | ✅ |
| Aula 2 — 10 módulos | ✅ |
| Indicadores de performance (ICQ, TAF, ISC, MAE, CMR) | ✅ |
| 4 Bônus com detalhamento | ✅ |
| Seção do Mentor com placeholder de foto | ✅ |
| CTA final com lista de entregáveis | ✅ |
| Botão flutuante WhatsApp | ✅ |
| Mini-header fixo (aparece ao sair do hero) | ✅ |
| Animações de entrada via scroll (IntersectionObserver) | ✅ |
| Counter animado nas stats do hero | ✅ |
| Design dark: preto + azul escuro + branco | ✅ |
| Responsivo (mobile/tablet/desktop) | ✅ |
| Espaços de foto marcados claramente (placeholders) | ✅ |

---

## 📁 Estrutura de arquivos

```
index.html          ← Página principal
css/
  style.css         ← Todos os estilos (dark theme, responsivo)
js/
  main.js           ← Animações, mini-header, contador, toasts
```

---

## ⚙️ Como personalizar

### 1. Link do produto Hotmart
No `index.html`, busque por **`#LINK_HOTMART_AQUI`** (aparece 2× — nos botões hero e CTA final) e substitua pelo link real do checkout na Hotmart:

```html
<a href="https://pay.hotmart.com/SEU_PRODUTO" ...>
```

### 2. Adicionar fotos

Cada `placeholder` está identificado com um `id`:

| ID do elemento | O que colocar |
|---|---|
| `#foto-aula1` | Imagem/capa da Aula 1 |
| `#foto-aula2` | Imagem/capa da Aula 2 |
| `#foto-bonus1` | Imagem do Bônus 1 (Modelo Mental) |
| `#foto-bonus2` | Imagem do Bônus 2 (Gestão Financeira) |
| `#foto-bonus3` | Imagem do Bônus 3 (WhatsApp) |
| `#foto-bonus4` | Imagem do Bônus 4 (Desafio F.A.R.O) |
| `#foto-mentor` | Foto do mentor |

**Exemplo** — substituir o placeholder da Aula 1:
```html
<!-- Antes -->
<div class="course-image-placeholder" id="foto-aula1">
  <div class="placeholder-inner">...</div>
</div>

<!-- Depois -->
<img src="images/aula1-capa.jpg" alt="Aula 1 — Vendemos Todos os Dias"
     style="border-radius:16px; width:100%; margin-bottom:48px;" />
```

### 3. Link do WhatsApp
No `index.html`, localize o botão flutuante:
```html
<a href="https://wa.me/5500000000000" ...>
```
Substitua `5500000000000` pelo seu número com DDI+DDD (ex.: `5511999999999`).

### 4. Bio do Mentor
Dentro da seção `<section class="mentor">`, localize o texto `[Espaço para sua bio…]` e substitua pelas suas informações reais.

### 5. Credenciais do Mentor
```html
<div class="cred"><i class="fa-solid fa-building"></i><span>[Anos no mercado]</span></div>
```
Substitua os textos `[...]` pelas suas conquistas reais.

---

## 🎨 Design tokens (variáveis CSS)

Edite em `css/style.css` — bloco `:root`:

| Variável | Valor padrão | Descrição |
|---|---|---|
| `--black` | `#0a0a0a` | Fundo principal |
| `--blue-dark` | `#0d2b6b` | Azul escuro |
| `--blue-mid` | `#1a3fa3` | Azul médio |
| `--blue-glow` | `#3a6fff` | Azul brilhante (destaques) |
| `--gold` | `#f5a623` | Dourado (bônus) |
| `--green` | `#22d65c` | Verde (checks de segurança) |

---

## 🚀 Próximos passos recomendados

- [ ] Inserir fotos reais (mentor, aulas, bônus)
- [ ] Substituir o link `#LINK_HOTMART_AQUI` pelo link real do checkout
- [ ] Atualizar número do WhatsApp flutuante
- [ ] Preencher bio e credenciais do mentor
- [ ] Adicionar depoimentos / prova social (seção sugerida após bônus)
- [ ] Instalar Pixel do Facebook e/ou Google Analytics (script no `<head>`)
- [ ] Publicar via **aba Publish**

---

## 📦 Tecnologias utilizadas

- HTML5 semântico
- CSS3 com variáveis e animações nativas
- JavaScript vanilla (ES6+)
- Google Fonts: Inter + Montserrat
- Font Awesome 6.5 (via CDN jsDelivr)
- IntersectionObserver para animações de scroll
- Sem frameworks ou dependências externas pesadas

---

_© 2025 Programa Corretor Campeão — Todos os direitos reservados._
