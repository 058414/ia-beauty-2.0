/**
 * GERADOR DE PDF PROFISSIONAL - IA BEAUTY
 * Renderiza o dossiê completo SEM páginas em branco
 */

function limparTexto(texto) {
  if (!texto) return '';

  let limpo = texto
    .replace(/╔/g, '')
    .replace(/╗/g, '')
    .replace(/╚/g, '')
    .replace(/╝/g, '')
    .replace(/═/g, '')
    .replace(/║/g, '')
    .replace(/█/g, '')
    .replace(/▌/g, '')
    .replace(/□/g, '')
    .replace(/◆/g, '')
    .replace(/━/g, '')
    .replace(/✓/g, '✔')
    .replace(/✗/g, '✘')
    .replace(/\*\*/g, '')
    .replace(/%/g, '')
    .replace(/\n\n\n+/g, '\n\n')
    .trim();

  return limpo;
}

function extrairSecoes(protocoloCompleto) {
  const secoes = [];
  let texteLimpo = limparTexto(protocoloCompleto);
  const partes = texteLimpo.split(/\n-{5,}\n|\n={5,}\n/);

  for (let i = 0; i < partes.length; i++) {
    const parte = partes[i].trim();
    if (!parte || parte.length < 10) continue;

    const linhas = parte.split('\n');
    const titulo = linhas[0].trim();
    const conteudo = linhas.slice(1).join('\n').trim();

    if (titulo && conteudo) {
      secoes.push({
        titulo: titulo,
        conteudo: conteudo
      });
    }
  }

  return secoes.length > 0 ? secoes : [{
    titulo: 'DOSSIÊ IA BEAUTY',
    conteudo: texteLimpo
  }];
}

function gerarPDFProtocolo(nomeUsuaria, protocolo, meiasFacesImages = null, analiseCorpoCompleta = null) {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

      script.onload = () => {
        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true,
            putOnlyUsedFonts: true,
            fonts: {
              helvetica: {
                normal: 'helvetica',
                bold: 'helvetica',
                bolditalic: 'helvetica',
                italic: 'helvetica'
              }
            }
          });

          const corOuro = [196, 151, 58];
          const corTexto = [50, 50, 50];
          const corSubtitulo = [100, 100, 100];
          const corFundo = [245, 245, 245];

          let yPos = 15;
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const margin = 15;
          const maxWidth = pageWidth - (margin * 2);

          // CABEÇALHO
          doc.setFillColor(245, 245, 245);
          doc.rect(0, 0, pageWidth, 50, 'F');
          doc.setDrawColor(...corOuro);
          doc.setLineWidth(2);
          doc.line(0, 50, pageWidth, 50);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(28);
          doc.setTextColor(...corOuro);
          doc.text('✦ IA BEAUTY ✦', margin, 25);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(...corSubtitulo);
          doc.text('Protocolo de Compensação Visual', margin, 35);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(...corTexto);
          doc.text(`Protocolo de ${nomeUsuaria}`, margin, 45);

          yPos = 60;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(...corSubtitulo);
          const dataHoje = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          doc.text(`Data: ${dataHoje}`, margin, yPos);
          yPos += 15;

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(109, 213, 237);
          doc.text('Sobre Esta Abordagem:', margin, yPos);
          yPos += 6;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(...corTexto);
          const introducao = `Este protocolo NÃO recomenda um corte específico. Em vez disso, ele EDUCA você sobre os elementos de compensação visual que seu cabelo pode ter. Cada elemento gera um efeito visual diferente no seu rosto e corpo. Você escolhe qual usar, quando usar, e como combiná-los — conforme sua necessidade do dia, contexto, energia e preferência pessoal. Você está no comando.`;
          const linhasIntro = doc.splitTextToSize(introducao, maxWidth);
          doc.text(linhasIntro, margin, yPos);
          yPos += (linhasIntro.length * 4) + 12;

          doc.setFillColor(245, 245, 245);
          doc.rect(margin - 2, yPos - 2, maxWidth + 4, 40, 'F');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(109, 213, 237);
          doc.text('O QUE VOCÊ ENCONTRARÁ NESTE PROTOCOLO:', margin, yPos);
          yPos += 8;

          const itensIndice = [
            '1. Sua Assimetria Facial - O mapa visual do seu rosto',
            '2. Seu Corpo & Linhas - Como as formas dialogam com seu biotipo',
            '3. Seus Elementos de Compensação - O que cada um consegue fazer e por quê',
            '4. Estilização Diária - Como você comanda a compensação visual'
          ];

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(...corTexto);
          itensIndice.forEach(item => {
            doc.text(item, margin + 5, yPos);
            yPos += 6;
          });

          // MEIAS-FACES
          if (meiasFacesImages && meiasFacesImages.length >= 3) {
            doc.addPage();
            yPos = 20;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(...corOuro);
            doc.text('Sua Análise Facial Visual', margin, yPos);
            yPos += 12;

            const imgWidth = (maxWidth - 10) / 3;
            const imgHeight = imgWidth * 1.33;
            let xPos = margin;

            try {
              doc.addImage(meiasFacesImages[0], 'PNG', xPos, yPos, imgWidth, imgHeight);
              doc.setFontSize(9);
              doc.setTextColor(...corSubtitulo);
              doc.text('Lado Esquerdo', xPos + (imgWidth / 2), yPos + imgHeight + 4, { align: 'center' });
              xPos += imgWidth + 5;
            } catch (e) {
              console.log('Erro ao adicionar imagem esquerda:', e);
            }

            try {
              doc.addImage(meiasFacesImages[1], 'PNG', xPos, yPos, imgWidth, imgHeight);
              doc.setFontSize(9);
              doc.setTextColor(...corSubtitulo);
              doc.text('Original', xPos + (imgWidth / 2), yPos + imgHeight + 4, { align: 'center' });
              xPos += imgWidth + 5;
            } catch (e) {
              console.log('Erro ao adicionar imagem original:', e);
            }

            try {
              doc.addImage(meiasFacesImages[2], 'PNG', xPos, yPos, imgWidth, imgHeight);
              doc.setFontSize(9);
              doc.setTextColor(...corSubtitulo);
              doc.text('Lado Direito', xPos + (imgWidth / 2), yPos + imgHeight + 4, { align: 'center' });
            } catch (e) {
              console.log('Erro ao adicionar imagem direita:', e);
            }

            yPos = yPos + imgHeight + 15;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(109, 213, 237);
            doc.text('O QUE VOCÊ ESTÁ VENDO:', margin, yPos);
            yPos += 8;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(...corTexto);

            const explicacoes = [
              '• LADO ESQUERDO: Mostra como seria se ambos os lados tivessem as características do seu lado esquerdo',
              '• ORIGINAL: Sua foto atual, com toda a sua assimetria natural e beleza única',
              '• LADO DIREITO: Mostra como seria se ambos os lados tivessem as características do seu lado direito'
            ];

            explicacoes.forEach((exp, idx) => {
              const linhasExp = doc.splitTextToSize(exp, maxWidth);
              linhasExp.forEach((linha, lineIdx) => {
                doc.text(linha, margin + 3, yPos);
                yPos += 3.5;
              });
              if (idx < explicacoes.length - 1) yPos += 1;
            });

            yPos += 5;
            doc.setFontSize(8);
            doc.setTextColor(...corSubtitulo);
            const dica = 'Essa análise ajuda a identificar sua assimetria natural, que é a base para escolher o melhor posicionamento de cabelo e compensação visual.';
            const linhasDica = doc.splitTextToSize(dica, maxWidth);
            doc.text(linhasDica, margin, yPos);
          }

          // ANÁLISE DO PROTOCOLO
          doc.addPage();
          yPos = 15;

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(...corOuro);
          doc.text('SEU PROTOCOLO IA BEAUTY', margin, yPos);
          yPos += 10;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(...corSubtitulo);
          doc.text(`Análise Completa de ${nomeUsuaria} - ${new Date().toLocaleDateString('pt-BR')}`, margin, yPos);
          yPos += 8;

          doc.setDrawColor(...corOuro);
          doc.setLineWidth(0.5);
          doc.line(margin, yPos, pageWidth - margin, yPos);
          yPos += 6;

          let protocoloFinal = protocolo;
          if (analiseCorpoCompleta) {
            protocoloFinal = protocolo.replace(
              /análise do corpo|análise corpo|ANÁLISE DO CORPO|CORPO/i,
              analiseCorpoCompleta
            );
            if (protocoloFinal === protocolo) {
              protocoloFinal = protocolo + '\n\n═════════════════════════════════════\n\nANÁLISE COMPLETA DO CORPO\n\n' + analiseCorpoCompleta;
            }
          }

          const secoes = extrairSecoes(protocoloFinal);
          const ESPACO_MINIMO = 25;

          for (let secaoIdx = 0; secaoIdx < secoes.length; secaoIdx++) {
            const secao = secoes[secaoIdx];

            if (yPos > pageHeight - ESPACO_MINIMO) {
              doc.addPage();
              yPos = 15;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(109, 213, 237);
            doc.text(secao.titulo, margin, yPos);
            yPos += 7;

            doc.setDrawColor(...corOuro);
            doc.setLineWidth(0.4);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(...corTexto);

            const linhas = secao.conteudo.split('\n');

            for (let lineIdx = 0; lineIdx < linhas.length; lineIdx++) {
              const textoLimpo = linhas[lineIdx].trim();

              if (!textoLimpo) {
                yPos += 1.5;
                continue;
              }

              const textoQuebrado = doc.splitTextToSize(textoLimpo, maxWidth);

              for (const textoLinha of textoQuebrado) {
                if (yPos > pageHeight - 12) {
                  doc.addPage();
                  yPos = 15;
                }

                doc.text(textoLinha, margin, yPos);
                yPos += 4.5;
              }
            }

            if (secaoIdx < secoes.length - 1) {
              yPos += 4;
            }
          }

          // PÁGINA FINAL - PRÓXIMOS PASSOS
          doc.addPage();
          yPos = 15;

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(14);
          doc.setTextColor(...corOuro);
          doc.text('Como Usar Este Protocolo', margin, yPos);
          yPos += 12;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(...corTexto);

          const passos = [
            { titulo: 'PASSO 1: Estude Suas Ferramentas', texto: 'Leia a Seção 3 com atenção. Compreenda cada elemento de compensação visual e o que ele consegue fazer por você.' },
            { titulo: 'PASSO 2: Escolha Conforme Sua Necessidade', texto: 'Você pode usar diferentes elementos conforme seu contexto: dia de trabalho importante, dia casual, dia de autoestima alta ou baixa.' },
            { titulo: 'PASSO 3: Experimente', texto: 'Teste os elementos descritos. Note como cada um afeta sua percepção e como você se sente ao usá-los.' },
            { titulo: 'PASSO 4: Personalize', texto: 'Combine elementos. Descubra qual combinação funciona melhor PARA VOCÊ e seu dia a dia.' },
            { titulo: 'IMPORTANTE', texto: 'Este protocolo não é uma receita rígida. É uma ferramenta de empoderamento. Você está no comando. O cabelo é a ferramenta, não a prisão.' }
          ];

          passos.forEach((passo, idx) => {
            if (yPos > pageHeight - 30) {
              doc.addPage();
              yPos = 15;
            }

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(109, 213, 237);
            doc.text(passo.titulo, margin, yPos);
            yPos += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...corTexto);
            const linhasTexto = doc.splitTextToSize(passo.texto, maxWidth - 5);
            doc.text(linhasTexto, margin + 3, yPos);
            yPos += (linhasTexto.length * 4) + 4;
          });

          yPos += 8;
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(9);
          doc.setTextColor(...corSubtitulo);
          const notaFinal = 'Este protocolo foi criado especialmente para você, baseado em análise profunda de suas características faciais e corporais. Ele é seu — use como desejar.';
          const linhasNota = doc.splitTextToSize(notaFinal, maxWidth);
          doc.text(linhasNota, margin, yPos);

          // RODAPÉ
          const pageCount = doc.internal.pages.length - 1;
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            doc.setDrawColor(...corOuro);
            doc.setLineWidth(0.5);
            doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(...corSubtitulo);
            doc.text(
              `IA Beauty © ${new Date().getFullYear()} | Página ${i} de ${pageCount}`,
              pageWidth / 2,
              pageHeight - 7,
              { align: 'center' }
            );
          }

          // SALVAR
          const nomeArquivo = `ia-beauty-protocolo-${nomeUsuaria.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
          doc.save(nomeArquivo);
          resolve(true);
        } catch (erroInterno) {
          console.error('Erro ao gerar PDF:', erroInterno);
          reject(erroInterno);
        }
      };

      script.onerror = () => {
        console.error('Erro ao carregar jsPDF');
        reject(new Error('Falha ao carregar jsPDF'));
      };

      document.head.appendChild(script);
    } catch (erro) {
      console.error('Erro na geração do PDF:', erro);
      reject(erro);
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gerarPDFProtocolo, limparTexto };
}
