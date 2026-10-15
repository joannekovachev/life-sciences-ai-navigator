/* Agentic team architectures for life sciences lines of business. Illustrative designs, not product commitments. */
(function () {
  var GOV = ['Agent catalog and ownership', 'Approval workflows', 'Lifecycle and change management', 'Audit logging and electronic records', 'Access and privilege management', 'Prompt and content governance', 'Validation and intended-use documentation', 'Usage and quality analytics'];
  var STEPS = ['Understand request', 'Classify and prioritize', 'Route to best agent', 'Orchestrate actions', 'Check policy and quality controls', 'Synthesize and hand off'];
  var PRINCIPLES = ['Secure by design', 'Governed by policy', 'Human accountable', 'Auditable', 'Delivered at scale'];
  var team = function (o) {
    return {
      title: o.name + ' Multi-Agent Team',
      subtitle: o.subtitle,
      assist: { name: o.name, line: o.line, ask: o.ask, intake: o.intake, steps: STEPS },
      agents: o.agents,
      governance: GOV,
      systems: o.systems,
      humans: o.humans,
      outcomes: o.outcomes,
      principles: PRINCIPLES
    };
  };
  var M365 = 'Microsoft 365 (Outlook, Teams, SharePoint)';
  window.HAIN_TEAMS = {
    clindev: team({
      name: 'Clinical Operations Assist',
      subtitle: 'AI-assisted coordination across feasibility, study start-up, enrollment, monitoring, and trial master file work.',
      line: 'Your front door to clinical trial operations support',
      ask: 'Which sites are at risk of missing activation, what is missing from the TMF, or which deviations need triage?',
      intake: ['Capture the study, country, site, and request type', 'Check whether an open issue or task already exists', 'Apply SOPs, protocol requirements, and ICH-GCP expectations', 'Search the TMF plan, protocol, and study-specific guidance', 'Summarize the case before handing it to a person'],
      agents: [
        ['Site Feasibility Agent', ['Site and country history', 'Enrollment benchmarks', 'Capability questionnaire summaries', 'Ranked site shortlist for review']],
        ['Study Start-Up Agent', ['Contract and budget status', 'Ethics and regulatory approval tracking', 'Essential document collection', 'Activation delay alerts']],
        ['Trial Master File Agent', ['Completeness against TMF plan', 'Misfiled and late documents', 'Inspection-ready reports', 'Follow-up task creation']],
        ['Enrollment and Risk Signal Agent', ['Enrollment versus plan', 'Screen-failure and dropout patterns', 'Risk-based monitoring signals', 'Escalation summaries']],
        ['Protocol Deviation Triage Agent', ['Intake from monitoring reports', 'Categorization suggestions', 'Trend summaries by site', 'Handoff to study team']]
      ],
      systems: [M365, 'Clinical trial management system (CTMS)', 'Electronic trial master file (eTMF)', 'Electronic data capture (EDC)', 'Site portals and contract systems', 'Dynamics 365 and Dataverse', 'Power BI'],
      humans: ['Clinical Operations Lead', 'Study Manager', 'Clinical Research Associate', 'Study Start-Up Specialist', 'Medical Monitor', 'Quality Assurance'],
      outcomes: ['Faster study start-up', 'Cleaner inspection-ready files', 'Earlier enrollment risk visibility', 'Less manual tracking', 'Stronger ICH-GCP compliance']
    }),
    reg: team({
      name: 'Regulatory Assist',
      subtitle: 'AI-assisted dossier readiness, health authority interactions, labeling change management, and commitment tracking.',
      line: 'Your front door to regulatory affairs support',
      ask: 'Is the module consistent, which markets does this label change touch, and what commitments are due?',
      intake: ['Capture product, region, submission type, and deadline', 'Check for related open submissions and commitments', 'Apply regulatory procedures and country requirements', 'Search prior correspondence and approved dossier content', 'Prepare a case summary for the regulatory owner'],
      agents: [
        ['Submission Readiness Agent', ['Content completeness by module', 'Cross-module consistency checks', 'Source and reference verification', 'Publishing checklist support']],
        ['Health Authority Question Agent', ['Question intake and categorization', 'Relevant dossier and data retrieval', 'Response outline drafting', 'Deadline tracking']],
        ['Labeling Impact Agent', ['Change comparison across labels', 'Affected markets and documents', 'Artwork and filing task list', 'Implementation timeline view']],
        ['Commitments Tracker Agent', ['Post-approval commitments', 'Owner reminders', 'Evidence links', 'Status roll-ups']],
        ['Regulatory Intelligence Agent', ['Guidance change summaries', 'Impact flags for products', 'Cited source links', 'Distribution to owners']]
      ],
      systems: [M365, 'Regulatory information management (RIM)', 'Document management and publishing tools', 'Quality management system', 'Dynamics 365 and Dataverse', 'Power BI'],
      humans: ['Regulatory Affairs Lead', 'Regulatory Strategist', 'Labeling Specialist', 'Medical Writer', 'Safety Physician', 'Quality Assurance'],
      outcomes: ['Faster response cycles', 'Fewer submission rework loops', 'Clearer commitment visibility', 'Consistent content across modules', 'Stronger compliance']
    }),
    pv: team({
      name: 'Safety Case Assist',
      subtitle: 'AI-assisted adverse event intake, literature screening, signal evidence, and aggregate reporting, with trained safety staff accountable for every decision.',
      line: 'Your front door to pharmacovigilance operations support',
      ask: 'Triage this inbound report, screen this week\u2019s literature, or compile data for the periodic report.',
      intake: ['Capture source, product, and report type', 'Check for duplicates and follow-ups', 'Apply reporting rules and company procedures', 'Search safety reference information', 'Summarize the case for a safety professional'],
      agents: [
        ['Case Intake and Triage Agent', ['Extraction of case elements', 'Seriousness and expectedness flags for review', 'Duplicate detection suggestions', 'Routing to case processors']],
        ['Literature Screening Agent', ['Search results screening', 'Potential case identification', 'Summaries with citations', 'Audit trail for decisions']],
        ['Signal Evidence Agent', ['Case series assembly', 'Disproportionality outputs for review', 'Clinical data context', 'Evidence summary drafts']],
        ['Aggregate Report Agent', ['Listings and tables compilation', 'Exposure data alignment', 'Draft descriptive sections', 'Consistency checks']],
        ['Quality Check Agent', ['Narrative and coding consistency', 'Missing field alerts', 'Timeline tracking for reporting clocks', 'Escalation to reviewers']]
      ],
      systems: [M365, 'Safety database and case management', 'Literature and reference sources', 'Clinical data systems', 'Quality management system', 'Dynamics 365 and Dataverse', 'Power BI'],
      humans: ['Safety Physician', 'Safety Scientist', 'Case Processor', 'Aggregate Report Author', 'Quality Assurance', 'Regulatory Affairs'],
      outcomes: ['Faster case handling', 'More consistent quality', 'On-time reporting', 'Less manual transcription', 'Stronger inspection readiness']
    }),
    medaff: team({
      name: 'Medical Affairs Assist',
      subtitle: 'AI-assisted medical information responses, field insight handling, publication planning, and congress intelligence, from approved content only.',
      line: 'Your front door to medical affairs support',
      ask: 'Draft a reply to this unsolicited request, categorize these field insights, or update the publication plan.',
      intake: ['Capture request type, product, and requester', 'Check for an existing standard response', 'Apply medical review and off-label request procedures', 'Search approved references and prior responses', 'Prepare a draft and case summary for a medical reviewer'],
      agents: [
        ['Medical Information Response Agent', ['Request classification', 'Standard response matching', 'Draft replies with references', 'Reviewer routing']],
        ['Field Insight Agent', ['Insight categorization', 'Theme trends by region', 'Evidence gap flags', 'Leadership summaries']],
        ['Publication Plan Agent', ['Manuscript and abstract status', 'Approval tracking', 'Deadline risk alerts', 'Author reminders']],
        ['Congress Intelligence Agent', ['Session summaries', 'Competitor evidence tracking', 'Cited insight reports', 'Team distribution']]
      ],
      systems: [M365, 'CRM (Dynamics 365)', 'Medical information platform', 'Approved content repository', 'Publication tracking tools', 'Dataverse', 'Power BI'],
      humans: ['Medical Director', 'Medical Science Liaison', 'Medical Information Specialist', 'Publications Manager', 'Compliance Reviewer'],
      outcomes: ['Faster response times', 'Consistent approved answers', 'Better insight use', 'Less administrative work', 'Stronger compliance']
    }),
    mfg: team({
      name: 'Quality Operations Assist',
      subtitle: 'AI-assisted deviation investigation, CAPA tracking, batch record review, change control, and inspection readiness for GxP operations.',
      line: 'Your front door to quality operations support',
      ask: 'Summarize this deviation, find overdue CAPAs, or prepare for an inspection of this area.',
      intake: ['Capture site, product, area, and event type', 'Check for related deviations and open actions', 'Apply SOPs and quality system rules', 'Search batch, equipment, and training records', 'Summarize the case for the quality unit'],
      agents: [
        ['Deviation Support Agent', ['Intake classification suggestions', 'Related event search', 'Investigation summary drafts', 'Timeline and due-date tracking']],
        ['CAPA Tracking Agent', ['Action ownership and due dates', 'Overdue escalation', 'Effectiveness check reminders', 'Trend reports']],
        ['Batch Record Review Agent', ['Pre-checks for completeness', 'Out-of-range and missing entries', 'Exception lists for QA', 'Release readiness views']],
        ['Change Control Agent', ['Impact assessment prompts', 'Affected document and training lists', 'Approval routing', 'Closure tracking']],
        ['Inspection Readiness Agent', ['Document and record indexes', 'Prior observation tracking', 'Mock question practice material', 'Back-room request log']]
      ],
      systems: [M365, 'Quality management system (QMS)', 'Manufacturing execution system (MES)', 'Laboratory information management system (LIMS)', 'ERP', 'Learning management system', 'Dynamics 365 and Dataverse', 'Power BI'],
      humans: ['Quality Unit Head', 'Quality Assurance Specialist', 'Manufacturing Lead', 'Laboratory Lead', 'Regulatory Affairs', 'Site Leadership'],
      outcomes: ['Shorter investigation cycles', 'Fewer overdue actions', 'Faster batch review', 'Inspection-ready records', 'Stronger GxP compliance']
    }),
    access: team({
      name: 'Patient Services Assist',
      subtitle: 'AI-assisted hub operations for benefit verification, prior authorization tracking, and program support, within consent and privacy rules.',
      line: 'Your front door to patient support program operations',
      ask: 'Check enrollment status, track this prior authorization, or answer this program question.',
      intake: ['Verify consent and program eligibility', 'Check for an open case for this patient', 'Apply program rules and privacy requirements', 'Search approved program materials', 'Summarize the case for a hub specialist'],
      agents: [
        ['Enrollment Support Agent', ['Form completeness checks', 'Missing information requests', 'Status updates', 'Consent verification']],
        ['Benefit Verification Agent', ['Coverage information gathering', 'Plan criteria summaries', 'Case notes drafts', 'Exceptions for specialists']],
        ['Prior Authorization Tracking Agent', ['Submission and decision tracking', 'Deadline reminders', 'Appeal packet support', 'Status summaries']],
        ['Program Assistant Agent', ['Approved answers to common questions', 'Co-pay program guidance', 'Warm handoff with context', 'Safety event flagging to pharmacovigilance']]
      ],
      systems: [M365, 'Dynamics 365 Customer Service and Contact Center', 'Hub case management', 'Pharmacy and benefit verification partners', 'Dataverse', 'Power BI'],
      humans: ['Hub Specialist', 'Nurse Educator', 'Program Manager', 'Privacy Officer', 'Pharmacovigilance Contact'],
      outcomes: ['Faster time to therapy', 'Fewer abandoned enrollments', 'Better patient experience', 'Consistent answers', 'Adverse events routed on time']
    }),
    growth: team({
      name: 'Commercial Assist',
      subtitle: 'AI-assisted account planning, pre-call preparation, follow-up, and promotional content pre-checks, using approved content and consented data.',
      line: 'Your front door to commercial team support',
      ask: 'Prepare me for tomorrow\u2019s calls, pre-check this draft, or update my account plan.',
      intake: ['Capture the account, product, and request type', 'Check recent interactions and open follow-ups', 'Apply promotional and consent policies', 'Search approved content and account data', 'Prepare the brief or draft for the representative'],
      agents: [
        ['Pre-Call Planning Agent', ['Account and customer history', 'Open items and commitments', 'Approved message suggestions', 'Call objective drafts']],
        ['Follow-Up Agent', ['Interaction summaries', 'Task and sample request creation', 'Approved email drafts', 'Reminders']],
        ['Content Pre-Check Agent', ['Claims matched to approved references', 'Missing disclosures', 'Flags for MLR review', 'Submission packet assembly']],
        ['Territory Insight Agent', ['Account trend signals', 'Priority account suggestions', 'Manager summaries', 'Performance narratives']]
      ],
      systems: [M365, 'CRM (Dynamics 365 Sales)', 'Approved content management and MLR system', 'Licensed market data sources', 'Customer Insights', 'Dataverse', 'Power BI'],
      humans: ['Sales Representative', 'District Manager', 'Marketing Lead', 'Medical Legal Regulatory Reviewer', 'Commercial Compliance'],
      outcomes: ['More time with customers', 'Better prepared calls', 'Faster content review', 'Consistent follow-up', 'Stronger promotional compliance']
    }),
    postmkt: team({
      name: 'Post-Market Quality Assist',
      subtitle: 'AI-assisted complaint intake, reportability screening, trend monitoring, and field action tracking, with trained staff making every reportability decision.',
      line: 'Your front door to post-market surveillance support',
      ask: 'Triage this complaint, check for trends on this product, or update the field action status.',
      intake: ['Capture product, lot, event description, and source', 'Check for related complaints and open actions', 'Apply complaint handling procedures and reportability criteria', 'Search device history and service records', 'Summarize the case for a complaint specialist'],
      agents: [
        ['Complaint Intake Agent', ['Detail extraction from emails and calls', 'Product and lot matching', 'Missing information requests', 'Routing to specialists']],
        ['Reportability Screening Agent', ['Criteria checklist for review', 'Clock tracking for reporting deadlines', 'Related event search', 'Escalation to regulatory']],
        ['Trend and Signal Agent', ['Complaint rate by product and failure mode', 'Statistical change flags', 'Cross-source correlation with service data', 'Management summaries']],
        ['Field Action Agent', ['Affected product and customer lists', 'Notification tracking', 'Effectiveness check status', 'Regulatory update tasks']]
      ],
      systems: [M365, 'Quality management system (complaints and CAPA)', 'Dynamics 365 Customer Service and Field Service', 'ERP and distribution records', 'Device telemetry platforms', 'Dataverse', 'Power BI'],
      humans: ['Complaint Specialist', 'Post-Market Surveillance Lead', 'Design Engineer', 'Regulatory Affairs', 'Medical Safety Officer', 'Quality Assurance'],
      outcomes: ['Faster complaint handling', 'On-time regulatory reporting', 'Earlier signal visibility', 'Consistent investigations', 'Stronger compliance']
    }),
    fieldsvc: team({
      name: 'Field Service Assist',
      subtitle: 'AI-assisted dispatch, parts, and installed base health for medical device service, with complaint-relevant events routed to quality.',
      line: 'Your front door to field service operations support',
      ask: 'Schedule this repair, check parts for tomorrow\u2019s visits, or review assets at risk.',
      intake: ['Capture asset, site, issue, and priority', 'Check service contract and history', 'Apply service and escalation policy', 'Search manuals and known issues', 'Summarize the request for a technician or planner'],
      agents: [
        ['Dispatch Agent', ['Technician skill and location matching', 'Schedule optimization', 'Customer notifications', 'Exception handling']],
        ['Parts Availability Agent', ['Stock checks', 'Reservation suggestions', 'Replenishment requests', 'Delay alerts']],
        ['Installed Base Health Agent', ['Telemetry and history review', 'Preventive maintenance suggestions', 'At-risk asset lists', 'Contract renewal inputs']],
        ['Complaint Escalation Agent', ['Detects potential complaint language', 'Creates a complaint case for review', 'Links the service record', 'Notifies quality']]
      ],
      systems: [M365, 'Dynamics 365 Field Service', 'Device telemetry platforms', 'ERP and inventory', 'Quality management system', 'Dataverse', 'Power BI'],
      humans: ['Service Manager', 'Field Service Engineer', 'Dispatcher', 'Quality Assurance', 'Customer Account Manager'],
      outcomes: ['Higher first-time fix', 'Less downtime for customers', 'Better parts availability', 'Reliable complaint capture', 'Lower service cost']
    }),
    supply: team({
      name: 'Supply Chain Assist',
      subtitle: 'AI-assisted supply risk monitoring, cold chain excursion triage, supplier management, and order exceptions.',
      line: 'Your front door to supply chain operations support',
      ask: 'What is at risk this week, which excursions need review, or which supplier is slipping?',
      intake: ['Capture product, material, site, and request type', 'Check for related open exceptions', 'Apply supply policies and quality rules', 'Search supplier, inventory, and logistics data', 'Summarize the case for a planner or quality reviewer'],
      agents: [
        ['Supply Risk Agent', ['Supplier and inventory signals', 'Shortage forecasting inputs', 'Mitigation options', 'Weekly risk briefs']],
        ['Cold Chain Excursion Agent', ['Temperature data intake', 'Stability data lookup for review', 'Disposition recommendation drafts', 'Handoff to quality']],
        ['Supplier Performance Agent', ['On-time and quality scorecards', 'Audit and qualification status', 'Corrective action follow-up', 'Business review packs']],
        ['Order Exception Agent', ['Order and shipment delays', 'Alternate source suggestions', 'Customer and distributor notices', 'Approval routing']]
      ],
      systems: [M365, 'Dynamics 365 Supply Chain Management', 'ERP and planning systems', 'Logistics and 3PL portals', 'Temperature monitoring platforms', 'Quality management system', 'Power BI'],
      humans: ['Supply Planner', 'Procurement Lead', 'Quality Assurance', 'Logistics Manager', 'Commercial Operations'],
      outcomes: ['Fewer stockouts', 'Faster excursion decisions', 'Lower expedite cost', 'Better supplier performance', 'Stronger product protection']
    })
  };
})();
