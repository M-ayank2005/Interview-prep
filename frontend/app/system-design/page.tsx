'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Pencil,
  BookOpen,
  Layers,
  Network,
  Database,
  Globe,
  Server,
  Shield,
  Gauge,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Box,
  Cpu,
  BarChart3,
  Lock,
  Workflow,
  FileCode,
} from 'lucide-react';

const SystemDesignCanvas = dynamic(
  () => import('@/components/SystemDesignCanvas'),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-full">Loading Canvas...</div> }
);

// ======== Data ========

interface Topic {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: React.ReactNode;
  description: string;
  keyPoints: string[];
  companies: string[];
}

const hldTopics: Topic[] = [
  {
    title: 'Design a URL Shortener',
    difficulty: 'Easy',
    icon: <Globe className="w-5 h-5" />,
    description: 'TinyURL-like service that maps long URLs to short codes with redirection, analytics, and expiry.',
    keyPoints: ['Base62 encoding', 'Hash collisions', 'Read-heavy system', 'Cache layer (Redis)', '301 vs 302 redirects'],
    companies: ['Google', 'Microsoft', 'Amazon'],
  },
  {
    title: 'Design a Chat System',
    difficulty: 'Medium',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Real-time messaging platform supporting 1:1 and group chats with presence, read receipts, and media.',
    keyPoints: ['WebSocket vs Long Polling', 'Message queue (Kafka)', 'Fan-out strategies', 'Online presence', 'End-to-end encryption'],
    companies: ['Meta', 'WhatsApp', 'Slack'],
  },
  {
    title: 'Design a News Feed',
    difficulty: 'Medium',
    icon: <Layers className="w-5 h-5" />,
    description: 'Social media feed aggregation system ranking and serving personalized content at scale.',
    keyPoints: ['Fan-out on write vs read', 'Ranking algorithm', 'Caching strategies', 'Content delivery', 'Rate limiting'],
    companies: ['Meta', 'Twitter', 'LinkedIn'],
  },
  {
    title: 'Design a Rate Limiter',
    difficulty: 'Easy',
    icon: <Shield className="w-5 h-5" />,
    description: 'API gateway component that throttles requests to protect services from abuse and overload.',
    keyPoints: ['Token Bucket', 'Sliding Window', 'Fixed Window', 'Distributed rate limiting', 'HTTP 429 responses'],
    companies: ['Cloudflare', 'AWS', 'Stripe'],
  },
  {
    title: 'Design YouTube / Netflix',
    difficulty: 'Hard',
    icon: <Gauge className="w-5 h-5" />,
    description: 'Video streaming platform with upload, transcoding, CDN delivery, and recommendation engine.',
    keyPoints: ['Video transcoding pipeline', 'Adaptive bitrate (ABR)', 'CDN architecture', 'Blob storage (S3)', 'Recommendation ML'],
    companies: ['Google', 'Netflix', 'Amazon'],
  },
  {
    title: 'Design a Distributed Cache',
    difficulty: 'Hard',
    icon: <Database className="w-5 h-5" />,
    description: 'Build a distributed caching system like Memcached/Redis with eviction, replication, and consistent hashing.',
    keyPoints: ['Consistent hashing', 'LRU / LFU eviction', 'Cache invalidation', 'Write-through vs write-back', 'Data partitioning'],
    companies: ['Amazon', 'Google', 'Meta'],
  },
  {
    title: 'Design a Notification System',
    difficulty: 'Medium',
    icon: <Server className="w-5 h-5" />,
    description: 'Multi-channel push notification service supporting iOS, Android, SMS, and email at scale.',
    keyPoints: ['Priority queues', 'Rate limiting per user', 'Template engine', 'Delivery tracking', 'Retry with backoff'],
    companies: ['Apple', 'Google', 'Uber'],
  },
  {
    title: 'Design a Search Autocomplete',
    difficulty: 'Medium',
    icon: <Network className="w-5 h-5" />,
    description: 'Type-ahead search suggestion system processing millions of queries with low latency.',
    keyPoints: ['Trie data structure', 'Query frequency ranking', 'Data sampling', 'Sharding', 'Real-time updates'],
    companies: ['Google', 'Amazon', 'Bing'],
  },
];

const lldTopics: Topic[] = [
  {
    title: 'Design a Parking Lot',
    difficulty: 'Easy',
    icon: <Box className="w-5 h-5" />,
    description: 'Object-oriented design of a multi-level parking system with different vehicle types and payment.',
    keyPoints: ['Class hierarchy (Vehicle, Spot)', 'Strategy pattern for pricing', 'Observer for availability', 'Concurrency handling', 'Entrance/Exit management'],
    companies: ['Amazon', 'Google', 'Microsoft'],
  },
  {
    title: 'Design an Elevator System',
    difficulty: 'Medium',
    icon: <Workflow className="w-5 h-5" />,
    description: 'Multi-elevator scheduling system optimizing wait times and throughput in a building.',
    keyPoints: ['State machine (Idle, Moving, Door Open)', 'Scheduling algorithms (SCAN, LOOK)', 'Observer pattern', 'Priority queue for requests', 'Concurrency control'],
    companies: ['Microsoft', 'Goldman Sachs', 'Uber'],
  },
  {
    title: 'Design a Chess Game',
    difficulty: 'Medium',
    icon: <Cpu className="w-5 h-5" />,
    description: 'OOP design of a chess game with move validation, check/checkmate detection, and game state management.',
    keyPoints: ['Piece inheritance hierarchy', 'Command pattern for moves', 'Board representation', 'Move validation strategy', 'Undo/Redo with Memento'],
    companies: ['Amazon', 'Google', 'Bloomberg'],
  },
  {
    title: 'Design a Logging Framework',
    difficulty: 'Easy',
    icon: <FileCode className="w-5 h-5" />,
    description: 'Extensible logging library with multiple sinks, log levels, formatting, and thread-safety.',
    keyPoints: ['Singleton Logger', 'Strategy for log sinks', 'Chain of Responsibility', 'Builder for config', 'Thread-safe design'],
    companies: ['Microsoft', 'Atlassian', 'Splunk'],
  },
  {
    title: 'Design a LRU Cache',
    difficulty: 'Medium',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Implement a Least Recently Used cache with O(1) get and put operations.',
    keyPoints: ['Doubly Linked List + HashMap', 'O(1) time complexity', 'Thread-safe variant', 'Eviction policy', 'Generic type support'],
    companies: ['Meta', 'Amazon', 'Google'],
  },
  {
    title: 'Design a Distributed Lock',
    difficulty: 'Hard',
    icon: <Lock className="w-5 h-5" />,
    description: 'Thread-safe distributed locking mechanism for coordinating access across multiple services.',
    keyPoints: ['Mutex vs Semaphore', 'Redlock algorithm', 'Fencing tokens', 'TTL and auto-release', 'Deadlock prevention'],
    companies: ['Google', 'Amazon', 'Netflix'],
  },
];

interface Concept {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const coreConcepts: Concept[] = [
  {
    title: 'Scalability',
    icon: <Gauge className="w-5 h-5 text-blue-400" />,
    items: ['Horizontal vs Vertical scaling', 'Database sharding', 'Microservices architecture', 'Auto-scaling policies', 'Stateless design'],
  },
  {
    title: 'Databases',
    icon: <Database className="w-5 h-5 text-green-400" />,
    items: ['SQL vs NoSQL trade-offs', 'ACID properties', 'CAP theorem', 'Replication strategies', 'Indexing & query optimization'],
  },
  {
    title: 'Networking',
    icon: <Network className="w-5 h-5 text-purple-400" />,
    items: ['Load balancers (L4 vs L7)', 'CDN architecture', 'DNS resolution', 'API Gateway pattern', 'gRPC vs REST vs GraphQL'],
  },
  {
    title: 'Caching',
    icon: <Server className="w-5 h-5 text-orange-400" />,
    items: ['Cache-aside, Write-through, Write-back', 'Cache invalidation strategies', 'Redis vs Memcached', 'CDN caching', 'Browser & application caching'],
  },
  {
    title: 'Messaging',
    icon: <MessageSquare className="w-5 h-5 text-pink-400" />,
    items: ['Message queues (Kafka, RabbitMQ)', 'Pub/Sub pattern', 'Event-driven architecture', 'At-least-once vs exactly-once', 'Dead letter queues'],
  },
  {
    title: 'Security',
    icon: <Shield className="w-5 h-5 text-red-400" />,
    items: ['Authentication & Authorization', 'OAuth 2.0 & JWT', 'Rate limiting & DDoS protection', 'Data encryption (at rest & transit)', 'HTTPS / TLS'],
  },
];

const frameworkSteps = [
  { step: 'R', label: 'Requirements', desc: 'Clarify functional & non-functional requirements. Ask about scale, latency, consistency.' },
  { step: 'E', label: 'Estimation', desc: 'Back-of-the-envelope: QPS, storage, bandwidth, memory for caching.' },
  { step: 'S', label: 'Storage Schema', desc: 'Data model, SQL vs NoSQL choice, table schemas, access patterns.' },
  { step: 'H', label: 'High-Level Design', desc: 'Draw the architecture: clients, servers, load balancers, databases, caches.' },
  { step: 'A', label: 'API Design', desc: 'Define core API endpoints: method, path, request/response schemas.' },
  { step: 'D', label: 'Detailed Design', desc: 'Deep dive into 2-3 key components. Discuss trade-offs and alternatives.' },
  { step: 'E', label: 'Evaluate', desc: 'Address bottlenecks, single points of failure, scaling strategies.' },
  { step: 'D', label: 'Distinguish', desc: 'What makes your design unique? Discuss trade-offs you consciously made.' },
];

const difficultyColor: Record<string, string> = {
  Easy: 'bg-green-500/15 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/15 text-red-400 border-red-500/30',
};

// ======== Components ========

function TopicCard({ topic }: { topic: Topic }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group border border-border rounded-xl bg-card hover:bg-muted/30 transition-all cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-muted shrink-0">{topic.icon}</div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{topic.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{topic.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyColor[topic.difficulty]}`}>
              {topic.difficulty}
            </span>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3 animate-in slide-in-from-top-1 duration-200">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Key Discussion Points</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {topic.keyPoints.map((kp, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-muted border border-border/50">{kp}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Asked By</span>
            <div className="flex gap-1.5 mt-1.5">
              {topic.companies.map((c, i) => (
                <Badge key={i} variant="secondary" className="text-[10px]">{c}</Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <div className="border border-border rounded-xl bg-card p-4 hover:bg-muted/20 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-muted">{concept.icon}</div>
        <h3 className="font-semibold text-sm">{concept.title}</h3>
      </div>
      <ul className="space-y-1.5">
        {concept.items.map((item, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ======== Main Page ========

type Tab = 'resources' | 'whiteboard';

export default function SystemDesignPage() {
  const [activeTab, setActiveTab] = useState<Tab>('resources');

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col overflow-hidden">
      {/* Tab Bar */}
      <div className="border-b border-border bg-muted/10 px-6 flex items-center gap-1 shrink-0">
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'resources'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <BookOpen className="w-4 h-4 inline mr-2" />
          Study Resources
        </button>
        <button
          onClick={() => setActiveTab('whiteboard')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'whiteboard'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Pencil className="w-4 h-4 inline mr-2" />
          Whiteboard
        </button>
      </div>

      {/* Content */}
      {activeTab === 'whiteboard' ? (
        <div className="flex-1 min-h-0">
          <SystemDesignCanvas />
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6 space-y-10">

            {/* Hero */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">System Design Interview Prep</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Master High-Level Design (HLD) and Low-Level Design (LLD) with curated topics, core concepts, and an interactive whiteboard.
              </p>
              <Button variant="outline" className="mt-3" onClick={() => setActiveTab('whiteboard')}>
                <Pencil className="w-4 h-4 mr-2" /> Open Whiteboard to Practice
              </Button>
            </div>

            {/* RESHADED Framework */}
            <section>
              <h2 className="text-lg font-semibold mb-1">The RESHADED Framework</h2>
              <p className="text-sm text-muted-foreground mb-4">A structured approach to tackle any system design question in 45 minutes.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {frameworkSteps.map((s, i) => (
                  <div key={i} className="border border-border rounded-xl p-4 bg-card hover:bg-muted/20 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{s.step}</span>
                      <span className="font-semibold text-sm">{s.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* HLD Topics */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">High-Level Design (HLD)</h2>
                  <p className="text-sm text-muted-foreground">Architecture-level system design problems commonly asked in interviews.</p>
                </div>
                <Badge variant="outline" className="shrink-0">{hldTopics.length} Topics</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hldTopics.map((topic, i) => (
                  <TopicCard key={i} topic={topic} />
                ))}
              </div>
            </section>

            {/* LLD Topics */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Low-Level Design (LLD)</h2>
                  <p className="text-sm text-muted-foreground">Object-oriented design & class-level architecture problems.</p>
                </div>
                <Badge variant="outline" className="shrink-0">{lldTopics.length} Topics</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lldTopics.map((topic, i) => (
                  <TopicCard key={i} topic={topic} />
                ))}
              </div>
            </section>

            {/* Core Concepts */}
            <section>
              <h2 className="text-lg font-semibold mb-1">Core Concepts to Know</h2>
              <p className="text-sm text-muted-foreground mb-4">Building blocks you must understand before any system design interview.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {coreConcepts.map((concept, i) => (
                  <ConceptCard key={i} concept={concept} />
                ))}
              </div>
            </section>

            {/* Recommended Resources (external) */}
            <section className="pb-8">
              <h2 className="text-lg font-semibold mb-1">Recommended Reading</h2>
              <p className="text-sm text-muted-foreground mb-4">Top external resources to deepen system design knowledge.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: 'System Design Primer', desc: 'Comprehensive open-source guide by Donne Martin covering all fundamentals.', url: 'https://github.com/donnemartin/system-design-primer' },
                  { title: 'Designing Data-Intensive Applications', desc: "Martin Kleppmann's book on architecture of modern data systems.", url: 'https://dataintensive.net/' },
                  { title: 'ByteByteGo Newsletter', desc: "Alex Xu's visual system design breakdowns, from the DDIA author.", url: 'https://blog.bytebytego.com/' },
                  { title: 'Grokking System Design', desc: 'Step-by-step course covering 25+ system design interview questions.', url: 'https://www.designgurus.io/course/grokking-the-system-design-interview' },
                  { title: 'High Scalability Blog', desc: 'Real-world architecture case studies from companies like Netflix, Uber, etc.', url: 'http://highscalability.com/' },
                  { title: 'InfoQ Architecture', desc: 'Conference talks and articles on software architecture by industry experts.', url: 'https://www.infoq.com/architecture-design/' },
                ].map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="block border border-border rounded-xl p-4 bg-card hover:bg-muted/30 hover:border-primary/30 transition-all group">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-semibold text-sm">{r.title}</h3>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </a>
                ))}
              </div>
            </section>

          </div>
        </div>
      )}
    </div>
  );
}
