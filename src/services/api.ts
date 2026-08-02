/**
 * @deprecated Compatibility shim for screens not yet migrated to their
 * feature folder. The real implementation lives in src/shared/api/client.ts.
 * Delete this file once nothing imports from "../../services/api" anymore
 * (tracked in the Phase 14 dead-code sweep).
 */
import { apiClient } from "@shared/api/client";

export { navigationRef } from "@shared/api/client";
export default apiClient;
