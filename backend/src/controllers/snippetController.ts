import { Request, Response } from 'express';
import { CodeSnippet } from '../models';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Get all code snippets for a user
export const getSnippets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { language, category, isTemplate, page = 1, limit = 20 } = req.query;

    const query: Record<string, unknown> = { sessionId };

    if (language) query.language = language;
    if (category) query.category = category;
    if (isTemplate !== undefined) query.isTemplate = isTemplate === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    const [snippets, total] = await Promise.all([
      CodeSnippet.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      CodeSnippet.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        snippets,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching snippets:', error);
    throw new AppError('Failed to fetch snippets', 500);
  }
};

// Get public templates
export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, category } = req.query;

    const query: Record<string, unknown> = {
      isTemplate: true,
      isPublic: true,
    };

    if (language) query.language = language;
    if (category) query.category = category;

    const templates = await CodeSnippet.find(query)
      .sort({ likes: -1 })
      .limit(50);

    res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    logger.error('Error fetching templates:', error);
    throw new AppError('Failed to fetch templates', 500);
  }
};

// Get snippet by ID
export const getSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { id } = req.params;

    const snippet = await CodeSnippet.findOne({
      $or: [
        { _id: id, sessionId },
        { _id: id, isPublic: true },
      ],
    });

    if (!snippet) {
      throw new AppError('Snippet not found', 404);
    }

    res.json({
      success: true,
      data: snippet,
    });
  } catch (error) {
    logger.error('Error fetching snippet:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch snippet', 500);
  }
};

// Create a new snippet
export const createSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { title, description, language, code, category, tags, problemId, isTemplate, isPublic } = req.body;

    const snippet = await CodeSnippet.create({
      sessionId,
      title,
      description,
      language,
      code,
      category,
      tags: tags || [],
      problemId,
      isTemplate: isTemplate || false,
      isPublic: isPublic || false,
    });

    res.status(201).json({
      success: true,
      data: snippet,
    });
  } catch (error) {
    logger.error('Error creating snippet:', error);
    throw new AppError('Failed to create snippet', 500);
  }
};

// Update a snippet
export const updateSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { id } = req.params;
    const updates = req.body;

    // Prevent changing ownership
    delete updates.sessionId;

    const snippet = await CodeSnippet.findOneAndUpdate(
      { _id: id, sessionId },
      updates,
      { new: true, runValidators: true }
    );

    if (!snippet) {
      throw new AppError('Snippet not found', 404);
    }

    res.json({
      success: true,
      data: snippet,
    });
  } catch (error) {
    logger.error('Error updating snippet:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update snippet', 500);
  }
};

// Delete a snippet
export const deleteSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { id } = req.params;

    const snippet = await CodeSnippet.findOneAndDelete({ _id: id, sessionId });

    if (!snippet) {
      throw new AppError('Snippet not found', 404);
    }

    res.json({
      success: true,
      message: 'Snippet deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting snippet:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete snippet', 500);
  }
};

// Like a public snippet
export const likeSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const snippet = await CodeSnippet.findOneAndUpdate(
      { _id: id, isPublic: true },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!snippet) {
      throw new AppError('Snippet not found', 404);
    }

    res.json({
      success: true,
      data: { likes: snippet.likes },
    });
  } catch (error) {
    logger.error('Error liking snippet:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to like snippet', 500);
  }
};

// Get default code templates by pattern
export const getDefaultTemplates = async (_req: Request, res: Response): Promise<void> => {
  try {
    const templates = {
      twoPointers: {
        cpp: `// Two Pointers Pattern
int left = 0, right = n - 1;
while (left < right) {
    // Process elements at left and right
    if (condition) {
        left++;
    } else {
        right--;
    }
}`,
        python: `# Two Pointers Pattern
left, right = 0, n - 1
while left < right:
    # Process elements at left and right
    if condition:
        left += 1
    else:
        right -= 1`,
      },
      slidingWindow: {
        cpp: `// Sliding Window Pattern
int left = 0, maxLen = 0;
for (int right = 0; right < n; right++) {
    // Add element at right to window
    while (/* window invalid */) {
        // Remove element at left from window
        left++;
    }
    maxLen = max(maxLen, right - left + 1);
}`,
        python: `# Sliding Window Pattern
left = max_len = 0
for right in range(n):
    # Add element at right to window
    while window_invalid:
        # Remove element at left from window
        left += 1
    max_len = max(max_len, right - left + 1)`,
      },
      binarySearch: {
        cpp: `// Binary Search Pattern
int left = 0, right = n - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;`,
        python: `# Binary Search Pattern
left, right = 0, n - 1
while left <= right:
    mid = left + (right - left) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1`,
      },
      dfs: {
        cpp: `// DFS Pattern
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}`,
        python: `# DFS Pattern
def dfs(node, adj, visited):
    visited.add(node)
    for neighbor in adj[node]:
        if neighbor not in visited:
            dfs(neighbor, adj, visited)`,
      },
      bfs: {
        cpp: `// BFS Pattern
queue<int> q;
vector<bool> visited(n, false);
q.push(start);
visited[start] = true;

while (!q.empty()) {
    int node = q.front();
    q.pop();
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            visited[neighbor] = true;
            q.push(neighbor);
        }
    }
}`,
        python: `# BFS Pattern
from collections import deque
queue = deque([start])
visited = {start}

while queue:
    node = queue.popleft()
    for neighbor in adj[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append(neighbor)`,
      },
      dp: {
        cpp: `// DP Pattern (Bottom-up)
vector<int> dp(n + 1, 0);
for (int i = 1; i <= n; i++) {
    // Calculate dp[i] based on previous states
    dp[i] = max(dp[i-1], dp[i-2] + value[i]);
}
return dp[n];`,
        python: `# DP Pattern (Bottom-up)
dp = [0] * (n + 1)
for i in range(1, n + 1):
    # Calculate dp[i] based on previous states
    dp[i] = max(dp[i-1], dp[i-2] + value[i])
return dp[n]`,
      },
      backtracking: {
        cpp: `// Backtracking Pattern
void backtrack(vector<int>& path, vector<vector<int>>& result) {
    if (/* base case */) {
        result.push_back(path);
        return;
    }
    for (int choice : choices) {
        if (/* valid choice */) {
            path.push_back(choice);
            backtrack(path, result);
            path.pop_back(); // Undo choice
        }
    }
}`,
        python: `# Backtracking Pattern
def backtrack(path, result):
    if base_case:
        result.append(path[:])
        return
    for choice in choices:
        if is_valid(choice):
            path.append(choice)
            backtrack(path, result)
            path.pop()  # Undo choice`,
      },
      monotonicStack: {
        cpp: `// Monotonic Stack Pattern
stack<int> st;
vector<int> result(n, -1);
for (int i = n - 1; i >= 0; i--) {
    while (!st.empty() && st.top() <= nums[i]) {
        st.pop();
    }
    if (!st.empty()) result[i] = st.top();
    st.push(nums[i]);
}`,
        python: `# Monotonic Stack Pattern
stack = []
result = [-1] * n
for i in range(n - 1, -1, -1):
    while stack and stack[-1] <= nums[i]:
        stack.pop()
    if stack:
        result[i] = stack[-1]
    stack.append(nums[i])`,
      },
    };

    res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    logger.error('Error fetching default templates:', error);
    throw new AppError('Failed to fetch default templates', 500);
  }
};
