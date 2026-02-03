import { ContentItem, ContentCategory } from '../types';
import { MOCK_ADMIN_CONTENT } from '../constants';

// --- Simulation Architecture Hybride ---

// 1. Simulation SQL (Relationnel - Pour les données structurées comme les Cours/Utilisateurs)
// Dans une vraie app, cela ferait appel à une API connectée à PostgreSQL/MySQL
class SQLService {
  private mockData: ContentItem[] = [...MOCK_ADMIN_CONTENT];

  async query(queryStr: string): Promise<any> {
    // Simulation de latence réseau
    await new Promise(resolve => setTimeout(resolve, 800)); 
    console.log(`[SQL EXECUTION]: ${queryStr}`);
    return true;
  }

  async getAllContent(): Promise<ContentItem[]> {
    await this.query("SELECT * FROM content_items WHERE active = true");
    return this.mockData;
  }

  async insertContent(item: ContentItem): Promise<ContentItem> {
    await this.query(`INSERT INTO content_items VALUES (...)`);
    this.mockData.unshift(item);
    return item;
  }

  async deleteContent(id: string): Promise<boolean> {
    await this.query(`DELETE FROM content_items WHERE id = '${id}'`);
    this.mockData = this.mockData.filter(i => i.id !== id);
    return true;
  }
}

// 2. Simulation NoSQL (Document - Pour les logs d'activité et analytics)
// Dans une vraie app, cela ferait appel à MongoDB ou Firebase
interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  metadata: any;
}

class NoSQLService {
  private collectionName = 'yann_note_admin_logs';

  async insertLog(action: string, metadata: any = {}) {
    const log: ActivityLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date().toISOString(),
      metadata
    };
    
    // Utilisation de localStorage pour persister comme une "DB Document" locale
    const existing = this.getLogs();
    const updated = [log, ...existing].slice(0, 50); // Garder les 50 derniers
    localStorage.setItem(this.collectionName, JSON.stringify(updated));
    
    console.log(`[NoSQL INSERT]: { action: "${action}", meta: ${JSON.stringify(metadata)} }`);
  }

  getLogs(): ActivityLog[] {
    const data = localStorage.getItem(this.collectionName);
    return data ? JSON.parse(data) : [];
  }
}

// Facade Pattern pour l'application
export const db = {
  sql: new SQLService(),
  nosql: new NoSQLService()
};