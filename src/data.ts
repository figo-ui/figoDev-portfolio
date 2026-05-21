import { Project, DeepDive, PhilosophyItem, SkillCategory } from './types';

export const HERO_DATA = {
  name: 'OMX figoDevTech',
  title: 'Full-Stack Labs & Tech Ventures | Web, App, AI, UI/UX & Research Research Node',
  description: 'I architect state-of-the-art applications, bespoke design boilerplates, and secure AI systems. Discover my public works portfolio, private security designs, and daily development journey logs tracing systems from inception to production.',
  location: 'Addis Ababa, Ethiopia',
  email: 'obsafigo@gmail.com',
  portraitUrl: '/portrait.jpg',
  stats: [
    { value: '5+', label: 'Years Experience', accent: 'emerald' },
    { value: '15+', label: 'Published Systems', accent: 'gold' },
    { value: '3.2k', label: 'GitHub Commits (YTD)', accent: 'emerald' },
    { value: '12+', label: 'Stitch & Design Templates', accent: 'gold' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'weplay',
    title: 'Social Super App (WePlay)',
    subtitle: 'A comprehensive platform integrating communication, productivity tools, and educational resources.',
    description: 'A social learning super application featuring real-time group chats, interactive classrooms, and multi-tenant organization workspaces.',
    problem: 'Fragmented tools for communication, task management, and learning caused severe context-switching fatigue for enterprise users.',
    impact: 'Unified 3 disparate systems into a single performant app, reducing load times by 40% and increasing daily active engagement by 2.5x.',
    technologies: ['React Native', 'Node.js', 'WebSockets', 'PostgreSQL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI6wgJV8Fxli6tH2JPlYvDXYepEcJE0vH5dbUu6lyt2jOpE7PZxcNcs5tWiEBiK57oPieu5-7Zg34L4RkuniU_4hTZmLgitpkOLEbj7XVBQMC1VvVGc9w0g-xveU-__uDwiC8iGp3e2GNduF196jRYXrckNQb62mp5qNIyd6CPL461_lTUqDpSjzopA7j9xwfyyUMIkvkEiOHuf6gU25cC9iUgvqQJOa_Sl1p5nItHdQ-7qVu6lfjanNm9sXFlf2yZ4uoDLGS0gg',
    liveUrl: '#',
    githubUrl: 'https://github.com/figo-ui/weplay',
    accentColor: 'emerald',
    category: 'APP',
    isPrivate: false,
    caseStudy: {
      technicalChallenge: 'Managing extreme state synchronization in chat and collaborative canvas dashboards across thousands of concurrent mobile devices while maintaining 60 FPS.',
      solutionDetail: 'Architected a custom state manager combining SQLite cache with a selective WebSocket event bus. Integrated Redis Pub/Sub backend to horizontally scale active communication channels.',
      architecturalHighlights: [
        'Implemented custom React Native Native Modules to optimize list rendering for complex chat nodes.',
        'Established offline-first write queue that syncs automatically when connections restore, using conflict-free replicated data types (CRDTs).',
        'Built a custom client-side image processing pipeline to compress/resize media uploads prior to ingress.'
      ],
      metrics: [
        '40% faster initial app load',
        '60 FPS smooth interactive scrolling',
        '2.5x increase in daily active session durations'
      ],
      codeSnippetTitle: 'WebSocket Event Dispatcher (Node.js/TypeScript)',
      codeSnippet: `// Custom Event Bus for Scaling Multi-room Channels
import { createClient } from "redis";

export class EventDispatcher {
  private pubClient = createClient();
  private subClient = this.pubClient.duplicate();

  async initialize() {
    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
  }

  async broadcastToRoom(roomId: string, eventType: string, payload: any) {
    const message = JSON.stringify({ eventType, payload });
    // Publish event to Redis bus for distributed servers
    await this.pubClient.publish(\`room:\${roomId}\`, message);
  }

  async subscribeToRoom(roomId: string, onMessage: (msg: any) => void) {
    await this.subClient.subscribe(\`room:\${roomId}\`, (message) => {
      onMessage(JSON.parse(message));
    });
  }
}`
    }
  },
  {
    id: 'healthcare-ai',
    title: 'Healthcare AI Assistant',
    subtitle: 'Bilingual AI Medical App providing intelligent, context-aware insights.',
    description: 'An AI-powered patient triage and multilingual health consultation engine powered by localized LLMs and Retrieval Augmented Generation.',
    problem: 'Patients lacked immediate, accurate, bilingual medical triage information, leading to overwhelmed local clinics.',
    impact: 'Deployed a robust RAG architecture handling 10k+ queries monthly, providing culturally localized medical guidance with 95% accuracy measured against medical standards.',
    technologies: ['Django', 'Python', 'LLM & RAG', 'Vector DB'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrijBrve13n3su8r8JT3Po61DI8QMOGGK5WqZNZGk7rOYABgp9jUJX3MwL8gIvmumzUZ7k7_64mstdCW79sQp9uoH6epaI7TmzUP2BqgFpwcvKT-JyfJt-nJw4jj_PmUxmNqDNrULtMRuIA68zA8zYkwt-jDCj3LBX8qFAZdo5K5Z8OUROlpmnkuvrYu2Lce5O7fxE4100NpARl39UIWC8L_0ivlYb7Fj89GDGl1350rlO4tpWYFGBXS4efnBMIdmKgUzco0yVdA',
    githubUrl: 'https://github.com/figo-ui/healthcare-ai',
    accentColor: 'gold',
    category: 'AI',
    isPrivate: false,
    caseStudy: {
      technicalChallenge: 'Protecting patient privacy (HIPAA equivalent) and preventing LLM hallucinations under zero-latency constraints for critical advice.',
      solutionDetail: 'Constructed an on-premise Vector DB storage paired with pre-moderation guardrails. Queries are routed through custom semantic search layers filtering content based on peer-reviewed local medical manuals.',
      architecturalHighlights: [
        'Implemented strict PII scrubbing algorithms on the API gateway before sending payloads to LLM.',
        'Developed hybrid semantic search combining BM25 and vector embedding indexing to surface highly relevant localized guidelines.',
        'Created a clinical validation dashboard allowing certified physicians to audit model citations before final releases.'
      ],
      metrics: [
        '95% clinical triage accuracy',
        '10k+ monthly handled sessions',
        '<1.2s average latency response'
      ],
      codeSnippetTitle: 'PII scrubbing & Hybrid Retrieval Logic (Python)',
      codeSnippet: `import re
from sentence_transformers import SentenceTransformer

class SecureRetrievalPipeline:
    def __init__(self, vector_db):
        self.encoder = SentenceTransformer("all-MiniLM-L6-v2")
        self.db = vector_db
        # Regex to scrub phone numbers, emails, and passport IDs
        self.pii_pattern = re.compile(r"(\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b)|(\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b)")

    def scrub_query(self, query: str) -> str:
        return self.pii_pattern.sub("[SCRUBBED]", query)

    def retrieve_context(self, query: str) -> list:
        clean_text = self.scrub_query(query)
        embedding = self.encoder.encode(clean_text)
        # Search the knowledge boundary
        results = self.db.similarity_search_by_vector(embedding, k=3)
        return results`
    }
  },
  {
    id: 'cbhi',
    title: 'CBHI Platform',
    subtitle: 'Community Based Health Insurance digitization system.',
    description: 'A robust, offline-capable mobile and cloud infrastructure digitizing health insurance processes in rugged locations.',
    problem: 'Paper-based insurance claims were incredibly slow, error-prone, and inaccessible to remote communities.',
    impact: 'Digitized access for thousands of users. Engineered offline-first capabilities to ensure functionality in low-connectivity regions.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    icon: 'health_and_safety',
    githubUrl: 'https://github.com/figo-ui/cbhi',
    accentColor: 'emerald',
    category: 'APP',
    isPrivate: false,
    caseStudy: {
      technicalChallenge: 'Enabling remote health officers to authenticate claimants and verify coverage without any cellular network coverage.',
      solutionDetail: 'Designed a regional device-to-device local sync model. Encrypted client information is pre-cached in local Hive store, verifying claims via secure asymmetric key QR-code validation.',
      architecturalHighlights: [
        'Configured a self-healing synchronizer that uploads bulk offline transaction logs to Firestore in chunks when bandwidth matches criteria.',
        'Generated responsive QR generators mapping encrypted verification tokens.',
        'Optimized bundle size of Flutter build down to 14MB for distribution via slow local file-sharing solutions.'
      ],
      metrics: [
        '100% functionality in offline wilderness',
        '50,000+ citizens enrolled',
        'Claims processing delay reduced from weeks to seconds'
      ],
      codeSnippetTitle: 'Offline Synchronizer Queue (Dart)',
      codeSnippet: `class SyncJobController {
  final HiveInterface hive;
  final FirebaseFirestore db;
  bool _isSyncing = false;

  SyncJobController(this.hive, this.db);

  Future<void> flushQueueToCloud() async {
    if (_isSyncing) return;
    _isSyncing = true;
    
    var box = await hive.openBox('offline_claims');
    var pendingClaims = box.values.toList();
    
    for (var claim in pendingClaims) {
      try {
        await db.collection('claims').doc(claim['id']).set(claim);
        await box.delete(claim['id']); // Successful upload
      } catch (err) {
        log('Upload failed, keeping cached payload: $err');
        break; // Stop execution until retry window
      }
    }
    _isSyncing = false;
  }
}`
    }
  },
  {
    id: 'leave-management',
    title: 'University Leave Management',
    subtitle: 'Enterprise workflow automation for academic staff.',
    description: 'A multi-tier approval system for faculty leave workflow tracking, digital signatures, and analytics in academic institutions.',
    problem: 'Complex, multi-tier approval processes for faculty leave were untracked and routinely delayed by weeks.',
    impact: 'Automated the entire workflow, reducing approval cycle times by 80% and providing real-time analytics to administration HR.',
    technologies: ['React', 'Node.js', 'Express'],
    icon: 'event_note',
    githubUrl: 'https://github.com/figo-ui/leave-management',
    accentColor: 'gold',
    category: 'WEB',
    isPrivate: false,
    caseStudy: {
      technicalChallenge: 'Creating a highly customizable, visual, dynamic approval chain that department heads can modify without editing code.',
      solutionDetail: 'Developed a relational DAG database model where approval routes are evaluated recursively behind a node-based state machine.',
      architecturalHighlights: [
        'Utilized custom React hooks to render drag-and-drop hierarchy workflow builders.',
        'Secured endpoint routes with role-based policies leveraging JWT and visual signature audits.',
        'Configured automatic calendar notifications and email summary webhooks (SendGrid).'
      ],
      metrics: [
        '80% reduction in approval delays',
        '100% paperless audit records',
        'Automated notifications for all tiers'
      ],
      codeSnippetTitle: 'Recursive Approval Flow Evaluator (TypeScript)',
      codeSnippet: `interface ApprovalNode {
  id: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  nextApproverId?: string;
}

export function evaluateNextStep(nodes: ApprovalNode[], currentNodeId: string): string | null {
  const current = nodes.find(n => n.id === currentNodeId);
  if (!current) return null;
  
  if (current.status === 'APPROVED') {
    if (current.nextApproverId) {
      // Transition to next authority node
      return current.nextApproverId;
    }
    return 'FULLY_APPROVED';
  } else if (current.status === 'REJECTED') {
    return 'REJECTED';
  }
  return 'PENDING_CURRENT_AUTHORITY';
}`
    }
  },
  {
    id: 'najjashi',
    title: 'Najjashi & Cross-Platform Systems',
    subtitle: 'High-performance React Native architecture for local markets.',
    description: 'Highly modular boilerplate and design system built with custom native navigation modules optimizing speed on low-tier smartphones.',
    problem: 'Building native-feeling experiences that scale gracefully across varied device capabilities in emerging markets.',
    impact: 'Established a robust boilerplate and UI component library that accelerated subsequent app development lifecycles by 30%.',
    technologies: ['React Native', 'TypeScript', 'Redux'],
    icon: 'devices',
    githubUrl: 'https://github.com/figo-ui/najjashi',
    accentColor: 'emerald',
    category: 'APP',
    isPrivate: false,
    caseStudy: {
      technicalChallenge: 'Achieving sub-100ms first paint on legacy Android devices with low RAM speeds.',
      solutionDetail: 'Eliminated unnecessary native dependencies. Refined native components to avoid over-nesting, and leveraged pure performance memoization engines to control screen re-renders.',
      architecturalHighlights: [
        'Built flat, memory-efficient list views mimicking native recycler list dynamics.',
        'Stripped global bundles of auxiliary scripts using tree-shaking and dynamic code-loading techniques.',
        'Implemented automatic caching structures for design assets and localized string keys.'
      ],
      metrics: [
        '30% acceleration of subsequent project setups',
        'Sub-100ms first interactive paint',
        'Zero frame drops (solid 60 FPS) on old dual-core handsets'
      ],
      codeSnippetTitle: 'Memoized Flat Node Renderer (TypeScript/TSX)',
      codeSnippet: `import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RowProps {
  id: string;
  label: string;
  value: string;
}

export const OptimalRowItem = memo(
  ({ label, value }: RowProps) => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.valueText} numberOfLines={1}>{value}</Text>
      </View>
    );
  },
  // Deep comparison of props to avoid redundant pixel calculations
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

const styles = StyleSheet.create({
  cardContainer: { flexDirection: 'row', padding: 12, borderBottomWidth: 0.5 },
  labelText: { fontSize: 13, color: '#c4c7c7' },
  valueText: { fontSize: 13, fontWeight: 'bold', color: '#e5e2e1' },
});`
    }
  },
  {
    id: 'mx-glass-ui',
    title: 'OMX Glassmorphic Dashboard UI/UX Template',
    subtitle: 'Premium dashboard template featuring highly polished Glassmorphism styles and components.',
    description: 'A React-powered modern responsive dashboard mockup with custom CSS blurred overlays, smooth micro-interactions, and premium layout structure.',
    problem: 'Standard dashboard themes look blocky, lack visual depth, and fail to provide responsive atmospheric feeling.',
    impact: 'Crafted a reusable design kit reducing client UI mockup setup and asset compilation delay by 55%.',
    technologies: ['React', 'Tailwind CSS', 'Glassmorphism', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    liveUrl: '#',
    githubUrl: 'https://github.com/figo-ui',
    accentColor: 'emerald',
    category: 'UI_UX',
    isPrivate: false,
    caseStudy: {
      technicalChallenge: 'Reconciliation of blurred backdrop filters with zero rendering lag on chrome container contexts.',
      solutionDetail: 'Engineered hardware-accelerated CSS layers utilizing transform3d matrices to bypass standard CPU pixel rendering threads.',
      architecturalHighlights: [
        'Created high-contrast typography palettes paired with deep absolute card shadows.',
        'Established responsive modular grids translating perfectly to narrow mobile screen views.',
        'Bundled design tokens into lightweight tailwind extensions.'
      ],
      metrics: [
        'Sub-5ms backdrop overlay paint times',
        'Reusable across 10+ scalable application dashboards',
        'Fully responsive 4K down to mobile touch views'
      ]
    }
  },
  {
    id: 'rls-isolation-research',
    title: 'Research Paper: Multi-Tenant Data Isolation and Row Security Matrices',
    subtitle: 'A formal research paper detailing performance impacts of RLS and database level shielding policies.',
    description: 'A technical analysis document studying the mathematical and system validation benchmarks of PostgreSQL RLS policies in SaaS networks.',
    problem: 'Evaluating connection pooling handshake latency overhead when injecting SET LOCAL session parameters recursively.',
    impact: 'Published formal benchmarks proving that properly indexed tenant attributes maintain near-zero performance variance.',
    technologies: ['PostgreSQL', 'LaTeX', 'Benchmark Engines', 'Systems Security'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200',
    liveUrl: '#',
    githubUrl: 'https://github.com/figo-ui',
    accentColor: 'gold',
    category: 'RESEARCH',
    isPrivate: false,
    caseStudy: {
      technicalChallenge: 'Simulating 10,000 concurrent database session connection pools to extract accurate microsecond offsets.',
      solutionDetail: 'Constructed automated k6 testing cluster scenarios running in isolated isolated Docker environments.',
      architecturalHighlights: [
        'Defined mathematical latency curves for nested JOIN commands with RLS active.',
        'Authenticated tenant-row access verify proofs preventing SQL bypass exploits.',
        'Prototyped memory cache guidelines to skip metadata setting check on warm pools.'
      ],
      metrics: [
        '99.8% accurate testing simulations under stress',
        'Identified configuration tuning adjusting caching up to 15%',
        'Published in systems security research repository'
      ]
    }
  },
  {
    id: 'private-jwt-auth',
    title: '🔒 Cryptographic Token Isolation Proxy',
    subtitle: 'Proprietary internal gateway managing OAuth flow variables and cryptographic token verification.',
    description: 'A highly secure private credential backend managing localized SSH handshakes and cryptographic token validations.',
    problem: 'Preventing private token leaks and securing enterprise-level workspace integrations from client side visibility.',
    impact: 'Established secure, sealed server routes with HIPAA level encrypted memory arrays.',
    technologies: ['NodeJS', 'AES-256-GCM', 'Docker Secret', 'JWT Core'],
    accentColor: 'gold',
    category: 'AI',
    isPrivate: true,
    caseStudy: {
      technicalChallenge: 'Preventing timing attacks on signature validation paths.',
      solutionDetail: 'Implemented constant-time cryptographic comparison functions for all token validation chains.',
      architecturalHighlights: [
        'Isolated private key credentials inside hardened hardware tokens.',
        'Activated automated cluster-wide key rotation sweeps twice daily.',
        'Configured real-time security alerts to monitor key usage frequencies.'
      ],
      metrics: [
        'Constant <2.1ms validation duration tracking',
        'Zero cryptographic keys leaked under aggressive pen-testing tests',
        'Passed audit validations cleanly'
      ]
    }
  }
];

export const DEEP_DIVES: DeepDive[] = [
  {
    id: 'sys-arch',
    title: 'System Architecture',
    icon: 'account_tree',
    description: 'Modular Micro-frontend Architecture: Implementing a robust micro-frontend strategy using React Native Module Federation to allow independent scaling of social, work, and learning modules.',
    accentColor: 'gold',
    fullContent: {
      problemStatement: 'As applications scale, monolothic codebases break down. Multiple engineering speed bumps occur when updating separate modules like classroom, messaging, or profile boards.',
      architectureDescription: 'Utilizing Host-Remote Module Federation configurations, individual modules can be deployed independently to their respective servers or stores. Each module is resolved at runtime dynamically based on configuration specs.',
      keyDecisions: [
        'Selected Module Federation for dynamic chunk downloads over standard separate package compilations.',
        'Established rigid shared runtime protocols (React, Redux, theme contexts) to keep memory loads low.',
        'Created a dynamic failover engine routing users to cached versions when microservices suffer network issues.'
      ],
      diagramData: 'Host Application -> Resolves Manifest -> Fetches Remote Chunks (Messaging UI, Classroom UI) -> Injects Context Provider -> Native Rendering Frame'
    }
  },
  {
    id: 'db-modeling',
    title: 'Database Modeling',
    icon: 'schema',
    description: 'Multi-tenant PostgreSQL Schema: Designed a complex multi-tenant schema with Row Level Security (RLS) to ensure rigorous data isolation between different organizational workspaces within the super app.',
    accentColor: 'emerald',
    fullContent: {
      problemStatement: 'Storing multi-organization data in a shared relational engine usually risks leakage or demands complex query filters attached to every single SELECT clause.',
      architectureDescription: 'PostgreSQL Row Level Security (RLS) policies were activated at the infrastructure level. Application roles are bound directly on connection handshakes, restricting queries implicitly.',
      keyDecisions: [
        'Leveraged a unified pool connection scheme combined with SET LOCAL app.current_tenant on each middleware transaction.',
        'Indexed tenant_ids on all compound indicators to neutralize querying latency overflows.',
        'Arranged automated nightly database schema sanitizers validating isolation levels.'
      ],
      diagramData: 'SQL Query -> Database Preseed Connection -> App Session Handshake with tenant_id -> PostgreSQL RLS Filter -> Secure Segment Rows Delivered'
    }
  },
  {
    id: 'api-flow',
    title: 'API Design & Data Flow',
    icon: 'sync_alt',
    description: 'Real-time WebSocket Sync: Engineered a high-concurrency event bus using Redis and WebSockets for instant state synchronization across collaborative learning environments, handling 5k+ concurrent connections.',
    accentColor: 'emerald',
    fullContent: {
      problemStatement: 'Standard polling structures flood APIs, and simple WebSockets fail immediately when scaling horizontally across multi-replica microservices.',
      architectureDescription: 'A Redis Pub/Sub backplane allows distinct cluster pods to communicate. Dynamic connections are assigned cleanly to local instances while messages travel globally inside microseconds.',
      keyDecisions: [
        'Configured heartbeats (ping-pong checks) every 15s to automatically garbage-collect dead web sockets.',
        'Decimated socket payload overhead by 60% through binary representation patterns.',
        'Secured event gateways with short-lived JWT handshakes.'
      ],
      diagramData: 'User Action -> Local Pod Gateway (WS) -> Publishes Redis Event -> Multi-Pod Synchronizer -> Delivers broadcast to recipients (1-to-Many)'
    }
  },
  {
    id: 'lessons-learned',
    title: 'Lessons Learned',
    icon: 'school',
    description: 'Performance Optimization: Reduced initial app load time by 45% through aggressive code splitting, custom asset delivery pipelines, and lazy-loading non-critical modules for low-bandwidth environments.',
    accentColor: 'gold',
    fullContent: {
      problemStatement: 'Low-end smartphone devices running on weak network infrastructure faced constant timeouts and high churn rates due to bulky asset bundles.',
      architectureDescription: 'Engineered a multi-phase compilation tree splitting critical layouts from dynamic overlays, routing secondary bundles into dynamic import scripts.',
      keyDecisions: [
        'Replaced large SVG images and embedded metrics with light-weight canvas loops.',
        'Enabled GZIP and Brotli compression schemes inside hosting environments.',
        'Developed intelligent client caching to prevent reloading unchanged styling structures.'
      ],
      diagramData: 'App Boot -> Load Key Module (140KB) -> Immediate Interface Render -> Stream Dynamic Overlays (Lazy Background Loading) -> Performance Complete'
    }
  }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  {
    title: 'Solve Real Problems',
    description: "Technology is a means to an end. Start with the user's pain point, not the shiny new framework. Code is valuable only when it lifts structural burdens.",
    borderAccent: 'emerald'
  },
  {
    title: 'Design for Usability',
    description: 'Complex engineering should be invisible to the user. User interfaces must be highly intuitive, accessible, and fast enough to feel entirely natural.',
    borderAccent: 'gold'
  },
  {
    title: 'Build for Scale',
    description: 'Architect systems anticipating rapid tomorrow growth. Emphasize loose coupling, high cohesion, robust unit tests, and modular container setups.',
    borderAccent: 'emerald'
  },
  {
    title: 'Maintainability Matters',
    description: 'Write code with careful layout for the next engineer who inherits it. Clean architecture, transparent naming conventions, and simple patterns win.',
    borderAccent: 'gold'
  },
  {
    title: 'Balance Speed & Quality',
    description: 'Understand when to prototype rapidly to validate innovative feedback, and when to invest meticulously in bulletproof system architectures.',
    borderAccent: 'emerald'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: 'code',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML5 & CSS3'],
    accentColor: 'emerald'
  },
  {
    category: 'Backend',
    icon: 'dns',
    skills: ['Django', 'Node.js', 'NestJS', 'API Design', 'Express', 'Python'],
    accentColor: 'gold'
  },
  {
    category: 'Mobile',
    icon: 'smartphone',
    skills: ['React Native', 'Flutter', 'Dart', 'Android & iOS integration', 'Mobile Core Performance'],
    accentColor: 'emerald'
  },
  {
    category: 'AI / Automation',
    icon: 'psychology',
    skills: ['LLM Integration', 'RAG (Retrieval Augmented Generation)', 'OCR (Optical Character Recognition)', 'LangChain', 'Workflow Automation'],
    accentColor: 'gold'
  },
  {
    category: 'Data / Infra',
    icon: 'database',
    skills: ['PostgreSQL', 'Firebase', 'Supabase', 'Docker', 'Deployment Pipelines (CI/CD)', 'Git', 'Redis'],
    accentColor: 'emerald'
  }
];
