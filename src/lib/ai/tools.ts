export const USER_TOOLS = [
  {
    type: "function",
    function: {
      name: "dashboard_stats",
      description: "Get platform statistics (pages, categories, contributors, guides, releases count)",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_pages",
      description: "List all documentation pages",
      parameters: { type: "object", properties: { category_id: { type: "string", description: "Filter by category ID (optional)" } }, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "get_page",
      description: "Get a specific documentation page by title or slug",
      parameters: { type: "object", properties: { title: { type: "string", description: "Page title or slug to search for" } }, required: ["title"] },
    },
  },
  {
    type: "function",
    function: {
      name: "search_pages",
      description: "Search documentation pages by keyword",
      parameters: { type: "object", properties: { query: { type: "string", description: "Search keyword" } }, required: ["query"] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_categories",
      description: "List all documentation categories",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_contributors",
      description: "List all contributors",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_demos",
      description: "List all demo videos",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_installation_guides",
      description: "List all installation guides",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_release_notes",
      description: "List all release notes",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_external_links",
      description: "List all external sidebar links",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "reply",
      description: "Respond to the user with a friendly text message for greetings, thanks, or general chat",
      parameters: { type: "object", properties: { text: { type: "string", description: "The response text" } }, required: ["text"] },
    },
  },
];

export const ADMIN_TOOLS = [
  ...USER_TOOLS,
  {
    type: "function",
    function: {
      name: "create_page",
      description: "Create a new documentation page",
      parameters: {
        type: "object",
        properties: {
          category_id: { type: "string", description: "Category ID" },
          title: { type: "string", description: "Page title" },
          slug: { type: "string", description: "URL slug" },
          content: { type: "string", description: "Page content (HTML)" },
          excerpt: { type: "string", description: "Short description" },
          status: { type: "string", enum: ["draft", "published"], description: "Publish status" },
        },
        required: ["category_id", "title", "slug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_page",
      description: "Update an existing documentation page",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "Page ID" },
          title: { type: "string", description: "New title (optional)" },
          content: { type: "string", description: "New content (optional)" },
          excerpt: { type: "string", description: "New excerpt (optional)" },
          status: { type: "string", enum: ["draft", "published"], description: "New status (optional)" },
          category_id: { type: "string", description: "New category ID (optional)" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_page",
      description: "Delete a documentation page by ID",
      parameters: { type: "object", properties: { id: { type: "string", description: "Page ID to delete" } }, required: ["id"] },
    },
  },
  {
    type: "function",
    function: {
      name: "create_category",
      description: "Create a new documentation category",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Category name" },
          slug: { type: "string", description: "URL slug" },
          description: { type: "string", description: "Description (optional)" },
          icon: { type: "string", description: "Icon name (optional)" },
        },
        required: ["name", "slug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_category",
      description: "Update an existing category",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "Category ID" },
          name: { type: "string", description: "New name (optional)" },
          description: { type: "string", description: "New description (optional)" },
          icon: { type: "string", description: "New icon (optional)" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_category",
      description: "Delete a category by ID",
      parameters: { type: "object", properties: { id: { type: "string", description: "Category ID to delete" } }, required: ["id"] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_users",
      description: "List all platform users",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "approve_user",
      description: "Approve a user by their user ID",
      parameters: { type: "object", properties: { user_id: { type: "string", description: "User ID to approve" } }, required: ["user_id"] },
    },
  },
  {
    type: "function",
    function: {
      name: "list_homepage_sections",
      description: "List all homepage content sections (projects, features, stats, steps, faqs, repos)",
      parameters: { type: "object", properties: { section: { type: "string", enum: ["projects", "features", "stats", "steps", "faqs", "repos"], description: "Section to list (optional, lists all if omitted)" } }, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "create_homepage_item",
      description: "Add a new item to a homepage section",
      parameters: {
        type: "object",
        properties: {
          section: { type: "string", enum: ["projects", "features", "stats", "steps", "faqs", "repos"], description: "Homepage section" },
          title: { type: "string", description: "Item title" },
          description: { type: "string", description: "Item description (optional)" },
        },
        required: ["section", "title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_homepage_item",
      description: "Delete an item from a homepage section",
      parameters: {
        type: "object",
        properties: {
          section: { type: "string", enum: ["projects", "features", "stats", "steps", "faqs", "repos"], description: "Homepage section" },
          id: { type: "string", description: "Item ID to delete" },
        },
        required: ["section", "id"],
      },
    },
  },
];

export const TOOL_TO_HANDLER: Record<string, string> = {
  dashboard_stats: "dashboard_stats",
  list_pages: "list_pages",
  get_page: "get_page",
  search_pages: "search_pages",
  list_categories: "list_categories",
  list_contributors: "list_contributors",
  list_demos: "list_demos",
  list_installation_guides: "list_installation_guides",
  list_release_notes: "list_release_notes",
  list_external_links: "list_external_links",
  create_page: "create_page",
  update_page: "update_page",
  delete_page: "delete_page",
  create_category: "create_category",
  update_category: "update_category",
  delete_category: "delete_category",
  list_users: "list_users",
  approve_user: "approve_user",
  list_homepage_sections: "list_homepage_sections",
  create_homepage_item: "create_homepage_item",
  delete_homepage_item: "delete_homepage_item",
};
