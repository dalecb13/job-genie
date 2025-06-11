import { type Database } from "@/models/database.types";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { configureSyncedSupabase, syncedSupabase } from '@legendapp/state/sync-plugins/supabase';
import { configureSynced } from "@legendapp/state/sync";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage"

const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const generateId = () => uuidv4();
configureSyncedSupabase({
  generateId
});

// Create a configured sync function
export const customSynced = configureSynced(syncedSupabase, {
  // Use React Native Async Storage
  persist: {
    plugin: ObservablePersistLocalStorage,
    // plugin: observablePersistAsyncStorage({
    //   AsyncStorage,
    // }),
  },
  generateId,
  supabase,
  changesSince: 'last-sync',
  fieldCreatedAt: 'created_at',
  fieldUpdatedAt: 'updated_at',
  // Optionally enable soft deletes
  fieldDeleted: 'deleted',
})

export default supabase
