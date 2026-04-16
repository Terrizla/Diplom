export const data = {
  users: [] as any[],
  profiles: [] as any[],
  movies: [
    { 
      id: 'm1', 
      title: 'Echoes of Eternity', 
      description: 'A mind-bending journey through time and space as humanity seeks its origins.', 
      release_year: 2024, 
      duration_seconds: 7200, 
      thumbnail_url: 'https://picsum.photos/seed/echoes/800/450' 
    },
    { 
      id: 'm2', 
      title: 'Neon Shadows', 
      description: 'In a cyberpunk metropolis, a rogue detective uncovers a conspiracy that goes straight to the top.', 
      release_year: 2023, 
      duration_seconds: 6500, 
      thumbnail_url: 'https://picsum.photos/seed/neon/800/450' 
    },
    { 
      id: 'm3', 
      title: 'The Outlands', 
      description: 'Survival is the only rule in the barren wastelands of Earth.', 
      release_year: 2025, 
      duration_seconds: 8100, 
      thumbnail_url: 'https://picsum.photos/seed/outlands/800/450' 
    },
    { 
      id: 'm4', 
      title: 'Whispers in the Dark', 
      description: 'A terrifying psychological thriller that will keep you guessing until the end.', 
      release_year: 2022, 
      duration_seconds: 5800, 
      thumbnail_url: 'https://picsum.photos/seed/whispers/800/450' 
    },
    { 
      id: 'm5', 
      title: 'Stellar Horizons', 
      description: 'The first manned mission to exoplanets faces unexpected and marvelous alien life.', 
      release_year: 2024, 
      duration_seconds: 9000, 
      thumbnail_url: 'https://picsum.photos/seed/stellar/800/450' 
    }
  ]
};

export const mockQuery = async (sql: string, params: any[] = []): Promise<any> => {
  const q = sql.toLowerCase();
  
  // Auth: Check if user exists
  if (q.includes('select id from users where email =')) {
    const user = data.users.find(u => u.email === params[0]);
    return { rowCount: user ? 1 : 0, rows: user ? [user] : [] };
  }
  
  // Auth: Insert user
  if (q.includes('insert into users')) {
    const newUser = { id: params[0], email: params[1], password_hash: params[2], role: params[3] };
    data.users.push(newUser);
    return { rowCount: 1, rows: [newUser] };
  }
  
  // Auth: Get user for login
  if (q.includes('select id, password_hash, role from users where email =')) {
    const user = data.users.find(u => u.email === params[0]);
    return { rowCount: user ? 1 : 0, rows: user ? [user] : [] };
  }
  
  // Profiles: Get count
  if (q.includes('select count(*) from profiles where user_id =')) {
    const count = data.profiles.filter(p => p.user_id === params[0]).length;
    return { rowCount: 1, rows: [{ count: count.toString() }] };
  }
  
  // Profiles: Get profiles
  if (q.includes('select * from profiles where user_id =')) {
    const profiles = data.profiles.filter(p => p.user_id === params[0]);
    return { rowCount: profiles.length, rows: profiles };
  }
  
  // Profiles: Insert
  if (q.includes('insert into profiles')) {
    const profile = { id: params[0], user_id: params[1], name: params[2], avatar_url: params[3], is_kids: params[4], language: params[5] };
    data.profiles.push(profile);
    return { rowCount: 1, rows: [profile] };
  }
  
  // Catalog: Trending
  if (q.includes('order by release_year desc limit 10')) {
    return { rowCount: data.movies.length, rows: data.movies };
  }
  
  // Catalog: Search
  if (q.includes('where title ilike')) {
    const term = params[0].replace(/%/g, '').toLowerCase();
    const rows = data.movies.filter(m => m.title.toLowerCase().includes(term)).map(m => ({ ...m, type: 'movie' }));
    return { rowCount: rows.length, rows };
  }
  
  // Catalog: Movie details
  if (q.includes('select * from movies where id =')) {
    const movie = data.movies.find(m => m.id === params[0]);
    return { rowCount: movie ? 1 : 0, rows: movie ? [movie] : [] };
  }
  
  return { rowCount: 0, rows: [] };
};
