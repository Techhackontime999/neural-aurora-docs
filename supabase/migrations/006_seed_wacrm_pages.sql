-- ============================================================
-- WACRM / Neural Aurora CRM — Comprehensive Doc Pages
-- ============================================================
-- These pages cover every major feature of the CRM.
-- Uses INSERT WHERE NOT EXISTS so it's safe to re-run.
-- ============================================================

-- 9: Shared Inbox
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Shared Inbox', 'shared-inbox',
'<p>The shared inbox is the core of Neural Aurora CRM — a real-time, multi-agent WhatsApp message management system. Every team member can view, respond to, and manage conversations from a single unified interface.</p>

<h2>Key Features</h2>

<h3>Real-Time Conversations</h3>
<p>New messages appear instantly via Supabase Realtime subscriptions. The conversation list updates without page refresh, showing the latest message, sender info, and unread count.</p>

<h3>Message Threading</h3>
<p>Each contact has a dedicated message thread. The thread displays the full conversation history with clear visual separation between incoming and outgoing messages. Messages show timestamps, delivery status, and sender attribution.</p>

<h3>Rich Message Actions</h3>
<ul>
<li><strong>Reply</strong> — Send text, emoji, or template messages</li>
<li><strong>Quote Reply</strong> — Reply to a specific message with context</li>
<li><strong>Reactions</strong> — React to messages with emoji (stored in <code>message_reactions</code> table)</li>
<li><strong>Message Actions</strong> — Assign, snooze, or flag conversations</li>
</ul>

<h3>Contact Sidebar</h3>
<p>The contact sidebar (powered by <code>ContactSidebar</code> component) shows rich context while viewing a conversation:</p>
<ul>
<li>Contact name, phone number, and avatar</li>
<li>Tags and custom fields</li>
<li>Recent conversation history</li>
<li>Notes and interaction history</li>
</ul>

<h3>Template Picker</h3>
<p>Quickly send pre-approved WhatsApp message templates. The template picker (<code>TemplatePicker</code> component) shows available templates with preview, letting agents personalize and send with one click.</p>

<h3>Assignment & Collaboration</h3>
<p>Conversations can be assigned to specific team members. The inbox shows who is handling each conversation, preventing duplicate responses. Agents can leave internal notes visible only to the team.</p>

<h2>Architecture</h2>
<p>The inbox uses Supabase Realtime subscriptions for live updates. Messages are stored in the <code>messages</code> table with <code>conversation_id</code> for threading. Unread counts are computed and pushed via Realtime channels. The message composer supports the WhatsApp Cloud API send message endpoint for outgoing replies.</p>',
'Real-time shared inbox for team-based WhatsApp message management', 'published', 8, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'shared-inbox' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 10: Contact Management
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Contact Management', 'contact-management',
'<p>Neural Aurora CRM provides a full-featured contact management system integrated directly with WhatsApp conversations. Store, segment, and manage all your contacts in one place.</p>

<h2>Contact List</h2>
<p>The contacts page (<code>contacts/page.tsx</code>) displays all contacts in a sortable, searchable table. Each contact shows:</p>
<ul>
<li>Name and phone number</li>
<li>Assigned tags (color-coded)</li>
<li>Last conversation date</li>
<li>Total message count</li>
<li>Custom field values</li>
</ul>

<h2>Contact Detail View</h2>
<p>The <code>ContactDetailView</code> component provides a rich detail panel with:</p>
<ul>
<li><strong>Profile Info</strong> — Name, phone, avatar, creation date</li>
<li><strong>Tags</strong> — Assign and manage color-coded tags for segmentation</li>
<li><strong>Custom Fields</strong> — Store arbitrary key-value data per contact</li>
<li><strong>Notes</strong> — Internal notes visible to the team</li>
<li><strong>Conversation History</strong> — Full message history with this contact</li>
<li><strong>Interaction Stats</strong> — Message count, response time, last interaction</li>
</ul>

<h2>Contact Form</h2>
<p>The <code>ContactForm</code> component handles creating and editing contacts with fields for:</p>
<ul>
<li>Full name</li>
<li>Phone number (with country code validation via <code>phone-utils.ts</code>)</li>
<li>Email address</li>
<li>Tags (multi-select)</li>
<li>Custom fields (dynamic key-value pairs)</li>
<li>Notes</li>
</ul>

<h2>CSV Import</h2>
<p>The <code>ImportModal</code> component supports bulk importing contacts from CSV files:</p>
<ol>
<li>Download the template CSV</li>
<li>Fill in contact data (name, phone, tags, custom fields)</li>
<li>Upload and map columns</li>
<li>Preview and confirm import</li>
</ol>
<p>Duplicate phone numbers are automatically detected and merged.</p>

<h2>Tags & Segmentation</h2>
<p>Tags are managed through the <code>TagManager</code> component in settings. Each tag has:</p>
<ul>
<li>Name</li>
<li>Color (for visual identification)</li>
<li>Description</li>
</ul>
<p>Tags power contact segmentation for targeted broadcast campaigns and automation triggers.</p>',
'Full contact management with tags, custom fields, notes, and CSV import', 'published', 9, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'contact-management' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 11: Sales Pipelines
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Sales Pipelines', 'sales-pipelines',
'<p>Sales pipelines in Neural Aurora CRM give you a visual Kanban board to track deals from lead to close. Drag and drop deals across stages, track conversion rates, and measure pipeline value.</p>

<h2>Pipeline Board</h2>
<p>The <code>PipelineBoard</code> component renders a Kanban-style board with columns for each pipeline stage. Deals are displayed as cards that can be dragged between stages using drag-and-drop (powered by <code>@dnd-kit</code>).</p>

<h2>Deal Cards</h2>
<p>Each <code>DealCard</code> displays:</p>
<ul>
<li>Contact name and avatar</li>
<li>Deal value</li>
<li>Stage (color-coded)</li>
<li>Assigned agent</li>
<li>Last activity date</li>
<li>Tags and custom fields</li>
</ul>

<h2>Deal Form</h2>
<p>The <code>DealForm</code> component handles creating and editing deals:</p>
<ul>
<li>Link to existing contact or create new</li>
<li>Deal name and description</li>
<li>Value (currency)</li>
<li>Pipeline stage</li>
<li>Expected close date</li>
<li>Assigned team member</li>
<li>Notes and custom fields</li>
</ul>

<h2>Pipeline Settings</h2>
<p>The <code>PipelineSettings</code> component lets you configure:</p>
<ul>
<li><strong>Stage Names</strong> — Custom labels (e.g., Lead, Qualified, Negotiation, Closed Won, Closed Lost)</li>
<li><strong>Stage Order</strong> — Reorder stages by drag-and-drop</li>
<li><strong>Default Stage</strong> — Where new deals start</li>
<li><strong>Win/Loss Tracking</strong> — Mark deals as won or lost with optional reason</li>
</ul>

<h2>Pipeline Analytics</h2>
<p>The <code>PipelineAnalytics</code> component provides visual insights:</p>
<ul>
<li><strong>Conversion Rates</strong> — Percentage of deals moving between stages</li>
<li><strong>Pipeline Value</strong> — Total value of all deals by stage</li>
<li><strong>Win Rate</strong> — Percentage of deals marked won</li>
<li><strong>Average Deal Age</strong> — Time from creation to close</li>
<li><strong>Stage Velocity</strong> — Average time deals spend in each stage</li>
</ul>

<p>Pipeline data is stored in the <code>pipelines</code> and <code>deals</code> database tables, with enhancements from migration <code>002_pipelines_enhancements.sql</code>.</p>',
'Kanban sales pipelines with drag-and-drop deal management', 'published', 10, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'sales-pipelines' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 12: Broadcast Campaigns
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Broadcast Campaigns', 'broadcast-campaigns',
'<p>Broadcast campaigns let you send bulk WhatsApp messages to segmented contact lists using Meta-approved message templates. Schedule campaigns, track delivery, and measure engagement.</p>

<h2>Overview</h2>
<p>Broadcasts use pre-approved WhatsApp Business API message templates. This ensures compliance with Meta''s messaging policies and prevents account restrictions. Templates can include personalized variables like contact name, deal value, or custom fields.</p>

<h2>Campaign Wizard</h2>
<p>The broadcast campaign creation is a 4-step wizard:</p>

<h3>Step 1: Choose Template</h3>
<p>Select from your existing WhatsApp message templates. Templates are fetched from the Meta Cloud API and displayed with preview. You can see template variables (e.g., <code>{{1}}</code>, <code>{{2}}</code>) and map them to contact fields.</p>

<h3>Step 2: Select Audience</h3>
<p>Choose your target audience by:</p>
<ul>
<li><strong>All Contacts</strong> — Send to every contact</li>
<li><strong>Tag Filter</strong> — Send only to contacts with specific tags</li>
<li><strong>Custom Filter</strong> — Filter by custom field values, creation date, or last interaction</li>
<li><strong>Manual Selection</strong> — Pick specific contacts from the list</li>
</ul>

<h3>Step 3: Personalize</h3>
<p>Map template variables to contact data fields:</p>
<ul>
<li>Contact name</li>
<li>Custom field values</li>
<li>Deal information</li>
<li>Static text</li>
</ul>
<p>Preview a sample message with live variable substitution.</p>

<h3>Step 4: Schedule & Send</h3>
<p>Choose when to send the broadcast:</p>
<ul>
<li><strong>Send Now</strong> — Immediate delivery</li>
<li><strong>Schedule</strong> — Pick a specific date and time</li>
<li><strong>Recurring</strong> — Set up regular campaigns (daily, weekly, monthly)</li>
</ul>

<h2>Delivery Tracking</h2>
<p>Each broadcast campaign has a real-time dashboard showing:</p>
<ul>
<li><strong>Total Recipients</strong> — Number of contacts targeted</li>
<li><strong>Sent</strong> — Messages successfully sent</li>
<li><strong>Delivered</strong> — Messages confirmed delivered</li>
<li><strong>Read</strong> — Messages marked as read</li>
<li><strong>Replied</strong> — Recipients who replied</li>
<li><strong>Failed</strong> — Messages that failed to send</li>
</ul>
<p>Delivery status is tracked per-recipient in the <code>broadcast_recipients</code> table, using WhatsApp''s webhook status callbacks. The <code>broadcast-status.ts</code> utility handles status badge rendering.</p>

<h2>Template Management</h2>
<p>The <code>TemplateManager</code> component in settings lets you:</p>
<ul>
<li>View all Meta-approved templates</li>
<li>Create new template drafts</li>
<li>Submit templates for Meta review</li>
<li>Edit template content and variables</li>
<li>View template approval status</li>
</ul>',
'Send bulk WhatsApp messages with templates, scheduling, and delivery tracking', 'published', 11, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'broadcast-campaigns' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 13: No-Code Automations
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'No-Code Automations', 'no-code-automations',
'<p>No-code automations let you build powerful WhatsApp workflows without writing a single line of code. Set up triggers and actions to automate repetitive tasks, respond to customers instantly, and streamline your team''s workflow.</p>

<h2>How Automations Work</h2>
<p>Automations follow a simple trigger-action model. When a trigger condition is met (e.g., a contact sends a specific keyword), the automation engine executes a sequence of actions (e.g., send a reply, create a deal, assign a tag). Automations are stored in the <code>automations</code> table and evaluated by the engine on each incoming message.</p>

<h2>Trigger Types</h2>
<p>The automation engine supports <strong>7 trigger types</strong> (<code>steps-tree.ts</code>):</p>
<ul>
<li><strong>Message Received</strong> — Triggers when a new message arrives from any contact</li>
<li><strong>Keyword Match</strong> — Triggers when a message contains specific keywords or phrases</li>
<li><strong>Contact Created</strong> — Fires when a new contact is added</li>
<li><strong>Deal Stage Change</strong> — Triggers when a deal moves between pipeline stages</li>
<li><strong>Tag Added</strong> — Fires when a contact is assigned a specific tag</li>
<li><strong>Scheduled</strong> — Time-based trigger (cron-driven, runs every minute)</li>
<li><strong>Manual</strong> — Triggered manually from the contact detail view</li>
</ul>

<h2>Action Types</h2>
<p><strong>11 action types</strong> are available per the <code>steps-tree.ts</code> definitions:</p>
<ul>
<li><strong>Send Message</strong> — Reply with a text or template message</li>
<li><strong>Add Tag</strong> — Assign a tag to the contact</li>
<li><strong>Remove Tag</strong> — Remove a tag from the contact</li>
<li><strong>Create Deal</strong> — Create a new deal in a pipeline</li>
<li><strong>Update Deal Stage</strong> — Move a deal to a different stage</li>
<li><strong>Assign Contact</strong> — Assign the conversation to a team member</li>
<li><strong>Webhook</strong> — Call an external URL with contact data</li>
<li><strong>Delay</strong> — Wait for a specified duration before next action</li>
<li><strong>Condition</strong> — Branch based on contact data or message content</li>
<li><strong>Send to AI</strong> — Pass the message to the AI automation engine</li>
<li><strong>End Flow</strong> — Stop the automation execution</li>
</ul>

<h2>Automation Builder</h2>
<p>The <code>AutomationBuilder</code> component provides a visual interface for creating automations:</p>
<ul>
<li>Select trigger type and configure conditions</li>
<li>Add action steps in sequence</li>
<li>Configure conditional branching</li>
<li>Test the automation with sample data</li>
<li>Enable/disable automations with a toggle</li>
</ul>

<h2>Execution Engine</h2>
<p>The automation engine (<code>engine.ts</code>) runs server-side via API routes:</p>
<ul>
<li>Evaluates triggers on incoming WhatsApp messages</li>
<li>Executes actions in order with error handling</li>
<li>Logs each step for debugging</li>
<li>Rate-limited to prevent abuse</li>
<li>Cron-driven for scheduled triggers</li>
<li>Uses service-role Supabase client for cross-tenant operations</li>
</ul>

<p>Automation triggers are indexed from the <code>automations</code> table, enhanced by migrations <code>006_automations.sql</code> and <code>007_automations_increment_counter.sql</code>.</p>',
'Build powerful WhatsApp workflows with 7 triggers and 11 actions', 'published', 12, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'no-code-automations' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 14: Visual Flow Builder
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Visual Flow Builder', 'visual-flow-builder',
'<p>The Visual Flow Builder (Beta) lets you design sophisticated conversational flows with a drag-and-drop canvas. Create multi-step chatbot experiences, branching dialogues, and automated conversation paths — all without code.</p>

<h2>Overview</h2>
<p>Unlike simple automations which are linear trigger-action sequences, the flow builder provides a full visual canvas where you can design complex, branching conversation trees. Flows can handle multiple paths, fallback logic, and timed transitions. This feature is in Beta and powered by migration <code>010_flows.sql</code>.</p>

<h2>Flow Builder Canvas</h2>
<p>The <code>FlowBuilder</code> component provides a drag-and-drop canvas (powered by <code>@dnd-kit</code>) where you can:</p>
<ul>
<li><strong>Add Nodes</strong> — Drag nodes from the palette onto the canvas</li>
<li><strong>Connect Nodes</strong> — Draw connections between nodes to define flow paths</li>
<li><strong>Arrange</strong> — Freely position nodes on the canvas</li>
<li><strong>Zoom & Pan</strong> — Navigate large flows with zoom and pan controls</li>
<li><strong>Delete</strong> — Remove nodes or connections</li>
</ul>

<h2>Node Types</h2>
<ul>
<li><strong>Start</strong> — Entry point of the flow (triggered by incoming message)</li>
<li><strong>Send Message</strong> — Send a text or template message to the contact</li>
<li><strong>Ask Question</strong> — Wait for user input and branch based on response</li>
<li><strong>Condition</strong> — Branch based on contact data or message content</li>
<li><strong>API Call</strong> — Make an external HTTP request</li>
<li><strong>Update Contact</strong> — Modify contact fields or tags</li>
<li><strong>Create Deal</strong> — Create or update a deal</li>
<li><strong>Transfer to Agent</strong> — Hand off to a human agent</li>
<li><strong>Delay</strong> — Wait for a set duration</li>
<li><strong>End</strong> — Terminate the flow</li>
<li><strong>Fallback</strong> — Default path when no other condition matches</li>
</ul>

<h2>Flow Execution Engine</h2>
<p>The flow execution engine (<code>engine.ts</code> in <code>src/lib/flows/</code>) handles runtime execution:</p>
<ul>
<li>Evaluates which flow to start based on incoming messages</li>
<li>Tracks active flow sessions per contact</li>
<li>Executes nodes in order, following branches</li>
<li>Handles timeouts and fallback branches</li>
<li>Supports scheduled/delayed node execution via cron</li>
<li>Logs run history for debugging and analytics</li>
</ul>

<h2>Flow Templates</h2>
<p>Pre-built flow templates are available to jumpstart common patterns:</p>
<ul>
<li><strong>Lead Qualification</strong> — Ask qualifying questions and route leads</li>
<li><strong>Appointment Booking</strong> — Collect date/time preferences</li>
<li><strong>FAQs</strong> — Answer common questions automatically</li>
<li><strong>Order Status</strong> — Let customers check order status</li>
<li><strong>Feedback Collection</strong> — Gather post-interaction feedback</li>
</ul>

<h2>Run History & Analytics</h2>
<p>Each flow execution is logged with:</p>
<ul>
<li>Contact and conversation context</li>
<li>Nodes visited and decisions made</li>
<li>Completion status (completed, abandoned, error)</li>
<li>Execution duration</li>
<li>Fallback usage statistics</li>
</ul>

<p>Flows are stored in the <code>flows</code> table, with migration <code>012_flows_increment_counter.sql</code> adding execution counters. The <code>flows/cron</code> API endpoint handles stale-run cleanup.</p>',
'Design conversational flows with a drag-and-drop visual canvas', 'published', 13, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'visual-flow-builder' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 15: AI Automation
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'AI Automation', 'ai-automation',
'<p>AI Automation (Beta) lets you control your CRM using natural language. Powered by OpenAI-compatible LLMs, the AI assistant can answer questions, execute CRM actions, and help manage your WhatsApp conversations — all through a chat interface.</p>

<h2>How It Works</h2>
<p>The AI Automation uses function-calling (tool-use) with an LLM provider (<code>src/lib/ai/provider.ts</code>). The AI receives the user''s natural language request and determines which tool(s) to call. It supports <strong>37 tool definitions</strong> covering the full range of CRM operations.</p>

<h2>AI Chat Interface</h2>
<p>The <code>AIChatbox</code> component provides the chat interface at <code>/ai-automation</code>:</p>
<ul>
<li>Natural language input</li>
<li>Conversation history with AI responses</li>
<li>Tool execution results displayed inline</li>
<li>Confirmation prompts for destructive actions</li>
<li>Fallback to regex-based parsing when no AI key is configured</li>
</ul>

<h2>Available Tools</h2>
<p>The 37 tool definitions (<code>src/lib/ai/tools.ts</code>) cover:</p>
<ul>
<li><strong>Contacts</strong> — Search, create, update, tag, import</li>
<li><strong>Messages</strong> — Send, search conversation history, get stats</li>
<li><strong>Deals</strong> — Create, update stage, get pipeline summary</li>
<li><strong>Broadcasts</strong> — Create campaign, check status</li>
<li><strong>Automations</strong> — List, enable/disable, trigger manually</li>
<li><strong>Flows</strong> — List active flows, check run history</li>
<li><strong>Analytics</strong> — Dashboard stats, conversation volume, response times</li>
<li><strong>Settings</strong> — Get/set preferences, manage tags</li>
</ul>

<h2>Supported LLM Providers</h2>
<p>The AI provider supports any OpenAI-compatible API:</p>
<ul>
<li>OpenAI (GPT-4, GPT-4o, GPT-3.5)</li>
<li>Anthropic Claude (via API proxy)</li>
<li>Local LLMs (via Ollama, LM Studio, etc.)</li>
<li>Any custom endpoint with OpenAI-compatible chat completions</li>
</ul>
<p>Configure via environment variables: <code>AI_API_BASE</code>, <code>AI_API_KEY</code>, and <code>AI_MODEL</code>.</p>

<h2>Fallback Mode</h2>
<p>When no AI API key is configured, the system falls back to regex-based intent parsing. While less powerful, it can still handle basic commands like "send message to John" or "create deal for Sarah worth $500".</p>

<h2>Security</h2>
<p>AI actions are scoped to the authenticated user''s data. The AI cannot access conversations, contacts, or deals belonging to other users. Destructive actions (delete, archive) require explicit user confirmation before execution.</p>',
'Control your CRM with natural language using OpenAI-compatible LLMs', 'published', 14, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'ai-automation' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 16: Dashboard & Analytics
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Dashboard & Analytics', 'dashboard-analytics',
'<p>The Dashboard provides a real-time overview of your CRM performance with key metrics, charts, and activity tracking. It''s the first thing you see when logging in, giving you an instant snapshot of your business.</p>

<h2>Metric Cards</h2>
<p>The <code>MetricCard</code> component displays key performance indicators:</p>
<ul>
<li><strong>Total Conversations</strong> — Active conversations this period</li>
<li><strong>New Messages</strong> — Messages received in the last 24 hours</li>
<li><strong>Unresolved</strong> — Conversations needing attention</li>
<li><strong>Avg Response Time</strong> — Average time to first response</li>
<li><strong>Pipeline Value</strong> — Total value of active deals</li>
<li><strong>Broadcast Reach</strong> — Total broadcast recipients this period</li>
</ul>

<h2>Charts & Visualizations</h2>

<h3>Conversations Chart</h3>
<p>The <code>ConversationsChart</code> component shows message volume over time with daily/weekly/monthly granularity. Helps identify peak conversation periods and team workload patterns.</p>

<h3>Response Time Chart</h3>
<p>The <code>ResponseTimeChart</code> component tracks average first-response time and median response time over time. Monitor team responsiveness and identify bottlenecks.</p>

<h3>Pipeline Donut</h3>
<p>The <code>PipelineDonut</code> component visualizes deal distribution across pipeline stages. Shows both count and value percentage for each stage.</p>

<h2>Activity Feed</h2>
<p>The <code>ActivityFeed</code> component shows real-time activity:</p>
<ul>
<li>New messages received</li>
<li>Deals created or moved</li>
<li>Contacts added</li>
<li>Broadcast status updates</li>
<li>Automation and flow executions</li>
<li>Team member actions</li>
</ul>

<h2>Quick Actions</h2>
<p>The <code>QuickActions</code> component provides one-click access to common tasks:</p>
<ul>
<li>New message</li>
<li>Add contact</li>
<li>Create deal</li>
<li>New broadcast</li>
<li>View reports</li>
</ul>

<h2>Data Sources</h2>
<p>Dashboard data is fetched server-side via the <code>src/lib/dashboard/queries.ts</code> module, which runs SQL queries against the Supabase database. Data is cached and refreshed at configurable intervals. Real-time updates are pushed via Supabase Realtime subscriptions.</p>',
'Real-time CRM dashboard with metrics, charts, and activity feed', 'published', 15, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'dashboard-analytics' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 17: Admin Panel
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Admin Panel', 'admin-panel',
'<p>The Admin Panel provides user management, approval workflows, and role-based access control for your CRM instance. The first user to sign up is automatically granted admin privileges; all subsequent users require admin approval.</p>

<h2>User Management</h2>
<p>The admin users page (<code>admin/users</code>) provides full user lifecycle management:</p>

<h3>User List</h3>
<ul>
<li>All users with name, email, role, and status</li>
<li>Search and filter by name, email, role, or status</li>
<li>Sort by registration date, last login, or name</li>
</ul>

<h3>Approval Workflow</h3>
<ul>
<li><strong>Pending Approval</strong> — New users wait for admin approval</li>
<li><strong>Approve</strong> — Grant access to the CRM</li>
<li><strong>Reject</strong> — Deny access (user sees approval-pending page)</li>
<li><strong>Suspend</strong> — Temporarily disable access for existing users</li>
<li><strong>Delete</strong> — Permanently remove user and their data</li>
</ul>

<h3>Role Management</h3>
<ul>
<li><strong>Admin</strong> — Full system access, can manage users and settings</li>
<li><strong>Agent</strong> — Can use all CRM features but cannot access admin panel</li>
<li><strong>Viewer</strong> — Read-only access to conversations and reports</li>
</ul>

<h2>Approval Flow</h2>
<ol>
<li>User signs up via <code>/signup</code></li>
<li>User is redirected to <code>/approval-pending</code> with status "pending approval"</li>
<li>Admin receives notification (via in-app or email)</li>
<li>Admin approves or rejects via <code>/admin/users</code></li>
<li>Approved user can now log in and access the dashboard</li>
</ol>
<p>This flow is enforced by the middleware (<code>proxy.ts</code>) and powered by migration <code>013_admin_approval.sql</code> and <code>014_fix_admin_rls_recursion.sql</code>.</p>

<h2>Beta Features Management</h2>
<p>Admins can enable or disable beta features for individual users:</p>
<ul>
<li><strong>Visual Flow Builder</strong> — Toggle access to the flow builder</li>
<li><strong>AI Automation</strong> — Toggle access to AI features</li>
<li><strong>Broadcast Campaigns</strong> — Toggle broadcast capabilities</li>
</ul>
<p>Beta feature flags are stored per-profile in the <code>profile_beta_features</code> migration (<code>011_profile_beta_features.sql</code>).</p>

<h2>Audit Logging</h2>
<p>All admin actions are logged for audit purposes, including:</p>
<ul>
<li>User approvals and rejections</li>
<li>Role changes</li>
<li>Beta feature toggles</li>
<li>Account suspensions</li>
</ul>',
'User management, approval workflows, and role-based access control', 'published', 16, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'admin-panel' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 18: Settings & Configuration
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Settings & Configuration', 'settings-configuration',
'<p>The Settings panel lets users and admins configure their CRM experience, manage WhatsApp integration, and customize the system to their needs.</p>

<h2>Profile Settings</h2>
<p>The <code>ProfileForm</code> component handles user profile management:</p>
<ul>
<li>Full name</li>
<li>Email address</li>
<li>Avatar upload (stored in Supabase Storage via migration <code>008_profile_avatars_storage.sql</code>)</li>
<li>Phone number</li>
<li>Timezone</li>
</ul>

<h2>Password Management</h2>
<p>The <code>PasswordForm</code> component lets users change their password securely via Supabase Auth.</p>

<h2>WhatsApp Configuration</h2>
<p>The <code>WhatsappConfig</code> component (<code>src/components/settings/whatsapp-config.tsx</code>) manages the WhatsApp Cloud API connection:</p>
<ul>
<li><strong>Phone Number ID</strong> — Your WhatsApp Business phone number ID</li>
<li><strong>Access Token</strong> — WhatsApp Cloud API access token (encrypted at rest)</li>
<li><strong>Webhook URL</strong> — Display-only, shows your current webhook endpoint</li>
<li><strong>Verify Token</strong> — Your webhook verification token</li>
<li><strong>Connection Status</strong> — Test and verify the WhatsApp connection</li>
<li><strong>Business Account ID</strong> — Meta Business Account identifier</li>
</ul>
<p>Tokens are encrypted using AES-256-GCM (<code>src/lib/whatsapp/encryption.ts</code>) before storage.</p>

<h2>Tag Manager</h2>
<p>The <code>TagManager</code> component (<code>src/components/settings/tag-manager.tsx</code>) lets you create and manage contact tags:</p>
<ul>
<li>Create new tags with name and color</li>
<li>Edit existing tags</li>
<li>Delete unused tags</li>
<li>View tag usage statistics</li>
</ul>

<h2>Template Manager</h2>
<p>The <code>TemplateManager</code> component (<code>src/components/settings/template-manager.tsx</code>) manages WhatsApp message templates:</p>
<ul>
<li>View all approved, pending, and rejected templates</li>
<li>Create new template drafts</li>
<li>Submit templates for Meta approval</li>
<li>Edit template content, header, body, footer, and buttons</li>
<li>View template analytics (sent, delivered, read rates)</li>
</ul>

<h2>Appearance & Theme</h2>
<p>The <code>AppearancePanel</code> component (<code>src/components/settings/appearance-panel.tsx</code>) lets users customize the UI:</p>
<ul>
<li><strong>5 Color Themes</strong> — Neural Aurora (default), Midnight, Forest, Ocean, Sunset</li>
<li><strong>Dark Mode</strong> — Toggle between light and dark mode</li>
<li><strong>Compact Mode</strong> — Reduce spacing for denser information display</li>
</ul>
<p>Themes are defined in <code>src/lib/themes.ts</code> and applied via CSS custom properties on the <code>&lt;html&gt;</code> element.</p>

<h2>Active Sessions</h2>
<p>The <code>SessionsCard</code> component displays active user sessions with the ability to revoke sessions remotely.</p>',
'Profile, WhatsApp, tags, templates, themes, and account configuration', 'published', 17, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'settings-configuration' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 19: Security
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Security', 'security',
'<p>Neural Aurora CRM is built with security as a core principle. Multi-tenancy via Row-Level Security, end-to-end encryption for WhatsApp tokens, webhook signature verification, and rate limiting protect your data and your customers.</p>

<h2>Row-Level Security (RLS)</h2>
<p>Every database table uses Supabase RLS to ensure users can only access their own data:</p>
<ul>
<li><strong>Profiles</strong> — Users can view and edit their own profile; admins can view all</li>
<li><strong>Conversations & Messages</strong> — Scoped by <code>user_id</code>, users only see their own conversations</li>
<li><strong>Contacts</strong> — Each user sees only their contacts</li>
<li><strong>Deals</strong> — Scoped to the owning user</li>
<li><strong>Broadcasts</strong> — Users see only their own campaigns</li>
<li><strong>Automations & Flows</strong> — Scoped by <code>user_id</code></li>
</ul>
<p>RLS policies are defined across all 14 migrations and enforced at the database level.</p>

<h2>WhatsApp Token Encryption</h2>
<p>WhatsApp access tokens are encrypted at rest using AES-256-GCM (<code>src/lib/whatsapp/encryption.ts</code>):</p>
<ul>
<li>Uses a 64-character hex <code>ENCRYPTION_KEY</code> environment variable</li>
<li>Each token gets a unique initialization vector (IV)</li>
<li>Authenticated encryption prevents tampering</li>
<li>Decrypted only in memory when needed to send messages</li>
<li>Extensively unit tested (<code>encryption.test.ts</code>)</li>
</ul>

<h2>Webhook Signature Verification</h2>
<p>Incoming WhatsApp webhooks are verified using HMAC-SHA256 (<code>src/lib/whatsapp/webhook-signature.ts</code>):</p>
<ul>
<li>Each request includes a <code>X-Hub-Signature-256</code> header</li>
<li>The signature is computed from the request body and <code>META_APP_SECRET</code></li>
<li>Only requests with valid signatures are processed</li>
<li>Prevents impersonation and replay attacks</li>
<li>Unit tested (<code>webhook-signature.test.ts</code>)</li>
</ul>

<h2>Rate Limiting</h2>
<p>The <code>rate-limit.ts</code> utility (<code>src/lib/rate-limit.ts</code>) prevents abuse:</p>
<ul>
<li>Rate limits API requests per user/IP</li>
<li>Configurable limits per endpoint</li>
<li>Sliding window algorithm</li>
<li>Returns <code>429 Too Many Requests</code> when exceeded</li>
<li>Unit tested (<code>rate-limit.test.ts</code>)</li>
</ul>

<h2>Auth Security</h2>
<ul>
<li><strong>Supabase SSR Auth</strong> — Cookie-based sessions with automatic refresh</li>
<li><strong>Password Hashing</strong> — Supabase Auth handles bcrypt password hashing</li>
<li><strong>Session Management</strong> — View and revoke active sessions</li>
<li><strong>Approval Workflow</strong> — New users require admin approval</li>
<li><strong>Middleware Protection</strong> — All routes except auth pages require authentication</li>
</ul>

<h2>Security Headers</h2>
<p>The Next.js config (<code>next.config.ts</code>) sets security headers:</p>
<ul>
<li>Content-Security-Policy-Report-Only</li>
<li>Strict-Transport-Security (HSTS)</li>
<li>X-Content-Type-Options: nosniff</li>
<li>Referrer-Policy</li>
<li>Permissions-Policy</li>
</ul>',
'RLS, encryption, webhook verification, rate limiting, and auth security', 'published', 18, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'security' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 20: API Reference
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'API Reference', 'api-reference',
'<p>Neural Aurora CRM exposes a comprehensive REST API through Next.js API routes. These endpoints power the frontend and are available for custom integrations.</p>

<h2>Authentication</h2>
<p>All API routes require authentication. The middleware (<code>proxy.ts</code>) checks for a valid session cookie. API routes use the Supabase server client for session verification.</p>

<h2>WhatsApp API</h2>

<h3>Webhook</h3>
<p><code>POST /api/whatsapp/webhook</code> — Receive incoming WhatsApp messages (Meta Cloud API callback)</p>
<p><code>GET /api/whatsapp/webhook</code> — Webhook verification challenge (Meta setup)</p>

<h3>Messaging</h3>
<ul>
<li><code>POST /api/whatsapp/send</code> — Send a text or template message</li>
<li><code>POST /api/whatsapp/react</code> — React to a message with emoji</li>
<li><code>GET /api/whatsapp/media/:id</code> — Proxy media downloads from WhatsApp</li>
</ul>

<h3>Templates & Broadcast</h3>
<ul>
<li><code>GET /api/whatsapp/templates</code> — List message templates</li>
<li><code>POST /api/whatsapp/templates</code> — Create a new template</li>
<li><code>POST /api/whatsapp/broadcast</code> — Send a broadcast campaign</li>
<li><code>GET /api/whatsapp/config</code> — Get WhatsApp configuration</li>
<li><code>PUT /api/whatsapp/config</code> — Update WhatsApp configuration</li>
</ul>

<h2>Automations API</h2>
<ul>
<li><code>GET /api/automations</code> — List all automations</li>
<li><code>POST /api/automations</code> — Create a new automation</li>
<li><code>GET /api/automations/:id</code> — Get automation details</li>
<li><code>PUT /api/automations/:id</code> — Update an automation</li>
<li><code>DELETE /api/automations/:id</code> — Delete an automation</li>
<li><code>POST /api/automations/engine</code> — Trigger automation engine manually</li>
<li><code>GET /api/automations/cron</code> — Cron endpoint for scheduled automations</li>
</ul>

<h2>Flows API</h2>
<ul>
<li><code>GET /api/flows</code> — List all flows</li>
<li><code>POST /api/flows</code> — Create a new flow</li>
<li><code>GET /api/flows/:id</code> — Get flow details with node graph</li>
<li><code>PUT /api/flows/:id</code> — Update a flow</li>
<li><code>DELETE /api/flows/:id</code> — Delete a flow</li>
<li><code>GET /api/flows/templates</code> — List flow templates</li>
<li><code>GET /api/flows/cron</code> — Cron endpoint for stale flow cleanup</li>
</ul>

<h2>AI Automation API</h2>
<ul>
<li><code>POST /api/ai-automation</code> — Send a natural language command to the AI</li>
</ul>

<h2>Admin API</h2>
<ul>
<li><code>GET /api/admin/users</code> — List all users</li>
<li><code>POST /api/admin/users</code> — Update user role or status</li>
<li><code>DELETE /api/admin/users/:id</code> — Delete a user</li>
</ul>

<h2>Error Handling</h2>
<p>All API endpoints return consistent JSON responses:</p>
<pre><code>// Success
{ "data": { ... } }

// Error
{ "error": "Description of what went wrong" }</code></pre>
<p>HTTP status codes: <code>200</code> (success), <code>201</code> (created), <code>400</code> (bad request), <code>401</code> (unauthorized), <code>403</code> (forbidden), <code>404</code> (not found), <code>429</code> (rate limited), <code>500</code> (server error).</p>',
'REST API reference for all CRM endpoints', 'published', 19, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'api-reference' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 21: Database Schema
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Database Schema', 'database-schema',
'<p>Neural Aurora CRM uses PostgreSQL via Supabase with 14 versioned migrations. The schema is designed for multi-tenancy, performance, and data integrity.</p>

<h2>Core Tables</h2>

<h3>profiles</h3>
<p>User profiles linked to <code>auth.users</code>:</p>
<ul>
<li><code>id</code> — UUID primary key</li>
<li><code>user_id</code> — References <code>auth.users(id)</code></li>
<li><code>full_name</code>, <code>email</code>, <code>avatar_url</code></li>
<li><code>role</code> — <code>admin</code> or <code>user</code></li>
<li><code>is_approved</code> — Admin approval status</li>
<li><code>beta_features</code> — JSONB for beta feature flags (added in migration 011)</li>
</ul>

<h3>contacts</h3>
<p>WhatsApp contacts with tags and custom fields:</p>
<ul>
<li><code>id</code>, <code>user_id</code>, <code>name</code>, <code>phone</code></li>
<li><code>tags</code> — Array of tag references</li>
<li><code>custom_fields</code> — JSONB for arbitrary key-value data</li>
<li><code>notes</code>, <code>avatar_url</code></li>
<li><code>last_message_at</code>, <code>message_count</code></li>
</ul>

<h3>conversations</h3>
<p>Message threads grouped by contact:</p>
<ul>
<li><code>id</code>, <code>user_id</code>, <code>contact_id</code></li>
<li><code>status</code> — <code>active</code>, <code>resolved</code>, <code>snoozed</code></li>
<li><code>assigned_to</code> — Team member assignment</li>
<li><code>last_message_at</code>, <code>unread_count</code></li>
</ul>

<h3>messages</h3>
<p>Individual WhatsApp messages:</p>
<ul>
<li><code>id</code>, <code>conversation_id</code>, <code>sender_id</code></li>
<li><code>content</code> — Message text</li>
<li><code>message_type</code> — <code>text</code>, <code>image</code>, <code>template</code>, etc.</li>
<li><code>wa_message_id</code> — WhatsApp message ID for status tracking</li>
<li><code>status</code> — <code>sent</code>, <code>delivered</code>, <code>read</code>, <code>failed</code></li>
</ul>

<h3>pipelines &amp; deals</h3>
<ul>
<li><code>pipelines</code> — Pipeline definitions with stage names and order</li>
<li><code>deals</code> — Individual deals linked to contacts, with value, stage, and expected close date</li>
</ul>

<h3>broadcasts &amp; broadcast_recipients</h3>
<ul>
<li><code>broadcasts</code> — Campaign definitions with template, audience, schedule</li>
<li><code>broadcast_recipients</code> — Per-recipient delivery status with WhatsApp message IDs</li>
</ul>

<h3>automations</h3>
<p>No-code automation definitions:</p>
<ul>
<li>Trigger configuration (type, conditions)</li>
<li>Action steps (sequence of actions)</li>
<li>Execution counter, enabled/disabled status</li>
</ul>

<h3>flows</h3>
<p>Visual flow definitions:</p>
<ul>
<li>Node graph stored as JSONB</li>
<li>Execution counter and run history</li>
<li>Active session tracking per contact</li>
</ul>

<h2>Migration History</h2>
<table>
<tr><th>#</th><th>File</th><th>Purpose</th></tr>
<tr><td>001</td><td>initial_schema.sql</td><td>Core tables: profiles, contacts, conversations, messages, pipelines, deals, broadcasts, tags</td></tr>
<tr><td>002</td><td>pipelines_enhancements.sql</td><td>Pipeline stage ordering, deal analytics fields</td></tr>
<tr><td>003</td><td>broadcast_recipient_wamid.sql</td><td>WhatsApp message IDs for delivery tracking</td></tr>
<tr><td>004</td><td>contact_delete_set_null.sql</td><td>Preserve messages when contacts are deleted</td></tr>
<tr><td>005</td><td>broadcast_counts_incremental.sql</td><td>Incremental broadcast counters</td></tr>
<tr><td>006</td><td>automations.sql</td><td>Automations table and engine support</td></tr>
<tr><td>007</td><td>automations_increment_counter.sql</td><td>Automation execution counters</td></tr>
<tr><td>008</td><td>profile_avatars_storage.sql</td><td>Supabase Storage bucket for avatars</td></tr>
<tr><td>009</td><td>message_actions.sql</td><td>Message reactions and action tracking</td></tr>
<tr><td>010</td><td>flows.sql</td><td>Visual flow builder tables</td></tr>
<tr><td>011</td><td>profile_beta_features.sql</td><td>Per-user beta feature flags</td></tr>
<tr><td>012</td><td>flows_increment_counter.sql</td><td>Flow execution counters</td></tr>
<tr><td>013</td><td>admin_approval.sql</td><td>Admin approval workflow</td></tr>
<tr><td>014</td><td>fix_admin_rls_recursion.sql</td><td>RLS recursion fix for admin checks</td></tr>
</table>',
'Complete database schema with all 14 migrations documented', 'published', 20, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'database-schema' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 22: Project Structure
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Project Structure', 'project-structure',
'<p>Neural Aurora CRM follows a clean, modular architecture built on Next.js 16 App Router. Here''s a comprehensive guide to the codebase layout.</p>

<h2>Top-Level Structure</h2>
<pre><code>wacrm/
├── src/                    # Application source code
│   ├── app/                # Next.js App Router pages &amp; API
│   ├── components/         # React components
│   ├── hooks/              # React context providers
│   ├── lib/                # Shared utilities &amp; business logic
│   ├── types/              # TypeScript type definitions
│   └── proxy.ts            # Auth middleware
├── supabase/
│   └── migrations/         # 14 database migrations
├── public/                 # Static assets
└── taste-skill/            # Design system files</code></pre>

<h2>Source Code Deep Dive</h2>

<h3>src/app/ — Pages &amp; Routes</h3>
<pre><code>src/app/
├── (auth)/                 # Auth pages (login, signup, forgot-password)
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx
├── (dashboard)/            # Main application pages
│   ├── dashboard/page.tsx          # Overview &amp; analytics
│   ├── inbox/page.tsx              # Shared WhatsApp inbox
│   ├── contacts/page.tsx           # Contact management
│   ├── pipelines/page.tsx          # Sales Kanban board
│   ├── broadcasts/page.tsx         # Broadcast campaigns
│   │   ├── new/page.tsx            # Campaign wizard
│   │   └── [id]/page.tsx           # Campaign detail
│   ├── automations/page.tsx        # No-code automations
│   │   ├── new/page.tsx            # Automation builder
│   │   └── [id]/page.tsx           # Automation detail
│   ├── flows/page.tsx              # Visual flow builder
│   │   └── [id]/page.tsx           # Flow editor
│   ├── ai-automation/page.tsx      # AI chat interface
│   ├── admin/users/page.tsx        # User management
│   ├── settings/page.tsx           # Settings panel
│   └── layout.tsx                  # Dashboard shell layout
├── api/                    # REST API routes
│   ├── whatsapp/           # WhatsApp integration
│   ├── automations/        # Automation CRUD &amp; engine
│   ├── flows/              # Flow CRUD &amp; engine
│   ├── ai-automation/      # AI chat endpoint
│   └── admin/              # Admin endpoints
└── approval-pending/page.tsx</code></pre>

<h3>src/components/ — React Components</h3>
<pre><code>src/components/
├── ui/                    # 22 shadcn-inspired primitives
│   ├── button.tsx, card.tsx, dialog.tsx, input.tsx ...
│   └── neural-logo.tsx    # Neural Aurora branded logo
├── inbox/                 # Inbox components
│   ├── conversation-list.tsx
│   ├── message-thread.tsx
│   ├── message-bubble.tsx
│   ├── message-composer.tsx
│   ├── contact-sidebar.tsx
│   └── template-picker.tsx
├── contacts/              # Contact components
│   ├── contact-detail-view.tsx
│   ├── contact-form.tsx
│   └── import-modal.tsx
├── pipelines/             # Pipeline components
│   ├── pipeline-board.tsx
│   ├── deal-card.tsx
│   ├── deal-form.tsx
│   └── pipeline-analytics.tsx
├── broadcasts/            # Broadcast components
│   ├── step1-choose-template.tsx
│   ├── step2-select-audience.tsx
│   ├── step3-personalize.tsx
│   └── step4-schedule-send.tsx
├── automations/           # Automation components
│   └── automation-builder.tsx
├── flows/                 # Flow components
│   └── flow-builder.tsx
├── ai-automation/         # AI components
│   └── ai-chatbox.tsx
├── dashboard/             # Dashboard components
│   ├── metric-card.tsx
│   ├── conversations-chart.tsx
│   ├── response-time-chart.tsx
│   ├── pipeline-donut.tsx
│   └── activity-feed.tsx
├── layout/                # Layout components
│   ├── header.tsx
│   └── sidebar.tsx
└── settings/              # Settings components
    ├── profile-form.tsx
    ├── password-form.tsx
    ├── whatsapp-config.tsx
    ├── tag-manager.tsx
    ├── template-manager.tsx
    ├── appearance-panel.tsx
    └── sessions-card.tsx</code></pre>

<h3>src/lib/ — Business Logic</h3>
<pre><code>src/lib/
├── supabase/              # Database clients
│   ├── client.ts          # Browser singleton
│   └── server.ts          # Server cookie-based
├── whatsapp/              # WhatsApp Cloud API integration
│   ├── meta-api.ts        # HTTP client for Meta API
│   ├── encryption.ts      # AES-256-GCM token encryption
│   ├── webhook-signature.ts # HMAC-SHA256 verification
│   └── phone-utils.ts     # Phone number validation
├── automations/           # Automation engine
│   ├── engine.ts          # Trigger evaluation &amp; action execution
│   ├── validate.ts        # Automation validation
│   ├── steps-tree.ts      # Trigger &amp; action type definitions
│   └── meta-send.ts       # WhatsApp send wrapper
├── flows/                 # Flow engine
│   ├── engine.ts          # Flow execution engine
│   ├── validate.ts        # Flow validation
│   ├── fallback.ts        # Fallback branch logic
│   └── meta-send.ts       # WhatsApp send wrapper
├── ai/                    # AI automation
│   ├── provider.ts        # LLM provider (OpenAI-compatible)
│   ├── tools.ts           # 37 CRM tool definitions
│   └── types.ts           # AI types
├── dashboard/             # Dashboard queries
│   ├── queries.ts         # SQL queries for metrics
│   └── date-utils.ts      # Date range utilities
├── themes.ts              # 5 color theme definitions
├── rate-limit.ts          # Rate limiting utility
├── broadcast-status.ts    # Status badge definitions
└── utils.ts               # cn() utility</code></pre>

<h3>src/hooks/ — React Hooks</h3>
<ul>
<li><code>use-auth.tsx</code> — Auth context with user, profile, signOut, refreshProfile</li>
<li><code>use-theme.tsx</code> — Theme context (5 color themes + dark mode)</li>
<li><code>use-realtime.ts</code> — Supabase Realtime subscriptions</li>
<li><code>use-total-unread.ts</code> — Real-time unread count</li>
<li><code>use-broadcast-sending.ts</code> — Broadcast sending state</li>
</ul>

<h2>Tech Stack</h2>
<table>
<tr><th>Layer</th><th>Technology</th></tr>
<tr><td>Framework</td><td>Next.js 16 (App Router)</td></tr>
<tr><td>Language</td><td>TypeScript (strict mode)</td></tr>
<tr><td>Styling</td><td>Tailwind CSS v4</td></tr>
<tr><td>UI Components</td><td>shadcn/ui (base-nova style)</td></tr>
<tr><td>Database</td><td>PostgreSQL via Supabase</td></tr>
<tr><td>Auth</td><td>Supabase SSR (cookie sessions)</td></tr>
<tr><td>State</td><td>React context + Supabase Realtime</td></tr>
<tr><td>Testing</td><td>Vitest</td></tr>
<tr><td>Linting</td><td>ESLint flat config + Prettier</td></tr>
<tr><td>Icons</td><td>Lucide React</td></tr>
<tr><td>Animation</td><td>Framer Motion</td></tr>
<tr><td>Drag &amp; Drop</td><td>@dnd-kit</td></tr>
</table>',
'Complete codebase structure and architecture overview', 'published', 21, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'project-structure' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 23: Changelog
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Changelog', 'changelog',
'<p>All notable changes to Neural Aurora CRM are documented here. The full changelog is maintained in the <code>CHANGELOG.md</code> file in the repository root.</p>

<h2>v1.0.0 (Stable Release)</h2>
<p><strong>Date:</strong> Latest release</p>
<h3>WhatsApp Integration</h3>
<ul>
<li>Shared inbox with real-time message threading</li>
<li>WhatsApp Cloud API webhook with HMAC-SHA256 verification</li>
<li>AES-256-GCM encrypted token storage</li>
<li>Message reactions and quote replies</li>
<li>Media proxy for WhatsApp images and documents</li>
</ul>
<h3>Contact Management</h3>
<ul>
<li>Full contact CRUD with tags and custom fields</li>
<li>CSV import with column mapping and duplicate detection</li>
<li>Contact detail view with conversation history</li>
</ul>
<h3>Sales Pipelines</h3>
<ul>
<li>Kanban board with drag-and-drop deal management</li>
<li>Custom pipeline stages and settings</li>
<li>Pipeline analytics with conversion tracking</li>
</ul>
<h3>Broadcast Campaigns</h3>
<ul>
<li>4-step campaign wizard (template, audience, personalize, schedule)</li>
<li>Real-time delivery tracking per recipient</li>
<li>Meta-approved message template management</li>
</ul>
<h3>No-Code Automations</h3>
<ul>
<li>7 trigger types and 11 action types</li>
<li>Visual automation builder</li>
<li>Cron-driven scheduled triggers</li>
</ul>

<h2>v0.2.0 — Flows Release</h2>
<ul>
<li>Visual flow builder with drag-and-drop canvas</li>
<li>Flow execution engine with branching and fallbacks</li>
<li>Flow templates (lead qualification, FAQs, appointment booking)</li>
<li>Run history and analytics per flow</li>
<li>Beta feature flags for user-level access control</li>
</ul>

<h2>v0.1.1 — Message Actions</h2>
<ul>
<li>Message reactions (emoji reactions on messages)</li>
<li>Message actions: assign, snooze, flag</li>
<li>Webhook stability improvements</li>
<li>Contact delete cascade fix (migration 004)</li>
</ul>

<h2>v0.1.0 — Initial Release</h2>
<ul>
<li>Core CRM features: inbox, contacts, pipelines, broadcasts</li>
<li>Supabase SSR authentication</li>
<li>Row-Level Security on all tables</li>
<li>Admin approval workflow</li>
<li>5 color themes (Neural Aurora, Midnight, Forest, Ocean, Sunset)</li>
<li>Rate limiting and security headers</li>
</ul>

<h2>Upcoming Features</h2>
<ul>
<li>Multi-WABA support (multiple WhatsApp Business accounts)</li>
<li>Advanced reporting and export</li>
<li>Team performance analytics</li>
<li>Mobile app (React Native)</li>
<li>Third-party integrations (Zapier, Make, n8n)</li>
<li>Multi-language support</li>
</ul>',
'Complete version history from initial release to current stable', 'published', 22, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'changelog' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));

-- 24: Contributing
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT (SELECT id FROM doc_categories WHERE slug = 'wacrm'), 'Contributing', 'contributing',
'<p>Thank you for your interest in contributing to Neural Aurora CRM! This guide covers the contribution process, development setup, and best practices.</p>

<h2>Getting Started</h2>
<ol>
<li>Fork the repository on GitHub</li>
<li>Clone your fork: <code>git clone https://github.com/your-username/WACRM.git</code></li>
<li>Set up the development environment (see Getting Started guide)</li>
<li>Create a feature branch: <code>git checkout -b feature/my-feature</code></li>
</ol>

<h2>Development Workflow</h2>

<h3>Code Quality</h3>
<p>The project uses automated quality checks via GitHub Actions CI (<code>.github/workflows/ci.yml</code>):</p>
<ul>
<li><strong>Lint</strong> — ESLint with Next.js core-web-vitals config</li>
<li><strong>Typecheck</strong> — TypeScript strict mode</li>
<li><strong>Test</strong> — Vitest unit tests</li>
<li><strong>Build</strong> — Production build must succeed</li>
</ul>
<p>Run these locally before committing:</p>
<pre><code>npm run lint
npx tsc --noEmit
npm run test
npm run build</code></pre>

<h3>Testing</h3>
<p>Tests are written with Vitest and located alongside the modules they test:</p>
<ul>
<li><code>src/lib/whatsapp/encryption.test.ts</code></li>
<li><code>src/lib/whatsapp/meta-api.test.ts</code></li>
<li><code>src/lib/whatsapp/webhook-signature.test.ts</code></li>
<li><code>src/lib/whatsapp/phone-utils.test.ts</code></li>
<li><code>src/lib/automations/validate.test.ts</code></li>
<li><code>src/lib/flows/engine.test.ts</code></li>
<li><code>src/lib/flows/validate.test.ts</code></li>
<li><code>src/lib/flows/fallback.test.ts</code></li>
<li><code>src/lib/dashboard/date-utils.test.ts</code></li>
<li><code>src/lib/rate-limit.test.ts</code></li>
<li><code>src/lib/broadcast-status.test.ts</code></li>
</ul>
<p>Write tests for any new functionality and ensure all existing tests pass.</p>

<h3>Commit Conventions</h3>
<p>Follow conventional commit format:</p>
<ul>
<li><code>feat:</code> — New feature</li>
<li><code>fix:</code> — Bug fix</li>
<li><code>docs:</code> — Documentation changes</li>
<li><code>chore:</code> — Maintenance tasks</li>
<li><code>refactor:</code> — Code restructuring</li>
<li><code>test:</code> — Test additions or changes</li>
</ul>

<h2>Pull Request Process</h2>
<ol>
<li>Ensure your branch is up to date with main: <code>git rebase main</code></li>
<li>Run all quality checks locally</li>
<li>Open a PR against the <code>main</code> branch using the PR template</li>
<li>Describe your changes clearly and link any related issues</li>
<li>Ensure CI passes on your PR</li>
<li>Request review from a maintainer</li>
</ol>

<h2>Reporting Issues</h2>
<p>Use the GitHub issue templates:</p>
<ul>
<li><strong>Bug Report</strong> — For bugs and unexpected behavior</li>
<li><strong>Feature Request</strong> — For new feature suggestions</li>
</ul>

<h2>Security Vulnerabilities</h2>
<p>Please report security vulnerabilities privately via the security policy in <code>.github/SECURITY.md</code>. Do not create public issues for security vulnerabilities.</p>

<h2>Code of Conduct</h2>
<p>This project follows the Contributor Covenant v2.1 code of conduct. All contributors are expected to uphold this standard.</p>',
'Contribution guidelines, development workflow, and PR process', 'published', 23, NULL
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'contributing' AND category_id = (SELECT id FROM doc_categories WHERE slug = 'wacrm'));
