// Simple mock database using localStorage to persist stats

export type StatType = 'projects' | 'blogs';

export interface ItemStats {
  likes: number;
  dislikes: number;
  views: number;
}

interface StatsDB {
  projects: Record<string | number, ItemStats>;
  blogs: Record<string | number, ItemStats>;
}

const DEFAULT_DB: StatsDB = {
  projects: {
    '1': { likes: 124, dislikes: 5, views: 1042 },
    '2': { likes: 89, dislikes: 2, views: 856 },
    '3': { likes: 210, dislikes: 12, views: 2450 },
    '4': { likes: 45, dislikes: 1, views: 320 }
  },
  blogs: {
    '1': { likes: 340, dislikes: 8, views: 5000 },
    '2': { likes: 120, dislikes: 3, views: 1200 },
    '3': { likes: 85, dislikes: 1, views: 900 },
    '4': { likes: 210, dislikes: 15, views: 3100 }
  }
};

const getDB = (): StatsDB => {
  const data = localStorage.getItem('site_stats_db');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_DB;
    }
  }
  // Initialize with mock defaults if empty
  localStorage.setItem('site_stats_db', JSON.stringify(DEFAULT_DB));
  return DEFAULT_DB;
};

const saveDB = (db: StatsDB) => {
  localStorage.setItem('site_stats_db', JSON.stringify(db));
};

export const getStats = (type: StatType, id: string | number): ItemStats => {
  const db = getDB();
  if (!db[type][id]) {
    db[type][id] = { likes: 0, dislikes: 0, views: 0 };
    saveDB(db);
  }
  return db[type][id];
};

export const getAllStats = (type: StatType): Record<string | number, ItemStats> => {
  return getDB()[type];
};

export const incrementStat = (type: StatType, id: string | number, stat: keyof ItemStats) => {
  const db = getDB();
  if (!db[type][id]) {
    db[type][id] = { likes: 0, dislikes: 0, views: 0 };
  }
  db[type][id][stat] += 1;
  saveDB(db);
  return db[type][id];
};
