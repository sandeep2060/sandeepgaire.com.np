import { supabase } from './supabase';

export type StatType = 'projects' | 'blogs';

export interface ItemStats {
  likes: number;
  dislikes: number;
  views: number;
}

/**
 * Fetches stats for a specific item from Supabase.
 * Assumes the table (projects or blogs) has columns: likes, dislikes, views.
 */
export const getStats = async (type: StatType, id: string | number): Promise<ItemStats> => {
  try {
    const { data, error } = await supabase
      .from(type)
      .select('likes, dislikes, views')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      likes: data?.likes || 0,
      dislikes: data?.dislikes || 0,
      views: data?.views || 0,
    };
  } catch (err) {
    console.error(`Error fetching stats for ${type} ${id}:`, err);
    return { likes: 0, dislikes: 0, views: 0 };
  }
};

/**
 * Increments a specific stat for an item in Supabase.
 */
export const incrementStat = async (type: StatType, id: string | number, stat: keyof ItemStats): Promise<ItemStats> => {
  try {
    // Note: In a production app, you'd use a Supabase RPC function for atomic increments:
    // const { data, error } = await supabase.rpc('increment_stat', { table_name: type, row_id: id, stat_name: stat });
    
    // For now, we'll do a simple fetch and update
    const currentStats = await getStats(type, id);
    const newValue = currentStats[stat] + 1;

    const { data, error } = await supabase
      .from(type)
      .update({ [stat]: newValue })
      .eq('id', id)
      .select('likes, dislikes, views')
      .single();

    if (error) throw error;

    return {
      likes: data?.likes || 0,
      dislikes: data?.dislikes || 0,
      views: data?.views || 0,
    };
  } catch (err) {
    console.error(`Error incrementing ${stat} for ${type} ${id}:`, err);
    return { likes: 0, dislikes: 0, views: 0 };
  }
};

/**
 * Fetches all stats for all items of a type.
 */
export const getAllStats = async (type: StatType): Promise<Record<string | number, ItemStats>> => {
  try {
    const { data, error } = await supabase
      .from(type)
      .select('id, likes, dislikes, views');

    if (error) throw error;

    const statsMap: Record<string | number, ItemStats> = {};
    data?.forEach((item: any) => {
      statsMap[item.id] = {
        likes: item.likes || 0,
        dislikes: item.dislikes || 0,
        views: item.views || 0,
      };
    });

    return statsMap;
  } catch (err) {
    console.error(`Error fetching all stats for ${type}:`, err);
    return {};
  }
};

/**
 * Gets aggregate stats for the entire site.
 */
export const getGlobalStats = async () => {
  try {
    const { data: projectsData } = await supabase.from('projects').select('likes, views');
    const { data: blogsData } = await supabase.from('blogs').select('likes, views');
    const { count: messageCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });

    const totalLikes = (projectsData?.reduce((acc, p) => acc + (p.likes || 0), 0) || 0) + 
                       (blogsData?.reduce((acc, b) => acc + (b.likes || 0), 0) || 0);
    
    const totalViews = (projectsData?.reduce((acc, p) => acc + (p.views || 0), 0) || 0) + 
                       (blogsData?.reduce((acc, b) => acc + (b.views || 0), 0) || 0);

    return {
      totalLikes,
      totalViews,
      totalMessages: messageCount || 0
    };
  } catch (err) {
    console.error('Error fetching global stats:', err);
    return { totalLikes: 0, totalViews: 0, totalMessages: 0 };
  }
};

