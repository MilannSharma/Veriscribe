import { 
  Briefcase, 
  FileCode, 
  FileText, 
  Users, 
  Scale, 
  ClipboardList, 
  Presentation, 
  BarChart, 
  Search, 
  GraduationCap, 
  FileCheck
} from "lucide-react";

export interface DocType {
  id: string;
  name: string;
  icon: any;
  description: string;
}

export const voiceToDocTypes: DocType[] = [
  { id: "business-doc", name: "Business Doc", icon: Briefcase, description: "General business communication" },
  { id: "prd", name: "PRD", icon: FileCode, description: "Product Requirements Document" },
  { id: "srd", name: "SRD", icon: FileCode, description: "Software Requirements Document" },
  { id: "frd", name: "FRD", icon: FileCode, description: "Functional Requirements Document" },
  { id: "mom", name: "MOM", icon: Users, description: "Minutes of Meeting" },
  { id: "legal-brief", name: "Legal Brief", icon: Scale, description: "Formal legal document" },
  { id: "sop", name: "SOP", icon: ClipboardList, description: "Standard Operating Procedure" },
  { id: "proposal", name: "Proposal", icon: Presentation, description: "Business or project proposal" },
  { id: "report", name: "Report", icon: BarChart, description: "Structured report with sections" },
  { id: "case-study", name: "Case Study", icon: Search, description: "Detailed case study document" },
  { id: "research-paper", name: "Research Paper", icon: GraduationCap, description: "Academic research paper" },
  { id: "executive-summary", name: "Executive Summary", icon: FileCheck, description: "High-level summary document" }
];
