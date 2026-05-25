/**
 * SYSTEM PROMPT MAGICFACE v2
 *
 * Integração direta dos arquivos:
 * - skill.txt (base de visagismo)
 * - complemento raciocinio logico.txt (regras de corpo + energia)
 *
 * Input: { assimetria, biotipo, linhasRosto, linhasCorpo, tomPele, usoFranja, comprimentoPreferido }
 * Output: Prompt visual detalhado para gerar imagem com corte recomendado
 */

const REGRAS_BASE = `
==========================================
REGRAS BASE - SKILL.TXT (VISAGISMO)
==========================================

1. ASSIMETRIA FACIAL
A máscara deve reconhecer a assimetria natural existente no rosto da usuária.
Todos temos um lado do rosto mais alto que o outro.
- Analisar o ápice das sobrancelhas: geralmente uma é ligeiramente mais alta que a outra

2. MEIAS-FACES
- Foto: cabelos presos para trás, rosto de frente, expressão neutra
- Gerar 3 rostos:
  * Esquerda: meia face esquerda + meia face esquerda (duplicada)
  * Centro: original (inteira)
  * Direita: meia face direita + meia face direita (duplicada)

3. PERCEPÇÃO DO ROSTO - SOLUÇÕES:

SE ROSTO LONGO DEMAIS (incomoda):
- Observar qual lado está mais alto
- Jogar cabelo PARA O LADO MAIS ALTO
- Expor lado mais baixo/largo
- Efeito: equilíbrio instantâneo

SE ROSTO LARGO DEMAIS (incomoda):
- Observar qual lado está mais baixo
- Jogar cabelo PARA O LADO MAIS BAIXO
- Expor lado mais alto
- Efeito: projeção vertical instantânea, deixando mais fino

SE ROSTO EQUILIBRADO:
- Mostrar as 3 imagens e explicar efeitos
- Usar como FERRAMENTA para compensação diária
- Exemplo: ciclo menstrual gera inchaço → compensar com posicionamento de cabelo
- Elevar autoestima mostrando controle sobre percepção visual

4. FRANJA - ANÁLISE PROFUNDA:

FRANJA RETA/CÔNCAVA ACIMA DAS SOBRANCELHAS:

"Sim, porém rosto ficou mais largo":
- Compensar com GOLA DA ROUPA
- Medir tamanho da franja (início até ponta)
- Compensar para baixo na gola
- Início das golas tradicionais até dar a medida da franja

"Sim, rosto equilibra com franja reta":
- CUIDADO com linhas que compõem entorno do rosto
- Linhas da franja + linhas do rosto geram ESPELHAMENTO
- Se rosto tem predominância de LINHAS CURVINEAS + franja reta = equilíbrio
- EVITAR: gola em U, brincos arredondados, óculos arredondados
- Motivo: geraria potencialização de curvas

"Sim, porém nariz fica mais proeminente":
- Cabelo no meio antes da franja cria LINHA VERTICAL
- Essa linha espelha a linha vertical do comprimento do nariz
- Resultado: volume de informação = ênfase no nariz
- Solução: JOGAR CABELO PARA O LADO (quebra percepção vertical)

"Não usa franja": Sem sugestões necessárias

"Gostaria de franja": Aplicar regras acima para educá-la sobre os efeitos

5. LINHAS E FORMAS - CONCEITO CENTRAL

As linhas e formas governam o direcionamento do olhar do expectador por VOLUME DE INFORMAÇÃO.
Onde há volume de informação → há evidência
Linhas potencializam ou atenuam outras linhas

CLASSIFICAÇÃO DAS LINHAS:
- EMOCIONAIS/QUENTES = linhas curvineas e derivadas
- RETAS/FRIAS = linhas retas horizontais e verticais
- DINÂMICAS/INSTÁVEIS = linhas diagonais

REGRA: Evitar adicionar a mesma linha que já predomina no rosto
- Rosto com curvas → usar linhas RETAS ou DIAGONAIS para contrastar
- Rosto com retas → usar linhas CURVAS para quebrar monotonia
- Rosto misto → usar DIAGONAIS para dinamismo

6. COMPENSAÇÃO COM GOLA (CRÍTICO)

O ROSTO NÃO VAI SÓ DA TESTA ATÉ O QUEIXO
O ROSTO VAI DA LINHA DA TESTA ATÉ ONDE A USUÁRIA DETERMINAR NA GOLA

Quando há franja:
- Rosto passa a ser: FIM DA FRANJA (acima sobrancelhas) até GOLA
- GOLA EM U = linhas CURVAS/QUENTES
- GOLA EM V = linhas DIAGONAIS/DINÂMICAS
- GOLA QUADRADA/RETANGULAR = linhas FRIAS/RETAS

7. INCONSCIENTE VISUAL

Frequentemente o que gera sensação de erro NÃO é o cabelo, mas as LINHAS da roupa
O inconsciente detecta erro visual mas culpa o cabelo (alvo mais óbvio)
Exemplo: ombros largos com decote V profundo → cliente culpa cabelo
Solução: verificar LINHAS DA ROUPA (gola/decote) antes de mudar cabelo

==========================================
REGRAS COMPLEMENTARES - COMPLEMENTO RACIOCINIO LOGICO
==========================================

8. COMPENSAÇÃO VISUAL DO CORPO

OBJETIVO: Levar o corpo para formato AMPULHETA

SE CABELO TEM COMPRIMENTO (chega na região a compensar):
- Usar corte de cabelo para gerar compensação visual
- Estruturar o cabelo para expandir/retrair conforme necessário

SE CABELO É CURTO (não chega na região):
- ❌ NÃO compensar com cabelo (impossível)
- ✅ COMPENSAR COM ROUPA (luz e sombra)
- LUZ EXPANDE (cor clara expande visualmente)
- SOMBRA RETRAI (cor escura retrai visualmente)

EXEMPLO: Corpo triangular invertido (ombros largos) + cabelo curto:
- Usar roupa ESCURA em cima (retrai ombros)
- Usar roupa CLARA embaixo (expande cintura/quadril)
- Resultado: ilusão de corpo ampulheta

9. LINHAS E FORMAS NO CABELO (qualquer comprimento)

Mesmo cabelo curto contém LINHAS E FORMAS que transmitem:
- DIAGONAIS = Dinamismo, extroversão
- HORIZONTAIS/VERTICAIS/COMPACTAS = Seriedade, foco, estabilidade
- ONDULADAS = Romance, sensualidade, delicadeza, lirismo, inocência

Essas linhas devem estar conectadas à ENERGIA/PERSONALIDADE desejada

10. REGRA DE OURO

Quando cabelo é CURTO ou NÃO CHEGA na região que precisa compensação:
- Foco na compensação visual através de ROUPA (luz/sombra)
- Foco nas LINHAS/FORMAS do próprio cabelo (energia/personalidade)
- NÃO tentar compensar corpo com cabelo que não chega lá

==========================================
INTEGRAÇÃO FINAL
==========================================

Ao gerar recomendação de corte:
1. Aplicar regras de assimetria facial (1-4)
2. Aplicar regras de linhas/formas (5-7)
3. Verificar comprimento do cabelo proposto (8-10)
4. Se cabelo chega região → compensar com estrutura do corte
5. Se cabelo curto → indicar compensação com roupa na análise
6. Sempre incluir gola como parte da compensação visual do rosto

==========================================
PRONTO PARA ADICIONAR NOVAS REGRAS
==========================================

[ESPAÇO RESERVADO PARA NOVAS REGRAS QUE SERÃO ADICIONADAS]
`;

function gerarPromptCorte(analise) {
  const {
    assimetria,
    biotipo,
    linhasRosto,
    linhasCorpo,
    tomPele,
    usoFranja,
    comprimentoPreferido,
    descricaoAdicional
  } = analise;

  let prompt = `CORTE DE CABELO PERSONALIZADO - ANÁLISE VISUAL\n\n`;
  prompt += `BASE DE REGRAS APLICADAS:\n`;
  prompt += REGRAS_BASE;
  prompt += `\n\n==========================================\n`;
  prompt += `ANÁLISE ESPECÍFICA DA USUÁRIA\n`;
  prompt += `==========================================\n\n`;

  prompt += `Assimetria Facial: ${assimetria}\n`;
  prompt += `Biotipo: ${biotipo}\n`;
  prompt += `Linhas do Rosto: ${linhasRosto}\n`;
  prompt += `Linhas do Corpo: ${linhasCorpo}\n`;
  prompt += `Tom de Pele: ${tomPele}\n`;
  prompt += `Uso de Franja: ${usoFranja}\n`;
  prompt += `Comprimento Preferido: ${comprimentoPreferido}\n`;

  if (descricaoAdicional) {
    prompt += `\nObs: ${descricaoAdicional}\n`;
  }

  prompt += `\n[APLICAR REGRAS ACIMA E GERAR RECOMENDAÇÃO ESPECÍFICA]`;

  return prompt;
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gerarPromptCorte, REGRAS_BASE };
}
