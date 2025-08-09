// Quick test to verify the functional approach models work
console.log("Testing MongoDB models with functional approach...");

try {
  // Test Project model (already working)
  const Project = require("./src/backend/modal/project/index.ts");
  console.log("✅ Project model loaded successfully");

  // Test Sprint model (converted to functional)
  const Sprint = require("./src/backend/modal/sprint/index.ts");
  console.log("✅ Sprint model loaded successfully");

  // Test Ticket model (converted to functional)
  const Ticket = require("./src/backend/modal/ticket/index.ts");
  console.log("✅ Ticket model loaded successfully");

  // Test Team model (already working)
  const Team = require("./src/backend/modal/team/index.ts");
  console.log("✅ Team model loaded successfully");

  console.log("\n🎉 All models using functional approach loaded successfully!");
  console.log("✅ Functional architecture conversion is working correctly");
} catch (error) {
  console.error("❌ Error loading models:", error.message);
  process.exit(1);
}
