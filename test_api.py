#!/usr/bin/env python3
import requests
import json
import os

api_key = os.getenv('ANTHROPIC_API_KEY')
if not api_key:
    print("❌ ANTHROPIC_API_KEY não encontrada no environment")
    exit(1)

system_prompt = """VOCÊ É UM ESPECIALISTA EM COMPENSAÇÃO VISUAL.

SUA TAREFA: Analisar quem a pessoa é, descobrir quais ELEMENTOS DE COMPENSAÇÃO VISUAL funcionam para ela, e gerar um protocolo EXCLUSIVO que ela consegue SUSTENTAR no dia a dia.

SEÇÕES OBRIGATÓRIAS:

SEÇÃO 1: QUEM VOCÊ É (Reconhecimento Profundo)
Comece reconhecendo quem ela é e por que isso importa para compensação visual.

SEÇÃO 2: ONDE VOCÊ ESTÁ (Contexto + Transição)
Reconheça seu momento e como o cabelo pode apoiar essa transição.

SEÇÃO 3: 5-7 ELEMENTOS PARA EXPLORAR NO SEU CORTE
OBRIGATÓRIO: Cada elemento DEVE ter:
- O QUÊ É (explicação clara)
- POR QUÊ FUNCIONA (razão técnica: linhas, movimento, volume, luz/sombra, franja, textura)
- PARA VOCÊ (específico para sua arquétipo + contexto - NÃO genérico)
- COMO APLICAR (prático e detalhado)
- FUNCIONA EM (quais comprimentos/cortes)
- SUSTENTABILIDADE (ela consegue manter?)

SEÇÃO 4: COMO ISSO TE TRANSFORMA (Conclusão Empoderizadora)

REQUISITOS:
✅ 5-7 elementos ESPECÍFICOS
✅ Cada elemento menciona COMPENSAÇÃO VISUAL
✅ Linguagem pessoal ("Você", "Seu rosto")
✅ NUNCA genéricos
✅ PROFUNDO e RECONHECEDOR
"""

user_prompt = """ANÁLISE PROFUNDA PARA: MARIA TESTADA

CONTEXTO PESSOAL:
- Arquétipo: DINÂMICA (Linhas Diagonais)
- Contexto: Explorar Novas Facetas (transformação)
- Intenção: Dinamismo e energia (movimento, versatilidade)

ROSTO:
- Percepção: Largo demais (quer compensar)
- Linhas: CURVAS/Arredondadas
- Franja: Usa reta e deixou rosto mais largo
- Maçãs: Proeminentes
- Desconforto: SIM

CORPO:
- Biotipo: Pêra (quadril mais largo que ombros)
- Linhas: CURVAS/Arredondadas
- Comprimento preferido: Médio (altura do ombro)

GERE um protocolo PROFUNDO, ESPECÍFICO e EXCLUSIVO para Maria.
Cada elemento deve ser impossível de usar para outra pessoa.
Fale de COMPENSAÇÃO VISUAL concretamente (quais linhas, qual movimento, qual volume).
"""

print("📡 Enviando para Claude API...\n")

response = requests.post(
    'https://api.anthropic.com/v1/messages',
    headers={
        'Content-Type': 'application/json',
        'x-api-key': api_key,
        'anthropic-version': '2023-06-01'
    },
    json={
        'model': 'claude-opus-4-1',
        'max_tokens': 4000,
        'system': system_prompt,
        'messages': [
            {
                'role': 'user',
                'content': user_prompt
            }
        ]
    }
)

if response.status_code != 200:
    print(f"❌ Erro: {response.status_code}")
    print(response.text)
    exit(1)

data = response.json()
protocolo = data.get('content', [{}])[0].get('text', '')

print("✅ PROTOCOLO GERADO COM SUCESSO!\n")
print("════════════════════════════════════════════════════════════════════\n")
print(protocolo)
print("\n════════════════════════════════════════════════════════════════════\n")
