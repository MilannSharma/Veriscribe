import { jsPDF } from 'jspdf';

export const exportToPDF = (
  toolName: string,
  content: string,
  extraMetadata?: Record<string, string | number>,
  originalContent?: string
) => {
  const doc = new jsPDF();
  
  const marginX = 20;
  let currentY = 25;

  // 1. Brand H1 Header: VERISCRIBE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('VERISCRIBE', marginX, currentY);
  
  currentY += 10;

  // 2. Tool H2 Header: Specific Tool Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(99, 102, 241); // Indigo-500
  doc.text(`${toolName.toUpperCase()} FULL REPORT`, marginX, currentY);
  
  currentY += 6;

  // Header separator line
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(marginX, currentY, 190, currentY);
  
  currentY += 12;

  // 3. Metadata Parameters (Score, source, confidence, style)
  if (extraMetadata) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    
    Object.entries(extraMetadata).forEach(([label, value]) => {
      // Check if page overflow
      if (currentY > 270) {
        doc.addPage();
        currentY = 25;
      }
      doc.text(`${label.toUpperCase()}: ${value}`, marginX, currentY);
      currentY += 6;
    });
    
    currentY += 4;
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.line(marginX, currentY, 190, currentY);
    currentY += 12;
  }

  // 4. ORIGINAL SOURCE DOCUMENT CONTENT
  if (originalContent && originalContent.trim()) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('ORIGINAL INPUT DOCUMENT', marginX, currentY);
    currentY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    
    const originalLines = doc.splitTextToSize(originalContent, 170);
    originalLines.forEach((line: string) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 25;
      }
      doc.text(line, marginX, currentY);
      currentY += 6;
    });

    currentY += 10;
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(marginX, currentY, 190, currentY);
    currentY += 12;
  }

  // 5. PROCESSED / SYSTEM COMPILATION REPORT CONTENT
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('ANALYSIS & OUTPUT REPORT', marginX, currentY);
  currentY += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(51, 65, 85); // slate-700
  
  const reportLines = doc.splitTextToSize(content, 170);
  reportLines.forEach((line: string) => {
    if (currentY > 270) {
      doc.addPage();
      currentY = 25;
    }
    doc.text(line, marginX, currentY);
    currentY += 6.5;
  });

  // Footer on final page
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('This document was parsed and generated securely via the Veriscribe Academic Engine.', marginX, 285);

  const safeFilename = `veriscribe-${toolName.toLowerCase().replace(/\s+/g, '-')}-full-report.pdf`;
  doc.save(safeFilename);
};
