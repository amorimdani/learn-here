import { LanguageLesson } from '../types';

export const languageCurricula: Record<string, LanguageLesson[]> = {
  typescript: [
    {
      id: 'ts-vars-types',
      topicNumber: 1,
      title: 'Variables, Immutability & Primitive Types',
      category: 'Fundamentals',
      summary: 'Learn variable declaration (const vs let), lexical scoping, primitive types (number, string, boolean, bigint, symbol), type annotations, and type inference.',
      conceptDeepDive: `In modern TypeScript, never use 'var' due to its function-scoping and hoisting pitfalls. Use 'const' by default for immutable variable bindings, and 'let' only when value reassignment is strictly necessary. TypeScript features a powerful bidirectional type inference engine: if you assign an initial value, you often do not need redundant type annotations. Primitive types are passed by value and immutable, whereas objects, arrays, and functions are passed by reference.`,
      codeSnippet: {
        language: 'typescript',
        code: `// 1. Variable Declaration & Type Inference
const applicationPort = 8080; // Inferred as literal 8080 or number
let currentConnections: number = 0; // Explicit type annotation
currentConnections += 1;

// 2. Primitive Types & Strict Null Checks
const serviceName: string = "billing-gateway";
const isHealthy: boolean = true;
const transactionId: symbol = Symbol("tx_unique_id");
const maxSafeTimestamp: bigint = 9007199254740991n;

// In strict mode (strictNullChecks), null and undefined are distinct types
let optionalToken: string | null = null;
optionalToken = "bearer-eyJh...";

// 3. Immutability with 'as const' and readonly
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const; // Freezes object properties as literal types!`,
        explanation: 'Demonstrates const vs let, primitive types, strict null checks, and compile-time immutability with as const assertions.'
      },
      keyTakeaways: [
        'Always default to const; use let only when reassignment is needed. Avoid var completely.',
        'With strictNullChecks enabled, null and undefined must be handled explicitly with union types (T | null).',
        'Use "as const" to make objects and arrays deeply read-only with literal value types.'
      ]
    },
    {
      id: 'ts-control-flow',
      topicNumber: 2,
      title: 'Control Flow, Type Narrowing & Exhaustive Matching',
      category: 'Fundamentals',
      summary: 'Master conditional branching (if/else, switch), truthiness checks, type guards (typeof, instanceof, in), and discriminated unions with compile-time exhaustive checking.',
      conceptDeepDive: `TypeScript tracks variable types across conditional branches using Control Flow Analysis (CFA). When you check 'typeof x === "string"' or 'instanceof Error', TypeScript automatically narrows the type within that block. For complex business state machines, discriminated unions (types sharing a common literal discriminator property like status: 'success' | 'failure') combined with the 'never' type guarantee exhaustive handling of all cases at compile time.`,
      codeSnippet: {
        language: 'typescript',
        code: `// Discriminated Union for Network Request States
type ApiState =
  | { status: "idle" }
  | { status: "loading"; progress: number }
  | { status: "success"; payload: { id: string; amount: number } }
  | { status: "error"; message: string; code: number };

// Exhaustive compile-time pattern matching
function renderApiState(state: ApiState): string {
  switch (state.status) {
    case "idle":
      return "Waiting to initialize.";
    case "loading":
      return \`Loading... \${state.progress}%\`;
    case "success":
      // TypeScript automatically narrows state to success branch!
      return \`Success! ID: \${state.payload.id}, Amount: $\${state.payload.amount}\`;
    case "error":
      // TypeScript automatically narrows state to error branch!
      return \`Error (\${state.code}): \${state.message}\`;
    default: {
      // If a new status is added to ApiState and not handled above,
      // this line triggers a compile-time error!
      const _unreachable: never = state;
      throw new Error(\`Unhandled state: \${_unreachable}\`);
    }
  }
}`,
        explanation: 'Shows control flow type narrowing with discriminated unions and the never type for 100% bug-free exhaustive handling.'
      },
      keyTakeaways: [
        'Type guards (typeof, instanceof, in) narrow union types automatically in subsequent code blocks.',
        'Discriminated unions with a common status key eliminate edge-case state confusion.',
        'Use the "never" type in default switch statements to guarantee compile-time exhaustiveness.'
      ]
    },
    {
      id: 'ts-functions',
      topicNumber: 3,
      title: 'Functions, Signatures, Closures & Generics',
      category: 'Functions & Types',
      summary: 'Learn function parameter typing, optional and default parameters, rest parameters, arrow functions, closures, function overloads, and generic functions.',
      conceptDeepDive: `Functions are first-class citizens in TypeScript. You can pass them as arguments, return them from other functions (higher-order functions), and capture outer variables via closures. Generics (<T>) allow you to write reusable functions that maintain type relationships between parameters and return values without resorting to dangerous 'any' types.`,
      codeSnippet: {
        language: 'typescript',
        code: `// 1. Function with explicit parameter & return types
function calculateTotal(unitPrice: number, quantity: number, discount = 0): number {
  return (unitPrice * quantity) * (1 - discount);
}

// 2. Generic Cache wrapper function with Closure
function createMemoryCache<K extends string | number, V>(ttlMs: number) {
  const store = new Map<K, { value: V; expiresAt: number }>();

  return {
    set(key: K, value: V): void {
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
    },
    get(key: K): V | undefined {
      const entry = store.get(key);
      if (!entry) return undefined;
      if (Date.now() > entry.expiresAt) {
        store.delete(key);
        return undefined;
      }
      return entry.value;
    }
  };
}

// Usage:
const userCache = createMemoryCache<string, { name: string; email: string }>(60000);
userCache.set("user-01", { name: "Alice", email: "alice@corp.com" });
const user = userCache.get("user-01"); // Inferred as { name: string; email: string } | undefined`,
        explanation: 'Demonstrates default parameters, generic type constraints (K extends string | number), and closure encapsulation.'
      },
      keyTakeaways: [
        'Always specify parameter types and return types explicitly on public API boundaries.',
        'Generics let you create flexible utilities while preserving type safety without "any".',
        'Closures capture lexical state in memory, ideal for creating private factories and caching.'
      ]
    },
    {
      id: 'ts-collections',
      topicNumber: 4,
      title: 'Data Structures: Arrays, Tuples, Maps & Sets',
      category: 'Data Structures',
      summary: 'Master typed arrays, fixed-length tuples, Map<K, V> key-value stores, Set<T> unique collections, and immutable transformations using map, filter, and reduce.',
      conceptDeepDive: `JavaScript provides built-in collections that TypeScript strongly types. Arrays (T[]) hold variable-length lists. Tuples ([string, number]) enforce fixed length and exact positional types (common in React hooks like useState). Map<K, V> allows arbitrary key types (including object references) and provides O(1) lookups, while Set<T> ensures elements are unique.`,
      codeSnippet: {
        language: 'typescript',
        code: `// 1. Typed Arrays and Functional Transformations
interface Transaction {
  id: string;
  amount: number;
  currency: "USD" | "EUR";
}

const transactions: Transaction[] = [
  { id: "tx-1", amount: 150.00, currency: "USD" },
  { id: "tx-2", amount: 45.50, currency: "USD" },
  { id: "tx-3", amount: 80.00, currency: "EUR" }
];

// Calculate USD sum with filter and reduce
const totalUsd = transactions
  .filter((tx) => tx.currency === "USD")
  .reduce((acc, tx) => acc + tx.amount, 0);

// 2. Fixed-Length Tuples
type GeoCoordinate = [latitude: number, longitude: number, altitude?: number];
const officeCoords: GeoCoordinate = [37.7749, -122.4194];

// 3. Map and Set Collections
const uniqueVisitors = new Set<string>();
uniqueVisitors.add("192.168.1.1");
uniqueVisitors.add("192.168.1.1"); // Ignored, size remains 1

const sessionStore = new Map<string, { userId: string; role: string }>();
sessionStore.set("sess_abc123", { userId: "usr_42", role: "admin" });`,
        explanation: 'Demonstrates array functional transformations, positional tuples, and typed Map/Set collections.'
      },
      keyTakeaways: [
        'Tuples represent fixed-length arrays with distinct types at each index.',
        'Use Map<K, V> instead of plain objects when keys are dynamic or non-string.',
        'Prefer immutable array operations (.map, .filter, .reduce) over manual mutating for-loops.'
      ]
    },
    {
      id: 'ts-oop-interfaces',
      topicNumber: 5,
      title: 'Interfaces, Classes & Structural Type Polymorphism',
      category: 'Functions & Types',
      summary: 'Understand interfaces vs type aliases, structural subtyping (duck typing), class inheritance, access modifiers (public, private, protected, readonly), and abstract classes.',
      conceptDeepDive: `Unlike nominal languages like Java where a class must explicitly write 'implements Interface', TypeScript relies on structural typing. If an object possesses the required fields and methods, it satisfies the interface. Modern TypeScript classes support ECMAScript private fields (#private) and TypeScript modifiers (private, protected, readonly).`,
      codeSnippet: {
        language: 'typescript',
        code: `// Interface defining behavioral contract
interface LogSink {
  write(level: "INFO" | "WARN" | "ERROR", message: string): void;
}

// Class implementing contract
class ConsoleLogSink implements LogSink {
  #prefix: string; // ECMAScript native private field

  constructor(prefix: string) {
    this.#prefix = prefix;
  }

  write(level: "INFO" | "WARN" | "ERROR", message: string): void {
    const timestamp = new Date().toISOString();
    console.log(\`[\${timestamp}] [\${this.#prefix}] [\${level}]: \${message}\`);
  }
}

// Structural Typing in Action: Object literal satisfies LogSink without class!
const memoryLogger: LogSink = {
  write(level, msg) {
    // Valid because shape matches LogSink!
  }
};`,
        explanation: 'Illustrates how interfaces establish contracts and how structural typing allows both classes and object shapes to implement them.'
      },
      keyTakeaways: [
        'Use interfaces for open, extensible object contracts; use type aliases for unions, primitives, and tuples.',
        'Structural subtyping matches shapes, enabling seamless mocking in unit tests.',
        'Native #private fields provide true runtime privacy, while "private" keyword provides compile-time checking.'
      ]
    },
    {
      id: 'ts-async-concurrency',
      topicNumber: 6,
      title: 'Promises, Async/Await & Event Loop Concurrency',
      category: 'Concurrency & Memory',
      summary: 'Master JavaScript Promises, async/await syntax, Promise.all, Promise.allSettled, error bubbling with try/catch, and the V8 microtask queue event loop.',
      conceptDeepDive: `JavaScript runs on a single-threaded event loop. Long-running operations (network requests, disk access, timers) are offloaded to background threads (libuv) and scheduled back onto the main thread via the Microtask queue (Promises) and Macrotask queue (setTimeout, I/O). Async functions always return a Promise, and 'await' suspends execution of the coroutine until the Promise resolves.`,
      codeSnippet: {
        language: 'typescript',
        code: `interface UserProfile {
  id: string;
  name: string;
}

async function fetchProfile(id: string): Promise<UserProfile> {
  const res = await fetch(\`https://api.corp.local/users/\${id}\`);
  if (!res.ok) {
    throw new Error(\`Failed to fetch user \${id}: HTTP \${res.status}\`);
  }
  return res.json() as Promise<UserProfile>;
}

// Parallel execution with Promise.allSettled (fault-tolerant)
async function fetchTeamProfiles(userIds: string[]): Promise<UserProfile[]> {
  const promises = userIds.map((id) => fetchProfile(id));
  const results = await Promise.allSettled(promises);

  const successfulProfiles: UserProfile[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") {
      successfulProfiles.push(r.value);
    } else {
      console.error("Profile fetch failed:", r.reason);
    }
  }
  return successfulProfiles;
}`,
        explanation: 'Demonstrates resilient concurrent promise handling with Promise.allSettled, avoiding cascade failures.'
      },
      keyTakeaways: [
        'Async/await provides clean syntax over Promises without blocking the main event loop.',
        'Use Promise.all when all requests must succeed; use Promise.allSettled when partial failure is acceptable.',
        'Always wrap await statements in try/catch or handle rejection to prevent UnhandledPromiseRejection errors.'
      ]
    }
  ],

  python: [
    {
      id: 'py-vars-types',
      topicNumber: 1,
      title: 'Variables, Dynamic Typing & Type Annotations',
      category: 'Fundamentals',
      summary: 'Understand Python variable binding, dynamic typing, primitive types (int, float, bool, str, None), mutability vs immutability, and modern type hints (PEP 484).',
      conceptDeepDive: `In Python, variables are not memory containers with fixed types; they are named references (pointers) bound to objects in heap memory. Python is dynamically and strongly typed: types are checked at runtime, but no implicit coercions occur (e.g. "5" + 5 raises a TypeError). Modern Python 3.10+ uses type annotations (e.g. x: int = 10) checked statically by tools like Pyright or Mypy without runtime overhead.`,
      codeSnippet: {
        language: 'python',
        code: `# 1. Variable Binding and Type Annotations
service_name: str = "order-processor"
port: int = 8000
timeout_seconds: float = 2.5
is_production: bool = True
auth_token: str | None = None  # Python 3.10+ union syntax

# 2. Immutability vs Mutability
# Integers, floats, strings, and tuples are immutable!
text = "hello"
# text[0] = "H"  # Raises TypeError: 'str' object does not support item assignment
new_text = "H" + text[1:]  # Creates a new object

# Lists, dicts, and sets are mutable!
tags: list[str] = ["backend", "fastapi"]
tags.append("asyncio")  # Modifies in-place without new object creation

# 3. Multiple Assignment and Unpacking
x, y, *rest = [1, 2, 3, 4, 5]
print(f"x={x}, y={y}, rest={rest}")  # x=1, y=2, rest=[3, 4, 5]`,
        explanation: 'Demonstrates variable assignment, PEP 604 type unions (str | None), mutability semantics, and iterable unpacking.'
      },
      keyTakeaways: [
        'Variables are references to heap objects. Understand immutable vs mutable types to avoid unexpected side effects.',
        'Use Python 3.10+ type annotations (int | None, list[str]) for static safety with Pyright/Mypy.',
        'Use f-strings for performant, readable string interpolation.'
      ]
    },
    {
      id: 'py-control-flow',
      topicNumber: 2,
      title: 'Control Flow, Loops & Structural Pattern Matching',
      category: 'Fundamentals',
      summary: 'Master if/elif/else statements, for-loops, while-loops, list comprehensions, generator expressions, and structural pattern matching (match/case introduced in Python 3.10).',
      conceptDeepDive: `Python replaces traditional C-style index loops with iterator-based 'for in' loops. List comprehensions allow concise, declarative data transformations that run in optimized C-loops inside CPython. Structural Pattern Matching ('match/case') goes far beyond simple switch statements by destructuring objects, checking shapes, and binding variables with guard conditions.`,
      codeSnippet: {
        language: 'python',
        code: `# 1. Structural Pattern Matching (Python 3.10+)
def process_command(command: dict[str, str | int]) -> str:
    match command:
        case {"action": "fetch", "id": int(item_id)}:
            return f"Fetching item {item_id}"
        case {"action": "create", "name": str(name), "price": float(price)} if price > 0:
            return f"Creating {name} at USD {price:.2f}"
        case {"action": "delete", "force": True}:
            return "Executing dangerous force delete"
        case _:
            return "Invalid or unauthorized command"

# 2. List & Dict Comprehensions
raw_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [n ** 2 for n in raw_numbers if n % 2 == 0]
# Result: [4, 16, 36, 64, 100]

user_lookup = {f"usr_{i}": f"User_{i}" for i in range(3)}
# Result: {'usr_0': 'User_0', 'usr_1': 'User_1', 'usr_2': 'User_2'}`,
        explanation: 'Shows pattern matching with guard clauses and declarative list/dict comprehensions.'
      },
      keyTakeaways: [
        'Use match/case for complex nested data structures and API payloads.',
        'List comprehensions ([x for x in seq if cond]) are faster and more idiomatic than map/filter with lambdas.',
        'Use range(), enumerate(), and zip() instead of manual index counters.'
      ]
    },
    {
      id: 'py-functions',
      topicNumber: 3,
      title: 'Functions, *args/**kwargs, Closures & Decorators',
      category: 'Functions & Types',
      summary: 'Understand function definitions, positional vs keyword-only arguments, variable arguments (*args, **kwargs), closures, and metaprogramming with decorators.',
      conceptDeepDive: `In Python, functions are first-class objects that can be passed as arguments, assigned to variables, and returned from other functions. Decorators (@decorator_name) are syntactic sugar that wrap a function with additional behavior (logging, authentication, caching, retry logic) using closures.`,
      codeSnippet: {
        language: 'python',
        code: `import functools
import time
from typing import Callable, Any

# Production Decorator: Measures execution latency
def time_execution(func: Callable[..., Any]) -> Callable[..., Any]:
    @functools.wraps(func)  # Preserves function name and docstring
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        duration = (time.perf_counter() - start_time) * 1000
        print(f"[METRIC] {func.__name__} executed in {duration:.2f}ms")
        return result
    return wrapper

# Keyword-only arguments (enforced by the '*' delimiter)
@time_execution
def transfer_funds(source: str, target: str, *, amount: float, memo: str = "") -> bool:
    if amount <= 0:
        raise ValueError("Transfer amount must be positive.")
    print(f"Transferred USD {amount:.2f} from {source} to {target} ({memo})")
    return True

# Valid invocation (amount must be passed as keyword argument):
transfer_funds("acc_100", "acc_200", amount=500.0, memo="Invoice payment")`,
        explanation: 'Demonstrates modern decorators using functools.wraps, *args/**kwargs forwarding, and keyword-only argument enforcement.'
      },
      keyTakeaways: [
        'Always use @functools.wraps on decorators to avoid wiping out function metadata.',
        'Use "*" in function signatures to mandate keyword-only arguments for safety on critical APIs.',
        'Never use mutable default arguments (e.g. def foo(items=[]):); use None instead.'
      ]
    },
    {
      id: 'py-collections',
      topicNumber: 4,
      title: 'Data Structures: Lists, Tuples, Dictionaries & Sets',
      category: 'Data Structures',
      summary: 'Examine Python collections: Lists (dynamic arrays), Tuples (immutable records), Dictionaries (O(1) hash tables), Sets (hash sets), and the collections module (deque, Counter, defaultdict).',
      conceptDeepDive: `Python dictionaries are compact, insertion-ordered hash tables implemented in C using open addressing with quadratic probing. Average lookup, insertion, and deletion are O(1). Lists are dynamic array buffers of pointers with amortized O(1) append. For FIFO queues, always use collections.deque rather than list.pop(0), which is O(N).`,
      codeSnippet: {
        language: 'python',
        code: `from collections import defaultdict, deque, Counter

# 1. Dictionaries and DefaultDict
word_counts: dict[str, int] = Counter(["apple", "banana", "apple", "cherry", "apple"])
print(word_counts["apple"])  # Output: 3

# Grouping items with defaultdict (no KeyError checks needed!)
transactions_by_user: defaultdict[str, list[float]] = defaultdict(list)
transactions_by_user["alice"].append(100.50)
transactions_by_user["alice"].append(45.00)
transactions_by_user["bob"].append(20.00)

# 2. Deque for High-Performance O(1) Queue Operations
request_queue: deque[str] = deque(maxlen=1000)
request_queue.append("req_1")        # Push right O(1)
request_queue.append("req_2")
processed = request_queue.popleft()   # Pop left O(1) vs O(N) for list.pop(0)

# 3. Sets for Mathematical Set Operations
admin_ids = {"usr_1", "usr_2", "usr_3"}
active_ids = {"usr_2", "usr_3", "usr_4"}

active_admins = admin_ids & active_ids  # Intersection: {'usr_2', 'usr_3'}
missing_admins = admin_ids - active_ids # Difference: {'usr_1'}`,
        explanation: 'Demonstrates production usage of Counter, defaultdict, high-speed O(1) deque queues, and set operations.'
      },
      keyTakeaways: [
        'Dict lookups are O(1) average. Dicts preserve insertion order in Python 3.7+.',
        'Never use list.pop(0) for queues; use collections.deque for true O(1) left pops.',
        'Use Counter and defaultdict to write clean, crash-proof collection aggregation code.'
      ]
    },
    {
      id: 'py-classes-oop',
      topicNumber: 5,
      title: 'Classes, Dataclasses & Object-Oriented Patterns',
      category: 'Functions & Types',
      summary: 'Learn object-oriented Python: __init__, self, inheritance, encapsulation with properties (@property), magic methods (__repr__, __eq__), and modern @dataclass (PEP 557).',
      conceptDeepDive: `Python supports multiple inheritance and duck typing ("if it walks like a duck and quacks like a duck, it's a duck"). The @dataclass decorator automatically generates boilerplate (__init__, __repr__, __eq__, __hash__) based on type annotations, drastically reducing class verbosity. Slots (__slots__) can be used to eliminate per-instance __dict__ dictionaries for massive RAM savings.`,
      codeSnippet: {
        language: 'python',
        code: `from dataclasses import dataclass, field
from datetime import datetime

# Modern Dataclass with default factory and frozen immutability
@dataclass(frozen=True, slots=True)
class CustomerOrder:
    order_id: str
    customer_id: str
    items: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.utcnow)

    # Computed property
    @property
    def item_count(self) -> int:
        return len(self.items)

    def is_priority(self) -> bool:
        return self.item_count > 10

# Usage:
order = CustomerOrder(order_id="ORD-101", customer_id="CUS-42", items=["Laptop", "Mouse"])
print(order)
# Automatic __repr__: CustomerOrder(order_id='ORD-101', customer_id='CUS-42', items=['Laptop', 'Mouse'], ...)
# order.order_id = "NEW"  # Raises FrozenInstanceError! Immutability enforced!`,
        explanation: 'Demonstrates Python dataclass with frozen=True immutability, slots=True memory compaction, and computed @properties.'
      },
      keyTakeaways: [
        'Use @dataclass for data container models instead of writing manual __init__ and __repr__.',
        'Set slots=True on dataclasses to reduce memory consumption by ~40% across millions of objects.',
        'Use @property for computed read-only attributes without exposing raw internal state.'
      ]
    },
    {
      id: 'py-async-concurrency',
      topicNumber: 6,
      title: 'AsyncIO, TaskGroups & Structured Concurrency',
      category: 'Concurrency & Memory',
      summary: 'Master asynchronous coroutines with async/await, asyncio event loop, TaskGroups (Python 3.11+), cooperative multitasking, and avoiding blocking calls.',
      conceptDeepDive: `AsyncIO uses cooperative multitasking: coroutines voluntarily yield control back to the event loop using 'await'. Python 3.11 introduced asyncio.TaskGroup, which guarantees structured concurrency: if any child task raises an exception or is cancelled, all sibling tasks are cleanly cancelled and cleaned up before exiting the block.`,
      codeSnippet: {
        language: 'python',
        code: `import asyncio
import httpx

async def fetch_service_health(client: httpx.AsyncClient, service: str, url: str) -> dict[str, str]:
    try:
        response = await client.get(url, timeout=3.0)
        status = "UP" if response.status_code == 200 else "DEGRADED"
    except httpx.RequestError:
        status = "DOWN"
    return {"service": service, "status": status}

async def check_all_services() -> list[dict[str, str]]:
    endpoints = [
        ("auth", "https://httpbin.org/status/200"),
        ("billing", "https://httpbin.org/status/200"),
        ("inventory", "https://httpbin.org/status/500")
    ]

    async with httpx.AsyncClient() as client:
        # Python 3.11+ TaskGroup: Structured Concurrency
        async with asyncio.TaskGroup() as tg:
            tasks = [
                tg.create_task(fetch_service_health(client, name, url))
                for name, url in endpoints
            ]
        
        # All tasks guaranteed finished when exiting the with block!
        return [task.result() for task in tasks]

if __name__ == "__main__":
    results = asyncio.run(check_all_services())
    print("Health report:", results)`,
        explanation: 'Demonstrates structured concurrency via Python 3.11 TaskGroup and non-blocking asynchronous HTTP queries with httpx.'
      },
      keyTakeaways: [
        'Use asyncio.TaskGroup (Python 3.11+) instead of legacy asyncio.gather for robust exception isolation.',
        'Never call synchronous blocking functions (time.sleep, requests.get) inside async code; use asyncio.to_thread if required.',
        'AsyncIO excels at high-concurrency I/O (APIs, web scrapers, database calls), not CPU-bound calculations.'
      ]
    }
  ],

  golang: [
    {
      id: 'go-vars-types',
      topicNumber: 1,
      title: 'Variables, Zero Values & Static Types',
      category: 'Fundamentals',
      summary: 'Learn variable declaration (var vs :=), zero values, basic primitive types (int, float64, string, bool), constants (iota), and strict type conversion.',
      conceptDeepDive: `Go has no uninitialized variables. Every declared variable is automatically set to its type's "Zero Value" (0 for numbers, "" for strings, false for booleans, nil for pointers/slices/maps). Go is statically typed and strictly enforces conversions: you cannot add an int32 to an int64 without explicit casting. The short variable declaration (:=) is available inside functions for clean local variables.`,
      codeSnippet: {
        language: 'go',
        code: `package main

import "fmt"

// Constants with iota enum generator
type LogLevel int

const (
	LevelDebug LogLevel = iota // 0
	LevelInfo                  // 1
	LevelWarn                  // 2
	LevelError                 // 3
)

func main() {
	// 1. Zero values: automatically safe without manual null checks
	var count int         // 0
	var serverName string // ""
	var isRunning bool    // false
	var metrics []float64 // nil (safe to call len(metrics) -> 0)

	// 2. Short declaration operator (:=)
	port := 8080
	timeoutSeconds := 2.5

	// 3. Strict Type Conversion (No implicit widening!)
	var totalMemory uint64 = 1024
	var freeMemory int = 512
	// available := totalMemory - freeMemory // Compile error! Mismatched types
	available := totalMemory - uint64(freeMemory) // Valid explicit cast

	fmt.Printf("Server %s on port %d, free: %d (Level: %d)\\n", serverName, port, available, LevelInfo)
}`,
        explanation: 'Illustrates Go zero-value guarantees, iota constant enumerations, and strict type casting rules.'
      },
      keyTakeaways: [
        'Variables default to safe zero values (0, "", false, nil); uninitialized memory bugs cannot occur.',
        'Use ":=" for concise local variable initialization inside functions.',
        'Go never coerces types implicitly; all conversions between integer widths or floats must be explicit.'
      ]
    },
    {
      id: 'go-control-flow',
      topicNumber: 2,
      title: 'Control Flow: If with Init, Switch & Single Loop Primitive',
      category: 'Fundamentals',
      summary: 'Master Go control flow: if with statement initializers, switch without break fallthrough, type switches, and the single "for" loop construct that handles for, while, and infinite loops.',
      conceptDeepDive: `Go intentionally simplifies control flow: there is only one looping keyword ('for'). It acts as a standard 3-clause loop, a while loop, or an infinite loop. The 'if' statement supports an initialization statement (e.g. if val, err := compute(); err != nil) that scopes temporary variables strictly to the if/else blocks, keeping local namespaces clean.`,
      codeSnippet: {
        language: 'go',
        code: `package main

import (
	"errors"
	"fmt"
)

func findUser(id int) (string, error) {
	if id == 42 {
		return "Alice", nil
	}
	return "", errors.New("user not found")
}

func main() {
	// 1. If statement with initialization statement (Idiomatic Go error check)
	if name, err := findUser(42); err != nil {
		fmt.Printf("Error: %v\\n", err)
	} else {
		fmt.Printf("Found: %s\\n", name) // 'name' scoped only to this branch
	}

	// 2. For loop variations (Go has NO while keyword!)
	// Standard loop:
	for i := 0; i < 3; i++ {
		fmt.Println("Index:", i)
	}

	// While-style loop:
	n := 10
	for n > 0 {
		n -= 5
	}

	// 3. Switch statements (Automatic break; no fallthrough unless explicit)
	role := "admin"
	switch role {
	case "admin", "superadmin":
		fmt.Println("Full system access granted.")
	case "editor":
		fmt.Println("Content edit access.")
	default:
		fmt.Println("Read-only access.")
	}
}`,
        explanation: 'Demonstrates if-with-initializer error checking, versatile for-loops, and clean switch statements.'
      },
      keyTakeaways: [
        'Use "if init; condition" to scope error variables strictly where they are handled.',
        'There is no "while" keyword; "for" is the universal loop construct in Go.',
        'Switches break automatically; you do not need manual break statements.'
      ]
    },
    {
      id: 'go-functions',
      topicNumber: 3,
      title: 'Functions, Multiple Returns, Defer & Error Handling',
      category: 'Functions & Types',
      summary: 'Learn function signatures, named and multiple return values, explicit error values, the defer statement for guaranteed LIFO resource cleanup, and panic/recover.',
      conceptDeepDive: `Go does not have try/catch/finally exception handling. Functions return errors as regular values (typically as the last return value in a tuple: (T, error)). The 'defer' keyword schedules a function call to execute immediately before the surrounding function returns, following Last-In-First-Out (LIFO) order. Defer is universally used to close sockets, files, and mutex locks.`,
      codeSnippet: {
        language: 'go',
        code: `package main

import (
	"fmt"
	"os"
	"sync"
)

var mu sync.Mutex
var balance int = 1000

func withdraw(amount int) (int, error) {
	mu.Lock()
	defer mu.Unlock() // GUARANTEED to unlock when function exits, even on error!

	if amount <= 0 {
		return balance, fmt.Errorf("invalid withdrawal amount: %d", amount)
	}
	if amount > balance {
		return balance, fmt.Errorf("insufficient funds (balance: %d, requested: %d)", balance, amount)
	}

	balance -= amount
	return balance, nil
}

func readFileContents(filename string) error {
	f, err := os.Open(filename)
	if err != nil {
		return fmt.Errorf("failed to open file %s: %w", filename, err)
	}
	defer f.Close() // File descriptor is safely closed upon return

	// Read and process file...
	return nil
}`,
        explanation: 'Demonstrates multiple return values with explicit errors, error wrapping (%w), and LIFO defer statements for mutex unlocking and file closing.'
      },
      keyTakeaways: [
        'Errors are explicit values, not hidden exceptions. Always check if err != nil.',
        'Use "defer" immediately after acquiring a resource (mutex, file, network connection) to guarantee release.',
        'Wrap errors using fmt.Errorf("context: %w", err) to preserve the underlying error chain.'
      ]
    },
    {
      id: 'go-collections',
      topicNumber: 4,
      title: 'Arrays, Slices & Hash Maps',
      category: 'Data Structures',
      summary: 'Understand fixed arrays vs dynamic slices (pointer, length, capacity), slice reslicing and growth mechanics, make(), and hash map operations with the "comma-ok" idiom.',
      conceptDeepDive: `An array in Go is a fixed-size contiguous block of memory ([4]int). Slices ([]int) are lightweight descriptors holding a pointer to an underlying array, a length (len), and a capacity (cap). Appending past capacity allocates a new underlying array and copies elements. Maps are hash tables created via make(map[K]V) and are not safe for concurrent writes without synchronization.`,
      codeSnippet: {
        language: 'go',
        code: `package main

import "fmt"

func main() {
	// 1. Slices: Dynamic views over underlying arrays
	// make(type, len, cap) pre-allocates buffer to prevent multiple reallocations
	numbers := make([]int, 0, 8)
	numbers = append(numbers, 10, 20, 30)
	fmt.Printf("len=%d cap=%d slice=%v\\n", len(numbers), cap(numbers), numbers)

	// Slice expressions share the underlying array!
	subSlice := numbers[1:3] // [20, 30]

	// 2. Hash Maps & Comma-OK Idiom
	rates := make(map[string]float64)
	rates["USD"] = 1.0
	rates["EUR"] = 1.08

	// Checking if key exists using comma-ok idiom
	if rate, exists := rates["GBP"]; exists {
		fmt.Printf("GBP Rate: %.2f\\n", rate)
	} else {
		fmt.Println("GBP currency not supported")
	}

	// Deleting a key
	delete(rates, "EUR")
}`,
        explanation: 'Shows pre-allocated slices with make(type, len, cap) and safe map lookups using the comma-ok idiom.'
      },
      keyTakeaways: [
        'Slices are headers containing a pointer, length, and capacity. Use make() with initial capacity for performance.',
        'Always use the comma-ok idiom (val, ok := myMap[key]) to differentiate missing keys from zero values.',
        'Maps are not thread-safe; use sync.RWMutex or sync.Map when accessing maps across goroutines.'
      ]
    },
    {
      id: 'go-structs-interfaces',
      topicNumber: 5,
      title: 'Structs, Pointer Receivers & Implicit Interfaces',
      category: 'Functions & Types',
      summary: 'Master struct declarations, value vs pointer receivers on methods, struct composition / embedding (no inheritance!), and Go implicit interfaces.',
      conceptDeepDive: `Go rejects class hierarchies in favor of composition. You embed structs within other structs to share behavior. Interfaces in Go are satisfied implicitly: there is no 'implements' keyword. If a type defines all methods declared in an interface, it implements that interface automatically. Value receivers work on copies, while pointer receivers (*T) can mutate the struct and avoid copying memory.`,
      codeSnippet: {
        language: 'go',
        code: `package main

import "fmt"

// Interface: Set of method signatures
type Notifier interface {
	Notify(message string) error
}

type Account struct {
	ID    string
	Email string
}

// Method with pointer receiver (*Account) - can mutate or read without copying struct
func (a *Account) UpdateEmail(newEmail string) {
	a.Email = newEmail
}

// Method on Account satisfying Notifier interface implicitly!
func (a *Account) Notify(message string) error {
	fmt.Printf("Sending email to %s: %s\\n", a.Email, message)
	return nil
}

// Struct Embedding (Composition over inheritance)
type PremiumAccount struct {
	Account // Embedded struct: fields and methods promoted automatically!
	Tier    string
}

func SendAlert(n Notifier, msg string) {
	n.Notify(msg)
}

func main() {
	prem := &PremiumAccount{
		Account: Account{ID: "usr-99", Email: "vip@corp.com"},
		Tier:    "Enterprise",
	}
	prem.UpdateEmail("ceo@corp.com")
	SendAlert(prem, "Monthly invoice ready")
}`,
        explanation: 'Demonstrates implicit interface implementation, pointer receivers, and struct embedding composition.'
      },
      keyTakeaways: [
        'Interfaces are satisfied implicitly; no "implements" keyword exists.',
        'Use pointer receivers (*T) if the method modifies the struct or if the struct is large.',
        'Prefer composition via struct embedding over object-oriented class inheritance.'
      ]
    },
    {
      id: 'go-concurrency',
      topicNumber: 6,
      title: 'Goroutines, Channels & Select Concurrency',
      category: 'Concurrency & Memory',
      summary: 'Master Go concurrency model: lightweight goroutines (2KB initial stack), unbuffered vs buffered channels, sync.WaitGroup coordination, and the select statement for multiplexing channels.',
      conceptDeepDive: `Go concurrency is built on Hoare's Communicating Sequential Processes (CSP): "Do not communicate by sharing memory; instead, share memory by communicating." Goroutines are managed in user space by the Go runtime scheduler. Channels provide safe, synchronous or asynchronous communication and synchronization without explicit locks. The select statement lets a goroutine wait on multiple channel operations simultaneously.`,
      codeSnippet: {
        language: 'go',
        code: `package main

import (
	"context"
	"fmt"
	"time"
)

func worker(ctx context.Context, id int, jobs <-chan int, results chan<- int) {
	for {
		select {
		case <-ctx.Done():
			fmt.Printf("Worker %d cancelled\\n", id)
			return
		case job, ok := <-jobs:
			if !ok {
				return // Channel closed, terminate worker
			}
			// Simulate compute work
			time.Sleep(20 * time.Millisecond)
			results <- job * 2
		}
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()

	jobs := make(chan int, 5)
	results := make(chan int, 5)

	// Launch 2 concurrent workers
	for w := 1; w <= 2; w++ {
		go worker(ctx, w, jobs, results)
	}

	// Send jobs
	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	// Collect results
	for a := 1; a <= 5; a++ {
		fmt.Printf("Result %d: %d\\n", a, <-results)
	}
}`,
        explanation: 'Demonstrates a production worker pool with channels, context cancellation timeouts, and select statements.'
      },
      keyTakeaways: [
        'Goroutines are extremely cheap (~2KB stack) allowing tens of thousands to run concurrently.',
        'Always pass context.Context to goroutines for deterministic timeouts and cancellation.',
        'Close channels from the sender side to signal completion; never write to a closed channel.'
      ]
    }
  ],

  rust: [
    {
      id: 'rs-vars-ownership',
      topicNumber: 1,
      title: 'Variables, Mutability & The Ownership System',
      category: 'Fundamentals',
      summary: 'Understand let bindings, immutable by default, mut keyword, stack vs heap allocation, and the core rules of Rust Ownership and Drop (RAII).',
      conceptDeepDive: `Memory safety without a garbage collector is Rust's primary innovation. Every value in Rust has a single variable that owns it. When the owner goes out of scope, the memory is immediately deallocated via the Drop trait. When you assign a heap-allocated variable to another variable, Rust moves ownership rather than shallow-copying, preventing double-free memory bugs.`,
      codeSnippet: {
        language: 'rust',
        code: `fn main() {
    // 1. Immutable by default
    let port = 8080;
    // port = 8081; // COMPILE ERROR: cannot assign twice to immutable variable

    let mut current_connections = 0;
    current_connections += 1; // Valid with 'mut'

    // 2. Ownership & Move Semantics
    let s1 = String::from("production_payload"); // Allocated on heap
    let s2 = s1; // Ownership MOVED to s2! s1 is now invalidated!

    // println!("{}", s1); // COMPILE ERROR: borrow of moved value: 's1'
    println!("s2 owns string: {}", s2); // Valid

    // 3. Explicit Cloning for Deep Copies
    let s3 = s2.clone(); // Deep heap duplicate
    println!("s2: {}, s3: {}", s2, s3);
} // When main ends, s2 and s3 are automatically dropped from memory!`,
        explanation: 'Illustrates Rust ownership transfer (Move semantics) on heap strings and compile-time prevention of use-after-move.'
      },
      keyTakeaways: [
        'Variables are immutable by default; use "mut" explicitly when mutation is required.',
        'Assigning a heap object moves ownership. The original variable cannot be accessed afterward.',
        'Rust drops memory deterministically when the owning variable goes out of scope.'
      ]
    },
    {
      id: 'rs-borrowing-lifetimes',
      topicNumber: 2,
      title: 'Borrowing, References & The Borrow Checker',
      category: 'Fundamentals',
      summary: 'Master Rust references (&T vs &mut T), the two cardinal rules of borrowing (aliasing XOR mutability), and how the borrow checker prevents data races at compile time.',
      conceptDeepDive: `Instead of moving ownership, you can borrow a value using references. Rust enforces the Borrowing Rule: at any given point in time, you may have either any number of immutable references (&T), OR exactly one mutable reference (&mut T), but never both simultaneously. This completely eliminates data races and iterator invalidation at compile time.`,
      codeSnippet: {
        language: 'rust',
        code: `fn calculate_length(s: &String) -> usize {
    s.len() // Borrowed immutably; does not take ownership!
}

fn append_signature(s: &mut String) {
    s.push_str(" -- Signed by AuthAuthority"); // Mutating through mutable reference
}

fn main() {
    let mut message = String::from("System Boot OK");

    // Multiple immutable borrows are allowed:
    let r1 = &message;
    let r2 = &message;
    println!("Length via r1: {}, via r2: {}", calculate_length(r1), calculate_length(r2));
    // r1 and r2 are no longer used after this point (Non-Lexical Lifetimes)

    // Exactly one mutable borrow is allowed:
    let r3 = &mut message;
    append_signature(r3);
    println!("Updated: {}", message);
}`,
        explanation: 'Shows immutable references, single mutable reference borrowing, and non-lexical lifetime scoping.'
      },
      keyTakeaways: [
        'References allow borrowing data without transferring ownership.',
        'Rule: Unlimited immutable references (&T) OR one mutable reference (&mut T) at any time.',
        'The borrow checker guarantees zero data races across multi-threaded applications.'
      ]
    },
    {
      id: 'rs-control-flow-enums',
      topicNumber: 3,
      title: 'Enums, Option, Result & Pattern Matching',
      category: 'Functions & Types',
      summary: 'Examine Rust algebraic data types (enums with data payloads), Option<T> replacing null, Result<T, E> error handling, and exhaustive match expressions.',
      conceptDeepDive: `Rust has no 'null' pointer. Missing values are represented by the Option<T> enum (Some(T) or None). Operations that can fail return the Result<T, E> enum (Ok(T) or Err(E)). The 'match' expression enforces compile-time exhaustiveness: if you add a new variant to an enum, the compiler rejects your code until all call sites handle it. The '?' operator provides ergonomic early error returns.`,
      codeSnippet: {
        language: 'rust',
        code: `#[derive(Debug)]
enum NetworkPacket {
    Ping,
    Message(String),
    Transfer { bytes: usize, destination: String },
}

fn inspect_packet(packet: NetworkPacket) {
    match packet {
        NetworkPacket::Ping => println!("Received heartbeat ping."),
        NetworkPacket::Message(msg) => println!("Message payload: {}", msg),
        NetworkPacket::Transfer { bytes, destination } => {
            println!("Sending {} bytes to {}", bytes, destination);
        }
    }
}

// Result<T, E> and the '?' early return operator
fn parse_port(input: &str) -> Result<u16, String> {
    let port: u16 = input
        .parse()
        .map_err(|_| format!("Invalid port integer: '{}'", input))?; // '?' early returns on Err!
    
    if port < 1024 {
        return Err(String::from("Privileged ports (<1024) disallowed"));
    }
    Ok(port)
}`,
        explanation: 'Demonstrates algebraic enums with embedded fields, exhaustive match pattern matching, and the question-mark error operator.'
      },
      keyTakeaways: [
        'Rust has no null; use Option<T> (Some or None) for optional data.',
        'Errors are typed values returned as Result<T, E>. Use the "?" operator for early returns.',
        'Match expressions must be exhaustive, preventing forgotten branches.'
      ]
    },
    {
      id: 'rs-structs-traits',
      topicNumber: 4,
      title: 'Structs, Methods & Trait Contracts',
      category: 'Functions & Types',
      summary: 'Master struct definitions, impl blocks, associated functions vs methods, traits (interfaces), and trait bounds on generic parameters.',
      conceptDeepDive: `Traits define shared behavior similar to interfaces in other languages. You implement a trait for a struct using 'impl Trait for Struct'. Rust supports default trait methods and generic trait bounds (e.g. fn process<T: Summary + Display>(item: T)), enabling zero-cost static dispatch (monomorphization) or dynamic dispatch via trait objects (&dyn Trait).`,
      codeSnippet: {
        language: 'rust',
        code: `pub trait Summarizable {
    fn summarize(&self) -> String;

    // Default implementation
    fn is_urgent(&self) -> bool {
        false
    }
}

pub struct AuditLog {
    pub actor: String,
    pub action: String,
    pub severity: u8,
}

impl Summarizable for AuditLog {
    fn summarize(&self) -> String {
        format!("[AUDIT] User '{}' executed '{}'", self.actor, self.action)
    }

    fn is_urgent(&self) -> bool {
        self.severity >= 4
    }
}

// Generic function with Trait Bound: Static Dispatch (Zero runtime overhead!)
pub fn emit_alert<T: Summarizable>(item: &T) {
    println!("{}", item.summarize());
    if item.is_urgent() {
        println!("🚨 URGENT ACTION REQUIRED!");
    }
}`,
        explanation: 'Shows trait declarations, implementation blocks, default methods, and static dispatch trait bounds.'
      },
      keyTakeaways: [
        'Traits establish shared contracts; structs implement them in dedicated impl blocks.',
        'Trait bounds (<T: MyTrait>) compile to monomorphized static machine code with zero overhead.',
        'Use &dyn Trait for runtime polymorphic dynamic dispatch when heterogeneous types are required.'
      ]
    },
    {
      id: 'rs-concurrency',
      topicNumber: 5,
      title: 'Fearless Concurrency: Threads, Channels & Arc/Mutex',
      category: 'Concurrency & Memory',
      summary: 'Learn Rust multithreading with std::thread, Send and Sync compile-time safety markers, message passing with mpsc channels, and shared state with Arc<Mutex<T>>.',
      conceptDeepDive: `Rust guarantees "Fearless Concurrency". The compiler prevents data races at compile time using the Send and Sync traits. Types that are safe to transfer across thread boundaries implement Send; types safe to share between threads implement Sync. To mutate shared state safely, wrap data in an Arc (Atomic Reference Counting) and Mutex (Mutual Exclusion).`,
      codeSnippet: {
        language: 'rust',
        code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Arc (Atomic Reference Counted pointer) allows shared ownership across threads
    // Mutex provides interior mutability with RAII lock guards
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for i in 0..5 {
        let counter_clone = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            // .lock() returns a MutexGuard. Lock releases automatically when guard goes out of scope!
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
            println!("Thread {} incremented counter to {}", i, *num);
        });
        handles.push(handle);
    }

    // Wait for all worker threads to complete
    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final Counter Value: {}", *counter.lock().unwrap());
}`,
        explanation: 'Demonstrates multi-threaded shared state using Arc<Mutex<T>> with automatic RAII mutex guard cleanup.'
      },
      keyTakeaways: [
        'Send and Sync traits are verified at compile time; unsafe concurrent code fails to compile.',
        'Combine Arc<T> with Mutex<T> to safely share and mutate state across OS threads.',
        'MutexGuard automatically unlocks when it goes out of scope (RAII).'
      ]
    }
  ],

  java: [
    {
      id: 'java-vars-types',
      topicNumber: 1,
      title: 'Variables, Primitive Types & Object References',
      category: 'Fundamentals',
      summary: 'Understand primitive types (byte, short, int, long, float, double, char, boolean), wrapper classes, object reference semantics, the "var" local type inference keyword, and final immutability.',
      conceptDeepDive: `Java distinguishes between primitive types (stored directly on the execution stack) and reference types (objects allocated on the heap, with pointers stored on the stack). Primitives are passed by value; reference types pass object reference copies by value. Java 10 introduced 'var' for local variable type inference. The 'final' keyword prevents reassignment for variables and subclassing for classes.`,
      codeSnippet: {
        language: 'java',
        code: `package com.platform.core;

public class FundamentalsDemo {
    public static final int MAX_RETRIES = 3; // Compile-time constant

    public static void main(String[] args) {
        // 1. Primitive types (Stack allocated)
        int connectionPort = 8080;
        double latencyMs = 14.5;
        boolean isProduction = true;

        // 2. Local Variable Type Inference (var - Java 10+)
        var serviceName = "payment-router"; // Inferred as String
        var timeoutSeconds = 5.0;           // Inferred as double

        // 3. Immutability with final
        final String clusterId = "us-east-1-prod";
        // clusterId = "eu-west-1"; // Compile error!

        // 4. Reference types vs Primitives
        Integer boxedCounter = Integer.valueOf(100); // Wrapper class (Heap)
        int rawCounter = boxedCounter;              // Unboxing
    }
}`,
        explanation: 'Shows primitive types, Java 10+ local var inference, and final constants.'
      },
      keyTakeaways: [
        'Primitives (int, boolean) live on the stack; objects live on the garbage-collected heap.',
        'Use "var" for local variables to reduce repetitive type annotations when type is obvious.',
        'Mark variables "final" whenever they should not be reassigned.'
      ]
    },
    {
      id: 'java-control-flow-records',
      topicNumber: 2,
      title: 'Control Flow, Modern Switch & Records',
      category: 'Fundamentals',
      summary: 'Master traditional if/else and loops, Java 14+ switch expressions with arrow syntax, Java 16+ Records (immutable data carriers), and Java 21 Record Pattern Matching.',
      conceptDeepDive: `Java has modernized its core syntax substantially. Switch expressions (Java 14+) use arrow syntax ('->') that yields values directly and eliminates accidental fall-through bugs. Records (Java 16+) replace hundreds of lines of Lombok or manual getters/hashcode/equals with a single concise declaration. Java 21 completes this with pattern matching for records and switches.`,
      codeSnippet: {
        language: 'java',
        code: `package com.platform.core;

// Java 16+ Record: Immutable data carrier with auto-generated constructor, getters, equals, and hashCode!
public record PaymentRequest(String transactionId, double amount, String currency) {
    // Compact constructor for validation:
    public PaymentRequest {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }
}

class PaymentDispatcher {
    // Java 21 Pattern Matching Switch Expression
    public static String inspectTransaction(Object obj) {
        return switch (obj) {
            case PaymentRequest(var id, var amount, var curr) when amount > 10000 ->
                "High value alert: " + id + " for $" + amount + " " + curr;
            case PaymentRequest(var id, var amount, var curr) ->
                "Standard payment: " + id + " ($" + amount + ")";
            case String s -> "Raw string message: " + s;
            case null -> "Null payload received";
            default -> "Unknown transaction object: " + obj.getClass().getSimpleName();
        };
    }
}`,
        explanation: 'Demonstrates Java 16 Records with compact validation constructors and Java 21 Record Pattern Matching in switch expressions.'
      },
      keyTakeaways: [
        'Use Records for immutable DTOs and data carriers instead of verbose classes.',
        'Switch expressions with "->" yield values and prevent accidental fall-through bugs.',
        'Record pattern matching (Java 21+) destructures object fields directly in switch cases.'
      ]
    },
    {
      id: 'java-collections-streams',
      topicNumber: 3,
      title: 'Collections Framework & Functional Streams API',
      category: 'Data Structures',
      summary: 'Master the Java Collections Framework (List, Set, Map), immutability helpers (List.of, Map.of), and declarative data pipelines with the Java Streams API (filter, map, collect).',
      conceptDeepDive: `The Collections Framework provides standard data structures: ArrayList (dynamic array), LinkedList, HashSet (hash-based unique elements), and HashMap (O(1) table with red-black tree bins for collision resistance). The Streams API enables declarative, lazy, functional data processing pipelines that can trivially run in parallel using .parallelStream().`,
      codeSnippet: {
        language: 'java',
        code: `package com.platform.core;

import java.util.*;
import java.util.stream.Collectors;

public class CollectionsDemo {
    public record Order(String id, String customer, double total, String status) {}

    public static void main(String[] args) {
        // 1. Immutable Collections (Java 9+)
        List<Order> orders = List.of(
            new Order("O-1", "Alice", 250.0, "COMPLETED"),
            new Order("O-2", "Bob", 45.0, "PENDING"),
            new Order("O-3", "Charlie", 1200.0, "COMPLETED")
        );

        // 2. Streams API: Functional Filter, Transform & Aggregate
        List<String> highValueCustomerNames = orders.stream()
            .filter(o -> "COMPLETED".equals(o.status()))
            .filter(o -> o.total() > 100.0)
            .map(Order::customer)
            .sorted()
            .collect(Collectors.toList());

        System.out.println("High value customers: " + highValueCustomerNames);

        // Grouping orders by status into a Map<String, List<Order>>
        Map<String, List<Order>> ordersByStatus = orders.stream()
            .collect(Collectors.groupingBy(Order::status));
    }
}`,
        explanation: 'Demonstrates List.of immutability, Streams pipeline transformations, method references (Order::customer), and Collectors.groupingBy.'
      },
      keyTakeaways: [
        'Use List.of() and Map.of() to create unmodifiable, thread-safe collections.',
        'Streams are lazy: intermediate operations (.filter, .map) only execute when a terminal operation (.collect, .count) is invoked.',
        'HashMap handles hash collisions by converting linked lists to red-black trees when a bucket exceeds 8 entries.'
      ]
    },
    {
      id: 'java-concurrency',
      topicNumber: 4,
      title: 'Concurrency: Virtual Threads (Loom) & Thread Pools',
      category: 'Concurrency & Memory',
      summary: 'Understand traditional OS threads vs Java 21 Virtual Threads (Project Loom), ExecutorService, CompletableFuture, and structured concurrency.',
      conceptDeepDive: `Historically, every Java thread mapped 1:1 to an OS thread with ~1MB memory overhead, limiting servers to a few thousand concurrent threads. Java 21 introduced Virtual Threads (Project Loom): millions of lightweight user-space threads multiplexed onto a small pool of carrier OS threads. When a virtual thread performs blocking I/O, it unmounts from its carrier thread until data is ready.`,
      codeSnippet: {
        language: 'java',
        code: `package com.platform.core;

import java.util.concurrent.Executors;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class VirtualThreadDemo {
    public static void main(String[] args) {
        var client = HttpClient.newHttpClient();

        // AutoCloseable ExecutorService with Virtual Threads (Java 21+)
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 100; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    // Synchronous blocking call - does NOT block the underlying OS thread!
                    var req = HttpRequest.newBuilder(URI.create("https://httpbin.org/status/200")).build();
                    var res = client.send(req, HttpResponse.BodyHandlers.ofString());
                    System.out.println("Task " + taskId + " completed on " + Thread.currentThread());
                    return res.statusCode();
                });
            }
        } // try-with-resources implicitly waits for all virtual threads to complete!
    }
}`,
        explanation: 'Demonstrates Java 21 Executors.newVirtualThreadPerTaskExecutor() spawning lightweight virtual threads for concurrent blocking I/O.'
      },
      keyTakeaways: [
        'Virtual threads eliminate the need for complex reactive programming (WebFlux/RxJava) for I/O bound workloads.',
        'Always use try-with-resources with ExecutorService for clean structured lifecycle shutdown.',
        'Avoid thread pinning: do not execute blocking I/O inside synchronized blocks; use ReentrantLock instead.'
      ]
    }
  ],

  'cpp-systems': [
    {
      id: 'cpp-vars-types',
      topicNumber: 1,
      title: 'Variables, Primitive Types & Memory Alignment',
      category: 'Fundamentals',
      summary: 'Learn fixed-width types (cstdint), auto type deduction, const vs constexpr, memory alignment (alignas, sizeof), and stack vs heap allocation.',
      conceptDeepDive: `C++ gives developers direct access to physical hardware memory. Primitive types have platform-dependent sizes, so production systems code mandates fixed-width types from <cstdint> (int32_t, uint64_t). 'constexpr' enforces evaluation at compile time. Memory alignment (alignas) dictates where structs are placed in RAM to match CPU cache lines and prevent unaligned access penalties.`,
      codeSnippet: {
        language: 'cpp',
        code: `#include <iostream>
#include <cstdint>

// Compile-time evaluated constant
constexpr uint32_t kMaxPacketSize = 4096;

// Cache-line aligned struct (64 bytes on modern x86/ARM processors)
struct alignas(64) MarketOrder {
    uint64_t order_id;   // 8 bytes
    uint64_t timestamp;  // 8 bytes
    double price;        // 8 bytes
    uint32_t quantity;   // 4 bytes
    char symbol[8];      // 8 bytes
    // Remaining bytes automatically padded to 64 to prevent multi-core cache false sharing!
};

int main() {
    auto port = 8080; // Inferred as int
    const uint64_t account_number = 9988221100ULL;

    std::cout << "MarketOrder struct size: " << sizeof(MarketOrder) << " bytes\\n";
    std::cout << "MarketOrder alignment: " << alignof(MarketOrder) << " bytes\\n";
    return 0;
}`,
        explanation: 'Demonstrates fixed-width types, constexpr compile-time evaluation, and cache-line struct alignment (alignas(64)).'
      },
      keyTakeaways: [
        'Always use <cstdint> fixed-width types (uint32_t, int64_t) in systems and networking code.',
        'Use "constexpr" for values and functions that can be computed during compilation.',
        'Align performance-critical structs to 64 bytes to eliminate CPU cache false sharing.'
      ]
    },
    {
      id: 'cpp-pointers-raii',
      topicNumber: 2,
      title: 'Pointers, References & Smart Pointers (RAII)',
      category: 'Concurrency & Memory',
      summary: 'Master raw pointers (*T), lvalue references (&T), smart pointers (std::unique_ptr, std::shared_ptr, std::weak_ptr), and Resource Acquisition Is Initialization (RAII).',
      conceptDeepDive: `Modern C++ forbids manual 'new' and 'delete' in application code. Instead, memory is managed via RAII: resources are bound to stack object lifetimes. std::unique_ptr represents exclusive, zero-overhead ownership (automatically freed upon scope exit). std::shared_ptr maintains an atomic reference count for shared ownership.`,
      codeSnippet: {
        language: 'cpp',
        code: `#include <iostream>
#include <memory>
#include <string>

class NetworkConnection {
public:
    NetworkConnection(const std::string& endpoint) : endpoint_(endpoint) {
        std::cout << "Opened connection to: " << endpoint_ << "\\n";
    }

    ~NetworkConnection() {
        std::cout << "RAII Destructor: Closed connection to: " << endpoint_ << "\\n";
    }

    void send(const std::string& data) {
        std::cout << "Sending '" << data << "' to " << endpoint_ << "\\n";
    }

private:
    std::string endpoint_;
};

int main() {
    {
        // std::make_unique: Exclusive ownership with ZERO memory overhead
        auto conn = std::make_unique<NetworkConnection>("10.0.0.1:443");
        conn->send("PING");
        // conn moves ownership if passed via std::move(conn)
    } // Exiting this block invokes ~NetworkConnection() automatically! Zero memory leaks!

    return 0;
}`,
        explanation: 'Demonstrates RAII resource lifecycle and std::unique_ptr for deterministic, exception-safe deallocation.'
      },
      keyTakeaways: [
        'Never call raw "delete"; manage resources using RAII and smart pointers.',
        'Default to std::unique_ptr for exclusive zero-overhead heap ownership.',
        'Use std::make_unique and std::make_shared to allocate memory safely in a single operation.'
      ]
    },
    {
      id: 'cpp-functions-lambdas',
      topicNumber: 3,
      title: 'Functions, Move Semantics & Modern Lambdas',
      category: 'Functions & Types',
      summary: 'Understand pass-by-value vs pass-by-reference (&), rvalue references (&&), move semantics (std::move), and modern lambda expressions with capture lists.',
      conceptDeepDive: `Move semantics (C++11) eliminated unnecessary deep heap copies. An rvalue reference (Type&&) represents a temporary object whose resources can be "stolen" by pointing to its existing memory buffer in O(1) time. Lambdas ([captures](args) -> return { body }) provide expressive functional programming with explicit variable capture.`,
      codeSnippet: {
        language: 'cpp',
        code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

class PacketBuffer {
public:
    std::string data;

    // Standard constructor
    PacketBuffer(std::string d) : data(std::move(d)) {}

    // Move constructor: Steals internal pointer in O(1) time without copying memory!
    PacketBuffer(PacketBuffer&& other) noexcept : data(std::move(other.data)) {
        std::cout << "Moved PacketBuffer without heap reallocation!\\n";
    }
};

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9};

    // Lambda with value capture ([threshold])
    int threshold = 4;
    auto count_above = std::count_if(numbers.begin(), numbers.end(), [threshold](int n) {
        return n > threshold;
    });

    std::cout << "Numbers above threshold: " << count_above << "\\n";
    return 0;
}`,
        explanation: 'Illustrates move constructors with std::move and lambda expressions with capture lists.'
      },
      keyTakeaways: [
        'Move semantics swap pointer references in O(1) time, avoiding expensive heap copies.',
        'Pass large objects by const reference (const T&) when reading; pass by value and std::move when storing.',
        'Mark move constructors and move assignment operators "noexcept" so standard containers use them.'
      ]
    }
  ],

  'csharp-dotnet': [
    {
      id: 'cs-vars-types',
      topicNumber: 1,
      title: 'Variables, Value Types vs Reference Types & Nullable References',
      category: 'Fundamentals',
      summary: 'Learn value types (structs, primitives) vs reference types (classes, strings), the "var" keyword, readonly and const modifiers, and C# 8+ Nullable Reference Types.',
      conceptDeepDive: `In .NET, types are split into Value Types (derived from System.ValueType: int, double, bool, structs) which live on the stack or inline in containing objects, and Reference Types (classes, interfaces, delegates, strings) allocated on the managed garbage-collected heap. C# 8+ introduced Nullable Reference Types (string vs string?): the compiler warns you if a non-nullable reference might hold null, virtually eliminating NullReferenceException bugs.`,
      codeSnippet: {
        language: 'csharp',
        code: `using System;

#nullable enable // Enforce compile-time null safety

public class Program
{
    // Const (compile-time constant) vs static readonly (run-time constant)
    public const int DefaultPort = 5000;
    public static readonly DateTime AppStartTime = DateTime.UtcNow;

    public static void Main()
    {
        // 1. Value Types (Stack allocated)
        int maxRetries = 3;
        bool isEnabled = true;

        // 2. Reference Types with Nullable Reference Safety
        string nonNullableName = "GatewayService";
        // nonNullableName = null; // Compiler Warning: Cannot convert null literal to non-nullable reference

        string? optionalToken = null; // Valid nullable reference
        if (optionalToken is not null)
        {
            Console.WriteLine(optionalToken.ToUpper());
        }

        // 3. Modern Pattern Matching with 'is' and 'and/or'
        int httpStatusCode = 200;
        if (httpStatusCode is >= 200 and <= 299)
        {
            Console.WriteLine("HTTP Success code");
        }
    }
}`,
        explanation: 'Shows value vs reference types, C# 8+ Nullable Reference Types, and modern pattern matching operators.'
      },
      keyTakeaways: [
        'Enable #nullable enable across all projects to eradicate NullReferenceException bugs at compile time.',
        'Value types (structs, primitives) are copied by value; reference types pass object pointers.',
        'Use pattern matching ("is not null", "is >= 200 and <= 299") for expressive conditional checks.'
      ]
    },
    {
      id: 'cs-records-patterns',
      topicNumber: 2,
      title: 'Records, Pattern Matching & Switch Expressions',
      category: 'Fundamentals',
      summary: 'Master C# 9+ Records (positional records, value-based equality, non-destructive mutation with "with"), and switch expressions.',
      conceptDeepDive: `C# Records are classes or structs optimized for immutable data. They provide value-based equality (two record instances with the same values are equal), built-in formatting, and non-destructive mutation using the 'with' expression. Switch expressions provide concise, functional pattern matching on types and properties.`,
      codeSnippet: {
        language: 'csharp',
        code: `using System;

// Positional Record: Immutable, value-equality, auto-properties in ONE line!
public record UserProfile(string Id, string Email, string Role);

public class AuthorizationService
{
    // Modern C# Switch Expression with Property Pattern Matching
    public static string EvaluateAccess(UserProfile profile) => profile switch
    {
        { Role: "Admin" } => "Full administrative access granted.",
        { Role: "Auditor", Email: var email } when email.EndsWith("@corp.internal") => "Internal audit read access.",
        { Role: "User" } => "Standard customer portal access.",
        _ => "Access denied."
    };

    public static void Main()
    {
        var admin = new UserProfile("usr-1", "admin@corp.internal", "Admin");

        // Non-destructive mutation using 'with' expression:
        var auditor = admin with { Role = "Auditor" };

        Console.WriteLine(EvaluateAccess(admin));
        Console.WriteLine(EvaluateAccess(auditor));
    }
}`,
        explanation: 'Demonstrates positional records, property pattern matching in switch expressions, and non-destructive mutation.'
      },
      keyTakeaways: [
        'Use records for DTOs, events, and message payloads with value-based equality.',
        'The "with" keyword clones an existing record with surgical property modifications.',
        'Switch expressions with property patterns make complex business rules clean and readable.'
      ]
    },
    {
      id: 'cs-async-tasks',
      topicNumber: 3,
      title: 'Asynchronous Programming with Task & ValueTask',
      category: 'Concurrency & Memory',
      summary: 'Master async/await, Task, Task<T>, ValueTask<T> for zero-allocation hot paths, CancellationToken cancellation, and avoiding deadlock synchronization contexts.',
      conceptDeepDive: `C# async/await operates via compiler-generated state machines. When awaiting an uncompleted Task, the method yields its thread back to the .NET ThreadPool. ValueTask<T> is a struct alternative to Task<T> that avoids allocating a Task object on the heap when an operation completes synchronously (e.g. from an in-memory cache), dramatically reducing GC pressure.`,
      codeSnippet: {
        language: 'csharp',
        code: `using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

public class ResilientApiClient
{
    private readonly HttpClient _http = new();

    // ValueTask<string> avoids heap allocation if the result is cached!
    public async ValueTask<string> FetchPayloadAsync(string url, CancellationToken ct = default)
    {
        try
        {
            using var response = await _http.GetAsync(url, ct);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync(ct);
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Request was gracefully cancelled via CancellationToken.");
            throw;
        }
    }

    public static async Task Main()
    {
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(3));
        var client = new ResilientApiClient();

        string data = await client.FetchPayloadAsync("https://httpbin.org/status/200", cts.Token);
        Console.WriteLine("Payload fetched successfully.");
    }
}`,
        explanation: 'Shows async/await with CancellationToken propagation and ValueTask for high-performance memory efficiency.'
      },
      keyTakeaways: [
        'Always propagate CancellationToken through async method chains for graceful shutdown.',
        'Use ValueTask<T> for high-throughput methods that frequently complete synchronously.',
        'Never call .Result or .Wait() on Tasks; always await to avoid thread-pool deadlocks.'
      ]
    }
  ]
};
