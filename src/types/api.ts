/**
 * @deprecated Compatibility shim for screens not yet migrated to their
 * feature folder. The real, consolidated domain types live in
 * src/shared/types/*.ts (split by domain, with the old duplicate
 * Country/City declarations reconciled into one shape each). Delete this
 * file once nothing imports from "../../types/api" anymore (tracked in the
 * Phase 14 dead-code sweep).
 */
export * from "@shared/types";
