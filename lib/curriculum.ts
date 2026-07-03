export type CurriculumDiscipline = {
  title: string;
  objective: string;
  units: Array<string | CurriculumUnit>;
  references: Array<string | CurriculumReference>;
};

export type CurriculumModule = {
  title: string;
  slug: string;
  objective: string;
  disciplines: CurriculumDiscipline[];
};

export type CurriculumReference = {
  title: string;
  description?: string;
  url?: string;
  type?: "VIDEO" | "ARTICLE" | "DOCUMENTATION" | "COURSE" | "BOOK" | "LAB";
  durationMin?: number;
};

export type CurriculumUnit = {
  title: string;
  objective?: string;
  references?: CurriculumReference[];
  estimatedMinutes?: number;
};

function unit(title: string, options: Omit<CurriculumUnit, "title"> = {}): CurriculumUnit {
  return { title, ...options };
}

function reference(title: string, options: Omit<CurriculumReference, "title"> = {}): CurriculumReference {
  return { title, ...options };
}

export const cs193p2025Lectures: CurriculumUnit[] = [
  unit("Lecture 1 - Getting Started with SwiftUI", {
    objective: "Introduction to the course, Xcode, SwiftUI, and Views.",
    references: [
      reference("CS193p 2025 Lecture 1 - Getting Started with SwiftUI", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=kCjDulwChRQ&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=3&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      }),
      reference("CS193p 2025 Reading Assignment 1", {
        description: "Official supporting reading for Lecture 1.",
        url: "https://cs193p.stanford.edu/sites/g/files/sbiybj16636/files/media/file/2025r1.pdf",
        type: "ARTICLE",
        durationMin: 30
      })
    ]
  }),
  unit("Lecture 2 - More SwiftUI Basics", {
    objective: "SwiftUI basics, view modifiers, and the beginning of CodeBreaker.",
    references: [
      reference("CS193p 2025 Lecture 2 - More SwiftUI Basics", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=63UHypFKRRM&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=2&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 3 - Model and UI; Swift Type System", {
    objective: "Separate model logic from UI and review important Swift type-system ideas.",
    references: [
      reference("CS193p 2025 Lecture 3 - Model and UI; Swift Type System", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=B42CuI0RO7Y&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=1&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 4 - Building CodeBreaker's Model", {
    objective: "Build the CodeBreaker model and connect it to SwiftUI state.",
    references: [
      reference("CS193p 2025 Lecture 4 - Building CodeBreaker's Model", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=IvOF3Bmk-94&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=3&pp=iAQB0gcJCRUKAYcqIYzv",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 5 - Layout; Data Flow", {
    objective: "Understand SwiftUI layout, data flow, and introductory functional programming.",
    references: [
      reference("CS193p 2025 Lecture 5 - Layout; Data Flow", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=u6cgk1W6EXE&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=2&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 6 - Data Flow Demonstration", {
    objective: "Follow a concrete data-flow demonstration through model and views.",
    references: [
      reference("CS193p 2025 Lecture 6 - Data Flow Demonstration", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=tvVj6MSBhBA&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=1&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 7 - Generics and Views; Animation", {
    objective: "Connect generics, ViewBuilder, bindings, and the foundations of animation.",
    references: [
      reference("CS193p 2025 Lecture 7 - Generics and Views; Animation", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=RYemrq0e7KM&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=6&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 8 - Animation Demonstration", {
    objective: "Apply SwiftUI animation concepts to CodeBreaker.",
    references: [
      reference("CS193p 2025 Lecture 8 - Animation Demonstration", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=OZK7_p1G8Pw&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=5&pp=iAQB0gcJCRUKAYcqIYzv",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 9 - Elapsed Time; Protocols", {
    objective: "Use elapsed time and deepen protocol understanding.",
    references: [
      reference("CS193p 2025 Lecture 9 - Elapsed Time; Protocols", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=o3D3rqh-IVA&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=4&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 10 - List and Navigation", {
    objective: "Add game lists, navigation, ForEach, Hashable, and Identifiable behavior.",
    references: [
      reference("CS193p 2025 Lecture 10 - List and Navigation", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=NnJ91M9PRYo&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=3&pp=iAQB0gcJCRUKAYcqIYzv",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 11 - iPad; Sheets", {
    objective: "Adapt CodeBreaker for iPad and learn sheet-based editing UI.",
    references: [
      reference("CS193p 2025 Lecture 11 - iPad; Sheets", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=PXcl5cjVNT0&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=2&pp=iAQB0gcJCRUKAYcqIYzv",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 12 - CodeBreaker Editor", {
    objective: "Extend sheet editing for existing CodeBreaker games.",
    references: [
      reference("CS193p 2025 Lecture 12 - CodeBreaker Editor", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=gNok5P7HLCw&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=1&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 13 - SwiftData", {
    objective: "Persist CodeBreaker games with SwiftData models, containers, context, fetches, and predicates.",
    references: [
      reference("CS193p 2025 Lecture 13 - SwiftData", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=k9wjAdgUY0A&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=13&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 14 - More SwiftData", {
    objective: "Search persisted data and create previews that access SwiftData.",
    references: [
      reference("CS193p 2025 Lecture 14 - More SwiftData", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=1PDZl0LPryw&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=14&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 15 - Yet More SwiftData; Multithreading", {
    objective: "Use more complex SwiftData predicates and learn multithreading basics.",
    references: [
      reference("CS193p 2025 Lecture 15 - Yet More SwiftData; Multithreading", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=F0nefFT2Uik&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=15&pp=iAQB",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  }),
  unit("Lecture 16 - Final Project Miscellany", {
    objective: "Review shapes, GeometryReader, multitouch gestures, and alternatives to SwiftData.",
    references: [
      reference("CS193p 2025 Lecture 16 - Final Project Miscellany", {
        description: "Official Stanford CS193p Spring 2025 lecture video.",
        url: "https://www.youtube.com/watch?v=skECWIKpBVY&list=PLoROMvodv4rPHblRXKsJCQs8TLGpiCTrG&index=16&pp=iAQB0gcJCTwKAYcqIYzv",
        type: "VIDEO",
        durationMin: 75
      })
    ]
  })
];

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
        title: "CS193p",
        objective: "Study SwiftUI through Stanford's CS193p 2025 structure and build apps from lecture-driven concepts.",
        units: cs193p2025Lectures,
        references: [
          reference("Stanford CS193p 2025", {
            description: "Official Stanford CS193p course page with lecture videos and supporting material.",
            url: "https://cs193p.stanford.edu/",
            type: "COURSE",
            durationMin: 60
          })
        ]
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

export function unitTitle(unit: string | CurriculumUnit) {
  return typeof unit === "string" ? unit : unit.title;
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
        const title = unitTitle(unit);

        if (topicSlug(module.slug, discipline.title, title) === slug) {
          return { module, discipline, unit: title };
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
    discipline.units.map((unit) => {
      const title = unitTitle(unit);

      return {
      module,
      discipline,
      unit: title,
      slug: topicSlug(module.slug, discipline.title, title)
      };
    })
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
