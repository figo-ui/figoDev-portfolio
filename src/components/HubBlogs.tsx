import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Eye, 
  Clock, 
  Calendar, 
  X, 
  Tag, 
  Filter, 
  BookOpen, 
  Lock, 
  User, 
  Sparkles, 
  Check, 
  Edit 
} from 'lucide-react';
import { BlogPost } from '../types';

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'scale-rn-lists',
    title: 'Scaling React Native List Renderers to 60 FPS on Legacy Smart Handsets',
    category: 'Mobile Architecture',
    excerpt: 'Deep technical blueprint on optimizing virtualized lists, bypassing Javascript thread blockades, and tailoring layout sizing measurements.',
    content: `## The Battle for the JS Thread

Low-end Android devices feature dual-core processes and slow DDR memory speeds. In React Native, building interactive virtualized lists (like full-threaded chat channels) often crashes the JS frame rate down to 15-20 frames per second if not synchronized correctly. Every scroll recalculates offsets, garbage-collects rendering nodes, and blocks frame paint triggers.

To achieve solid 60 FPS smooth scrolling on legacy handsets like budget dual-core processors, we must circumvent standard rendering overhead with three specific techniques:

### 1. Hardcoding Item Heights (Bypassing Dynamic Measure Layout)
By default, \`FlatList\` measures item layouts dynamically at runtime. This causes layout recalculation on every layout paint index. If you declare a custom \`getItemLayout\` helper, you directly bypass the native engine's dimension lookup checks:

\`\`\`typescript
const getItemLayout = (data: any, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});
\`\`\`

### 2. Memoization with Optimal Comparisons
Wrap row renders in high-performance React \`memo\` structures using shallow prop evaluations to ignore auxiliary state changes:

\`\`\`typescript
export const RobustRowItem = React.memo(({ item }) => {
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
    </View>
  );
}, (prev, next) => prev.item.updateTime === next.item.updateTime);
\`\`\`

### 3. Progressive Image Recyclers
Never load raw images. Implement local caching pipelines to compress high-res visual assets directly in the Native directory before inflating their visual vectors on the device canvas. This maintains safe memory bounds without blowing up the frame stack!`,
    date: 'May 18, 2026',
    readTime: '6 min read',
    tags: ['React Native', 'Android', '60FPS', 'Mobile Core'],
    views: 142
  },
  {
    id: 'postgres-rls-shield',
    title: 'Designing a Bulletproof PostgreSQL Row-Level Security Isolation Shield',
    category: 'System Security',
    excerpt: 'A clean relational guide on configuring tenant handshakes, securing shared query pathways, and optimizing multi-organization cluster endpoints.',
    content: `## The Multi-Tenant RELATIONAL Challenge

When architecting high-concurrency Enterprise systems (such as the CBHI Insurance and University Leave apps), safeguarding organizational data is paramount. In standard databases, programmers resort to appending \`WHERE tenant_id = current_tenant\` filters to every single query statement. This manual approach is highly prone to human error, potentially leading to catastrophic security leaks if a single field is left exposes in complex SQL joins.

An elegant, bulletproof alternative is activating **PostgreSQL Row-Level Security (RLS)** at the schema boundary.

### Configuring PostgreSQL Policies

First, alter the core table to enable RLS:
\`\`\`sql
ALTER TABLE claims_table ENABLE ROW LEVEL SECURITY;
\`\`\`

Next, define the security policy, dynamically utilizing session attributes pre-seeded by our application connection middleware:
\`\`\`sql
CREATE POLICY tenant_isolation_policy ON claims_table
  USING (tenant_id = NULLIF(current_setting('app.current_tenant', true), ''));
\`\`\`

### Middle-tier Integration in Node.js (Express-pg)

In your application service context, preseed each client session transaction before launching database commands:

\`\`\`typescript
export async function executeTenantQuery(client: PoolClient, tenantId: string, querySql: string, params: any[]) {
  // Pre-seed local session variables
  await client.query("SET LOCAL app.current_tenant = $1", [tenantId]);
  
  // Implicitly isolated query call
  const response = await client.query(querySql, params);
  return response.rows;
}
\`\`\`

This completely offloads security isolation constraints to PostgreSQL itself, giving you peace of mind that no query, no matter how complex, can ever bleed confidential records across customer organizations.`,
    date: 'April 12, 2026',
    readTime: '8 min read',
    tags: ['PostgreSQL', 'Database Tuning', 'RLS Security', 'NodeJS'],
    views: 98
  },
  {
    id: 'bilingual-rag-triage',
    title: 'Engineering Hybrid BM25-Vector RAG Pipelines for Multilingual Health Consultations',
    category: 'AI / Engineering',
    excerpt: 'Combining vector-embeddings search with lexical checks to serve direct offline medical triage with 95% clinical verification.',
    content: `## Why Vector-Embeddings Fail Alone in Healthcare

In localized clinical AI systems, simple vector semantic searches often miss critical medical names, regional jargon, or specific diagnosis abbreviations. In highly bilingual emerging environments (like Amharic and English settings), the model might fetch abstract paragraphs rather than literal medical instructions.

To solve this, we engineer a **Hybrid Retrieval-Augmented Generation (RAG)** pipeline.

### The Hybrid Search Recipe

A hybrid architecture computes retrieval scores from two distinct indexing worlds:
1. **Linguistic Lexical Search (BM25)**: Scores context documents based on literal keyword occurrences (ideal for looking up medication names or specific symptom acronyms).
2. **Dense Semantic Search (Vector Index)**: Scores based on semantic meaning matching (ideal for finding conceptual medical explanations).

### Score Reciprocal Rank Fusion (RRF)

We compile both scoring maps using Reciprocal Rank Fusion to extract the ultimate top-3 document coordinates for the localized LLM context boundary:

\`\`\`python
def reciprocal_rank_fusion(lexical_results, vector_results, k=60):
    rrf_scores = {}
    # Combine BM25 scores
    for rank, doc_id in enumerate(lexical_results):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0) + (1.0 / (k + rank))
        
    # Combine Vector scores
    for rank, doc_id in enumerate(vector_results):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0) + (1.0 / (k + rank))
        
    # Sort and return top candidates
    sorted_docs = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
    return sorted_docs[:3]
\`\`\`

Deploying this hybrid structure reduces hallucination indicators down to virtually zero, ensuring safe clinical triage assessments at low response latencies.`,
    date: 'March 30, 2026',
    readTime: '10 min read',
    tags: ['RAG Ecosystems', 'Python-Django', 'Vector Databases', 'Medical AI'],
    views: 210
  }
];

interface HubBlogsProps {
  isAdmin: boolean;
}

export default function HubBlogs({ isAdmin }: HubBlogsProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mobile Architecture');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isPostPrivate, setIsPostPrivate] = useState(false);
  const [formError, setFormError] = useState('');
  const [deployedSuccess, setDeployedSuccess] = useState(false);

  // Retrieve blogs from localstorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('omx_platform_blogs');
      if (stored) {
        setBlogs(JSON.parse(stored));
      } else {
        const enhanced_initial_blogs = [
          ...INITIAL_BLOGS,
          {
            id: 'private-security-audit',
            title: '[🔒 CLASSIFIED] Multi-Tenant Isolated Encryption Cryptographic Audit Report',
            category: 'System Security',
            excerpt: 'Detailed dynamic scans identifying optimal AES-GCM block sizing configurations, salt parameters, and RLS vulnerability assertions.',
            content: `## SECURED CORE AUDIT TRACE - CLASSIFIED INTEL

This technical document tracks private ledger validation reports across our isolated PostgreSQL system. Intended for OMX authorized personnel only.

### 1. Cryptographic Entropy Assertion
Evaluated cryptographic key scopes. All PBKDF2 integrations must utilize a minimum of 600,000 computation passes to bypass GPU list cracker clusters.

### 2. Multi-tenant Row Isolation Safeguards
Performed multi-threaded trace leaks. Row security verified to yield 100% tenant separation records compliance during heavy network fluctuation simulator tests.`,
            isPrivate: true,
            date: 'May 20, 2026',
            readTime: '4 min read',
            tags: ['Cryptosecurity', 'Postgres Isolation', 'AES-256-GCM', 'Audit'],
            views: 12
          }
        ];
        localStorage.setItem('omx_platform_blogs', JSON.stringify(enhanced_initial_blogs));
        setBlogs(enhanced_initial_blogs);
      }
    } catch (e) {
      setBlogs(INITIAL_BLOGS);
    }
  }, []);

  const categories = ['All', 'Mobile Architecture', 'System Security', 'AI / Engineering', 'Personal Logs'];

  // Filter based on admin credentials (exclude private blogs if not authenticated)
  const visibilityFilteredBlogs = blogs.filter(b => isAdmin ? true : !b.isPrivate);

  const filteredBlogs = activeCategory === 'All' 
    ? visibilityFilteredBlogs 
    : visibilityFilteredBlogs.filter(b => b.category === activeCategory);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setFormError('Please fulfill all mandatory parameters (Title, Summary Excerpt, and Full Body Content).');
      return;
    }

    const compiledTags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const calculatedReadTime = `${Math.max(1, Math.ceil(content.split(/\s+/).length / 180))} min read`;

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: title.trim(),
      category,
      excerpt: excerpt.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: calculatedReadTime,
      tags: compiledTags.length > 0 ? compiledTags : ['Engineering'],
      views: 1,
      isPrivate: isPostPrivate
    };

    const updatedBlogs = [newPost, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem('omx_platform_blogs', JSON.stringify(updatedBlogs));

    // Reset Form Fields
    setTitle('');
    setExcerpt('');
    setContent('');
    setTagsInput('');
    setIsPostPrivate(false);
    setDeployedSuccess(true);

    setTimeout(() => {
      setDeployedSuccess(false);
      setIsWriteModalOpen(false);
    }, 1500);
  };

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card read click
    if (!window.confirm('Confirm deletion of this custom article on your local workspace?')) return;

    const updated = blogs.filter(b => b.id !== id);
    setBlogs(updated);
    localStorage.setItem('omx_platform_blogs', JSON.stringify(updated));
    
    if (selectedBlog?.id === id) {
      setSelectedBlog(null);
    }
  };

  const handleIncrementViews = (blog: BlogPost) => {
    // Increase view count locally on selection click
    const updated = blogs.map(b => {
      if (b.id === blog.id) {
        return { ...b, views: b.views + 1 };
      }
      return b;
    });
    setBlogs(updated);
    localStorage.setItem('omx_platform_blogs', JSON.stringify(updated));
    setSelectedBlog({ ...blog, views: blog.views + 1 });
  };

  return (
    <div className="flex flex-col gap-8 text-left relative">
      {/* Blog Intro Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#e9c349] font-black bg-[#e9c349]/10 border border-[#e9c349]/20 px-3 py-1 rounded-full">
            Knowledge Base
          </span>
          <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight mt-3 mb-2">
            The Dev Log
          </h3>
          <p className="font-sans text-sm md:text-base text-gray-400 font-light max-w-2xl leading-relaxed">
            Technical writings on system architecture, database performance scaling, hybrid AI engineering blueprints, and mobile native bridges.
          </p>
        </div>

        {/* Post Blog Call to Action (Only for logged in administrator) */}
        {isAdmin && (
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="flex items-center gap-2 bg-[#4edea3] hover:bg-[#6ffbbe] text-black px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(78,222,163,0.15)] cursor-pointer"
          >
            <Plus size={14} />
            Post Custom Blog
          </button>
        )}
      </div>

      {/* Categories Horizontal Selector Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none select-none">
        <Filter size={14} className="text-gray-500 mr-1 shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border shrink-0 transition-all cursor-pointer ${
              activeCategory === cat 
                ? 'bg-white text-black border-white shadow-lg' 
                : 'bg-[#121212] text-gray-400 border-white/5 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs Layout Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <AnimatePresence>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                key={blog.id}
                onClick={() => handleIncrementViews(blog)}
                className="bg-[#121212]/80 border border-white/10 rounded-2xl p-6 hover:border-[#4edea3]/40 transition-all duration-350 cursor-pointer flex flex-col justify-between group h-80 shadow-md relative overflow-hidden"
              >
                <div>
                  {/* Category & Status indicators */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-[#e9c349] uppercase tracking-wider font-extrabold bg-[#e9c349]/10 px-2.5 py-1 rounded-md border border-[#e9c349]/25">
                        {blog.category}
                      </span>
                      {blog.isPrivate && (
                        <span className="font-mono text-[8.5px] text-red-400 uppercase tracking-widest font-black bg-red-500/15 border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-0.5">
                          <Lock size={9} /> Private
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <Eye size={11} className="text-gray-600" />
                        <span>{blog.views} views</span>
                      </div>
                      <span className="text-gray-700 font-bold">•</span>
                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <Clock size={11} className="text-gray-600" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-sans text-xl font-bold tracking-tight text-white group-hover:text-[#4edea3] transition-colors line-clamp-2 leading-snug mb-3">
                    {blog.title}
                  </h4>

                  {/* Excerpt Summary */}
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-white/5 mt-auto bg-transparent">
                  <div className="flex flex-wrap gap-1.5 md:max-w-[70%]">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="font-mono text-[9px] text-gray-500 bg-white/2 border border-white/5 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                        <Tag size={8} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Admin Delete Action for locally customized articles */}
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <button
                        onClick={(e) => handleDeletePost(blog.id, e)}
                        className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Remove local log post"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <span className="font-mono text-[10px] text-[#4edea3] font-black group-hover:translate-x-1 transition-transform flex items-center gap-0.5 select-none">
                      Read Log →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full bg-[#121212]/30 border border-white/5 rounded-2xl p-16 text-center text-gray-500 font-mono text-sm leading-relaxed">
              <BookOpen size={28} className="mx-auto text-gray-700 mb-3" />
              <span>No log posts cataloged in Category "{activeCategory}".</span>
              <br />
              {isAdmin && (
                <button 
                  onClick={() => setIsWriteModalOpen(true)}
                  className="mt-4 font-mono text-xs text-[#4edea3] hover:underline"
                >
                  Assemble a Custom Blog Post Now
                </button>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating State: Write Blog Modal Dialog Sheet */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative"
            >
              {/* Write Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0f0f0f]/95 backdrop-blur-md z-10 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3]">
                    <Plus size={16} />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-black text-white leading-none">Assemble Blog Post</h3>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Deploy to Personal Hub Platform</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Success Alert Banner */}
              {deployedSuccess ? (
                <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-[#0f0f0f] w-full h-[50vh]">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
                  >
                    <Check size={28} />
                  </motion.div>
                  <h4 className="font-sans text-2xl font-black text-white">Post Deployed Successfully!</h4>
                  <p className="font-mono text-xs text-gray-400">Synchronized cleanly to the platform directory nodes.</p>
                </div>
              ) : (
                <form onSubmit={handleCreatePost} className="p-6 flex flex-col gap-5 text-left w-full">
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl font-mono text-xs leading-relaxed">
                      Error: {formError}
                    </div>
                  )}

                  {/* Post Title input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Article Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Scaling Next.js API Routes under High Event Loads"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none focus:ring-1 focus:ring-[#4edea3]/25 transition-all text-left"
                    />
                  </div>

                  {/* Row: Category + Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#4edea3] focus:outline-none transition-all cursor-pointer"
                      >
                        {categories.slice(1).map(cat => (
                          <option key={cat} value={cat} className="bg-[#0f0f0f] text-white py-1">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tags (Comma separated)</label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="NextJS, Scaling, Vercel, API"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none transition-all text-left"
                      />
                    </div>
                  </div>

                  {/* Public Private toggle */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-white uppercase tracking-wider font-extrabold flex items-center gap-1 bg-transparent">
                        <Lock size={12} className="text-[#e9c349] shrink-0" />
                        Visibility Settings
                      </div>
                      <p className="font-sans text-[11.5px] text-gray-500 leading-normal mt-0.5">
                        Private articles are hidden from the public portfolio page and unauthenticated users.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPostPrivate(!isPostPrivate)}
                      className={`px-4 py-2 rounded-lg font-mono text-[10.5px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                        isPostPrivate 
                          ? 'bg-red-500/20 text-red-100 border border-red-500/30' 
                          : 'bg-emerald-500/20 text-[#4edea3] border border-emerald-500/20'
                      }`}
                    >
                      {isPostPrivate ? 'Private' : 'Public'}
                    </button>
                  </div>

                  {/* Summary Excerpt */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Summary Excerpt <span className="text-red-500">*</span></label>
                    <textarea
                      rows={2}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Give a short 2-sentence synopsis summarizing the architectural payload..."
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none transition-all text-left resize-none"
                    />
                  </div>

                  {/* Full Markdown-compatible content bodies */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold flex justify-between">
                      <span>Full Body Article (Markdown supported) <span className="text-red-500">*</span></span>
                      <span className="text-gray-600 text-[9px] lowercase font-normal">Saves to local workspace storage</span>
                    </label>
                    <textarea
                      rows={8}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Provide full article markdown code or documentation lists here..."
                      className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none transition-all text-left resize-y"
                    />
                  </div>

                  {/* Form Footer */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2 bg-transparent">
                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(false)}
                      className="px-5 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-mono text-xs font-semibold transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#4edea3] text-black px-6 py-3 rounded-xl font-mono text-xs font-bold hover:bg-[#6ffbbe] hover:scale-[1.01] transition-all shadow-[0_0_15px_rgba(78,222,163,0.1)] cursor-pointer"
                    >
                      Publish to Hub
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Core Dialog: Read Blog Article Viewer Sheet */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
              className="bg-[#080808] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto flex flex-col relative shadow-[0_45px_100px_rgba(0,0,0,0.95)]"
            >
              {/* Backlight layout layer */}
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none -z-10" />

              {/* Viewer header controls sticky */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#080808]/95 backdrop-blur-md sticky top-0 z-10 w-full">
                <span className="font-mono text-xs text-[#4edea3] uppercase tracking-wider font-extrabold bg-[#4edea3]/10 border border-[#4edea3]/20 px-3 py-1 rounded-full">
                  {selectedBlog.category}
                </span>

                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Close Article"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Article Content Layout */}
              <div className="p-8 md:p-12 flex flex-col items-start gap-6 text-left w-full">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={13} className="text-gray-600" />
                    <span>Published {selectedBlog.date}</span>
                  </div>
                  <span className="text-gray-700">•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={13} className="text-gray-600" />
                    <span>{selectedBlog.readTime}</span>
                  </div>
                  <span className="text-gray-700">•</span>
                  <div className="flex items-center gap-1">
                    <Eye size={13} className="text-gray-600" />
                    <span>{selectedBlog.views} views</span>
                  </div>
                </div>

                {/* Main Heading title */}
                <h2 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mt-1 mb-2">
                  {selectedBlog.title}
                </h2>

                <div className="h-[2px] w-12 bg-[#4edea3] my-1" />

                {/* Excerpt panel info */}
                <blockquote className="border-l-2 border-[#e9c349]/55 bg-[#e9c349]/3 p-4 rounded-r-xl w-full text-sm text-gray-300 italic font-sans leading-relaxed tracking-wide my-2">
                  {selectedBlog.excerpt}
                </blockquote>

                {/* Markdown body rich renderer */}
                <div className="prose prose-invert hover:prose-emerald max-w-none text-gray-300 font-sans text-sm md:text-base leading-relaxed tracking-normal font-light space-y-5 border-t border-white/5 pt-6 w-full whitespace-pre-line">
                  {selectedBlog.content}
                </div>

                {/* Segment Tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-8 w-full bg-transparent">
                  <span className="font-mono text-[10px] text-gray-500 flex items-center gap-1 mr-1">
                    <Tag size={12} />
                    Taxonomy nodes:
                  </span>
                  {selectedBlog.tags.map(tag => (
                    <span key={tag} className="font-mono text-xs text-[#ebd88d] bg-[#ebd88d]/5 border border-[#ebd88d]/15 px-3 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Footer Segment */}
              <div className="bg-[#121212] border-t border-white/10 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500 mt-auto bg-transparent">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-[#4edea3]">
                    <User size={14} />
                  </div>
                  <span>Authored by: <strong className="text-white font-semibold">Obsa Mustefa</strong> (OMX Systems)</span>
                </div>
                <span>© {new Date().getFullYear()} • Platform Sandbox Hub</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
