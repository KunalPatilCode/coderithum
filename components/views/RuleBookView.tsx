import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Crown, Sparkles, BookOpen, Compass, ChevronRight, FileText, CheckCircle2, AlertTriangle, Cpu, Radio, ShieldAlert, ChevronLeft } from "lucide-react";
import InteractiveHeading from "../InteractiveHeading";

interface RuleBookViewProps {}

export default function RuleBookView({}: RuleBookViewProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [leftPageNum, setLeftPageNum] = useState<number>(0);
  const [rightPageNum, setRightPageNum] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const totalPages = 20;

  const handleNextSpread = () => {
    if (isFlipping || currentPage >= totalPages - 2) return;
    setFlipDirection("next");
    setIsFlipping(true);
    
    setRightPageNum(currentPage + 3);
    setLeftPageNum(currentPage);

    setTimeout(() => {
      setLeftPageNum(currentPage + 2);
      setCurrentPage((prev) => prev + 2);
      setIsFlipping(false);
    }, 580);
  };

  const handlePrevSpread = () => {
    if (isFlipping || currentPage <= 0) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    
    setLeftPageNum(currentPage - 2);
    setRightPageNum(currentPage + 1);

    setTimeout(() => {
      setRightPageNum(currentPage - 1);
      setCurrentPage((prev) => prev - 2);
      setIsFlipping(false);
    }, 580);
  };

  const handleGoToPage = (targetPage: number) => {
    if (isFlipping || targetPage === currentPage) return;
    const targetEven = targetPage % 2 === 0 ? targetPage : targetPage - 1;
    const isGoingNext = targetEven > currentPage;
    
    setFlipDirection(isGoingNext ? "next" : "prev");
    setIsFlipping(true);
    
    if (isGoingNext) {
      setRightPageNum(targetEven + 1);
      setLeftPageNum(currentPage);
    } else {
      setLeftPageNum(targetEven);
      setRightPageNum(currentPage + 1);
    }

    setTimeout(() => {
      if (isGoingNext) {
        setLeftPageNum(targetEven);
      } else {
        setRightPageNum(targetEven + 1);
      }
      setCurrentPage(targetEven);
      setIsFlipping(false);
    }, 580);
  };

  const renderPageContent = (pageNumber: number) => {
    const isCoverOrBack = pageNumber === 0 || pageNumber === 1 || pageNumber === 18 || pageNumber === 19;
    const pageSideClass = pageNumber % 2 === 0 ? "border-r border-slate-350 pr-9 shadow-inner" : "border-l border-slate-350 pl-9";
    const bgCreaseClass = pageNumber % 2 === 0
      ? "bg-gradient-to-r from-transparent via-transparent to-black/[0.06]"
      : "bg-gradient-to-l from-transparent via-transparent to-black/[0.06]";

    const renderInnerPageWrapper = (title: string, subtitle: string, moduleNum: string, pageNumLabel: string, children: React.ReactNode) => {
      return (
        <div 
          className={`relative w-full h-full bg-[#fdfaf2] text-slate-900 p-9 flex flex-col justify-between select-none ${pageSideClass}`}
          style={{
            backgroundImage: "linear-gradient(rgba(37,99,235,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.02) 1px, transparent 1px)",
            backgroundSize: "18px 18px"
          }}
        >
          {/* Page fold shading */}
          <div className={`absolute inset-0 pointer-events-none ${bgCreaseClass}`} />

          {/* Page Header */}
          <div className="flex justify-between font-mono text-[10px] text-slate-450 border-b border-slate-200/80 pb-2 relative z-10">
            <span className="font-bold text-slate-500 uppercase">{title}</span>
            <span>{pageNumLabel}</span>
          </div>

          {/* Page Body with thin customized scrollbar */}
          <div className="my-auto space-y-4 relative z-10 flex-1 overflow-y-auto max-h-[380px] pr-2 pt-2.5 scrollbar-thin scrollbar-thumb-slate-300">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-theme uppercase tracking-widest bg-blue-50/80 border border-blue-200 px-2 py-0.5">
                MODULE {moduleNum}
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase font-mono mt-1">
                {subtitle}
              </h2>
            </div>
            {children}
          </div>

          {/* Page Footer */}
          <div className="text-[10px] font-mono text-slate-400 text-center border-t border-slate-200/50 pt-2 relative z-10 mt-2">
            CODERITHUM TECHNICAL MANUAL v1.0
          </div>
        </div>
      );
    };

    if (pageNumber === 0) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6 flex flex-col justify-between border-r border-slate-900 relative">
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs pointer-events-none" />
          <div className="relative z-10 text-center font-mono opacity-40 my-auto">
            <BookOpen className="size-14 mx-auto text-cyan-500/60 mb-2 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">CODERITHUM CORE</span>
            <div className="text-[10px] text-slate-500 mt-1">SYSTEM LOGS // GOVERNANCE</div>
          </div>
        </div>
      );
    }

    if (pageNumber === 1) {
      return (
        <div 
          className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-10 flex flex-col justify-between select-none relative border-l border-slate-950"
          style={{ boxShadow: "inset 10px 0 20px rgba(0,0,0,0.8)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:18px_18px] opacity-10 pointer-events-none" />
          <div className="flex justify-between font-mono text-[9px] text-cyan-400 border-b border-slate-800/80 pb-2 relative z-10">
            <span className="font-bold">GOVERNANCE SYSTEM v1.0</span>
            <span className="text-slate-500">RULEBOOK.v1 // 01</span>
          </div>

          <div className="my-auto text-center space-y-6 relative z-10">
            <div className="flex justify-center">
              <div className="relative size-28 border-3 border-cyan-500/40 flex items-center justify-center p-3 shadow-[0_0_20px_rgba(34,211,238,0.15)] bg-slate-950">
                <div className="absolute -inset-1 border border-dotted border-cyan-500/20" />
                <svg className="size-16 text-cyan-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 5L90 28V72L50 95L10 72V28L50 5Z" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2.5" className="animate-pulse" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400">
                CODERITHUM
              </h1>
              <div className="px-4 py-1.5 bg-cyan-950/80 border-2 border-cyan-400/80 text-cyan-300 font-mono text-xs inline-block uppercase tracking-widest font-black shadow-md">
                TECHNICAL RULE BOOK
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase">
              GOVERNANCE • ROLES • SYSTEM DEPLOYMENTS
            </p>
          </div>

          <div className="border-t border-slate-850 pt-2 font-mono text-[9px] text-slate-500 text-center relative z-10">
            LEARNING • INNOVATION • LEADERSHIP • COLLABORATION
          </div>
        </div>
      );
    }

    if (pageNumber === 2) {
      // Module 00: System Map
      return renderInnerPageWrapper("MODULE 00 // SYSTEM MAP", "System Map", "00", "PAGE 02", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <p className="leading-relaxed text-slate-500 italic">A technical overview of how authority, execution, and accountability flow through Coderithum.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            {[
              "01 Purpose & Leadership Architecture",
              "02 Club Authority — Faculty Coordinator",
              "03 President & Vice President",
              "04 Technical Lead",
              "05 Digital Media & Outreach Team Lead",
              "06 Operations Lead",
              "07 Team Leads & Club Members",
              "08 Member Selection & Removal",
              "09 Zebra Control & Permissions",
              "10 Project Approval System",
              "11 Event Management",
              "12 Communication & Conflict Resolution",
              "13 Leadership Meetings & Decision-Making",
              "14 Code of Conduct & Accountability",
              "15 Core Principles & Governance"
            ].map((item, idx) => (
              <div key={idx} className="flex gap-2.5 border-b border-slate-200/45 pb-1 last:border-0 text-[10.5px]">
                <span className="text-theme font-bold">{item.substring(0,2)}</span>
                <span className="text-slate-700">{item.substring(2)}</span>
              </div>
            ))}
          </div>
          <div className="border border-cyan-500/80 p-3.5 bg-cyan-50/20 text-slate-900 border-l-4 text-[10px] leading-relaxed">
            <span className="font-bold uppercase text-[9px] block text-cyan-800 mb-0.5">DESIGN PRINCIPLE</span>
            Authority should be exercised according to the role. No leader should unnecessarily interfere with another department's day-to-day responsibilities; cross-team collaboration remains mandatory when a project or event requires it.
          </div>
        </div>
      ));
    }

    if (pageNumber === 3) {
      // Module 01: Purpose & Leadership Architecture
      return renderInnerPageWrapper("MODULE 01 // ARCHITECTURE", "Purpose & Leadership", "01", "PAGE 03", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <div className="border border-slate-200/80 p-3 bg-slate-100/40">
            <h3 className="font-black text-slate-900 uppercase border-b pb-1 mb-2 text-[10.5px] flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-theme" />
              THE SYSTEM MUST ENSURE
            </h3>
            <ul className="space-y-1.5 text-slate-600 text-[10px]">
              <li><span className="text-slate-800 font-bold">01</span> Clear responsibilities for every leadership position</li>
              <li><span className="text-slate-800 font-bold">02</span> Professional and transparent decision-making</li>
              <li><span className="text-slate-800 font-bold">03</span> Proper management of members and teams</li>
              <li><span className="text-slate-800 font-bold">04</span> Smooth execution of projects and events</li>
              <li><span className="text-slate-800 font-bold">05</span> Technical and operational discipline</li>
              <li><span className="text-slate-800 font-bold">06</span> Healthy collaboration between teams</li>
              <li><span className="text-slate-800 font-bold">07</span> Accountability at every level</li>
              <li><span className="text-slate-800 font-bold">08</span> Continuous growth of the club and its members</li>
            </ul>
          </div>

          <div className="border border-slate-900 p-3 bg-slate-950 text-white shadow-[2px_2px_0px_#000] text-[10px] space-y-1.5">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-[9px] block border-b border-slate-800 pb-1">LEADERSHIP HIERARCHY</span>
            <div><span className="text-emerald-400 font-bold">01</span> FACULTY COORDINATOR / CLUB AUTHORITY</div>
            <div><span className="text-amber-400 font-bold">02</span> PRESIDENT + VICE PRESIDENT</div>
            <div><span className="text-cyan-400 font-bold">03</span> TECH LEAD | DIGITAL MEDIA & OUTREACH TEAM | OPERATIONS</div>
            <div><span className="text-slate-400 font-bold">04</span> DOMAIN LEADS / TEAM LEADS</div>
            <div><span className="text-slate-500 font-bold">05</span> CLUB MEMBERS</div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 4) {
      // Module 02: Club Authority - Faculty Coordinator
      return renderInnerPageWrapper("MODULE 02 // COORDINATOR", "Club Authority", "02", "PAGE 04", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic">Faculty Coordinator / Club Authority — institutional supervision and guidance.</p>
          <div className="border border-slate-200/80 p-3.5 bg-slate-100/40 space-y-1.5 text-slate-600 text-[10px]">
            <p className="font-bold text-slate-900 mb-1">Highest-level supervision and institutional guidance mandates:</p>
            <div><span className="font-bold text-slate-800">01.</span> Approve the overall club structure.</div>
            <div><span className="font-bold text-slate-800">02.</span> Approve major changes to club policies.</div>
            <div><span className="font-bold text-slate-800">03.</span> Have authority over addition or removal of club members when required.</div>
            <div><span className="font-bold text-slate-800">04.</span> Approve major permissions and exceptional decisions.</div>
            <div><span className="font-bold text-slate-800">05.</span> Oversee Zebra-related administration and control.</div>
            <div><span className="font-bold text-slate-800">06.</span> Approve creation, modification, or removal of major club rules.</div>
            <div><span className="font-bold text-slate-800">07.</span> Supervise the selection/appointment process of the President and Vice President.</div>
            <div><span className="font-bold text-slate-800">08.</span> Resolve matters that cannot be resolved by student leadership.</div>
            <div><span className="font-bold text-slate-800">09.</span> Ensure the club operates according to college policies.</div>
            <div><span className="font-bold text-slate-800">10.</span> Protect the reputation and institutional standards of the club.</div>
          </div>
          <div className="border border-amber-500/80 p-3 bg-amber-50/20 text-slate-900 border-l-4 text-[10px] leading-relaxed">
            <span className="font-bold uppercase text-[9px] block text-amber-800 mb-0.5">AUTHORITY BOUNDARY</span>
            Institutional / high-impact decisions, including college authorities, major external partnerships, financial commitments, or significant reputation risks, involve the Faculty Coordinator.
          </div>
        </div>
      ));
    }

    if (pageNumber === 5) {
      // Module 03: President & Vice President
      return renderInnerPageWrapper("MODULE 03 // EXECUTIVE", "President", "03", "PAGE 05", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 text-[9.5px] text-slate-600 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10px] border-b pb-0.5 mb-1.5">LEADERSHIP ELIGIBILITY & APPOINTMENT</h4>
            <div><span className="font-bold">01</span> Any student from any academic department may become a Coderithum Club member.</div>
            <div><span className="font-bold">02</span> Department Leads / Team Leads must be students of the Computer Department.</div>
            <div><span className="font-bold">03</span> The President and Vice President must already be Coderithum members.</div>
            <div><span className="font-bold">04</span> The President and Vice President are promoted from the existing club membership.</div>
            <div><span className="font-bold">05</span> Final selection and appointment of the President and Vice President is under the Faculty Coordinator / Faculty Lead.</div>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 text-[9.5px] text-slate-600 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10px] border-b pb-0.5 mb-1">PRESIDENT — STRATEGY & AUTHORITY</h4>
            <p className="text-[9px] text-slate-500 italic mb-1">Responsible for club vision, strategic direction, representation, and governance.</p>
            <div><span className="font-bold">01</span> Set the overall vision and long-term goals of Coderithum.</div>
            <div><span className="font-bold">02</span> Provide strategic direction for the club and its major initiatives.</div>
            <div><span className="font-bold">03</span> Approve major projects, events, collaborations, and initiatives.</div>
            <div><span className="font-bold">04</span> Represent Coderithum before faculty, college administration, external organizations, companies, communities, and other institutions.</div>
            <div><span className="font-bold">05</span> Maintain the reputation, values, standards, and professional image of the club.</div>
            <div><span className="font-bold">06</span> Make final decisions on major matters within the authority granted by the Club Authority.</div>
            <div><span className="font-bold">07</span> Approve major changes to the club's structure, departments, and leadership.</div>
            <div><span className="font-bold">08</span> Resolve major disputes or issues that cannot be resolved by the Vice President or respective leads.</div>
            <div><span className="font-bold">09</span> Coordinate with the Faculty Coordinator on major decisions, approvals, and strategic matters.</div>
            <div><span className="font-bold">10</span> Build and maintain strategic relationships with colleges, companies, communities, industry professionals, speakers, mentors, and other organizations.</div>
            <div><span className="font-bold">11</span> Identify opportunities for the growth and development of Coderithum.</div>
            <div><span className="font-bold">12</span> Ensure that club activities remain aligned with its objectives and values.</div>
            <div><span className="font-bold">13</span> Review the club's overall performance periodically at a strategic level.</div>
            <div><span className="font-bold">14</span> Approve major policies, guidelines, and changes proposed by the executive team.</div>
            <div><span className="font-bold">15</span> Lead executive-level meetings when strategic decisions are required.</div>
            <div><span className="font-bold">16</span> Provide guidance to the Vice President and department leads while avoiding day-to-day operational interference.</div>
            <div><span className="font-bold">17</span> Ensure leadership accountability and take final student-level responsibility for major decisions and outcomes.</div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 6) {
      // Module 03B: Vice President
      return renderInnerPageWrapper("MODULE 03B // EXECUTION", "Vice President", "03B", "PAGE 06", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Coordination, alignment, leadership continuity — not day-to-day operations. Second-highest student leader acting as principal coordinator between President and department leads.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 text-[9.5px] text-slate-600 space-y-1.5">
            <div><span className="font-bold text-slate-800">01</span> Assist the President in implementing the club's vision, strategy, and major initiatives.</div>
            <div><span className="font-bold text-slate-800">02</span> Coordinate between the President and all department leads to ensure departments remain aligned with the club's objectives.</div>
            <div><span className="font-bold text-slate-800">03</span> Translate strategic decisions of the President into clear directions for department leads.</div>
            <div><span className="font-bold text-slate-800">04</span> Review departmental reports and identify major issues, dependencies, or risks that require leadership attention.</div>
            <div><span className="font-bold text-slate-800">05</span> Conduct executive coordination meetings when cross-department decisions or collaboration are required.</div>
            <div><span className="font-bold text-slate-800">06</span> Facilitate collaboration between departments when a project or event involves multiple teams.</div>
            <div><span className="font-bold text-slate-800">07</span> Support the President in evaluating major projects, events, and initiatives before final approval.</div>
            <div><span className="font-bold text-slate-800">08</span> Assist in resolving conflicts or disagreements between department leads before escalating them to the President.</div>
            <div><span className="font-bold text-slate-800">09</span> Represent the President when specifically delegated in meetings, discussions, or official interactions.</div>
            <div><span className="font-bold text-slate-800">10</span> Maintain continuity of leadership and take charge of student leadership responsibilities when the President is unavailable.</div>
            <div><span className="font-bold text-slate-800">11</span> Recommend improvements to the club's structure, policies, and working methods based on departmental feedback.</div>
            <div><span className="font-bold text-slate-800">12</span> Review the overall performance of department leads and communicate significant concerns to the President.</div>
            <div><span className="font-bold text-slate-800">13</span> Support strategic external collaborations and important institutional interactions when delegated by the President.</div>
            <div><span className="font-bold text-slate-800">14</span> Participate in monthly leadership reviews and help evaluate the club's overall progress.</div>
            <div><span className="font-bold text-slate-800">15</span> Ensure that major decisions requiring coordination between multiple departments are properly communicated and understood.</div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 7) {
      // Module 04: Technical Lead
      return renderInnerPageWrapper("MODULE 04 // DEVELOPMENT", "Technical Lead", "04", "PAGE 07", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Responsible for the technical direction and technical operations of the club. The CTL has primary authority over technical matters within the club.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 text-[9.5px] text-slate-600 space-y-1.5">
            <div><span className="font-bold text-slate-800">01</span> Maintain overall technical control of the club.</div>
            <div><span className="font-bold text-slate-800">02</span> Recommend addition or removal of technical members.</div>
            <div><span className="font-bold text-slate-800">03</span> Select technical members according to project requirements.</div>
            <div><span className="font-bold text-slate-800">04</span> Assign members to appropriate technical domains.</div>
            <div><span className="font-bold text-slate-800">05</span> Create technical sub-teams.</div>
            <div><span className="font-bold text-slate-800">06</span> Assign projects and responsibilities to technical teams.</div>
            <div><span className="font-bold text-slate-800">07</span> Define technical roles within projects.</div>
            <div><span className="font-bold text-slate-800">08</span> Identify and resolve technical problems.</div>
            <div><span className="font-bold text-slate-800">09</span> Escalate major technical issues to the President/Vice President when required.</div>
            <div><span className="font-bold text-slate-800">10</span> Guide and mentor technical members.</div>
            <div><span className="font-bold text-slate-800">11</span> Conduct or coordinate technical learning sessions.</div>
            <div><span className="font-bold text-slate-800">12</span> Recommend workshops and technical events to the President.</div>
            <div><span className="font-bold text-slate-800">13</span> Recommend technologies, frameworks, tools, and development practices.</div>
            <div><span className="font-bold text-slate-800">14</span> Create technical guidelines and development standards.</div>
            <div><span className="font-bold text-slate-800">15</span> Manage technical repositories and development workflows.</div>
            <div><span className="font-bold text-slate-800">16</span> Maintain technical documentation.</div>
            <div><span className="font-bold text-slate-800">17</span> Review the technical quality of club projects.</div>
            <div><span className="font-bold text-slate-800">18</span> Encourage open-source contributions and technical innovation.</div>
            <div><span className="font-bold text-slate-800">19</span> Track technical project progress.</div>
            <div><span className="font-bold text-slate-800">20</span> Ensure technical teams follow agreed development standards.</div>
          </div>
          <div className="border border-cyan-500/80 p-3 bg-cyan-50/20 text-slate-900 border-l-4 text-[10px] leading-relaxed">
            <span className="font-bold uppercase text-[9px] block text-cyan-800 mb-0.5">TECHNICAL DECISION RULE</span>
            The CTL may make technical decisions independently when they do not affect the club's budget, external commitments, official reputation, or major organizational structure. Major decisions should be discussed with the President/Vice President.
          </div>
        </div>
      ));
    }

    if (pageNumber === 8) {
      // Module 05: Digital Media & Outreach Team Lead
      return renderInnerPageWrapper("MODULE 05 // OUTREACH", "Digital Media & Outreach Team Lead", "05", "PAGE 08", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Responsible for the club's public presence, promotion, communication, and external outreach.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 text-[9.5px] text-slate-600 space-y-1.5">
            <div><span className="font-bold text-slate-800">01</span> Have primary control over club Digital Media & Outreach Team activities.</div>
            <div><span className="font-bold text-slate-800">02</span> Manage the Digital Media & Outreach Team.</div>
            <div><span className="font-bold text-slate-800">03</span> Assign members to outreach domains.</div>
            <div><span className="font-bold text-slate-800">04</span> Select suitable members for digital media responsibilities.</div>
            <div><span className="font-bold text-slate-800">05</span> Plan social media campaigns.</div>
            <div><span className="font-bold text-slate-800">06</span> Create promotion strategies for events and projects.</div>
            <div><span className="font-bold text-slate-800">07</span> Manage promotional content.</div>
            <div><span className="font-bold text-slate-800">08</span> Coordinate creation of posters, videos, reels, social media posts, event creatives, and promotional materials.</div>
            <div><span className="font-bold text-slate-800">09</span> Review and verify promotional content before publication.</div>
            <div><span className="font-bold text-slate-800">10</span> Maintain consistency in club branding.</div>
            <div><span className="font-bold text-slate-800">11</span> Contact potential collaborators and communities.</div>
            <div><span className="font-bold text-slate-800">12</span> Coordinate with speakers, organizations, and external partners when assigned.</div>
            <div><span className="font-bold text-slate-800">13</span> Promote club events and achievements.</div>
            <div><span className="font-bold text-slate-800">14</span> Track outreach performance.</div>
            <div><span className="font-bold text-slate-800">15</span> Analyze engagement and reach.</div>
            <div><span className="font-bold text-slate-800">16</span> Suggest improvements to the club's media strategy.</div>
            <div><span className="font-bold text-slate-800">17</span> Maintain an organized archive of official promotional content.</div>
          </div>
          <div className="border border-amber-500/80 p-3 bg-amber-50/20 text-slate-900 border-l-4 text-[10px] leading-relaxed">
            <span className="font-bold uppercase text-[9px] block text-amber-800 mb-0.5">PUBLICATION RULE</span>
            Official public content representing Coderithum should be reviewed by the Digital Media & Outreach Team Lead before publication. Sensitive announcements, official statements, or reputation-related posts should also receive President approval.
          </div>
        </div>
      ));
    }

    if (pageNumber === 9) {
      // Module 06: Operations Lead
      return renderInnerPageWrapper("MODULE 06 // OPERATIONS", "Operations Lead", "06", "PAGE 09", (
        <div className="space-y-4 font-mono text-[11px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Responsible for organizational execution, deadlines, documentation, and operational coordination.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 text-[9.5px] text-slate-600 space-y-1.5">
            <div><span className="font-bold text-slate-800">01</span> Select suitable members for operations-related responsibilities.</div>
            <div><span className="font-bold text-slate-800">02</span> Assign members to appropriate operational domains.</div>
            <div><span className="font-bold text-slate-800">03</span> Track deadlines.</div>
            <div><span className="font-bold text-slate-800">04</span> Monitor event and project timelines.</div>
            <div><span className="font-bold text-slate-800">05</span> Maintain club documentation.</div>
            <div><span className="font-bold text-slate-800">06</span> Maintain records of meetings and decisions.</div>
            <div><span className="font-bold text-slate-800">07</span> Maintain project and event documentation.</div>
            <div><span className="font-bold text-slate-800">08</span> Track deliverables from teams.</div>
            <div><span className="font-bold text-slate-800">09</span> Follow up with team leads.</div>
            <div><span className="font-bold text-slate-800">10</span> Maintain organizational records.</div>
            <div><span className="font-bold text-slate-800">11</span> Help coordinate between different departments.</div>
            <div><span className="font-bold text-slate-800">12</span> Identify operational bottlenecks.</div>
            <div><span className="font-bold text-slate-800">13</span> Suggest improvements to club processes.</div>
            <div><span className="font-bold text-slate-800">14</span> Support preparation of monthly reports.</div>
            <div><span className="font-bold text-slate-800">15</span> Maintain a structured archive of important club documents.</div>
          </div>
          <div className="border border-cyan-500/80 p-3 bg-cyan-50/20 text-slate-900 border-l-4 text-[10px] leading-relaxed">
            <span className="font-bold uppercase text-[9px] block text-cyan-800 mb-0.5">OPERATIONS BOUNDARY</span>
            The Operations Lead owns the day-to-day execution system. The VP remains responsible for executive coordination and departmental alignment, while Operations owns the operational workflow itself.
          </div>
        </div>
      ));
    }

    if (pageNumber === 10) {
      // Module 07: Team Leads & Club Members
      return renderInnerPageWrapper("MODULE 07 // DEPARTMENTS", "Team Leads & Club Members", "07", "PAGE 10", (
        <div className="space-y-4 font-mono text-[10px] text-slate-700">
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5 mb-1">TEAM LEAD RESPONSIBILITIES</h4>
            <div><span className="font-bold">01</span> Assign tasks to team members.</div>
            <div><span className="font-bold">02</span> Monitor task completion.</div>
            <div><span className="font-bold">03</span> Provide weekly updates.</div>
            <div><span className="font-bold">04</span> Report problems to the respective department lead.</div>
            <div><span className="font-bold">05</span> Maintain team discipline.</div>
            <div><span className="font-bold">06</span> Support and mentor team members.</div>
            <div><span className="font-bold">07</span> Track project progress.</div>
            <div><span className="font-bold">08</span> Attend leadership follow-up meetings when required.</div>
            <div><span className="font-bold">09</span> Ensure deadlines are followed.</div>
            <div><span className="font-bold">10</span> Escalate major issues before they become critical.</div>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5 mb-1">WEEKLY REPORTING (Weekly updates content)</h4>
            <div>Every Team Lead should provide a weekly update containing:</div>
            <div><span className="font-bold">01</span> Completed tasks, <span className="font-bold">02</span> Ongoing tasks, <span className="font-bold">03</span> Upcoming tasks, <span className="font-bold">04</span> Problems/blockers, <span className="font-bold">05</span> Member participation, <span className="font-bold">06</span> Project/event progress, <span className="font-bold">07</span> Support required.</div>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5 mb-1">CLUB MEMBER RESPONSIBILITIES</h4>
            <div><span className="font-bold">01</span> Respect all club leaders and members.</div>
            <div><span className="font-bold">02</span> Complete assigned responsibilities on time.</div>
            <div><span className="font-bold">03</span> Attend required meetings, sessions, and events.</div>
            <div><span className="font-bold">04</span> Communicate honestly about problems and delays.</div>
            <div><span className="font-bold">05</span> Follow technical, operational, and communication guidelines.</div>
            <div><span className="font-bold">06</span> Maintain professionalism while representing the club.</div>
            <div><span className="font-bold">07</span> Respect intellectual property and project ownership.</div>
            <div><span className="font-bold">08</span> Do not misuse club resources or permissions.</div>
            <div><span className="font-bold">09</span> Support other teams when collaboration is required.</div>
            <div><span className="font-bold">10</span> Continuously learn and improve.</div>
            <div><span className="font-bold">11</span> Maintain confidentiality of internal club information.</div>
            <div><span className="font-bold">12</span> Report serious issues to the appropriate team lead.</div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 11) {
      // Module 08: Member Selection & Removal
      return renderInnerPageWrapper("MODULE 08 // PIPELINE", "Member Selection & Removal", "08", "PAGE 11", (
        <div className="space-y-4 font-mono text-[10px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Members may be selected based on skills, interest, commitment, interview performance, project requirements, previous contribution, leadership potential, and team requirements.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40">
            <span className="font-bold text-slate-900 text-[10.5px] block border-b pb-0.5 mb-1">RECOMMENDATION RULE</span>
            <p className="text-slate-600 leading-relaxed">A department lead may recommend members for their department. Final authority should depend on the level of appointment and club policy.</p>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5 mb-1">MEMBERSHIP & LEADERSHIP ELIGIBILITY</h4>
            <div><span className="font-bold">01 CLUB MEMBERSHIP</span> Students from any academic department may become members of Coderithum Club.</div>
            <div><span className="font-bold">02 DEPARTMENT LEADS</span> All Department Leads / Team Leads must belong to the Computer Department.</div>
            <div><span className="font-bold">03 PRESIDENT / VP</span> The President and Vice President must already be Coderithum members.</div>
            <div><span className="font-bold">04 INTERNAL PROMOTION</span> President and Vice President positions are filled by promotion from the existing club membership.</div>
            <div><span className="font-bold">05 FACULTY AUTHORITY</span> Final selection and appointment of the President and Vice President is under the Faculty Coordinator / Faculty Lead.</div>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5 mb-1">REMOVAL / REASSIGNMENT CONDITIONS</h4>
            <div><span className="font-bold">01</span> Repeated absence, <span className="font-bold">02</span> Failure to complete responsibilities, <span className="font-bold">03</span> Misconduct, <span className="font-bold">04</span> Disrespectful behavior, <span className="font-bold">05</span> Misuse of club resources, <span className="font-bold">06</span> Repeated violation of club rules, <span className="font-bold">07</span> Unauthorized representation of the club, <span className="font-bold">08</span> Serious performance issues.</div>
            <p className="text-slate-500 italic text-[9px] mt-1">Where appropriate, the member should receive a warning and an opportunity to improve before removal.</p>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 text-[10px]">
            <span className="font-bold text-slate-900 uppercase">SELECTION PRINCIPLE:</span> Membership is inclusive across departments; leadership eligibility is role-specific. Faculty oversight applies to the appointment of the President and Vice President.
          </div>
        </div>
      ));
    }

    if (pageNumber === 12) {
      // Module 09: Zebra Control & Permissions
      return renderInnerPageWrapper("MODULE 09 // SYSTEM ACCESS", "Zebra Certificate Admin", "09", "PAGE 12", (
        <div className="space-y-4 font-mono text-[10px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Zebra is Coderithum's certificate generator project. It is used for creating and managing official certificates issued by the club.</p>
          
          <div className="border border-slate-200/80 p-3 bg-slate-100/40">
            <span className="font-bold text-slate-900 uppercase text-[10.5px] block border-b pb-0.5 mb-1">ZEBRA PROJECT MANDATE</span>
            Zebra provides the certificate-generation system for Coderithum. The system should be operated through controlled administrative access so that official certificate data and club-issued certificates remain under authorized leadership.
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-2">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5">ADMIN PANEL CONTROL RULES</h4>
            <div>
              <span className="font-bold text-emerald-705 block">[FACULTY COORDINATOR]</span> Highest administrative authority for Zebra. Full control over the system and authority to approve major changes, access, and certificate-related decisions.
            </div>
            <div>
              <span className="font-bold text-amber-705 block">[PRESIDENT]</span> Administrative control for Coderithum's certificate operations. May manage certificate-related activities and use the Zebra admin panel within the authority granted by the Faculty Coordinator.
            </div>
            <div>
              <span className="font-bold text-cyan-755 block">[VICE PRESIDENT]</span> Administrative control for certificate operations and leadership-level oversight. May use the Zebra admin panel within the authority granted by the Faculty Coordinator and President.
            </div>
            <div>
              <span className="font-bold text-slate-500 block">[OTHER MEMBERS / LEADS]</span> No default Zebra admin-panel control unless specifically authorized by the Faculty Coordinator, President, or Vice President.
            </div>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40">
            <span className="font-bold text-slate-900">ACCESS PRINCIPLE:</span> Zebra admin access is role-based. Faculty Coordinator, President, and Vice President are the authorized leadership level for Zebra control. Any additional access must be explicitly delegated.
          </div>

          <div className="border border-slate-250 p-3 bg-slate-100/40">
            <span className="font-bold text-slate-900">ADMIN SECURITY:</span> Unauthorized modification of certificates, certificate data, users, permissions, or other Zebra administrative information is prohibited.
          </div>

          <div className="border border-slate-900 p-3.5 bg-slate-950 text-white shadow-[2px_2px_0px_#000] text-[10.5px] flex justify-between">
            <div>
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-[8.5px] block">IDEA & CONCEPT</span>
              Kunal Patil
            </div>
            <div>
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-[8.5px] block">BUILT BY</span>
              Kunal Patil • Maitri Patel • MD Ismile
            </div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 13) {
      // Module 10: Project Approval System
      return renderInnerPageWrapper("MODULE 10 // EVALUATION", "Project Approval System", "10", "PAGE 13", (
        <div className="space-y-4 font-mono text-[10.5px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">A structured pipeline from proposal to final approval.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-2">
            <div>
              <span className="font-bold text-theme">STEP 01 PROPOSAL:</span>
              <p className="text-slate-600 text-[10px] ml-2 leading-relaxed">Project title • Problem statement • Proposed solution • Team members • Technology • Timeline • Expected outcome</p>
            </div>
            <div>
              <span className="font-bold text-theme">STEP 02 TECHNICAL REVIEW:</span>
              <p className="text-slate-600 text-[10px] ml-2 leading-relaxed">Technical feasibility • Technology selection • Team capability • Development plan</p>
            </div>
            <div>
              <span className="font-bold text-theme">STEP 03 OPERATIONAL REVIEW:</span>
              <p className="text-slate-600 text-[10px] ml-2 leading-relaxed">Timeline • Resources • Deliverables • Documentation</p>
            </div>
            <div>
              <span className="font-bold text-theme">STEP 04 FINAL APPROVAL:</span>
              <p className="text-slate-600 text-[10px] ml-2 leading-relaxed">President approves major club projects. Projects involving college representation, external organizations, funding, or institutional commitments may require Faculty Coordinator approval.</p>
            </div>
          </div>
          <div className="border border-slate-900 p-3 bg-slate-950 text-white text-center shadow-[2px_2px_0px_#000]">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-[8.5px] block mb-1">DECISION PIPELINE</span>
            PROPOSAL → TECHNICAL REVIEW → OPERATIONAL REVIEW → PRESIDENTIAL APPROVAL → FACULTY APPROVAL (WHEN REQUIRED)
          </div>
        </div>
      ));
    }

    if (pageNumber === 14) {
      // Module 11: Event Management
      return renderInnerPageWrapper("MODULE 11 // EVENT SETUP", "Event Management", "11", "PAGE 14", (
        <div className="space-y-4 font-mono text-[10px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Every official event uses a defined execution model.</p>
          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5 mb-1">EVERY OFFICIAL EVENT SHOULD HAVE</h4>
            <div><span className="font-bold">01</span> Event Lead</div>
            <div><span className="font-bold">02</span> Technical/Operations Team</div>
            <div><span className="font-bold">03</span> Digital Media & Outreach Team</div>
            <div><span className="font-bold">04</span> Registration/Coordination Team</div>
            <div><span className="font-bold">05</span> Clear timeline</div>
            <div><span className="font-bold">06</span> Defined responsibilities</div>
            <div><span className="font-bold">07</span> Promotion plan</div>
            <div><span className="font-bold">08</span> Execution plan</div>
          </div>

          <div className="border border-slate-200/80 p-3 bg-slate-100/40 space-y-1.5">
            <h4 className="font-black text-slate-900 uppercase text-[10.5px] border-b pb-0.5 mb-1">POST-EVENT REPORT</h4>
            <p className="text-[9px] text-slate-500 italic mb-1">Every event lead should submit a report covering:</p>
            <div><span className="font-bold">01</span> Event summary, <span className="font-bold">02</span> Attendance, <span className="font-bold">03</span> Achievements, <span className="font-bold">04</span> Problems faced, <span className="font-bold">05</span> Feedback, <span className="font-bold">06</span> Photos/videos, <span className="font-bold">07</span> Social media performance, <span className="font-bold">08</span> Financial information (if applicable), <span className="font-bold">09</span> Suggestions for future events.</div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 16) {
      // Module 12: Communication & Conflict Resolution (Left page of Spread 7)
      return renderInnerPageWrapper("MODULE 12 // DIALOGUE", "Conflict Resolution", "12", "PAGE 16", (
        <div className="space-y-4 font-mono text-[10px] text-slate-700">
          <p className="text-slate-500 text-[10px] italic leading-normal">Official club communication should remain professional. Important decisions should be documented. Team leads should communicate deadlines clearly. Members should report delays as early as possible. Personal conflicts should not affect club work.</p>
          <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 space-y-1 text-slate-600">
            <div><span className="font-bold text-slate-800">01</span> No member should publicly misrepresent the club.</div>
            <div><span className="font-bold text-slate-800">02</span> Official announcements should be approved by the appropriate authority.</div>
            <div><span className="font-bold text-slate-800">03</span> Sensitive information must not be shared outside the club without permission.</div>
          </div>

          <div className="border border-rose-500/80 p-3 bg-rose-50/20 text-slate-900 border-l-2 space-y-1.5">
            <h3 className="font-black text-rose-800 uppercase pb-0.5 flex items-center gap-1 text-[10.5px]">
              <ShieldAlert className="size-4 text-rose-600" />
              CONFLICT ESCALATION PATH
            </h3>
            <div className="font-bold text-rose-950 bg-rose-100/50 p-1.5 text-center text-[9px] rounded-none my-1">
              MEMBER → TEAM LEAD → DEPARTMENT LEAD → VICE PRESIDENT / PRESIDENT → FACULTY COORDINATOR
            </div>
            <div className="space-y-1 text-[9px] text-slate-600">
              <div><span className="font-bold">01</span> Listen to both sides.</div>
              <div><span className="font-bold">02</span> Understand the actual issue.</div>
              <div><span className="font-bold">03</span> Avoid personal attacks.</div>
              <div><span className="font-bold">04</span> Focus on facts and responsibilities.</div>
              <div><span className="font-bold">05</span> Attempt internal resolution first.</div>
              <div><span className="font-bold">06</span> Document serious conflicts.</div>
              <div><span className="font-bold">07</span> Escalate unresolved or serious matters.</div>
              <div><span className="font-bold">08</span> Final institutional matters may be decided by the Faculty Coordinator.</div>
              <div><span className="font-bold">09</span> No leader should use their position to unfairly target another member.</div>
            </div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 15) {
      // Module 13: Leadership Meetings & Decision-Making (Right page of Spread 6)
      return renderInnerPageWrapper("MODULE 13 // DECISIONS", "Meetings & Decisions", "13", "PAGE 15", (
        <div className="space-y-4 font-mono text-[10px] text-slate-700">
          <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 text-[9px] space-y-1">
            <div><span className="font-bold text-slate-900">WEEKLY:</span> Team Leads provide updates to Department Leads.</div>
            <div><span className="font-bold text-slate-900">MONTHLY:</span> President, Vice President, and Department Leads conduct a leadership review.</div>
          </div>

          <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 text-[9px] space-y-1">
            <span className="font-bold text-slate-900 block border-b pb-0.5 mb-1 text-[9.5px]">MONTHLY REVIEW SHOULD COVER</span>
            <div><span className="font-bold">01</span> Project progress, <span className="font-bold">02</span> Event progress, <span className="font-bold">03</span> Member activity, <span className="font-bold">04</span> Technical development, <span className="font-bold">05</span> Digital Media & Outreach Team performance, <span className="font-bold">06</span> Operational issues, <span className="font-bold">07</span> Upcoming events, <span className="font-bold">08</span> Problems, <span className="font-bold">09</span> Improvements.</div>
          </div>

          <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 text-[9px] space-y-1">
            <span className="font-bold text-slate-900 block border-b pb-0.5 mb-1 text-[9.5px]">MONTHLY CLUB REPORT</span>
            <div><span className="font-bold">01</span> Major activities, <span className="font-bold">02</span> Projects, <span className="font-bold">03</span> Events, <span className="font-bold">04</span> Member participation, <span className="font-bold">05</span> Achievements, <span className="font-bold">06</span> Digital Media & Outreach Team performance, <span className="font-bold">07</span> Technical progress, <span className="font-bold">08</span> Problems, <span className="font-bold">09</span> Solutions, <span className="font-bold">10</span> Next month's goals.</div>
          </div>

          <div className="border border-slate-900 p-3 bg-slate-950 text-white shadow-[2px_2px_0px_#000] text-[9px] space-y-2">
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-[8px] block border-b border-slate-800 pb-0.5">DECISION-MAKING MATRIX</span>
            <div>
              <span className="font-bold text-cyan-400">[DEPARTMENT-LEVEL]</span> Department Leads can independently make decisions related to their department.
            </div>
            <div>
              <span className="font-bold text-amber-400">[CROSS-DEPARTMENT]</span> Require coordination between the relevant department leads.
            </div>
            <div>
              <span className="font-bold text-blue-400">[CLUB-LEVEL]</span> Major decisions should involve the President and Vice President.
            </div>
            <div>
              <span className="font-bold text-emerald-400">[INSTITUTIONAL / HIGH-IMPACT]</span> Decisions involving college authorities, major external partnerships, financial commitments, or significant reputation risks should involve the Faculty Coordinator.
            </div>
          </div>
        </div>
      ));
    }

    if (pageNumber === 17) {
      // Module 14: Code of Conduct & Leadership Accountability (Right page of Spread 7)
      return renderInnerPageWrapper("MODULE 14 // ETHICS", "Conduct & Accountability", "14", "PAGE 17", (
        <div className="space-y-4 font-mono text-[9.5px] text-slate-700">
          <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 text-[9px] space-y-1">
            <h4 className="font-black text-slate-900 uppercase text-[9.5px] border-b pb-0.5 mb-1">MEMBER CODE OF CONDUCT</h4>
            <div>Every member and leader must:</div>
            <div><span className="font-bold">01</span> Treat others respectfully.</div>
            <div><span className="font-bold">02</span> Avoid discrimination, harassment, bullying, or intimidation.</div>
            <div><span className="font-bold">03</span> Maintain professional behavior.</div>
            <div><span className="font-bold">04</span> Respect different opinions.</div>
            <div><span className="font-bold">05</span> Avoid misuse of authority.</div>
            <div><span className="font-bold">06</span> Protect club property and resources.</div>
            <div><span className="font-bold">07</span> Give proper credit for contributions.</div>
            <div><span className="font-bold">08</span> Avoid plagiarism.</div>
            <div><span className="font-bold">09</span> Respect project ownership.</div>
            <div><span className="font-bold">10</span> Represent Coderithum Club responsibly.</div>
          </div>

          <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 text-[9px] space-y-1">
            <h4 className="font-black text-slate-900 uppercase text-[9.5px] border-b pb-0.5 mb-1">LEADERSHIP ACCOUNTABILITY</h4>
            <div><span className="font-bold">01</span> Be accountable for assigned responsibilities, <span className="font-bold">02</span> Communicate clearly, <span className="font-bold">03</span> Meet deadlines, <span className="font-bold">04</span> Support their team, <span className="font-bold">05</span> Accept constructive feedback, <span className="font-bold">06</span> Report problems honestly, <span className="font-bold">07</span> Avoid abusing authority, <span className="font-bold">08</span> Work for the growth of the club rather than personal benefit.</div>
          </div>

          <div className="border border-rose-500/80 p-3 bg-rose-50/20 text-slate-900 border-l-2 space-y-1.5">
            <h3 className="font-black text-rose-800 uppercase pb-0.5 flex items-center gap-1 text-[9.5px]">
              <ShieldAlert className="size-3.5 text-rose-600" />
              FAILURE TO PERFORM LEADERSHIP RESPONSIBILITIES
            </h3>
            <div className="font-bold text-rose-950 bg-rose-100/50 p-1 text-center text-[9px] rounded-none my-0.5">
              WARNING → REVIEW → ROLE REASSIGNMENT → REMOVAL FROM LEADERSHIP POSITION
            </div>
            <p className="text-slate-600 text-[8.5px] leading-relaxed">The final decision will depend on the seriousness of the issue and the authority responsible for the position.</p>
          </div>
        </div>
      ));
    }

    if (pageNumber === 18) {
      // Module 15: Core Principles & Governance (Left page of Back spread)
      return (
        <div 
          className="w-full h-full bg-[#fdfaf2] text-slate-900 p-9 flex flex-col justify-between select-none border-r border-slate-350 pr-9 relative"
          style={{
            backgroundImage: "linear-gradient(rgba(37,99,235,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.02) 1px, transparent 1px)",
            backgroundSize: "18px 18px"
          }}
        >
          <div className={`absolute inset-0 pointer-events-none ${bgCreaseClass}`} />

          <div className="flex justify-between font-mono text-[10px] text-slate-400 border-b border-slate-200/80 pb-1.5 relative z-10">
            <span className="font-bold text-slate-500">MODULE 15 // GOVERNANCE CORE</span>
            <span>PAGE 18</span>
          </div>

          <div className="my-auto space-y-3 relative z-10 flex-1 overflow-y-auto max-h-[380px] pr-2 pt-2.5 scrollbar-thin scrollbar-thumb-slate-300 font-mono text-[9.5px] text-slate-700">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-theme uppercase tracking-widest bg-blue-50/80 border border-blue-200 px-1.5 py-0.5">
                MODULE 15
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase font-mono mt-1">
                Core Principles & Governance
              </h2>
            </div>

            <div className="border border-slate-200/80 p-2.5 bg-slate-100/40">
              <h4 className="font-black text-slate-900 uppercase border-b pb-0.5 mb-1 text-[10px]">CORE PRINCIPLE OF CODERITHUM CLUB</h4>
              <p className="text-theme font-black text-[11px] mb-0.5">Authority comes with responsibility.</p>
              <p className="text-slate-600 leading-normal">Every position in Coderithum Club exists to help members learn, build, innovate, collaborate, and grow. No position should be used for personal power or favoritism.</p>
            </div>

            <div className="border border-slate-900 p-2.5 bg-slate-950 text-white text-center shadow-[2px_2px_0px_#000]">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-[8.5px] block">THE LEADERSHIP OBJECTIVE</span>
              <div className="font-bold mt-0.5">BUILD PEOPLE → BUILD PROJECTS → BUILD COMMUNITY → BUILD CODERITHUM</div>
            </div>

            <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 space-y-1">
              <h4 className="font-black text-slate-900 uppercase border-b pb-0.5 mb-1 text-[10px]">RULE MODIFICATION PROTOCOLS</h4>
              <div><span className="font-bold">01.</span> Discussed by the leadership team.</div>
              <div><span className="font-bold">02.</span> Reviewed by the President and Vice President.</div>
              <div><span className="font-bold">03.</span> Reviewed by the Faculty Coordinator when required.</div>
              <div><span className="font-bold">04.</span> Documented with the new version number.</div>
              <div><span className="font-bold">05.</span> Communicated to all relevant members.</div>
              <p className="text-slate-500 italic text-[8px] mt-0.5">The latest approved version will be considered the official Rule Book.</p>
            </div>

            <div className="border border-slate-200/80 p-2.5 bg-slate-100/40 space-y-1.5">
              <h4 className="font-black text-slate-900 uppercase border-b pb-0.5 mb-1 text-[10px]">FINAL GOVERNANCE STATEMENT</h4>
              <p className="text-slate-500 italic mb-1">Coderithum Club operates on the principles of: LEARNING • INNOVATION • LEADERSHIP • COLLABORATION • ACCOUNTABILITY • PROFESSIONALISM.</p>
              <p className="text-slate-600 leading-normal">Every leader and member is expected to contribute toward creating a technically strong, professionally managed, and inclusive student community. This Rule Book defines responsibilities and authority, but teamwork remains the foundation of the club.</p>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 text-center border-t border-slate-200/50 pt-1.5 relative z-10 mt-2">
            CODERITHUM TECHNICAL MANUAL v1.0
          </div>
        </div>
      );
    }

    if (pageNumber === 19) {
      return (
        <div 
          className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-8 flex flex-col justify-between select-none relative border-l border-slate-950"
          style={{ boxShadow: "inset -10px 0 20px rgba(0,0,0,0.8)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:18px_18px] opacity-10 pointer-events-none" />
          <div className="flex justify-between font-mono text-[9px] text-cyan-400 border-b border-slate-850 pb-2 relative z-10">
            <span>GOVERNANCE STATUS</span>
            <span className="text-slate-500">RULEBOOK.v1 // 19</span>
          </div>

          <div className="my-auto text-center space-y-4 relative z-10">
            <div className="flex justify-center">
              <ShieldCheck className="size-14 text-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white font-mono uppercase tracking-wide">SYSTEM OK</h3>
              <div className="px-2 py-0.5 bg-emerald-950 border border-emerald-500 text-emerald-400 font-mono text-[9px] inline-block uppercase tracking-wider font-bold">
                OFFICIAL GOVERNANCE FILE
              </div>
            </div>
            <p className="text-[9px] text-slate-400 font-mono leading-relaxed max-w-xs mx-auto">
              Every lead and member is responsible for maintaining the technical standards and operational integrity established herein.
            </p>
          </div>

          <div className="text-[9px] font-mono text-slate-500 text-center relative z-10">
            CODERITHUM © 2026 // ALL RIGHTS RESERVED
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-6 flex items-center justify-center border-l border-slate-900 relative">
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs pointer-events-none" />
        <div className="relative z-10 text-center font-mono opacity-20 my-auto">
          <BookOpen className="size-10 mx-auto text-slate-600 mb-2" />
          <span className="text-[9px] uppercase tracking-widest text-slate-500">CODERITHUM</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      key="rulebook-interactive-3d"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 max-w-7xl mx-auto flex flex-col items-center"
    >
      {/* Page Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-3 gap-3">
        <div className="space-y-0.5">
          <InteractiveHeading text="Technical Grimoire" as="h2" className="text-[10px] font-mono tracking-widest text-theme uppercase" />
          <InteractiveHeading text="Technical Rule Book" as="h1" className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight" />
          <p className="text-xs text-slate-500 font-medium">Click the navigation controls or tab headers to flip the handbook pages.</p>
        </div>
      </div>

      {/* Main 3D Book Layout Container */}
      <div className="w-full flex flex-col items-center gap-6 py-4">
        
        {/* Desktop 3D Book Screen Wrapper with table texture and book outline depth */}
        <div 
          className="hidden md:flex relative w-[1140px] h-[580px] bg-slate-950 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-900 items-center justify-center select-none overflow-hidden"
          style={{ 
            perspective: "2000px",
            backgroundImage: "linear-gradient(rgba(30,41,59,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
        >
          {/* Radial table desk shadow */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/80 pointer-events-none" />

          {/* 3D Binder Leather Hardcover casing */}
          <div className="absolute w-[1096px] h-[528px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-950 rounded-lg shadow-2xl z-0" />
          <div className="absolute left-[38px] top-[28px] bottom-[28px] right-[38px] bg-slate-950/50 shadow-inner z-0 border border-slate-900/60 rounded-md" />

          {/* Static Book Background Page Thickness Depth Layers */}
          {/* Left stack layers */}
          <div className="absolute left-[44px] top-[30px] bottom-[30px] w-[504px] bg-[#f2ede0] border-l border-slate-350 shadow-[-1px_0_1px_rgba(0,0,0,0.1),-3px_0_2px_rgba(0,0,0,0.1)] z-5" />
          <div className="absolute left-[45px] top-[31px] bottom-[31px] w-[503px] bg-[#ede8d9] border-l border-slate-400 shadow-[-2px_0_1px_rgba(0,0,0,0.15),-5px_0_3px_rgba(0,0,0,0.1)] z-4" />
          <div className="absolute left-[46px] top-[32px] bottom-[32px] w-[502px] bg-[#e5dfce] border-l border-slate-450 shadow-[-3px_0_2px_rgba(0,0,0,0.2),-7px_0_4px_rgba(0,0,0,0.1)] z-3" />

          {/* Right stack layers */}
          <div className="absolute right-[44px] top-[30px] bottom-[30px] w-[504px] bg-[#f2ede0] border-r border-slate-350 shadow-[1px_0_1px_rgba(0,0,0,0.1),3px_0_2px_rgba(0,0,0,0.1)] z-5" />
          <div className="absolute right-[45px] top-[31px] bottom-[31px] w-[503px] bg-[#ede8d9] border-r border-slate-400 shadow-[2px_0_1px_rgba(0,0,0,0.15),5px_0_3px_rgba(0,0,0,0.1)] z-4" />
          <div className="absolute right-[46px] top-[32px] bottom-[32px] w-[502px] bg-[#e5dfce] border-r border-slate-450 shadow-[3px_0_2px_rgba(0,0,0,0.2),7px_0_4px_rgba(0,0,0,0.1)] z-3" />

          {/* Actual Active Pages Spread */}
          <div className="relative w-[1052px] h-[504px] bg-white flex shadow-2xl overflow-hidden border border-slate-900 z-10 rounded-sm">
            
            {/* 1. Static Left Page */}
            <div className="w-1/2 h-full overflow-hidden">
              {renderPageContent(leftPageNum)}
            </div>

            {/* 2. Static Right Page */}
            <div className="w-1/2 h-full overflow-hidden">
              {renderPageContent(rightPageNum)}
            </div>

            {/* 3. Center Spine Seam / Binding Shadow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[14px] -translate-x-1/2 bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 pointer-events-none z-30 shadow-inner" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-slate-950 pointer-events-none z-30" />

            {/* 3D Wire Spiral Binding Rings */}
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={`spine-ring-${i}`}
                className="absolute left-1/2 w-[18px] h-[6px] rounded-full border border-slate-700 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-600 -translate-x-1/2 z-45 pointer-events-none"
                style={{ top: `${6 + i * 6.8}%` }}
              />
            ))}

            {/* 4. Flipping 3D Page Sheet */}
            <AnimatePresence>
              {isFlipping && (
                <motion.div
                  initial={{ rotateY: flipDirection === "next" ? 0 : -180 }}
                  animate={{ 
                    rotateY: flipDirection === "next" ? -180 : 0,
                    z: [0, 50, 0], // Lift page closer to camera during turn
                    scale: [1, 1.015, 1] // Subtle lift scaling
                  }}
                  transition={{ duration: 0.58, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 h-full origin-left z-25 overflow-hidden"
                  style={{
                    left: "50%",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                  }}
                >
                  {/* Front Side of turning sheet (shows outgoing side) */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {renderPageContent(flipDirection === "next" ? currentPage + 1 : currentPage)}
                    {/* Shadow sweep overlay for shading curl */}
                    <motion.div 
                      className="absolute inset-0 bg-black pointer-events-none z-40"
                      animate={{ opacity: [0, 0.35, 0] }}
                      transition={{ duration: 0.58, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Back Side of turning sheet (shows incoming side) */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    {renderPageContent(flipDirection === "next" ? currentPage + 2 : currentPage - 1)}
                    {/* Shadow sweep overlay for shading curl */}
                    <motion.div 
                      className="absolute inset-0 bg-black pointer-events-none z-40"
                      animate={{ opacity: [0, 0.35, 0] }}
                      transition={{ duration: 0.58, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile View: Stacks left and right content vertically with standard slide layout */}
        <div className="md:hidden w-full max-w-sm border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_#000] font-mono text-xs text-slate-700 space-y-4">
          <div className="flex justify-between font-mono text-[8px] text-slate-400 border-b pb-1">
            <span>MOBILE HANDBOOK view</span>
            <span>SPREAD {currentPage / 2 + 1} / 10</span>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-100 p-2 min-h-[300px]">
              {renderPageContent(currentPage === 0 ? 1 : currentPage)}
            </div>
            {currentPage !== 0 && currentPage !== 18 && (
              <div className="border-t border-dashed border-slate-200 pt-4">
                <div className="border border-slate-100 p-2 min-h-[300px]">
                  {renderPageContent(currentPage + 1)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Handheld Book Controls bar */}
        <div className="flex items-center gap-4 font-mono text-xs select-none">
          <button
            onClick={handlePrevSpread}
            disabled={isFlipping || currentPage <= 0}
            className="p-2 border-2 border-slate-900 bg-slate-950 text-cyan-400 font-bold uppercase tracking-wider shadow-md hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center gap-1"
          >
            <ChevronLeft className="size-4 animate-pulse" />
            [ PREV ]
          </button>

          <span className="font-extrabold text-slate-800 bg-slate-100 px-3 py-1 border border-slate-200 shadow-sm">
            {currentPage === 0 ? "COVER" : currentPage === 18 ? "BACK COVER" : `SPREAD ${currentPage / 2} / 8`}
          </span>

          <button
            onClick={handleNextSpread}
            disabled={isFlipping || currentPage >= totalPages - 2}
            className="p-2 border-2 border-slate-900 bg-slate-950 text-cyan-400 font-bold uppercase tracking-wider shadow-md hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center gap-1"
          >
            [ NEXT ]
            <ChevronRight className="size-4 animate-pulse" />
          </button>
        </div>

        {/* Quick Jump Index Tabs */}
        <div className="w-full flex flex-wrap justify-center gap-2 max-w-2xl font-mono text-[9px]">
          <button
            onClick={() => handleGoToPage(0)}
            className={`px-2 py-1 border ${currentPage === 0 ? "bg-slate-950 text-white font-bold border-slate-950" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            COVER
          </button>
          <button
            onClick={() => handleGoToPage(2)}
            className={`px-2 py-1 border ${currentPage === 2 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M00
          </button>
          <button
            onClick={() => handleGoToPage(3)}
            className={`px-2 py-1 border ${currentPage === 3 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M01-M02
          </button>
          <button
            onClick={() => handleGoToPage(5)}
            className={`px-2 py-1 border ${currentPage === 5 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M03-M03B
          </button>
          <button
            onClick={() => handleGoToPage(7)}
            className={`px-2 py-1 border ${currentPage === 7 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M04-M05
          </button>
          <button
            onClick={() => handleGoToPage(9)}
            className={`px-2 py-1 border ${currentPage === 9 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M06-M07
          </button>
          <button
            onClick={() => handleGoToPage(11)}
            className={`px-2 py-1 border ${currentPage === 11 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M08-M09
          </button>
          <button
            onClick={() => handleGoToPage(13)}
            className={`px-2 py-1 border ${currentPage === 13 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M10-M11
          </button>
          <button
            onClick={() => handleGoToPage(15)}
            className={`px-2 py-1 border ${currentPage === 15 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M12-M13
          </button>
          <button
            onClick={() => handleGoToPage(17)}
            className={`px-2 py-1 border ${currentPage === 17 ? "bg-theme text-white font-bold border-theme" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            M14-M15
          </button>
          <button
            onClick={() => handleGoToPage(18)}
            className={`px-2 py-1 border ${currentPage === 18 ? "bg-slate-950 text-white font-bold border-slate-950" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"}`}
          >
            BACK COVER
          </button>
        </div>
      </div>
    </motion.div>
  );
}
