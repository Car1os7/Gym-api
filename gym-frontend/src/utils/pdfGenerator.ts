import jsPDF from 'jspdf';

export const generateMembersReport = (members: any[]) => {
  const pdf = new jsPDF();
  
  pdf.setFontSize(20);
  pdf.text('Relatório de Membros', 20, 30);
  
  pdf.setFontSize(12);
  pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 45);
  pdf.text(`Total de Membros: ${members.length}`, 20, 55);
  
  let yPosition = 70;
  
  members.forEach((member, index) => {
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }
    
    pdf.text(`${index + 1}. ${member.nome} - ${member.email}`, 20, yPosition);
    yPosition += 10;
  });
  
  return pdf;
};

export const generateStatsReport = (stats: any) => {
  const pdf = new jsPDF();
  
  pdf.setFontSize(20);
  pdf.text('Relatório de Estatísticas', 20, 30);
  
  pdf.setFontSize(12);
  pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 45);
  pdf.text(`• Total de Membros: ${stats.totalMembros || 0}`, 20, 60);
  pdf.text(`• Membros Ativos: ${stats.membrosAtivos || 0}`, 20, 70);
  pdf.text(`• Total de Planos: ${stats.totalPlanos || 0}`, 20, 80);
  pdf.text(`• Receita Mensal: R$ ${stats.receitaMensal || 0}`, 20, 90);
  
  return pdf;
};
