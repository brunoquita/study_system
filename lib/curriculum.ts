export type CurriculumDiscipline = {
  title: string;
  objective: string;
  units: string[];
  references: string[];
};

export type CurriculumModule = {
  title: string;
  slug: string;
  objective: string;
  disciplines: CurriculumDiscipline[];
};

export const curriculum: CurriculumModule[] = [
  {
    title: "Module 1",
    slug: "module-1",
    objective: "Computer Science Fundamentals and Swift",
    disciplines: [
      {
        title: "Algorithms and Data Structures",
        objective: "Build a strong foundation in complexity analysis, data structures, and algorithmic problem solving.",
        units: [
          "Computational Complexity",
          "Arrays",
          "Hash Tables",
          "Stack",
          "Queue",
          "Linked Lists",
          "Recursion",
          "Trees",
          "Graphs",
          "Sorting"
        ],
        references: ["NeetCode Roadmap", "LeetCode", "GeeksForGeeks", "Alura Algorithms Courses"]
      },
      {
        title: "Swift Fundamentals",
        objective: "Master core Swift language concepts needed to write correct, idiomatic, maintainable iOS code.",
        units: [
          "Language Basics",
          "Optionals",
          "Collections",
          "Object Oriented Programming",
          "Struct vs Class",
          "Protocols",
          "Generics",
          "Closures",
          "Memory Management",
          "Error Handling"
        ],
        references: ["The Swift Programming Language", "Hacking with Swift", "Apple Documentation", "Alura Swift Courses"]
      }
    ]
  },
  {
    title: "Module 2",
    slug: "module-2",
    objective: "Advanced Swift",
    disciplines: [
      {
        title: "Professional Swift",
        objective: "Develop advanced Swift fluency for expressive APIs, concurrency, and framework-level abstractions.",
        units: ["Advanced Generics", "Associated Types", "Property Wrappers", "Result Builders", "Async/Await", "Actors"],
        references: ["Swift Evolution", "objc.io Advanced Swift", "Apple Documentation"]
      },
      {
        title: "Software Engineering",
        objective: "Apply professional software engineering principles to architecture, maintainability, and code quality.",
        units: ["SOLID", "Clean Code", "Design Patterns", "Dependency Injection"],
        references: ["Refactoring Guru", "Clean Architecture", "Clean Coder Blog"]
      }
    ]
  },
  {
    title: "Module 3",
    slug: "module-3",
    objective: "SwiftUI",
    disciplines: [
      {
        title: "SwiftUI Fundamentals",
        objective: "Build declarative Apple interfaces with state, layout, navigation, and data flow.",
        units: ["Views and Modifiers", "State and Binding", "Layout", "Navigation", "Lists and Forms", "Data Flow"],
        references: ["100 Days of SwiftUI", "Apple SwiftUI Documentation", "Alura SwiftUI"]
      },
      {
        title: "CS193p",
        objective: "Study SwiftUI through Stanford's CS193p structure and build apps from lecture-driven concepts.",
        units: ["CS193p Lecture Foundations", "MVVM in SwiftUI", "Persistence", "Animation", "Gestures", "Multithreading"],
        references: ["Stanford CS193p 2023"]
      }
    ]
  },
  {
    title: "Module 4",
    slug: "module-4",
    objective: "iOS Architecture",
    disciplines: [
      {
        title: "MVVM",
        objective: "Separate view state, user intent, and domain behavior in iOS apps.",
        units: ["MVVM Fundamentals", "View Models", "State Management", "Modularization"],
        references: ["Point-Free", "Clean Coder Blog"]
      },
      {
        title: "Clean Architecture",
        objective: "Organize iOS applications around independent domain logic and replaceable infrastructure.",
        units: ["Entities and Use Cases", "Repositories", "Dependency Injection", "Clean Boundaries"],
        references: ["Clean Architecture", "Clean Coder Blog", "Point-Free"]
      },
      {
        title: "Coordinator",
        objective: "Control app navigation with explicit flow objects and testable routing decisions.",
        units: ["Coordinator Pattern", "Navigation Flow", "Deep Linking", "Analytics"],
        references: ["Point-Free", "Clean Coder Blog"]
      },
      {
        title: "Testing",
        objective: "Create confidence through unit, integration, and behavior tests in iOS applications.",
        units: ["XCTest", "Quick", "Nimble", "Observability"],
        references: ["XCTest", "Quick", "Nimble"]
      }
    ]
  },
  {
    title: "Module 5",
    slug: "module-5",
    objective: "Backend for Mobile",
    disciplines: [
      {
        title: "APIs",
        objective: "Design APIs that mobile clients can consume reliably, safely, and efficiently.",
        units: ["REST Fundamentals", "Authentication", "Pagination", "Error Responses", "API Versioning"],
        references: ["Spring Boot Documentation", "Alura Spring"]
      },
      {
        title: "Kotlin",
        objective: "Learn Kotlin fundamentals for backend and Android-adjacent mobile ecosystems.",
        units: ["Kotlin Basics", "Null Safety", "Collections", "Coroutines", "Object Orientation"],
        references: ["Kotlin Documentation", "Alura Kotlin"]
      },
      {
        title: "Spring Boot",
        objective: "Build backend services with Spring Boot, persistence, validation, and deployment concerns.",
        units: ["Spring Boot Basics", "Controllers", "Services", "Persistence", "Validation", "Deployment"],
        references: ["Spring Boot Documentation", "Alura Spring"]
      }
    ]
  },
  {
    title: "Module 6",
    slug: "module-6",
    objective: "AI for Developers",
    disciplines: [
      {
        title: "Codex",
        objective: "Use Codex as an engineering partner for implementation, debugging, review, and automation.",
        units: ["Codex Workflows", "Codebase Navigation", "Implementation Loops", "Review with Codex"],
        references: ["OpenAI Documentation"]
      },
      {
        title: "Prompt Engineering",
        objective: "Design precise prompts with context, constraints, examples, and evaluation criteria.",
        units: ["Prompt Structure", "Context Design", "Examples and Rubrics", "Evaluation"],
        references: ["OpenAI Documentation", "Anthropic Documentation"]
      },
      {
        title: "MCP",
        objective: "Understand Model Context Protocol concepts for connecting models to tools and data sources.",
        units: ["MCP Fundamentals", "Tools", "Resources", "Servers and Clients"],
        references: ["MCP Documentation"]
      },
      {
        title: "Agents",
        objective: "Design agentic workflows with planning, tools, memory, constraints, and verification.",
        units: ["Agent Fundamentals", "Tool Use", "Planning", "Verification"],
        references: ["OpenAI Documentation", "Anthropic Documentation"]
      },
      {
        title: "RAG",
        objective: "Build retrieval-augmented generation workflows with chunking, retrieval, grounding, and evaluation.",
        units: ["RAG Fundamentals", "Embeddings", "Retrieval", "Grounded Answers", "RAG Evaluation"],
        references: ["OpenAI Documentation", "MCP Documentation"]
      }
    ]
  }
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function topicSlug(moduleSlug: string, disciplineTitle: string, unitTitle: string) {
  return `${moduleSlug}-${slugify(disciplineTitle)}-${slugify(unitTitle)}`;
}

export function findModule(slug: string) {
  return curriculum.find((module) => module.slug === slug);
}

export function moduleIndex(slug: string) {
  return curriculum.findIndex((module) => module.slug === slug);
}

export function previousModule(slug: string) {
  const index = moduleIndex(slug);
  if (index <= 0) return null;
  return curriculum[index - 1];
}

export function isModuleUnlocked(slug: string) {
  return moduleIndex(slug) <= 0;
}

export function findTopic(slug: string) {
  for (const module of curriculum) {
    for (const discipline of module.disciplines) {
      for (const unit of discipline.units) {
        if (topicSlug(module.slug, discipline.title, unit) === slug) {
          return { module, discipline, unit };
        }
      }
    }
  }

  return null;
}

export function moduleTopics(moduleSlug: string) {
  const module = findModule(moduleSlug);
  if (!module) return [];

  return module.disciplines.flatMap((discipline) =>
    discipline.units.map((unit) => ({
      module,
      discipline,
      unit,
      slug: topicSlug(module.slug, discipline.title, unit)
    }))
  );
}

export function adjacentTopics(slug: string) {
  const topic = findTopic(slug);
  if (!topic) return { previous: null, next: null };

  const topics = moduleTopics(topic.module.slug);
  const currentIndex = topics.findIndex((item) => item.slug === slug);

  return {
    previous: currentIndex > 0 ? topics[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null
  };
}
