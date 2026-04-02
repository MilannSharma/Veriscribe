import { 
  FileStack, 
  Scissors, 
  Minimize2, 
  LayoutGrid, 
  RotateCw, 
  Wrench, 
  Lock, 
  Unlock, 
  Stamp, 
  Hash, 
  Crop, 
  PenTool, 
  Eraser, 
  FileDiff, 
  FileEdit, 
  Camera, 
  Scan, 
  Archive,
  FileVideo,
  FileAudio,
  FileImage,
  FileCode,
  FileSpreadsheet,
  FileText,
  Languages,
  Sparkles
} from "lucide-react";

export interface SubTool {
  id: string;
  name: string;
  icon: any;
  description: string;
  route: string;
}

export interface SubCategory {
  id: string;
  name: string;
  subTools: SubTool[];
}

export const fileConverterCategories: SubCategory[] = [
  {
    id: "pdf-tools",
    name: "PDF TOOLS",
    subTools: [
      { id: "merge-pdf", name: "Merge PDF", icon: FileStack, description: "Combine multiple PDFs into one", route: "/tools/file-converter/merge-pdf" },
      { id: "split-pdf", name: "Split PDF", icon: Scissors, description: "Separate pages into independent files", route: "/tools/file-converter/split-pdf" },
      { id: "compress-pdf", name: "Compress PDF", icon: Minimize2, description: "Reduce file size, keep quality", route: "/tools/file-converter/compress-pdf" },
      { id: "organize-pdf", name: "Organize PDF", icon: LayoutGrid, description: "Sort, reorder, delete, add pages", route: "/tools/file-converter/organize-pdf" },
      { id: "rotate-pdf", name: "Rotate PDF", icon: RotateCw, description: "Rotate one or all pages", route: "/tools/file-converter/rotate-pdf" },
      { id: "repair-pdf", name: "Repair PDF", icon: Wrench, description: "Recover damaged or corrupted PDFs", route: "/tools/file-converter/repair-pdf" },
      { id: "protect-pdf", name: "Protect PDF", icon: Lock, description: "Add password encryption", route: "/tools/file-converter/protect-pdf" },
      { id: "unlock-pdf", name: "Unlock PDF", icon: Unlock, description: "Remove password protection instantly", route: "/tools/file-converter/unlock-pdf" },
      { id: "watermark-pdf", name: "Watermark PDF", icon: Stamp, description: "Add image or text watermark", route: "/tools/file-converter/watermark-pdf" },
      { id: "page-numbers", name: "Page Numbers", icon: Hash, description: "Add page numbers with custom font/position", route: "/tools/file-converter/page-numbers" },
      { id: "crop-pdf", name: "Crop PDF", icon: Crop, description: "Crop margins or select specific areas", route: "/tools/file-converter/crop-pdf" },
      { id: "sign-pdf", name: "Sign PDF", icon: PenTool, description: "Sign yourself or send for e-signature", route: "/tools/file-converter/sign-pdf" },
      { id: "redact-pdf", name: "Redact PDF", icon: Eraser, description: "Permanently remove sensitive content", route: "/tools/file-converter/redact-pdf" },
      { id: "compare-pdf", name: "Compare PDF", icon: FileDiff, description: "Side-by-side version comparison", route: "/tools/file-converter/compare-pdf" },
      { id: "edit-pdf", name: "Edit PDF", icon: FileEdit, description: "Add text, images, shapes, annotations", route: "/tools/file-converter/edit-pdf" },
      { id: "scan-to-pdf", name: "Scan to PDF", icon: Camera, description: "Capture with phone camera \u2192 PDF", route: "/tools/file-converter/scan-to-pdf" },
      { id: "ocr-pdf", name: "OCR PDF", icon: Scan, description: "Make scanned PDFs searchable", route: "/tools/file-converter/ocr-pdf" },
      { id: "pdf-to-pdfa", name: "PDF to PDF/A", icon: Archive, description: "Convert to archival ISO standard", route: "/tools/file-converter/pdf-to-pdfa" }
    ]
  },
  {
    id: "pdf-to-other",
    name: "PDF TO OTHER FORMATS",
    subTools: [
      { id: "pdf-to-word", name: "PDF to Word", icon: FileText, description: "Editable DOC/DOCX, near 100% accuracy", route: "/tools/file-converter/pdf-to-word" },
      { id: "pdf-to-powerpoint", name: "PDF to PowerPoint", icon: FileVideo, description: "Editable PPT/PPTX slideshow", route: "/tools/file-converter/pdf-to-powerpoint" },
      { id: "pdf-to-excel", name: "PDF to Excel", icon: FileSpreadsheet, description: "Extract all tables into XLS/XLSX", route: "/tools/file-converter/pdf-to-excel" },
      { id: "pdf-to-jpg", name: "PDF to JPG", icon: FileImage, description: "Each page to JPG or extract images", route: "/tools/file-converter/pdf-to-jpg" },
      { id: "pdf-to-txt", name: "PDF to TXT", icon: FileText, description: "Extract all plain text", route: "/tools/file-converter/pdf-to-txt" }
    ]
  },
  {
    id: "other-to-pdf",
    name: "OTHER FORMATS TO PDF",
    subTools: [
      { id: "word-to-pdf", name: "Word to PDF", icon: FileText, description: "DOC/DOCX to PDF", route: "/tools/file-converter/word-to-pdf" },
      { id: "powerpoint-to-pdf", name: "PowerPoint to PDF", icon: FileVideo, description: "PPT/PPTX to PDF", route: "/tools/file-converter/powerpoint-to-pdf" },
      { id: "excel-to-pdf", name: "Excel to PDF", icon: FileSpreadsheet, description: "XLS/XLSX to PDF", route: "/tools/file-converter/excel-to-pdf" },
      { id: "image-to-pdf", name: "Image to PDF", icon: FileImage, description: "JPG, PNG, WEBP \u2192 PDF", route: "/tools/file-converter/image-to-pdf" },
      { id: "html-to-pdf", name: "HTML to PDF", icon: FileCode, description: "URL or HTML code \u2192 PDF", route: "/tools/file-converter/html-to-pdf" },
      { id: "txt-to-pdf", name: "TXT to PDF", icon: FileText, description: "Plain text \u2192 formatted PDF", route: "/tools/file-converter/txt-to-pdf" }
    ]
  },
  {
    id: "office-conversions",
    name: "OFFICE CONVERSIONS",
    subTools: [
      { id: "word-to-powerpoint", name: "Word to PowerPoint", icon: FileVideo, description: "DOC/DOCX to PPT/PPTX", route: "/tools/file-converter/word-to-powerpoint" },
      { id: "word-to-excel", name: "Word to Excel", icon: FileSpreadsheet, description: "DOC/DOCX to XLS/XLSX", route: "/tools/file-converter/word-to-excel" },
      { id: "excel-to-word", name: "Excel to Word", icon: FileText, description: "XLS/XLSX to DOC/DOCX", route: "/tools/file-converter/excel-to-word" },
      { id: "powerpoint-to-word", name: "PowerPoint to Word", icon: FileText, description: "PPT/PPTX to DOC/DOCX", route: "/tools/file-converter/powerpoint-to-word" },
      { id: "excel-to-csv", name: "Excel to CSV", icon: FileText, description: "XLS/XLSX to CSV", route: "/tools/file-converter/excel-to-csv" },
      { id: "csv-to-excel", name: "CSV to Excel", icon: FileSpreadsheet, description: "CSV to XLS/XLSX", route: "/tools/file-converter/csv-to-excel" },
      { id: "markdown-to-pdf", name: "Markdown to PDF", icon: FileText, description: "MD to PDF", route: "/tools/file-converter/markdown-to-pdf" },
      { id: "markdown-to-word", name: "Markdown to Word", icon: FileText, description: "MD to DOC/DOCX", route: "/tools/file-converter/markdown-to-word" },
      { id: "json-to-excel", name: "JSON to Excel", icon: FileSpreadsheet, description: "JSON to XLS/XLSX", route: "/tools/file-converter/json-to-excel" },
      { id: "html-to-word", name: "HTML to Word", icon: FileText, description: "HTML to DOC/DOCX", route: "/tools/file-converter/html-to-word" }
    ]
  },
  {
    id: "image-conversions",
    name: "IMAGE CONVERSIONS",
    subTools: [
      { id: "jpg-to-pdf", name: "JPG to PDF", icon: FileImage, description: "JPG to PDF", route: "/tools/file-converter/jpg-to-pdf" },
      { id: "png-to-pdf", name: "PNG to PDF", icon: FileImage, description: "PNG to PDF", route: "/tools/file-converter/png-to-pdf" },
      { id: "jpg-to-png", name: "JPG to PNG", icon: FileImage, description: "JPG to PNG", route: "/tools/file-converter/jpg-to-png" },
      { id: "png-to-jpg", name: "PNG to JPG", icon: FileImage, description: "PNG to JPG", route: "/tools/file-converter/png-to-jpg" },
      { id: "webp-to-jpg", name: "WEBP to JPG", icon: FileImage, description: "WEBP to JPG", route: "/tools/file-converter/webp-to-jpg" },
      { id: "jpg-to-webp", name: "JPG to WEBP", icon: FileImage, description: "JPG to WEBP", route: "/tools/file-converter/jpg-to-webp" }
    ]
  },
  {
    id: "audio-video",
    name: "AUDIO & VIDEO",
    subTools: [
      { id: "mp4-to-mp3", name: "MP4 to MP3", icon: FileAudio, description: "Extract audio from any video", route: "/tools/file-converter/mp4-to-mp3" },
      { id: "video-to-text", name: "Video to Text", icon: FileText, description: "Transcript as TXT or DOCX", route: "/tools/file-converter/video-to-text" }
    ]
  },
  {
    id: "ai-powered",
    name: "AI-POWERED CONVERSIONS",
    subTools: [
      { id: "ai-summarizer-conv", name: "AI Summarizer", icon: Sparkles, description: "Paste doc or URL \u2192 clean summary", route: "/tools/file-converter/ai-summarizer" },
      { id: "translate-pdf", name: "Translate PDF", icon: Languages, description: "Any language, layout preserved", route: "/tools/file-converter/translate-pdf" }
    ]
  }
];
