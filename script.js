// ============================================
// UTILITY FUNCTIONS
// ============================================

// 1. Sum all numbers in an array
const sum = (numbers) =>
  numbers.reduce((total, n) => total + n, 0);


// 2. Total price of items with a .price property
const totalPrice = (items) =>
  items.reduce((total, item) => total + item.price, 0);


// 3. Group an array of objects by a key's value
// reduce builds an object — each unique value of key becomes a group
const groupBy = (arr, key) =>
  arr.reduce((groups, item) => ({
    ...groups,
    [item[key]]: [...(groups[item[key]] || []), item]
  }), {});


// 4. Convert a string to Title Case
const toTitleCase = (str) =>
  str
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");


// 5. Remove duplicates — Set only keeps unique values, spread converts back to array
const unique = (arr) => [...new Set(arr)];


// 6. Return only specified keys from an object
const pick = (obj, keys) =>
  keys.reduce((result, key) => ({
    ...result,
    ...(key in obj ? { [key]: obj[key] } : {})
  }), {});


// 7. Return a percentage string
const progressPercent = (value, max) =>
  `${Math.round((value / max) * 100)}%`;


// 8. Safely get a nested value using a dot-string path
// split "a.b.c" into ["a","b","c"] then drill in with reduce
// ?. means: if current is undefined, stop and return undefined (no crash)
const getNestedValue = (obj, path) =>
  path.split(".").reduce((current, key) => current?.[key], obj);


// ============================================
// DOM HELPER
// Renders a list of { label, value } rows
// into a given container element
// ============================================

const renderResults = (containerId, rows) => {
  const container = document.getElementById(containerId);
  container.innerHTML = rows
    .map(({ label, value, type }) => `
      <div class="result-row">
        <span class="label">${label}</span>
        <span class="value ${type || ''}">${value}</span>
      </div>
    `)
    .join("");
};


// ============================================
// TEST DATA
// ============================================

const cart = [
  { name: "Laptop",  price: 999 },
  { name: "Mouse",   price: 29  },
  { name: "Pad",     price: 15  },
];

const people = [
  { name: "Ali",   role: "dev"    },
  { name: "Budi",  role: "design" },
  { name: "Citra", role: "dev"    },
  { name: "Dian",  role: "design" },
  { name: "Eko",   role: "dev"    },
];

const nestedData = {
  user: {
    profile: {
      name: "Fasain",
      score: 95
    }
  }
};


// ============================================
// RENDER EACH SECTION
// ============================================

// 1. sum()
renderResults("output-sum", [
  { label: "sum([1,2,3,4,5])",  value: sum([1, 2, 3, 4, 5]),   type: "highlight" },
  { label: "sum([10,20,30])",   value: sum([10, 20, 30]),       type: "highlight" },
  { label: "sum([])",           value: sum([]),                  type: "highlight" },
]);


// 2. totalPrice()
renderResults("output-totalPrice", [
  {
    label: "cart: Laptop $999, Mouse $29, Pad $15",
    value: `$${totalPrice(cart)}`,
    type: "highlight"
  },
]);


// 3. groupBy()
const grouped = groupBy(people, "role");
renderResults("output-groupBy", [
  {
    label: 'groupBy(people, "role")',
    value: JSON.stringify(
      Object.fromEntries(
        Object.entries(grouped).map(([k, v]) => [k, v.map(p => p.name)])
      ),
      null,
      0
    ),
    type: "highlight"
  },
  {
    label: "dev group count",
    value: grouped.dev.length + " people",
    type: "success"
  },
  {
    label: "design group count",
    value: grouped.design.length + " people",
    type: "success"
  },
]);


// 4. toTitleCase()
renderResults("output-toTitleCase", [
  { label: '"hello world"',          value: toTitleCase("hello world"),          type: "highlight" },
  { label: '"the quick BROWN fox"',  value: toTitleCase("the quick BROWN fox"),  type: "highlight" },
  { label: '"jAKARTA iS GREAT"',     value: toTitleCase("jAKARTA iS GREAT"),     type: "highlight" },
]);


// 5. unique()
renderResults("output-unique", [
  {
    label: "[1,2,2,3,3,3,4]",
    value: JSON.stringify(unique([1, 2, 2, 3, 3, 3, 4])),
    type: "highlight"
  },
  {
    label: '["a","b","a","c","b"]',
    value: JSON.stringify(unique(["a", "b", "a", "c", "b"])),
    type: "highlight"
  },
]);


// 6. pick()
const user = { name: "Fasain", age: 21, city: "Jakarta", role: "dev" };
renderResults("output-pick", [
  {
    label: 'pick(user, ["name","role"])',
    value: JSON.stringify(pick(user, ["name", "role"])),
    type: "highlight"
  },
  {
    label: 'pick(user, ["name","missing"])',
    value: JSON.stringify(pick(user, ["name", "missing"])),
    type: "highlight"
  },
]);


// 7. progressPercent()
renderResults("output-progress", [
  { label: "progressPercent(75, 100)", value: progressPercent(75, 100),  type: "highlight" },
  { label: "progressPercent(1, 3)",    value: progressPercent(1, 3),     type: "highlight" },
  { label: "progressPercent(14, 14)",  value: progressPercent(14, 14),   type: "success"   },
]);


// 8. getNestedValue()
renderResults("output-nested", [
  {
    label: '"user.profile.name"',
    value: getNestedValue(nestedData, "user.profile.name"),
    type: "highlight"
  },
  {
    label: '"user.profile.score"',
    value: getNestedValue(nestedData, "user.profile.score"),
    type: "highlight"
  },
  {
    label: '"user.profile.missing" (safe)',
    value: String(getNestedValue(nestedData, "user.profile.missing")),
    type: "success"
  },
  {
    label: '"x.y.z" on missing path (safe)',
    value: String(getNestedValue(nestedData, "x.y.z")),
    type: "success"
  },
]);